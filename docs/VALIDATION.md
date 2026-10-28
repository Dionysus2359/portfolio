# Verification record

Latest revision: 28 October 2026, portrait-tablet composition adjustment. See the dated entry at the end. The preceding Scarlet seam work is recorded in [REFINEMENTS_2026-10-28.md](REFINEMENTS_2026-10-28.md). Browser screenshots/measurements below belong to earlier revisions.

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

## 28 October 2026 refinements

- Kept the same Bodoni Moda font and weights, with a shared optical size of 16 and automatic optical sizing disabled. This restores fine stems and crossbars in the hero, supporting copy, section titles, playground and case studies. Hero copy uses font longhands so production CSS optimization cannot reset its optical settings through a shorthand.
- Removed the decorative browser bar from shared project media, including its unused styles. Supplied screenshot pixels, aspect ratios, captions and green framing remain intact.
- Retained the palette, layout dimensions, cursor reveal, parallax and motion controls. The social preview was rendered again at 1200 × 630 using the same typography setting; the temporary rendering page was removed.
- Production export and TypeScript pass. All six existing focused checks and `git diff --check` pass.
- Reviewed the production export in Codex in-app Chromium at widths 360, 390, 768, 1024, 1440 and 1920: no horizontal overflow or clipped headline. At 390px, ACM, Surge, Adobe, contact, privacy and the designed 404 all had matching content/scroll widths of 375px.
- Computed styles confirmed `font-optical-sizing: none` and `"opsz" 16` for both cursor-reveal headline layers, supporting copy and serif headings on inner pages. The playground slider still changed weight from 600 to 601. The Reduce effects control still switched to reduced motion and automatic scrolling; Enable effects restored full motion.
- Confirmed project figures begin directly with the screenshot, with no browser strip on the homepage or case studies. Updated evidence: `screenshots/refined-type-hero-desktop.jpg`, `screenshots/refined-type-hero-mobile.jpg`, `screenshots/refined-type-work-desktop.jpg` and `screenshots/refined-acm-media-desktop.jpg`.

The browser/device limits above still apply. No dependency, font-file, scene-artwork, hosting or remote-source changes were made in this refinement. The asset byte counts above describe the original build; the updated social PNG is 1,080,113 bytes.

## 28 October 2026 contact and headline follow-up

- Draft preparation now produces a single recipient, subject and body shared by the visible preview, clipboard text, email-app link and Gmail link. To and Subject remain visible with the full-text disclosure closed. Editing a form field invalidates the prepared draft; preparing it again resets the copy state.
- Added an explicit Gmail browser action using Google's documented [mailto handler](https://developer.chrome.com/blog/getting-gmail-to-handle-all-mailto-links-with-registerprotocolhandler/), alongside the configured email-app option and full-text copy fallback. The email-app action explains what to do if no handler opens; clipboard failure exposes selectable text. The privacy page describes the Gmail handoff.
- A synthetic enquiry opened a Gmail composer with the expected recipient, subject and body, including ampersands, the rupee symbol and line breaks. Clipboard content matched the displayed full draft, including Subject. The temporary Gmail tabs were closed; no email was sent. OS mail-app configuration was not changed.
- Kept the readable Bodoni optical size of 16. Disabled kerning and removed negative tracking in both hero headline layers so neighbouring serifs no longer join into a baseline. Adjusted horizontal compression to preserve the composition's footprint, including the narrow-screen variant. The artwork, palette and motion code are unchanged.
- The homepage had matching content/scroll widths at 360, 390, 768, 1024, 1440 and 1920 viewports. The two cursor-reveal layers had matching spacing, kerning and transforms, and the pointer still activated the light. The draft card also reflowed without horizontal overflow at a 341px content width.
- The production export, TypeScript and all six focused checks pass. The email check now also verifies that preview/copy fields and the nested Gmail URL match the encoded email-app link. `git diff --check` passes.
- Evidence: `screenshots/headline-spacing-desktop.jpg`, `screenshots/headline-spacing-mobile.jpg` and `screenshots/contact-draft-subject-desktop.jpg`. The sharing card retains the existing clean render; its asset accounting above is unchanged.

## 28 October 2026 Scarlet seam and motion refinements

- Implemented the selected opening, actual responsive-image/font readiness, minimum/deadline/skip behavior, coordinated existing hero entrance, whole-section contact interaction, requested label-size increases and listed section/page motion refinements. Full behavior is recorded in [REFINEMENTS_2026-10-28.md](REFINEMENTS_2026-10-28.md).
- The Next.js production export, strict TypeScript and all 16 Node checks pass. Run the suite with `node --test --test-isolation=none --test-reporter=spec tests/*.test.mjs` in this restricted environment. Ten new checks cover minimum/deadline policy, one-shot exit, controller failure recovery, pre-hydration skip/focus, restoration/hidden exits, reduced effects/storage failure/late bootstrap, image load/decode/error/cancellation/responsive replacement and bounded contact offsets. These are deterministic event/DOM doubles, not live browser measurements.
- Source comparisons against `3530cc3` confirm unchanged hero markup/content and unchanged headline, introduction, CTA and scene CSS; only the requested project-label font rules differ in hero CSS. Contact draft helper/form logic and configured content are unchanged. Header wordmark sizing is scoped so the footer wordmark retains its original sizes.
- Read-only HTTP checks on the local production preview returned 200 for home, all three case studies, contact, privacy, robots and sitemap; an unknown URL returned the designed 404. Fifteen referenced script/style/font/artwork responses were present and nonempty. The exported bootstrap precedes the loading surface and content, and the contact detector is on the whole section.
- Build accounting: initial route scripts 186.5 KiB gzip; home styles 9.2 KiB gzip; both fonts 66.9 KiB; desktop/mobile hero AVIF 66.6/34.9 KiB. These are file accounting results, not network or performance measurements. There are no new dependencies, font files or image assets.
- `git diff --check` passes. The pre-existing development imports in `next-env.d.ts` were restored after the build and excluded from the implementation checkpoint.

Live visual review of this revision is pending. The browser tool rejected `http://127.0.0.1:3001/` under its URL policy; no workaround or alternative browser-control surface was used. No new screenshot, actual cursor/keyboard session, viewport sweep, network/cache throttling, browser-history session or performance score is claimed. Earlier screenshots and browser results above are historical and do not verify the new opening or interactions.

## 28 October 2026 portrait-tablet follow-up

- Added a portrait-only breakpoint from 768–1199 CSS px, including the supplied 1032 × 1376 iPad view. The existing phone, landscape and desktop rules are unchanged.
- The homepage header receives a dark-green gradient fading to transparent, using the existing palette to improve link contrast over the bright metal. Solid inner-page headers are unaffected.
- The tablet headline uses two lines with its existing font size, weight, optical size, spacing and color. This is the approved tablet-specific exception to the earlier fixed hero composition; phone and laptop headline layouts remain unchanged.
- The portrait-tablet hero follows its content, with 144–180 px of top clearance and an 80–112 px gap above the project index, rather than pushing the index to the bottom of a full-height viewport. Artwork files, focal-point configuration, CTA, supporting copy and all animation code are unchanged.
- The production export, strict TypeScript, all 16 existing checks and `git diff --check` pass. A source comparison confirms that both CSS files match their previous versions when the added portrait-tablet media blocks are removed. A breakpoint predicate check covers common portrait tablets and excludes phone and landscape/laptop examples; it is not a rendered viewport test.
- Live visual verification remains pending under the existing browser URL-policy restriction. No new screenshot or physical iPad/Safari result is claimed. The pre-existing generated development imports in `next-env.d.ts` were preserved outside the checkpoint.
