---
name: tg-sanity-data
description: Enforces the Sanity CMS data flow architecture and query conventions for Traverse Globe.
---
# Traverse Globe Sanity Data Flow

## Data Fetching Architecture
- **No Direct Fetching**: Never import or call `@sanity/client` directly inside React components.
- **Single Source of Truth**: All GROQ queries must be defined in `src/services/sanityClient.js`.
- **React Query**: Components must consume data strictly via React Query hooks defined in `src/hooks/queries.js`.
- **Projections**: Use the pre-defined `PACKAGE_CARD` and `HOTEL_CARD` projections for list views instead of fetching full documents.

## Critical Constraints
- **Document IDs**: Sanity document `_id`s must **never** contain dots (e.g., use `blogPost-my-slug`, not `blogPost.my-slug`). Multi-segment IDs fail public read permissions (`path("*")`) and will be invisible to the tokenless browser client.
- **CORS**: Remember that Sanity CORS is per-origin. If testing a production build locally via `vite preview` (port 4173), you must run `npm run sanity:cors:add` to whitelist it.
