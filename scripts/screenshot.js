/**
 * Visual verification tool for the revamp.
 *
 * Usage:
 *   node scripts/screenshot.js <outDir> <urlPath1> [urlPath2 …]
 *
 * Example:
 *   node scripts/screenshot.js revamp-screenshots/00-baseline / /destinations /packages
 *
 * Captures each URL at three viewports (mobile 390, tablet 834, desktop 1440) and
 * saves PNGs into `<outDir>/`. Filenames encode the route and viewport so a
 * reviewer can browse the folder end-to-end.
 *
 * Requires the Vite dev server to already be running on http://localhost:5173.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const [, , outDirArg, ...paths] = process.argv;

if (!outDirArg || paths.length === 0) {
  console.error('Usage: node scripts/screenshot.js <outDir> <urlPath1> [urlPath2 …]');
  process.exit(1);
}

const outDir = path.resolve(projectRoot, outDirArg);
fs.mkdirSync(outDir, { recursive: true });

const BASE_URL = process.env.SCREENSHOT_BASE || 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'tablet', width: 834, height: 1194, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false }
];

function slugify(url) {
  const stripped = url.replace(/^\//, '').replace(/\/$/, '') || 'home';
  return stripped.replace(/[^a-z0-9-]/gi, '_');
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      }, 80);
    });
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const summary = [];

  for (const urlPath of paths) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport(vp);

      const url = `${BASE_URL}${urlPath}`;
      const slug = slugify(urlPath);
      const file = path.join(outDir, `${slug}--${vp.name}.png`);

      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(`PAGE ERROR: ${err.message}`));

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        // Wait for the header (means React booted + first paint of layout)
        await page.waitForSelector('header', { timeout: 30000 });
        // Give React a moment to render the lazy chunks + first data fetch
        await new Promise((r) => setTimeout(r, 3000));
        await autoScroll(page);
        // Small final settle so animations complete
        await new Promise((r) => setTimeout(r, 500));
        await page.screenshot({ path: file, fullPage: true });
        const size = fs.statSync(file).size;
        summary.push({ url: urlPath, viewport: vp.name, file: path.relative(projectRoot, file), bytes: size, consoleErrors, ok: true });
        console.log(`✓ ${urlPath} @ ${vp.name} → ${path.relative(projectRoot, file)} (${(size / 1024).toFixed(1)} KB)${consoleErrors.length ? ` [${consoleErrors.length} console errors]` : ''}`);
      } catch (err) {
        summary.push({ url: urlPath, viewport: vp.name, file: path.relative(projectRoot, file), error: err.message, consoleErrors, ok: false });
        console.error(`✗ ${urlPath} @ ${vp.name}: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(outDir, '_manifest.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE_URL, results: summary }, null, 2)
  );

  const failed = summary.filter((s) => !s.ok).length;
  console.log(`\nDone. ${summary.length - failed}/${summary.length} succeeded. Manifest at ${path.relative(projectRoot, path.join(outDir, '_manifest.json'))}`);
  process.exit(failed > 0 ? 1 : 0);
})();
