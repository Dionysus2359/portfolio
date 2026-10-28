# Implementation status

28 October 2026 — the approved green Living poster redesign and selected Scarlet seam refinements are implemented locally on `codex/green-living-poster`. The refinement pass has automated and HTTP verification; live visual review of this revision remains pending because the browser tool rejected the local preview URL.

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

## Delivery

The existing motion/media version and approved plan were saved as local checkpoint `2ce1fb9` on `codex/motion-and-project-media` before the redesign. The older baseline `c5ae0b8` remains on `origin/main`.

The static export is generated in `out/`; `npm run preview` serves it on port 3001. Local preview servers are stopped at handover. No hosting deployment or source upload has run. The old Sites configuration is historical, and the review default origin is `http://localhost:3001`. Set `NEXT_PUBLIC_SITE_URL` to the chosen domain before a publishing build.

## Remaining owner inputs and environment limits

- Approved portrait and Adobe event photographs with captions/credits.
- Exact hackathon name/award evidence and precise individual contribution. The existing user-reported team result retains its verification context; no Adobe employment/endorsement is implied.
- Optional interaction recordings, historical project archives or real email delivery remain separate additions.
- Physical-device/Safari, OS preference changes, blocked-storage end-to-end checks, field performance and an actual 200% browser zoom session were not available in this browser environment. See `VALIDATION.md` for performed checks and limits.

The original plan and selected visual are preserved in `GREEN_STUDIO_IMPLEMENTATION_PLAN.md` and `design/`. The implementation uses image-led depth rather than a freely orbiting 3D reconstruction.

The latest refinement behavior and its verification limits are recorded in [REFINEMENTS_2026-10-28.md](REFINEMENTS_2026-10-28.md).
