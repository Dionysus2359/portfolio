# Green studio artwork

Created for Om Tiwari's approved Living poster direction on 27 October 2026 using the **built-in ImageGen tool**. These are decorative environment renders, not photographs of a real project, event or client delivery.

| File | Native dimensions | Purpose |
| --- | --- | --- |
| `architecture-desktop.png` | 1672 × 941 | Text-free edit of `docs/design/green-studio-reference.png`; camera, architecture, materials, light and shadows preserved |
| `architecture-portrait.png` | 941 × 1672 | Tall recomposition of the clean desktop world, with clear copy space above the architecture |
| `prompts.json` | — | Complete final desktop and portrait prompts and generation method |
| `delivery.json` | — | Exact delivered dimensions and bytes for all eight variants |
| `social-card.html` | 1200 × 630 | Browser-rendered source for `public/social-preview.png`, using the actual local fonts and clean artwork |

The tool returned these dimensions rather than the larger requested targets. No variants are upscaled. Desktop delivery widths are 1280 and 1672; portrait widths are 600 and 941. Both have AVIF and WebP formats. Run `node scripts/prepare-assets.mjs` from the repository root to reproduce these files with Sharp 0.35.5. It preserves the existing project screenshots and cannot recreate the retired O.

The browser selects one base image through a responsive picture. The pointer-light overlay uses the **same selected URL** after it has loaded, with CSS grading and masking. It introduces no second artwork or independent geometry. Desktop focal position is 50% 50%; mobile is 20% 50%. Mobile text shading belongs to the page CSS, not the artwork.

The originals are lossless masters outside `public/`. Only compressed delivery assets reach the website. The full approved mockup is a design reference; no interface text is baked into either master.

To recreate the social preview, copy `social-card.html` temporarily into the local export, view it at 1200 × 630 with fonts loaded, capture that page, and convert the capture to `public/social-preview.png`. Remove the temporary route and rebuild. The current card was rendered in the local Chromium preview; its screenshot was exactly 1200 × 630.
