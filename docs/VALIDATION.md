# Verification record

27 October 2026. This record describes the green Living poster build in the available local environment. Earlier O/gallery screenshots are historical assets, not evidence for this version.

## Automated checks

- Next.js 16.4.2 production static export passes: homepage, ACM/Surge/Adobe case studies, contact, privacy, designed 404, icon, robots and sitemap.
- Strict TypeScript passes with `npm run typecheck`.
- All six focused Node checks pass with `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs`: email-draft encoding; project dimensions/content/independent routes; server-rendered identity/work/contact; native hero variants and dimensions; effective motion preference logic; honest contact/recovery pages.
- Canonical checks derive the origin from configuration. Local review uses `http://localhost:3001`; no production origin is selected.
- `git diff --check` passes.
- HTTP smoke checks returned 200 for home, all three case studies, contact, privacy and the AVIF; an unknown route returned the designed 404.
- The dependency change only removes Three.js, React Three Fiber and unused transitive packages. No framework migration or upgrade was included.

The build and local listening server used the required host process/network permission. The temporary no-script/image-failure and social-card test routes were removed by the final rebuild; neither ships in the export.

## Browser review

Codex in-app Chromium, against the production export on port 3001. The six-size sweep reported these actual CSS dimensions:

| Viewport | Content width | Horizontal scroll width | Hero height |
| --- | ---: | ---: | ---: |
| 360 × 800 | 345 | 345 | 833 |
| 390 × 844 | 375 | 375 | 849 |
| 768 × 1024 | 753 | 753 | 1024 |
| 1024 × 768 | 1009 | 1009 | 870 |
| 1440 × 900 | 1425 | 1425 | 900 |
| 1920 × 1080 | 1905 | 1905 | 1080 |

The browser reserves a scrollbar. Short screens deliberately allow the hero to expand rather than clip the controls. Headline glyph bounds remained within the content at every tested size. Early narrow headline/About overflow was corrected before this sweep. The final mobile shading refinement was rechecked at 390 × 844 with no overflow.

Performed checks:

- Compared the 1920 × 1080 and 1440 × 900 desktop compositions with the approved study: green metal/glass, red seam/reflections, live scarlet type, ivory copy and project index. The real Bodoni Moda glyphs are an interpretation of the generated lettering, not identical custom letterforms.
- Fine-pointer movement revealed an aligned brighter scene and ivory lettering; bounded parallax settled. Clicking the visible Work navigation scrolled normally, cleared the pointer light and drove the small hero exit. No pinned stage or empty gallery spacing remains.
- The desktop lighting layer uses the exact `currentSrc` of the base picture. Fresh desktop inventory contained one studio image (`desktop-1672.avif`) and two local font files. A fresh 390px load contained only `portrait-600.avif` and the same two fonts. Resizing can request a different responsive candidate, as expected.
- No canvas is mounted. There are no Three.js/R3F packages or old scene chunks in the build.
- Reduce effects restored all reveal items to opacity 1, removed media clipping and produced computed `scroll-behavior: auto`. The choice survived reload and keyboard navigation to Surge; Back preserved it. Enabling effects restored the full state and smooth anchor scrolling.
- A final repeat-click regression was fixed: homepage Work/About use native fragment anchors, while inner routes retain client navigation back to the homepage. Work scrolled to 838px on both the first and second click with `#work` already active. From Surge, Work returned to the same section and restored the homepage anchor form.
- Enter on the hero's Surge link opened the correct independent case study. Focusing the extra screenshot link completed its reveal; full-size capture links remain ordinary anchors.
- The typography slider responded to an arrow key (600 → 601). Selecting Business information updated the illustrative audit evidence and recommendation.
- Test-only name/email/message values produced the “Your draft is ready” state and correctly encoded `mailto:` content. No email app link was activated and no email was sent.
- ACM, Surge, Adobe, contact, privacy and 404 were opened at the 390px viewport: each had 375px content/scroll widths and a solid inner-page header. The supplied desktop captures retain their full ratios; extra events/map views remain available.
- A temporary copy of the exported HTML with all scripts removed and intentionally unavailable hero image URLs still showed the full green fallback, live headline, CTA and three case-study links without overflow. This was a controlled static-fallback check, not a network throttling benchmark.
- No application console warnings/errors appeared on the normal final production load. Intentionally missing artwork in the fallback fixture is excluded from that statement.

## Captured evidence

| Screenshot | Purpose |
| --- | --- |
| `screenshots/green-hero-1920.jpg` | 16:9 widescreen composition |
| `screenshots/green-hero-1440.jpg` | Desktop 1440 × 900 composition |
| `screenshots/green-cursor-light.jpg` | Live type/scene lighting reveal |
| `screenshots/green-hero-mobile-390.jpg` | Portrait artwork and final text shading |
| `screenshots/green-work-1440.jpg` | Ivory work introduction and first chapter in normal flow |
| `screenshots/green-about-mobile-390.jpg` | Deliberate About composition without a portrait |
| `screenshots/green-surge-mobile-390.jpg` | Independent case page and real full-ratio capture |

CSS viewport dimensions and capture buffers differ in this app. For example, the 1920 × 1080 view produced a 1905 × 1072 JPEG, and the 1440 × 900 view a 1425 × 891 JPEG. These captures were not upscaled to claim a larger render.

## Production asset accounting

`node scripts/measure-bundles.mjs` reports file bytes/gzip, not field timings:

| Category | KiB |
| --- | ---: |
| Initial home JavaScript, gzip | 183.6 |
| All emitted JavaScript chunks, gzip | 238.2 |
| Additional chunks/routes beyond initial home scripts | 54.6 |
| Home styles, gzip | 8.0 |
| Both referenced local WOFF2 fonts | 66.9 |
| Largest desktop AVIF | 66.6 |
| Selected mobile AVIF at DPR 1 | 34.9 |
| Estimated critical desktop assets | 325.2 |
| Estimated critical mobile assets | 293.5 |

The critical estimates sum initial home script tags, home CSS, both fonts and the selected artwork; HTML, lazy images and later route-prefetch traffic are separate. Browser inventory confirmed responsive scene selection and a shared lighting URL. Total public assets are 2,102,206 bytes, including the social PNG and project media; lossless masters remain outside the public root.

The previous revision emitted 478.5 KiB of JavaScript in total. Removing the 3D scene reduces that to 238.2 KiB while preserving the selected visual direction. No Lighthouse score, Core Web Vitals result or live-network performance claim is made.

## Limits and remaining checks

- Safari and physical-phone sessions were unavailable.
- Actual OS reduced-motion changes and blocked local storage were not exercised end to end. Their shared preference paths were reviewed; the pure preference helper and manual persistent control were tested.
- Browser zoom shortcuts had no effect in this preview, so an actual 200% zoom/text session is not claimed. Narrow responsive reflow was tested instead.
- No slow-network lab run, rendering frame-time benchmark, hidden-tab timing benchmark or field-performance session was completed. The hero's settling loop is bounded and stops offscreen/hidden or when effects are reduced by code design.
- Real email delivery remains intentionally unconfigured. The shipped contact flow prepares a draft.
- Real photography, exact Adobe award evidence and a publishing origin remain owner inputs. Their current fallbacks are complete; no hosting or remote source upload was performed.
