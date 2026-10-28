# Production review — 29 October 2026

Source: the owner-supplied `portfolio-murex-omega-accqha17em.vercel.app-20261029T012208.html`, generated at 01:22 IST using Lighthouse 13.4.1 in desktop mode. No mobile score is included. This is a review of that saved run, not a new benchmark of the local fixes.

| Category | Score |
| --- | ---: |
| Performance | 99 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

FCP is 0.3 s, LCP 0.7 s, Speed Index 1.1 s, total blocking time 0 ms and CLS 0.001. The report shows no run warnings. A 100 SEO score did not catch the semantically wrong canonical domain: valid markup alone cannot establish that a configured URL is the intended production domain.

## Findings and changes

- **Caption contrast:** the screenshot figure's pending opacity of 0.35 faded its caption too. The report measured ratios between 1.76 and 2.31. The local patch keeps the same reveal duration, clipping and image fade, with opacity restricted to the image so captions retain their original colors.
- **Project link names:** media links replaced their visible caption with `aria-label`. The patch uses an additional visually hidden case-study description and lets the visible caption remain part of the computed name.
- **GSAP target warnings:** homepage setup can have no `[data-arrival]` elements. Setup now skips this tween when the filtered list is empty rather than disabling GSAP warnings globally. Existing section, hero, cursor and reduced-motion behavior is retained.
- **CSS preload warnings:** the two cited CSS chunks were fetched successfully and contain contact and document styles. Next.js prefetches them for navigation; Chrome reports that they were not applied immediately. No stylesheet-loading workaround or font-preload removal was added.
- **Placeholder origin:** read-only checks of the existing deployment confirmed `https://your-project.vercel.app` in the canonical tag, Open Graph image, robots sitemap URL and sitemap entries. Internal relative links and assets still work. The patch centralizes validated origins for all metadata and falls back to Vercel's production domain rather than the unique preview-deployment URL.

## Monitoring

The local patch adds the official Next.js components from `@vercel/analytics` and `@vercel/speed-insights` once at the root, outside the visual loading gate, for Vercel production builds only. No custom events, contact contents or page query strings/fragments are reported by this integration. Local and preview builds do not mount the components. The privacy page reflects the change.

Basic [Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing) on Hobby includes 50,000 events per month. Basic [Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing) is free and includes 10,000 events over a rolling 30 days shared across the team; its free dashboard provides the Real Experience Score, while detailed Core Web Vitals breakdowns require Plus. These are the published limits checked on this review date, not an account-specific billing audit. No Plus plan or paid service was enabled.

Before the next deployment, enable Web Analytics in the project dashboard if it is not already enabled. Set the `NEXT_PUBLIC_SITE_URL` Value to the plain preferred production origin, or remove the placeholder and allow Vercel's automatic production-domain fallback. Do not paste a Markdown link or the `KEY=` part into the Value field. Rebuild/redeploy, visit the production site and confirm that data appears. The source is prepared for deployment from `main`; dashboard activation, deployment status and actual event collection have not been verified.

## Other report opportunities

- The estimated 11 KiB minification savings come entirely from `chrome-extension://...` scripts. Retest in a clean browser profile or private window without extensions before attributing those scripts to the portfolio.
- ACM and Surge poster delivery has an estimated 109 KiB saving at this viewport through smaller responsive variants. The original captures and hero art were left intact in this focused monitoring/accessibility pass.
- The estimated 27 KiB unused JS and 14 KiB legacy JS are in a framework bundle. No framework upgrade, compatibility change or speculative bundle surgery was made for an already 99-point desktop result.

Verification and current limitations are recorded in [VALIDATION.md](VALIDATION.md). A fresh Lighthouse score after deployment, mobile results and real visitor dashboard ingestion remain pending.
