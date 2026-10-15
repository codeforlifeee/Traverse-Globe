---
name: tg-revamp-routing
description: Guidelines for Traverse Globe's new routing architecture, migrations, and performance optimizations.
---
# Traverse Globe Routing & Revamp

## Routing Architecture
- **Theme-First Paradigm**: The site is moving from destination-first to theme-first routing. The primary path for packages is `/packages/:slug` (and `/packages/theme/:theme`).
- **Legacy Redirects**: Do not simply delete old destination routes. Always update `LegacyRedirect.jsx` to map deprecated routes (e.g., `/destinations/:type/:category/:slug`) to the new canonical routes.

## Performance & Layout
- **Lazy Loading**: All routes except `Home` must be lazy-loaded using `React.lazy`.
- **CLS Prevention**: Any new sections added to the homepage (`src/pages/Home.jsx`) must be wrapped in `content-visibility:auto` wrappers with a reserved height matching the Suspense fallback to prevent Cumulative Layout Shift.
- **Images**: Be aware that some legacy CMS image URLs might be dead. Ensure `ImageWithFallback` is used to gracefully degrade missing images to branded placeholders.
