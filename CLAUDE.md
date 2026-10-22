# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Traverse Globe is a travel booking platform targeting mid-tier Indian and UAE families. It sells curated holiday packages and hotel bookings. The frontend is a React 18 SPA powered by Sanity CMS as the headless backend. There is no custom API server — all data comes from Sanity's client SDK directly in the browser (read-only, no token in browser builds). Lead capture goes through a Vite dev-server proxy → Zapier webhook pipeline.

## Commands

```bash
npm run dev           # Vite dev server (HMR, lead webhook proxy)
npm run build         # Production build (terser, PWA, code splitting)
npm run build:analyze # Same, plus rollup-plugin-visualizer output
npm run preview       # Serve the production build locally
npm run sanity:cors:list / :add / :remove   # Manage Sanity CORS origins
```

⚠️ `npm run lint` is defined but **eslint is not installed** (it is not in devDependencies), so
the script fails. Either add eslint or rely on `npm run build` to catch unresolved imports —
note that a build does NOT catch a JSX component used without being imported, since that only
fails at runtime.

There is no test suite. No TypeScript — JSX with `jsconfig.json` path aliases.

Sanity Studio is a separate workspace at `sanity-studio/` with its own `package.json`. Run `npx sanity dev` from that directory to launch the CMS studio locally.

## Architecture

### Data Flow

```
Sanity CMS (GROQ)
  └─> src/services/sanityClient.js      ← the ONLY client. All GROQ lives here.
        └─> src/hooks/queries.js        ← react-query hooks. Components use these.
        └─> src/services/destinationService.js  ← thin wrapper for destination pages
```

**One client, one place for GROQ.** The old `dataService.js` / `sanityService.js` pair and the
`VITE_USE_SANITY` flag are gone; `src/data/siteData.js` is no longer a content fallback (see below).

**Components should not call `sanityClient` directly** — use a hook from `src/hooks/queries.js`.
react-query is wired in `src/main.jsx` with `staleTime: 5min`, `gcTime: 30min` and
`refetchOnWindowFocus: false`. Components needing the same documents share a `queryKey` and
narrow with `select`, so each document set is fetched once per cache window
(e.g. TrendingDestinations + TopDestinations share `['destinations']`).

**Queries are projected.** `sanityClient.js` defines `PACKAGE_CARD` / `HOTEL_CARD` field lists;
list queries use them, detail queries fetch whole documents. `fetchPackages` takes
`fields: 'card' | 'full'` — `fetchPackagesByCategory` passes `'full'` because DestinationDetail
renders package detail straight out of that list. Keep `slug` as the raw object in projections:
every consumer reads `slug?.current`.

Sanity is read-only from the browser with no token. Writes go through scripts in `scripts/` with
an Editor token passed via env var.

The browser "client" in `sanityClient.js` is a ~40-line `fetch` wrapper over the HTTP query API,
**not** `@sanity/client` (that SDK plus rxjs/get-it was ~200 KB of the entry chunk). It only
supports `sanityClient.fetch(query, params)`. `@sanity/client` stays in `package.json` for the
write scripts — do not import it from `src/`.

### Routing

React Router v6 in `src/App.jsx`. Two routing patterns:
- **Dynamic destinations**: `/destinations/:type/:category/:slug` — type is `international`/`domestic`, category is the destination slug (uae, kerala, etc.), slug is the package
- **Legacy redirects**: Old flat URLs like `/uae-packages/:slug` redirect via `LegacyRedirect.jsx`
- **Hotels**: `/hotels/:category/:slug`

All routes except Home are lazy-loaded with `React.lazy`. Home is an eager route, but
everything inside it except `HeroSection` is itself lazy (see Build & Production).

### Key Abstractions

- **`src/data/categoryConfig.js`**: Central registry of all destination categories (slug, type, display name, meta). This is the source of truth for what destinations exist and whether they're international/domestic.
- **`src/components/PackageCard.jsx`**: The shared card component for displaying packages. Exports `PriceTag` as a named export.
- **`src/components/BookingModal.jsx`**: Lead capture modal. Posts to `/api/lead-webhook` which the Vite dev plugin (`vite.config.js` → `localLeadWebhookApi`) proxies to the Zapier webhook URL from `LEAD_WEBHOOK_URL` env var.
- **`src/hooks/queries.js`**: all react-query hooks for CMS content. Add new data access here.
- **`src/hooks/useTheme.js`**: light/dark/system theme state, shared across toggle instances.
- **`src/lib/sanityImage.js`**: `resolveImageUrl` / `buildSrcSet` / `isSanityImageRef`. Handles
  both plain URL strings (legacy data) and native Sanity image refs transparently. Exports
  `CARD_WIDTHS` and `HERO_WIDTHS` ladders.
- **`src/lib/utils.js`**: shadcn `cn()` utility (clsx + tailwind-merge).
- **`src/components/ui/`**: shadcn/ui primitives — accordion, badge, button, checkbox, command,
  dialog, input, label, separator, sheet, skeleton, slider. All token-driven; no hex literals.
- **`src/components/icons/WhatsAppIcon.jsx`**: inline WhatsApp mark. Lucide has no brand icons,
  and this replaced the `react-icons` dependency.
- **`src/data/siteData.js`**: static presentational config ONLY (destination tile copy, the
  "why choose us" list, hotel category cards). It is reachable from eagerly-imported components,
  so anything added here ships in the initial bundle — do not put content or bulk data in it.
- **`src/data/companyInfo.js`**: contact details and social links, deliberately its own module so
  the ~15 components that need it don't pull in a larger data file.

### Sanity Schema (sanity-studio/schemas/)

Ten document types: `package`, `hotel`, `destination`, `banner`, `offer`, `blogPost`,
`testimonial`, `platformReview`, `customerPhoto`, `customerVideo`. Three helper object types:
`itineraryDay`, `itineraryObject`, `hotelInfo` (defined inline in `schemas/index.js`).

`customerPhoto` and `customerVideo` are the only schemas using native Sanity `image`/`file`
assets; everything else stores image URLs as plain `url` strings. Both shapes are handled by
`src/lib/sanityImage.js`.

New document types must be registered in `sanity-studio/schemas/index.js`.

### Styling

- **Tailwind CSS v3** with `tailwindcss-animate` plugin
- **Theming:** every brand color resolves through a CSS variable, so light and dark are one system. `src/index.css` defines two blocks — `:root` (light) and `:root[data-theme="dark"]` — each setting `--c-*` space-separated RGB channels plus the shadcn HSL tokens derived from the same colors. `tailwind.config.js` consumes them as `rgb(var(--c-x) / <alpha-value>)`, which is what keeps opacity modifiers like `text-brand-ink/70` working.
- **Dark mode** is class-based: `darkMode: ['class', '[data-theme="dark"]']`. The toggle writes `data-theme` on `<html>`; an inline script in `index.html` applies the stored choice before first paint to avoid a flash. State lives in `src/hooks/useTheme.js` (light / dark / system, persisted under `tg_theme`).
- **Semantic tokens:** `brand-ink` is FOREGROUND and inverts between themes (near-black in light, near-white in dark). Surfaces that must stay dark in both — image scrims, the footer, dark panels — use `brand-scrim`. Card and panel backgrounds use `surface` / `brand-surface`, never bare `bg-white` (which cannot follow a theme). Translucent `bg-white/NN` below 80% opacity is kept for overlays on imagery.
- Brand colors: `orange: #FF5B04` (primary CTA, same in both themes), `darkBlue`/`brand-ink` (#0f172a light), `teal: #075056` light and `#10949c` dark — teal is the one hue that shifts, because the light value is unreadable on a dark canvas.
- Fixed Tailwind palette colors (`bg-amber-50`, `text-red-600`, …) do not follow the theme, so they carry explicit `dark:` counterparts.
- Three font families: `font-season` (headings), `font-poppins` (subheadings), `font-canva-sans` (body)
- `@` import alias maps to `./src` (configured in both `vite.config.js` and `jsconfig.json`)

### Build & Production

- Vite 5, `target: 'es2020'`. Manual chunks: `vendor-react`, `vendor-motion` (framer-motion),
  `vendor-icons` (lucide), `vendor-utils` (react-query, clsx, tailwind-merge, cva).
  **Swiper is deliberately unlisted** so it rides along with the lazy carousel sections instead of
  being modulepreloaded on every page.
- Only `HeroSection` is eager on the homepage; every other section in `src/pages/Home.jsx` is
  `React.lazy` inside a `content-visibility:auto` wrapper whose reserved height matches the
  Suspense fallback, so lazy mounting cannot shift layout. Sections also **mount only when within
  800px of the viewport** (IntersectionObserver in `Home.jsx`'s `Section`), so first load renders
  ~360 DOM nodes instead of ~3,600. If you change a section's height, update its `height` pair.
- `PackageCard` builds its flip-card back only after the first flip. Compact cards (homepage)
  have no Quick View, so their backs never render.
- Images: `resolveImageUrl` / `buildSrcSet` size bare Pexels and width-less Unsplash URLs to
  WebP automatically (CMS editors paste camera-original Pexels links of 2–3 MB). URLs that
  already set `w=` are left as authored.
- GTM and the inline Meta Pixel (pixel `814339692478366`; GTM loads a *different* pixel,
  `1414409276720807`) create their queues immediately but download their libraries after
  `load` + idle via `window.__loadThirdParty` in `index.html`.
- `index.css` defines metric-matched `"Poppins Fallback"` / `"Inter Fallback"` /
  `"Playfair Fallback"` faces used in the Tailwind font stacks to prevent font-swap CLS.
  Re-measure them if the families or weights in `index.html` change.
- Lighthouse on `localhost:5173` measures the **dev server** (unminified, no caching) and is
  not meaningful. Test a production build: `npm run build && npx vite preview`, then run
  Lighthouse with Chrome flag `--disable-web-security` so the CMS loads without a CORS entry.
- `index.html` preconnects to `cdn.sanity.io` and `<projectId>.apicdn.sanity.io`, and
  `<link rel="preload" as="image" imagesrcset>`s the hero image. The hero image is fixed
  (`HERO_IMAGE` in `src/components/HeroSection.jsx`), not CMS-driven: swapping to the CMS banner
  after load caused a flicker and a second full-width download. The preload's `href` and
  `imagesrcset` must be **exactly** the URLs `buildSrcSet(HERO_IMAGE, { widths: HERO_WIDTHS })`
  produces, or the browser downloads the image twice.
- **The homepage is pre-rendered at build time and hydrated.** `npm run build` runs
  `vite build` then `scripts/prerender.mjs`, which SSR-builds `src/entry-server.jsx`, renders
  "/" with `renderToString`, and writes it into `dist/index.html` between the
  `<!--app-root-->` markers as `<div id="root" data-prerendered>`. `main.jsx` hydrates when
  that attribute is present (one animation frame after load, so the HTML paints first) and
  client-renders otherwise. Every URL is served the same `index.html`, so an inline script
  after `#root` swaps the pre-rendered markup for the boot skeleton on any path but "/".
  Rules this imposes:
  - The first client render of the eager tree (App shell, Header, Footer, Home, HeroSection
    and what they render) **must match the server render**. Anything that depends on the
    browser — saved theme, viewport, motion preference, the clock, `localStorage` — must
    render the server default while `renderingPrerender()` (`src/lib/hydration.js`) is true
    and switch in an effect. Existing examples: `useTheme`, `useIsDesktop` in Header,
    HeroSection's `skipIntro`, Footer's year, App's floating buttons.
  - Don't read `window`/`document` at module scope or during render in those components
    without a guard; the build renders them in Node.
  - `hydration.active` is cleared in **Home's** effect, not App's: React hydrates the routes'
    Suspense boundary (which holds the hero) after the shell has committed.
  - To debug a hydration mismatch, build with
    `NODE_ENV=development npx vite build --mode development --minify false && node scripts/prerender.mjs`
    and read the console; production React only prints error codes (#418/#425/#422).
  - The router lives in the entry points (`BrowserRouter` in main.jsx, `StaticRouter` in
    entry-server.jsx), not in App.
- `main.jsx` prefetches the homepage package query (`homepagePackagesQuery` in
  `src/hooks/queries.js`) before render, so it runs in parallel with React and the lazy chunk.
- Device-gated code: the desktop menu (`DesktopNav.jsx`, carries Radix NavigationMenu) only
  loads at `min-width: 1024px`; Lenis is dynamically imported and skipped on touch devices and
  reduced motion; the three.js globe mounts only when scrolled near and the browser is idle.
- PWA via `vite-plugin-pwa`. Precache is scoped to the app shell only (entry + vendor chunks +
  CSS); runtime caching covers Google Fonts, Unsplash and Pexels.
- Terser drops console.log in production. No SSR — fully client-rendered SPA.
- Compression is server-side via `mod_deflate`/`mod_brotli` in `public/.htaccess`; the
  `vite-plugin-compression` plugins are intentionally disabled.

## Design System Reference

See `DESIGN.md` for the full UI/UX revamp specifications. Key constraints:
- Primary CTA color: `#FF5B04` (orange) — reserved for primary actions only
- Background: off-white (`#f8fafc` to `#f1f5f9`), never pure white for main bg
- Cards: `rounded-2xl`, `shadow-md` resting / `shadow-xl` hover with `hover:-translate-y-1`
- **Animation System (Magic UI + Lenis)**: Defined in `.claude/skills/tg-magic-animations/SKILL.md`. Uses `lenis` for inertial smooth scrolling (desktop mouse wheel only), `framer-motion` spring physics, and Magic UI primitives in `src/components/magicui/` (`ShimmerButton`, `NumberTicker`, `Globe`, `Marquee`).
- All data-fetching states must use skeleton loaders, never spinners or blank screens.
  **Partially met:** the route-level fallback and the homepage sections use skeletons, but
  `Hotels.jsx`, `HotelDetail.jsx`, `DestinationList.jsx`, `DestinationDetail.jsx` and
  `DestinationOverview.jsx` still render `animate-spin` loaders. Primitives to use instead live
  in `src/components/revamp/Skeletons.jsx` (`SkeletonCard`, `SkeletonList`, `SkeletonDetail`,
  `SkeletonHero`). The spinner in `BookingModal` is a form-submit state, which is fine.
- Mobile-first: bottom sticky nav, full-screen modals for filters, touch-friendly carousels

## Environment Variables

All prefixed with `VITE_` for browser access. Key vars:
- `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` — CMS connection
- `LEAD_WEBHOOK_URL` — server-side only (Vite dev proxy), not exposed to browser
- `VITE_LEAD_WEBHOOK_URL` — browser-side webhook URL fallback
- `SANITY_TOKEN` — Editor token for the write scripts in `scripts/`. Never used by the browser.
  (`VITE_USE_SANITY` was removed along with the dataService abstraction.)

⚠️ `.env.example` contains real tokens — these should be rotated and replaced with placeholders.

## Gotchas

Non-obvious things that have cost debugging time here.

**Sanity document `_id`s must not contain dots.** This dataset grants public read via
`_id in path("*")`, and `path("*")` matches single-segment ids only. An id like
`blogPost.my-slug` is multi-segment, so the document exists and is readable *with* a token but
is **invisible to the tokenless browser client** — the site silently shows nothing while
Studio looks fine. Use dashes: `blogPost-my-slug`. Every write script in `scripts/` must follow this.

**Sanity CORS is per-origin, and `vite preview` is not allowlisted.** `http://localhost:5173`
(dev) is registered; `http://localhost:4173` (preview) is not, so a production build served
locally returns CORS errors and renders empty content. That is an environment artifact, not a
code bug. Either test on 5173 or add the origin with `npm run sanity:cors:add`.

**`font-season` and `font-canva-sans` resolve to fallbacks.** `tailwind.config.js` names
`"The Seasons"` and `"Canva Sans"` as the primary families, but no `@font-face` exists anywhere
and only Inter / Playfair Display / Poppins are loaded. So `font-season` renders Playfair Display
and `font-canva-sans` renders Inter. Nothing warns about this. Decide deliberately before adding
two more webfonts.

**Destination slug mismatch.** Sanity stores the Sri Lanka destination slug as `sri-lanka` while
the banner category and `categoryConfig.js` use `srilanka`. Verify routing and banner lookups
for that destination before relying on them.

**Some CMS image URLs are dead.** A handful of Unsplash URLs in the migrated content 404.
`ImageWithFallback` degrades them to a branded placeholder rather than breaking layout, so they
are easy to miss. They are editable in Studio.

**Blog posts have no detail page.** `/guides/:slug` renders the same `Blog` listing component.
The `url` field on `blogPost` is optional and "Read more" falls back to `#`.

**Line endings are mixed.** Some files are CRLF, some LF. Preserve whatever a file already uses
when editing it, or the diff becomes unreadable.
