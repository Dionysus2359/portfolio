# Implementation status

20 October 2026 — working first implementation for private review.

## Built

- Next.js App Router, strict TypeScript, CSS Modules and local fonts, with a reproducible npm lockfile.
- Cinematic charcoal/ivory/vermilion hero and original folded open O sculpture.
- Lazy React Three Fiber stage, spatial project planes and native-scroll GSAP progress.
- ACM plane projection into the matching DOM image during the handoff. Same image and 16:10 crop in each layer.
- HTML gallery anchors aligned with projected bounds; ordinary project cards in the fallback layout.
- Three project chapters and independent ACM, Surge and Adobe case-study routes.
- Real desktop/mobile ACM and Surge captures, plus a clearly labelled Adobe architecture diagram.
- About and approach, completed without a portrait placeholder; typed editorial-photo support and separate desktop/mobile crop positions.
- Two keyboard-operable local experiments: variable type and evidence-to-recommendation examples.
- Contact draft preparation, email-app link, copyable draft and direct-email fallback. No delivery credentials required and no false sent state.
- Privacy, custom 404, per-route metadata/canonicals, Person/WebSite data, social card, robots and sitemap.
- Desktop, mobile, reduced-effects and failed-WebGL paths, persistent effects preference, context-loss handling and scene resource cleanup.
- Rendering stops when inactive/offscreen and settles on demand while pointer/scroll changes animate. No Lenis or wheel interception.

## Architecture choices

Static export keeps the chosen Next.js framework and makes the site deployable without a server or email secrets. Images are precompressed locally, with correct dimensions and responsive layout; `next/image` uses static files because a runtime image optimizer is unavailable on static hosting. There are no videos to autoplay or pause yet.

The full 3D bundle is isolated from route content. No external geometry, physics, postprocessing or environment images are required. A native-scroll sticky stage is activated only after successful client capability checks. Mobile uses a separate normal-flow composition rather than a scaled desktop scene.

## Pending owner inputs / later refinements

1. Approved portrait and two or three Adobe event photos, with contextual captions/credits.
2. Exact Adobe hackathon title, award evidence and precise individual responsibility wording. The draft preserves the supplied team-first-prize claim with its source/verification context; it does not claim Adobe employment or endorsement.
3. Final selection of project captures and real interaction recordings after ACM/Surge revisions.
4. Separate dated archives of delivered ACM/Surge versions. No archive is claimed to exist.
5. Optional actual email-delivery integration if a server-side send flow is desired later.
6. Real-phone/Safari and field-performance checks remain separate from desktop browser emulation.

See `VALIDATION.md` for checks actually performed and their limits. This is reviewable implementation, not a claim that pending evidence/assets are final.

## Delivery state

The production export is available locally in `out/`, with a preview through `npm run preview` (port 3001). A private Sites identity is retained in `.openai/hosting.json`, but source synchronization and deployment have not run. Automatic approval review rejected the remote-source workflow because exporting the code, public contact details and project captures to that private destination requires explicit user approval. The proposed review origin is `https://om-tiwari-studio.open-cloud-8145.chatgpt.site`; it is not a verified live deployment yet.
