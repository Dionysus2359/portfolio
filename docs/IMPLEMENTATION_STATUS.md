# Implementation status

29 October 2026 — the green Living poster and Scarlet seam refinements are merged into `main`. The owner deployed the portfolio on Vercel. This follow-up adds Vercel monitoring, canonical-origin recovery and fixes identified in the supplied Lighthouse report. Automated and read-only HTTP verification are recorded below; live browser review remains unavailable under the existing tool restriction.

## Complete

- Clean petrol-green architectural artwork and a separately composed portrait master, with locally compressed AVIF/WebP variants and recorded final prompts.
- Live scarlet Bodoni Moda headline, ivory supporting type, real navigation, CTA and three-project index. Static HTML remains useful without JavaScript or artwork.
- Fine-pointer light reveal through the scene and headline, bounded image parallax, short optional entrance, restrained hero exit and section/media motion in normal document flow.
- Scarlet seam opening, real first-view image/font readiness, minimum hold, skip/deadline recovery and coordinated original hero entrance. Internal navigation avoids replaying the full opening.
- Whole-section contact pull with existing ivory color feedback, slightly larger header/project labels and the selected Work/About/case-study/form motion refinements. The approved hero typography, artwork, CTA and colors remain unchanged.
- Portrait-tablet adaptation: a two-line headline, content-led hero height, controlled project-index spacing and a fading green header backdrop. This later tablet-specific layout adjustment preserves the existing phone/laptop compositions, type treatments, artwork and animations.
- Shared motion provider: OS reduced-motion preference, persistent `om-effects` choice, cross-tab updates and in-memory fallback when storage is blocked. Effects control remains available in the footer across routes.
- Reliable repeated homepage section anchors and client navigation from inner routes.
- Complete identity across work, About, playground, contact, three case studies, privacy and custom 404; updated local fonts, OT favicon and social preview.
- Original ACM/Surge captures and additional events/map views, accurate roles, full image ratios and explicit Adobe diagram context.
- Portrait-ready About composition, typed photograph metadata/crops, and deliberate typography while photographs are pending.
- Keyboard-operable variable-font and evidence examples; contact draft preparation with visible recipient/subject, Gmail and email-app links, matching copyable text and a direct email fallback.
- Retired the O, long pinned gallery/handoff, hiding rules, scene assets and all Three.js/R3F dependencies. No WebGL or perpetual renderer is needed.
- Asset/bundle scripts, focused tests, source notes, screenshots and validation record updated.
- Vercel Web Analytics and Speed Insights integration for production builds only, with page URL query/fragment redaction and an updated privacy page. Dashboard activation and post-deployment collection still need owner-side verification.
- Validated canonical origin with automatic Vercel production-domain fallback, shared by metadata, structured data, robots and the sitemap. Invalid non-Vercel configuration fails clearly.
- Empty GSAP arrival targets are skipped. Media reveal opacity affects only images, preserving caption contrast. Screenshot links include their visible captions in their accessible names.

## Delivery

The motion/media version and approved plan are preserved at checkpoint `2ce1fb9` on `motion-and-project-media`. `green-living-poster` preserves the final redesign at `a288345`, which was fast-forwarded into `main` and pushed. The monitoring/report fixes and browser/share title without an em dash are prepared for redeployment from `main` after the final passing production checks.

The static export is generated in `out/`; `npm run preview` serves it on port 3001. No preview server was started for this follow-up. The old Sites configuration is historical. The owner-deployed Vercel URL is `https://portfolio-murex-omega-accqha17em.vercel.app/`. Read-only HTTP checks confirmed the existing live build still has placeholder canonical/social/sitemap URLs; the local fix uses `VERCEL_PROJECT_PRODUCTION_URL` when the explicit setting is missing or invalid. An explicit real `NEXT_PUBLIC_SITE_URL` takes precedence. Environment changes require a new deployment.

Generated Next.js declarations are excluded from version control. The typecheck command regenerates them, so switching between dev and production builds no longer creates a tracked `next-env.d.ts` diff.

## Remaining owner inputs and environment limits

- Approved portrait and Adobe event photographs with captions/credits.
- Exact hackathon name/award evidence and precise individual contribution. The existing user-reported team result retains its verification context; no Adobe employment/endorsement is implied.
- Optional interaction recordings, historical project archives or real email delivery remain separate additions.
- Physical-device/Safari, OS preference changes, blocked-storage end-to-end checks, field performance and an actual 200% browser zoom session were not available in this browser environment. See `VALIDATION.md` for performed checks and limits.

The original plan and selected visual are preserved in `GREEN_STUDIO_IMPLEMENTATION_PLAN.md` and `design/`. The implementation uses image-led depth rather than a freely orbiting 3D reconstruction.

The latest refinement behavior and its verification limits are recorded in [REFINEMENTS_2026-10-28.md](REFINEMENTS_2026-10-28.md).
