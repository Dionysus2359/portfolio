# Implementation status

## New direction selected — 27 October 2026

Om selected the green/scarlet Living poster study to replace the O and its gallery sequence. The implementation plan is in [GREEN_STUDIO_IMPLEMENTATION_PLAN.md](GREEN_STUDIO_IMPLEMENTATION_PLAN.md), with its approved visual reference in `design/green-studio-reference.png`.

This stage produced planning documents and preserved the reference image. The clean background assets, new typography and application redesign have not yet been implemented. The built features and delivery state below describe the existing version.

20 October 2026 — baseline checkpoint pushed; motion and supplied-media revision ready for local review.

## Built

- Next.js App Router, strict TypeScript, CSS Modules and local fonts, with a reproducible npm lockfile.
- Cinematic charcoal/ivory/vermilion hero and original folded open O sculpture.
- Lazy React Three Fiber stage, spatial project planes and native-scroll GSAP progress.
- ACM plane projection into the matching DOM image during the handoff. Both layers share the supplied image's full aspect ratio.
- HTML gallery anchors aligned with projected bounds; ordinary project cards in the fallback layout.
- Three project chapters and independent ACM, Surge and Adobe case-study routes.
- Om's supplied ACM/Surge homepage screenshots, additional events/campus-guide views, earlier real mobile captures and a clearly labelled Adobe architecture diagram.
- Staggered opening type, section reveals, image wipes and restrained desktop media drift; scroll-linked About mark, magnetic arrows and hover underlines.
- About and approach, completed without a portrait placeholder; typed editorial-photo support and separate desktop/mobile crop positions.
- Two keyboard-operable local experiments: variable type and evidence-to-recommendation examples.
- Contact draft preparation, email-app link, copyable draft and direct-email fallback. No delivery credentials required and no false sent state.
- Privacy, custom 404, per-route metadata/canonicals, Person/WebSite data, social card, robots and sitemap.
- Desktop, mobile, reduced-effects and failed-WebGL paths, persistent effects preference, context-loss handling and scene resource cleanup.
- Idle sculpture/gallery movement is capped at 30 fps while visible; pointer/scroll changes settle on demand, and rendering stops when inactive/offscreen. No Lenis or wheel interception.

## Architecture choices

Static export keeps the chosen Next.js framework and makes the site deployable without a server or email secrets. Images are precompressed locally, with correct dimensions and responsive layout; `next/image` uses static files because a runtime image optimizer is unavailable on static hosting. There are no videos to autoplay or pause yet.

The full 3D bundle is isolated from route content. No external geometry, physics, postprocessing or environment images are required. A native-scroll sticky stage is activated only after successful client capability checks. Mobile uses a separate normal-flow composition rather than a scaled desktop scene.

## Pending owner inputs / later refinements

1. Approved portrait and two or three Adobe event photos, with contextual captions/credits.
2. Exact Adobe hackathon title, award evidence and precise individual responsibility wording. The draft preserves the supplied team-first-prize claim with its source/verification context; it does not claim Adobe employment or endorsement.
3. Real interaction recordings after ACM/Surge revisions. The four supplied screenshots are now integrated.
4. Separate dated archives of delivered ACM/Surge versions. No archive is claimed to exist.
5. Optional actual email-delivery integration if a server-side send flow is desired later.
6. Real-phone/Safari and field-performance checks remain separate from desktop browser emulation.

See `VALIDATION.md` for checks actually performed and their limits. This is reviewable implementation, not a claim that pending evidence/assets are final.

## Delivery state

The original version was committed and pushed to `origin/main` before this revision, as requested: `c5ae0b8f335177728f9dc6e1a2a78d87b87874e3` in `Dionysus2359/portfolio`. The current changes are local on `codex/motion-and-project-media`.

The production export is available in `out/`, with a preview through `npm run preview` (port 3001). No hosting deployment has run. The earlier private Sites identity remains in `.openai/hosting.json`; its URL is not a verified live deployment. Set `NEXT_PUBLIC_SITE_URL` to the chosen deployment origin before publishing.
