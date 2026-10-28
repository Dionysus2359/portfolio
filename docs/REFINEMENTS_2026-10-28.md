# Scarlet seam and interaction refinements

Implemented locally on 28 October 2026, against `3530cc3` on `codex/green-living-poster`. This follows the selected refinement plan in `plans_docs/Portfolio_Refinements_Implementation_Plan_2026-10-28.md`. No hosting publication or remote source upload is part of this pass.

## Opening

- The selected Scarlet seam design uses the existing deep green, ivory and scarlet, live Bodoni type and two CSS curtains. It adds no imagery, font files or motion dependencies.
- The document's early inline bootstrap enables the opening before paint. If it runs after paint, it leaves the visible page alone. Without JavaScript, the loader stays hidden and the server-rendered page remains available.
- A full document visit/refresh holds for at least 1,100 ms and exits over 500 ms when resources settle early. The browser controller starts recovery by 4,500 ms; an independent 6,000 ms bootstrap fail-safe also removes coverage, scroll restrictions and inert state if hydration/controller startup fails.
- Readiness observes the actual responsive image's `currentSrc`, load and decode. It rechecks resized candidates and changes to the critical view after fonts settle. It never creates another `Image` or desktop-only preload. It requests the existing Bodoni Moda and Space Grotesk faces explicitly.
- Direct project entries wait for the first poster when it intersects the first view. Hash entries use their target's first view. Other routes do not wait for unrelated homepage artwork or below-fold media.
- Enter site and Escape bypass the decorative hold, including before hydration. Reduced effects remove that hold and curtain movement. History cache restoration preserves the page. In-site navigation uses brief content arrivals without another full opening.
- The original hero entrance is prepared under the cover and starts on the shared ready event. Its transforms, easing, timings and visual treatment are retained. Hash/restored, late, skipped and already-used views remain settled.

## Contact and section motion

- The entire closing contact section detects fine pointers, including padding, labels, whitespace and supporting copy. It has no activation area in the preceding section or footer.
- The heading follows by at most 14 px horizontally and 7 px vertically; the arrow's total displacement is capped at 21 px. The original link and section bounds do not move. Pointer activity and keyboard focus change the heading to existing ivory; the green backdrop stays unchanged.
- Tracking settles on leave and clears on blur, hidden/offscreen state, resize, motion preference changes and unmount. Touch and narrow screens retain a static title. There is no continuously running idle frame loop.
- Work heading lines reveal through masks; project frames receive a small edge/lift response without scaling the screenshots. About's seam and words reveal once, and the approach steps have their own stagger.
- Audit examples share a stable grid footprint and transition between their original content. The range input, selected control and keyboard behavior remain unchanged.
- Case-study arrivals, grouped decisions/evidence and dividers, next-project links, contact focus/draft feedback and quiet recovery-page arrivals use the existing motion controller. Nested reveal groups have one animation owner.

## Protected design

The following match `3530cc3`: `StudioHero.tsx`, `studio.ts`, `profile.ts`, the contact draft helper and `ContactForm.tsx`. Hero CSS differs only in the requested bottom project-name/number font sizes. The red headline, ivory introduction, Explore my work button, artwork, crop, pointer light, parallax, colors and layout were not redesigned.

Header-only wordmark/navigation sizes are slightly larger, with narrow-screen spacing adjustments. The footer wordmark keeps its original sizes.

## Verification and remaining review

The production export and strict TypeScript pass. All 16 focused Node tests pass, including 10 new timing, bootstrap recovery, image/decode/cancellation and contact geometry checks. The new lifecycle tests use deterministic clock/event/DOM doubles; they are not browser measurements.

Read-only HTTP checks against the production preview returned 200 for home, ACM/Surge/Adobe, contact, privacy, robots and sitemap; an unknown route returned the designed 404. Fifteen script/style/font/artwork responses were present and nonempty. The served HTML includes the early bootstrap and contact detector on the whole section.

`git diff --check` and the protected-source comparison pass. Both fonts and all artwork remain local; no dependency or image asset changed.

Live browser review was unavailable: the browser tool rejected the existing `http://127.0.0.1:3001/` preview under its URL policy. No alternate browser-control method was used. No new screenshot, real cursor test, viewport sweep, browser-cache/throttle test, browser-history test, Safari/device check or Lighthouse measurement is claimed for this revision. Those visual checks remain pending; previous screenshots and browser records describe earlier commits.

The build needed host process permissions because sandboxed TypeScript child-process capture returned empty output. No application configuration was weakened to bypass that environment issue. The pre-existing generated `next-env.d.ts` development imports were preserved outside the checkpoint.
