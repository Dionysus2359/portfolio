# Om Tiwari — Portfolio

A green and scarlet personal studio built with Next.js 16.4.2, TypeScript, CSS Modules and GSAP. A Scarlet seam loader prepares the architectural hero and live editorial type, followed by a cursor light reveal and small depth responses. Real project captures lead into independent case studies.

## Run locally

```sh
npm ci
npm run dev
```

The development preview runs at `http://127.0.0.1:3000`. For the production export:

```sh
npm run build
npm run preview
```

The export is in `out/`; its preview runs at `http://127.0.0.1:3001`. There is no server dependency or email credential requirement. The contact form prepares a draft for the visitor to review and send in Gmail or their email app.

## Checks

```sh
npm run typecheck
node --test --test-isolation=none --test-reporter=spec tests/*.test.mjs
node scripts/measure-bundles.mjs
```

Build before running the export checks. Artwork variants can be reproduced with `node scripts/prepare-assets.mjs`. The lossless sources and exact prompts are in `assets/source/green-studio/`.

`npm run typecheck` generates Next.js route/environment declarations before checking TypeScript, so it also works after a fresh checkout. Next.js manages `next-env.d.ts`; it stays on disk but is ignored by Git alongside `.next/` and `out/`.

## Repository branches

- `main`: the final portfolio, including the merged green redesign and refinements.
- `green-living-poster`: the preserved green redesign branch.
- `motion-and-project-media`: the preserved version before the green redesign.

## Content and implementation

- `src/content/profile.ts`: public identity, links and optional portrait.
- `src/lib/site-origin.ts`: validated canonical origin for metadata and static routes.
- `src/content/projects.ts`: roles, actual screenshots, case-study copy, evidence and optional event photography.
- `src/content/studio.ts`: hero copy, artwork variants and crop positions.
- `src/components/studio/`: server-rendered composition and small client motion island.
- `src/components/loading/`: Scarlet seam opening, first-view readiness and recovery.
- `src/components/motion/`: shared preferences, effects button and progressive section motion.
- `src/components/work/`: full-ratio media and case-study presentation.

The device's reduced-motion preference takes precedence over the saved `om-effects` choice. Storage failure keeps a session choice in memory. Animation setup reverts on navigation and preference changes. No WebGL, canvas renderer, scroll pinning or idle render loop is required.

## Publishing

On Vercel, leave `NEXT_PUBLIC_SITE_URL` empty to use its automatic `VERCEL_PROJECT_PRODUCTION_URL`, or set it to your preferred real origin, such as `https://your-real-domain.com`. Enter only the URL in the dashboard's Value field: no variable name, Markdown link or path. A missing, placeholder or invalid explicit value falls back to Vercel's production domain. An invalid value without that fallback fails the build with a useful error. The local default remains `http://localhost:3001`.

Canonical tags, social image URLs, structured data, robots and the sitemap are generated during the build. Changing an environment variable requires a new deployment. The earlier Sites identity in `.openai/hosting.json` is historical; this portfolio is now deployed by its owner on Vercel.

## Vercel monitoring

`@vercel/analytics` and `@vercel/speed-insights` mount once in the root layout only when `VERCEL_ENV=production`. Local and Vercel preview builds do not collect data. Both integrations redact page query strings and fragments, and no custom or contact-form events are sent. The privacy page describes the reports.

Enable Web Analytics in the Vercel project dashboard, then deploy the updated code and visit the production site. Speed Insights starts collecting after deployment with its package included. Use the basic tiers; no Plus upgrade is needed. Data collection still needs confirmation in the owner's dashboard after deployment. Current Hobby limits and the precise reports available are documented by [Vercel Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing) and [Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing).

See `docs/IMPLEMENTATION_STATUS.md`, `docs/ASSETS.md`, `docs/VALIDATION.md` and `docs/CREDITS.md` for completed work, verification and remaining owner inputs.
