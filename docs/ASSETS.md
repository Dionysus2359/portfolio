# Asset register

Updated 27 October 2026. All website media is served locally. Source project repositories remain untouched.

## Studio artwork and fonts

| File | Dimensions | Provenance / state |
| --- | --- | --- |
| `docs/design/green-studio-reference.png` | 1672 × 941 | Approved generated green study; reference only |
| `assets/source/green-studio/architecture-desktop.png` | 1672 × 941 | Clean built-in ImageGen edit, all typography/UI removed |
| `assets/source/green-studio/architecture-portrait.png` | 941 × 1672 | Built-in ImageGen portrait recomposition of the same world |
| `public/media/studio/desktop-1280.avif` / `.webp` | 1280 × 720 | 46,357 / 57,662 bytes |
| `public/media/studio/desktop-1672.avif` / `.webp` | 1672 × 941 | 68,224 / 85,314 bytes |
| `public/media/studio/portrait-600.avif` / `.webp` | 600 × 1066 | 35,780 / 44,754 bytes |
| `public/media/studio/portrait-941.avif` / `.webp` | 941 × 1672 | 69,415 / 87,544 bytes |
| `public/fonts/bodoni-moda-latin.woff2` | — | Upright Bodoni Moda variable Latin; 46,260 bytes; OFL retained |
| `public/fonts/space-grotesk-latin.woff2` | — | Existing Space Grotesk variable Latin; OFL retained |
| `public/social-preview.png` | 1200 × 630 | Browser-rendered scene and actual typefaces; source HTML retained |
| `src/app/icon.svg` | 64 × 64 | Original OT monogram in the chosen palette |

Complete final prompts and production notes: `assets/source/green-studio/prompts.json` and `README.md`. Delivery dimensions/bytes are machine-readable in `delivery.json`. Generation returned smaller native dimensions than the requested targets; no upscale is presented as additional detail.

Responsive picture sources select a single composition and size. Cursor lighting reuses that selected file with an aligned CSS grade. The mobile crop is 20% 50%; desktop is 50% 50%. The real text and links remain separate from the artwork.

## Project media

| Path | Purpose / provenance | State |
| --- | --- | --- |
| `public/media/projects/acm/desktop.webp` | Homepage supplied by Om on 20 October 2026 | 1600 × 904, complete composition |
| `public/media/projects/acm/events.webp` | Featured-events capture supplied by Om | 1600 × 900, full-size image link in case study |
| `public/media/projects/acm/mobile.webp` | Earlier real live-site capture | 390 × 844 |
| `public/media/projects/surge/desktop.webp` | Homepage supplied by Om | 1600 × 900, complete composition |
| `public/media/projects/surge/campus-map.webp` | Campus guide supplied by Om | 1600 × 899, full-size image link in case study |
| `public/media/projects/surge/mobile.webp` | Earlier real live-site capture | 390 × 844 |
| `public/media/projects/adobe/workflow.svg` | Original diagram derived from the audit README | 1440 × 900, green palette, explicitly explanatory |

The four supplied captures retain their full aspect ratios and colours. They were resized to 1600px width and encoded as WebP at quality 90 in the earlier revision. The earlier mobile screenshot buffers were normalised to 390 × 844. No project image is a reconstructed website mockup. `prepare-assets.mjs` now handles only studio delivery variants and the existing code-native diagram; it never crops or replaces these captures.

The O, gallery renderer, ribbon asset and Instrument Serif italic font were removed. The earlier version remains recoverable at Git checkpoint `2ce1fb9`.

## Pending owner inputs

- Real editorial portrait for About; two or three Adobe presentation/team/award photos with accurate captions and supplied photographer credits.
- Exact Adobe event/award evidence and individual-contribution wording.
- Real interaction clips after project revisions, and separately hosted historical archives if desired.

`profile.portrait` remains `null` and Adobe's typed `photographs` array is empty. About uses a deliberate typographic composition while waiting. No synthetic personal/event photography or invented archive URL is included.

## Add photography

1. Save approved photographs below `public/media/people/` or `public/media/projects/adobe/`.
2. Add a typed record in `src/content/profile.ts` or the Adobe project's `photographs` array.
3. Include actual dimensions, meaningful alternative text, accurate optional caption/credit and desktop/mobile crop positions, for example `"50% 35%"`.
4. The About portrait automatically takes over the asymmetrical editorial panel with a 4:5 crop and restrained scarlet rule. The hero remains focused on the selected architectural poster; an optional future portrait treatment should be judged with the actual supplied photo.
