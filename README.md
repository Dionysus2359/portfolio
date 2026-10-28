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

- `green-living-poster`: the current portfolio and refinements.
- `motion-and-project-media`: the preserved version before the green redesign.
- `main`: the original repository baseline.

## Content and implementation

- `src/content/profile.ts`: public identity, links, configured origin and optional portrait.
- `src/content/projects.ts`: roles, actual screenshots, case-study copy, evidence and optional event photography.
- `src/content/studio.ts`: hero copy, artwork variants and crop positions.
- `src/components/studio/`: server-rendered composition and small client motion island.
- `src/components/loading/`: Scarlet seam opening, first-view readiness and recovery.
- `src/components/motion/`: shared preferences, effects button and progressive section motion.
- `src/components/work/`: full-ratio media and case-study presentation.

The device's reduced-motion preference takes precedence over the saved `om-effects` choice. Storage failure keeps a session choice in memory. Animation setup reverts on navigation and preference changes. No WebGL, canvas renderer, scroll pinning or idle render loop is required.

## Publishing

Choose the production domain and set `NEXT_PUBLIC_SITE_URL` before the publishing build. The review default is `http://localhost:3001`; it is deliberately not a chosen production origin. The earlier Sites identity in `.openai/hosting.json` is historical and does not represent a live deployment. Hosting deployment is configured separately from Git pushes.

See `docs/IMPLEMENTATION_STATUS.md`, `docs/ASSETS.md`, `docs/VALIDATION.md` and `docs/CREDITS.md` for completed work, verification and remaining owner inputs.
