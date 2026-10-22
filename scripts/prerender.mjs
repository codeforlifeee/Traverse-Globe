/**
 * Build-time pre-render of the homepage. Runs after `vite build` (see package.json).
 *
 *   1. Builds src/entry-server.jsx as a server (SSR) bundle into a temp folder.
 *   2. Renders "/" to HTML with React's renderToString.
 *   3. Writes that HTML into dist/index.html, between the <!--app-root--> markers, as
 *      <div id="root" data-prerendered>…</div>. main.jsx sees the attribute and hydrates
 *      it, so the header and hero are on screen before any JavaScript has run.
 *
 * Only the header and hero carry real markup: they need no CMS data and no viewport.
 * Below-the-fold sections render as their reserved-height placeholders.
 *
 * Every URL is served this same index.html; an inline script in it swaps the
 * pre-rendered homepage for the boot skeleton on any path other than "/".
 *
 * If anything here fails, dist/index.html is left as the plain client-rendered shell
 * (the site still works, just without the pre-render) and the failure is reported.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_HTML = path.join(ROOT, 'dist', 'index.html');
const SSR_OUT = path.join(ROOT, 'node_modules', '.cache', 'prerender');
const MARKERS = /<!--app-root-->[\s\S]*?<!--\/app-root-->/;

// Must hold before React loads: its development build warns about server-only APIs.
process.env.NODE_ENV = 'production';

async function main() {
  const shell = await readFile(DIST_HTML, 'utf8');
  if (!MARKERS.test(shell)) {
    throw new Error('dist/index.html has no <!--app-root--> markers; was index.html changed?');
  }

  await build({
    root: ROOT,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: SSR_OUT,
      emptyOutDir: true,
      minify: false,
      rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
    },
  });

  const { render } = await import(pathToFileURL(path.join(SSR_OUT, 'entry-server.mjs')).href);
  const appHtml = render('/');

  // Cheap sanity check that the hero really rendered rather than an error boundary.
  if (!/<h1[\s>]/.test(appHtml) || !appHtml.includes('travel partner')) {
    throw new Error('rendered homepage is missing the hero headline');
  }

  const root = `<!--app-root--><div id="root" data-prerendered>${appHtml}</div><!--/app-root-->`;
  await writeFile(DIST_HTML, shell.replace(MARKERS, () => root));

  const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
  console.log(`prerender: homepage header + hero written to dist/index.html (${kb} KB of HTML)`);
}

try {
  await main();
} catch (error) {
  console.error('\n⚠ prerender FAILED — dist/index.html is the plain client-rendered shell.');
  console.error(error);
  process.exitCode = 1;
} finally {
  await rm(SSR_OUT, { recursive: true, force: true });
}
