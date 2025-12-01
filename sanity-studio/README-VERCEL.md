# Deploying Sanity Studio to Vercel - Studio-level Guide

This file explains how to deploy the `sanity-studio` directory itself on Vercel.

Quick summary:
- Use the `sanity-studio` folder as **root directory** on Vercel
- Set **Node Version** to 20.x
- Ensure required environment variables are added in Vercel's Project Settings (not committed)

## Local Testing
- Put environment variables in `sanity-studio/.env`
- DO NOT COMMIT `.env` to the repo; `.env` is in `.gitignore`
- Use `.env.example` to share keys with other developers (no secrets)

## Vercel Project Settings
Add the following environment variables in the Vercel UI:
- `SANITY_STUDIO_API_PROJECT_ID = xe1685rk`
- `SANITY_STUDIO_API_DATASET = production`
- `SANITY_STUDIO_API_VERSION = 2023-08-01`

Optional:
- `SANITY_STUDIO_API_TOKEN` (create a read-only or build-only token if needed)
- `SANITY_STUDIO_PREVIEW_SECRET` (for preview functionality)

## Build Command
Use:

```
npm run vercel-build
```

This runs `sanity build` and outputs the static build to `dist` (the output directory above).

## Important Notes
- Do not put secrets in `vercel.json`. Use Vercel Environment Variables instead.
- `sanity.config.js` reads environment variables from `process.env` – with `dotenv` loaded in development.
- For local development, `sanity dev` will also pick up `.env` variables if `dotenv` is installed.

## Troubleshooting
- If you get `No appId configured`, ignore; it's just a notice about auto-updates. 
- If the build fails due to Node mismatch, ensure Node 20.x is selected for the project.
- If a GraphQL or dataset error occurs, check your Vercel environment variables for typos.

---

If you'd like, I can add the necessary Vercel Project Settings or create a PR to update the repo with more examples or PR documentation for your team.