# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Traverse Globe is a travel booking platform targeting mid-tier Indian and UAE families. It sells curated holiday packages and hotel bookings. The frontend is a React 18 SPA powered by Sanity CMS as the headless backend. There is no custom API server — all data comes from Sanity's client SDK directly in the browser (read-only, no token in browser builds). Lead capture goes through a Vite dev-server proxy → Zapier webhook pipeline.

## Commands

```bash
npm run dev          # Start Vite dev server (HMR, lead webhook proxy)
npm run build        # Production build (terser, PWA, code splitting)
npm run preview      # Serve the production build locally
npm run lint         # ESLint on src/ (js, jsx)
```

There is no test suite configured. No TypeScript — the project uses JSX with jsconfig.json path aliases.

Sanity Studio is a separate workspace at `sanity-studio/` with its own `package.json`. Run `npx sanity dev` from that directory to launch the CMS studio locally.

## Architecture

### Data Flow

```
Sanity CMS (GROQ queries)
  └─> src/services/sanityClient.js   ← primary data layer, direct fetches
  └─> src/services/destinationService.js  ← wraps sanityClient for destination pages
  └─> src/services/dataService.js    ← abstraction with VITE_USE_SANITY feature flag
        ├─ true  → sanityService.js (lazy-init client)
        └─ false → src/data/siteData.js (hardcoded fallback)
```

Two Sanity client instances exist: `sanityClient.js` (eagerly initialized, used by most pages) and `sanityService.js` (lazy-init singleton, used by the dataService abstraction). Both read-only, no token.

### Routing

React Router v6 in `src/App.jsx`. Two routing patterns:
- **Dynamic destinations**: `/destinations/:type/:category/:slug` — type is `international`/`domestic`, category is the destination slug (uae, kerala, etc.), slug is the package
- **Legacy redirects**: Old flat URLs like `/uae-packages/:slug` redirect via `LegacyRedirect.jsx`
- **Hotels**: `/hotels/:category/:slug`

All routes except Home are lazy-loaded with `React.lazy`.

### Key Abstractions

- **`src/data/categoryConfig.js`**: Central registry of all destination categories (slug, type, display name, meta). This is the source of truth for what destinations exist and whether they're international/domestic.
- **`src/components/PackageCard.jsx`**: The shared card component for displaying packages. Exports `PriceTag` as a named export.
- **`src/components/BookingModal.jsx`**: Lead capture modal. Posts to `/api/lead-webhook` which the Vite dev plugin (`vite.config.js` → `localLeadWebhookApi`) proxies to the Zapier webhook URL from `LEAD_WEBHOOK_URL` env var.
- **`src/lib/utils.js`**: shadcn `cn()` utility (clsx + tailwind-merge).
- **`src/components/ui/`**: shadcn/ui primitives (Button, Slider, Checkbox, Skeleton).

### Sanity Schema (sanity-studio/schemas/)

Six document types: `package`, `hotel`, `destination`, `banner`, `blogPost`, `testimonial`. Three helper object types: `itineraryDay`, `itineraryObject`, `hotelInfo` (defined in `schemas/index.js`, not separate files).

### Styling

- **Tailwind CSS v3** with `tailwindcss-animate` plugin
- shadcn/ui CSS variables in `src/index.css` (`:root` block with HSL color tokens)
- Custom brand colors defined both as Tailwind config values (`orange: '#FF5B04'`, `darkBlue: '#16232A'`, `teal: '#075056'`) AND as CSS variables. The shadcn components reference the brand orange directly via `bg-[#FF5B04]` rather than the CSS variable system.
- Three font families: `font-season` (headings), `font-poppins` (subheadings), `font-canva-sans` (body)
- `@` import alias maps to `./src` (configured in both `vite.config.js` and `jsconfig.json`)

### Build & Production

- Vite 5 with manual chunks: `vendor-react`, `vendor-ui` (framer-motion, swiper, lucide), `vendor-utils` (axios, react-query, clsx)
- PWA via `vite-plugin-pwa` with workbox runtime caching for Google Fonts, Unsplash, Pexels, cdnjs
- Terser minification drops all console.log in production
- No SSR — fully client-rendered SPA

## Design System Reference

See `DESIGN.md` for the full UI/UX revamp specifications. Key constraints:
- Primary CTA color: `#FF5B04` (orange) — reserved for primary actions only
- Background: off-white (`#f8fafc` to `#f1f5f9`), never pure white for main bg
- Cards: `rounded-2xl`, `shadow-md` resting / `shadow-xl` hover with `hover:-translate-y-1`
- All data-fetching states must use skeleton loaders, never spinners or blank screens
- Mobile-first: bottom sticky nav, full-screen modals for filters, touch-friendly carousels

## Environment Variables

All prefixed with `VITE_` for browser access. Key vars:
- `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` — CMS connection
- `VITE_USE_SANITY` — feature flag toggling Sanity vs hardcoded data in dataService
- `LEAD_WEBHOOK_URL` — server-side only (Vite dev proxy), not exposed to browser
- `VITE_LEAD_WEBHOOK_URL` — browser-side webhook URL fallback

⚠️ `.env.example` contains real tokens — these should be rotated and replaced with placeholders.
