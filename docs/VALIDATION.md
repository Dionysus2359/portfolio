# Verification record

20 October 2026. Results describe the available environment, not all real devices.

## Automated checks

- Strict TypeScript check passes (`npm run typecheck`).
- Next.js production static export passes, generating home, all three case studies, contact, privacy, designed 404, robots and sitemap.
- Four focused Node tests pass: encoded email-draft content; local project media/dimensions and exported case-study HTML (including additional screenshots); identity/work/email in HTML without executing JavaScript; contact honesty and recovery routes. On the current Node 26 runtime, `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs` reports each test individually.
- Dependency audit after updating Sharp to 0.35.5: zero known vulnerabilities.
- `git diff --check` passes.

The initial sandboxed build could not parse its compiler subprocess output. The same production build succeeded with the required process permissions; type checks remain enabled. Local server startup also required network/listening permissions.

## Browser checks performed

Codex in-app Chromium browser, CSS viewport widths 360, 390, 768, 1024 and 1440. Final 1440px hero/gallery screenshots were taken against the production export on port 3001, without development overlays.

- Hero sculpture and three spatial planes rendered in WebGL on desktop.
- Scrolling revealed the gallery and moved the lead ACM plane into the DOM showcase.
- Project anchors were aligned with the visible planes and ordinary fallback cards.
- Reduce effects removed stage spacing and restored normal content. A discovered stale-visibility bug was fixed and rechecked: hero opacity 1, hero visibility visible, project links visible.
- Re-enabling effects reinitialised the enhancement; a reduced-effects choice persisted through reload.
- Narrow layouts did not initialise the scene and used the static poster/cards. The mobile poster placement and 360px About navigation were corrected after inspection.
- No horizontal overflow was measured at 360, 390, 768, 1024 and 1440 CSS widths. The browser reserves a scrollbar, so measured content widths were 345, 375, 753, 1009 and 1425 respectively.
- Contact fields were filled with test-only example information. “Prepare email draft” produced an encoded `mailto:` draft and showed explicit review/send instructions. No email was sent.
- Typography slider accepted an arrow key (500 → 501); changing the audit example updated evidence, finding and recommendation.
- ACM case-study navigation and refresh showed its independent page with no canvas. Browser Back returned to the prior home URL.
- Keyboard Enter on the production spatial gallery's Surge link opened `/work/surge/`, with its correct title and no canvas.
- HTTP smoke checks on the exact production export: home, ACM, Surge, Adobe, contact and privacy returned 200; an unknown project returned 404 with the designed recovery page.
- The final clean mobile-export screenshot used an observed 355px viewport (the browser's viewport override settled below the requested 390px); it also showed no horizontal overflow. It is named `screenshots/mobile-355.jpg`. The earlier 390px check was separately verified at exactly 390px in development.

## Motion and supplied-media revision

The baseline was committed and pushed before edits as `c5ae0b8`. The new revision was checked against the production export at observed 1309 × 909 desktop and 355 × 767 mobile viewports (the browser scaled the requested overrides).

- WebGL rendered the replacement ACM/Surge screenshots at their own aspect ratios; projected gallery links followed the panels. Scrolling preserved the ACM-to-DOM handoff.
- The section copy revealed on scroll, the About mark rotated, and desktop media drift was attached. Mobile omitted desktop drift and WebGL while retaining the normal-flow layout and full screenshot proportions.
- Reduce effects removed the canvas and enhancement, restored all reveal items to opacity 1, removed media clipping, and kept the page free of horizontal overflow. The preference survived reload; enabling effects restored the scene.
- The final preference check also confirmed CSS transitions are suppressed and computed scroll behavior is `auto`, including after GSAP restores its cached inline scroll style.
- The ACM events and Surge campus-guide views loaded and revealed in their case studies. Each offers a full-size image link, captions and source context.
- Both case-study layouts retained the full homepage screenshot ratio at the observed 355px mobile width, without overflow.
- Keyboard Tab onto the Surge media link immediately completed its image reveal (opacity 1, no clipping); Enter opened the correct case study. No application console errors were recorded.
- Screenshots: `screenshots/motion-gallery.jpg`, `screenshots/motion-home-mobile-355.jpg`, `screenshots/motion-surge-mobile-355.jpg`.

## Performance accounting

Run `node scripts/measure-bundles.mjs` after a production build. It reports gzip sizes, not actual network timings: initial home script tags, all emitted JavaScript chunks, additional chunks (including 3D/GSAP and other routes), locally hosted fonts and the compressed SVG poster. This deliberately includes the lazy scene cost rather than reporting only the initial route.

No Core Web Vitals field results or Lighthouse scores are claimed. No video/model/HDR downloads are needed. Public assets total about 0.66 MiB before hosting compression, including the four supplied screenshots.

Final build accounting (gzip, KiB):

| Asset category | Size |
| --- | ---: |
| Initial home JavaScript | 185.4 |
| All JavaScript chunks, including lazy code and other routes | 478.5 |
| Additional chunks beyond initial home scripts | 293.0 |
| Two font files (original WOFF2 bytes) | 43.4 |
| Hero vector poster (gzip) | 17.7 |

Initial route and deferred-code figures are below the plan's starting 250 KiB / 600 KiB budgets. These file sizes are not field-performance measurements.

## Verification limits

- No physical-phone or Safari session was available.
- Operating-system reduced-motion changes, forced GPU context loss, a genuinely unsupported GPU and blocked local storage were not exercised end to end. Their code paths were reviewed; manual reduced effects and narrow-layout fallbacks were exercised.
- No slow-network lab run or measured frame-time benchmark has been completed. Rendering uses modest geometry, a capped pixel ratio, idle ambient motion capped at 30 fps, and demand-driven settling, with visibility/intersection controls.
- The available Three.js/R3F combination logs a Clock deprecation warning in development. No application console error was observed during the checked hero/gallery/contact interactions.
- Real email delivery is intentionally unconfigured and untested. This build provides draft preparation and direct email, not a server transport.
- Photography, exact award wording/evidence, interaction recordings and dated archives remain listed in `ASSETS.md` and `IMPLEMENTATION_STATUS.md`.
