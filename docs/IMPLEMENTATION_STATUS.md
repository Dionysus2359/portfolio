# Implementation status

27 October 2026 — the approved green Living poster redesign is implemented locally on `codex/green-living-poster`.

## Complete

- Clean petrol-green architectural artwork and a separately composed portrait master, with locally compressed AVIF/WebP variants and recorded final prompts.
- Live scarlet Bodoni Moda headline, ivory supporting type, real navigation, CTA and three-project index. Static HTML remains useful without JavaScript or artwork.
- Fine-pointer light reveal through the scene and headline, bounded image parallax, short optional entrance, restrained hero exit and section/media motion in normal document flow.
- Shared motion provider: OS reduced-motion preference, persistent `om-effects` choice, cross-tab updates and in-memory fallback when storage is blocked. Effects control remains available in the footer across routes.
- Reliable repeated homepage section anchors and client navigation from inner routes.
- Complete identity across work, About, playground, contact, three case studies, privacy and custom 404; updated local fonts, OT favicon and social preview.
- Original ACM/Surge captures and additional events/map views, accurate roles, full image ratios and explicit Adobe diagram context.
- Portrait-ready About composition, typed photograph metadata/crops, and deliberate typography while photographs are pending.
- Keyboard-operable variable-font and evidence examples; contact draft preparation, review link, copyable text and direct email fallback.
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
