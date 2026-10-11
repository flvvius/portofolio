# Quality evidence

The owner requested a shorter multipage structure after the initial PR. The current follow-up check is `python3 docs/scripts/check-page-structure.py`, with results in page-structure.json. It covers the new page links, 72 route/width/theme states, axe, compatibility links and measured copy reduction. The tables below record the earlier full refactor checks; they are historical evidence rather than a claim that the page structure is unchanged.

Final checks use a local production build on port 3001, Next.js 16.4.0, React 19.2.1 and Chromium 153.0.8010.12 on macOS. No real payment, booking or email account was used. The owner deferred those services in TODO.md.

## Verified

| Check | Observed result | Evidence |
| --- | --- | --- |
| Production build | Pass | npm run build |
| Lint and TypeScript | Pass | npm run lint; npx tsc --noEmit |
| Lighthouse mobile | Performance 99; accessibility 100; best practices 100; SEO 100 | lighthouse-mobile.json |
| Measured layout stability | CLS 0; LCP 2.1 seconds; total blocking time 20 ms | Same Lighthouse report |
| Public pages and links | Ten checked pages return 200; eight unique internal page destinations return 200 | checks.json |
| Responsive themes | 48 route/width/theme combinations; no horizontal overflow | checks.json |
| Axe | No WCAG A/AA or full homepage scan violations in recorded states | checks.json |
| Legacy navigation | Fifteen old fragment/back-room flows reach their preserved destinations; back-room route returns 301 | checks.json |
| Draft entries | Both concept routes return 404 | checks.json |
| Keyboard | Tab traversal finds visible focus on all encountered controls across eight pages; skip link and FAQ Enter actions pass | keyboard-zoom.json; checks.json |
| Doubled rendering | Eight pages at CSS zoom 2 pass overflow checks | keyboard-zoom.json |
| Text enlargement | Root text enlargement at 640px, and every explicit/inherited computed text size doubled at 1280px, pass; price overlap checked and screenshots inspected | checks.json; contrast-reflow.json; text-200-light.png; text-200-dark.png |
| Small-screen reflow | Six routes in both themes at 320px pass | contrast-reflow.json |
| User text spacing | No overflow after line, letter, word and paragraph spacing overrides | checks.json |
| Reduced motion | Computed animation/transition duration at most 1 ms across eight pages | keyboard-zoom.json |
| Theme persistence | Explicit choice survives reload; light and dark resolve to different real colors | checks.json; contrast-reflow.json |
| Font failure and no JS | Reading, pricing and conventional links remain available; fallback fonts produce no overflow | checks.json |
| Forced colors | Skip-link focus outline remains visible | checks.json |
| OG image | 200 with PNG content type | opengraph.png; checks.json |
| Missing provider settings | Disabled send action with email alternative; server returns 503 | checks.json |
| Form fixtures | Waitlist/intake acknowledged success; invalid field 422; origin 403; honeypot 400; provider failure 502 without success event; repeated requests 429 | form-checks.json |
| Analytics fixtures | audit_click, call_click, waitlist_submit, intake_submit, before_after_view all observed by local recorder | form-checks.json |
| Runtime dependency audit | Zero advisories | npm audit --omit=dev |

Lighthouse is one local run under its default mobile emulation, not field performance. CSS zoom and computed text doubling exercise reflow and readability; they are not a claim about every browser's native zoom UI. Screenshots were inspected in addition to geometry checks.

Rendered canvas sampling of resolved theme colors gives these ratios. Hairlines are decorative and are not treated as essential control boundaries.

| Role | Light | Dark | Required |
| --- | --- | --- | --- |
| Body text | 19.19 | 16.13 | 4.5 |
| Muted text | 5.85 | 6.17 | 4.5 |
| Primary button text | 13.32 | 15.30 | 4.5 |
| Input boundary | 3.53 | 4.26 | 3 |
| Focus ring against page | 7.25 | 5.03 | 3 |

## Failed and corrected

The first automatic Vercel preview failed before installation because the existing project selected discontinued Node 20. The branch now pins Node 24 through package.json, matching the verified local runtime and overriding the project setting. Preview results are visible on the PR.

The first full axe run reported the appearance selector outside a landmark. Moving it into the footer cleared the finding. A valid same-origin localhost form request initially returned 403 because Next's normalized origin differed; host/protocol comparison fixed it. Visual inspection of the doubled-text capture caught a sprint price overlapping its description; intrinsic price-column sizing fixed it, and the regression check now measures that overlap.

The fixture recorder initially lost its events during external navigation; the test now prevents fixture navigation while preserving the React click event. This was a fixture issue, not a delivery claim. The baseline setup's symlink dependency mistake was recovered before final captures; the final baseline uses an isolated install. No unresolved final automated failure remains.

## Unverified and known limits

Actual Stripe purchase, its return redirect, Cal booking, Resend inbox receipt and Umami account receipt were deferred by the owner. The Pricele example has a real current capture but no historical before or redesign result. Policy wording and company/VAT details need owner review. There are no approved testimonials.

Physical-device interaction, screen-reader behavior and other browser engines were not tested. The rate limiter is in memory per server process. Full npm audit reports eleven development-tool advisories, nine high and two moderate, while runtime audit is clean. Addressing every advisory requires separate dependency decisions, including a possible Tailwind major upgrade.

## Reproduce

Build and serve the configured review site first:

```bash
npm ci
npm run lint
npm run build
npm run start -- --port 3001
```

The browser scripts require Python Playwright with Chromium installed. Axe comes from the existing development dependency tree. Lighthouse was installed in a temporary tooling directory, with no runtime package added to the site.

```bash
python3 docs/scripts/check-page-structure.py
python3 docs/scripts/verify-site.py
python3 docs/scripts/check-keyboard-zoom.py
python3 docs/scripts/check-rendered-contrast.py
python3 docs/scripts/check-forms.py
```

The form script starts an isolated development server on 3131 and a local provider/analytics fixture on 3130. Keep the main development server stopped while it runs. Fixture settings and keys are dummy values; production Resend endpoints require HTTPS. The teardown capture script also expects an isolated tagged baseline on 3122. See its source and teardown capture manifest for dimensions and assumptions.

Run Lighthouse against port 3001 with the mobile defaults and only performance, accessibility, best-practices and SEO categories. Set CHROME_PATH to an installed Chromium executable if needed. Compare the JSON scores with the requested minimums of 90, 95, 95 and 100.
