The homepage now explains the design service, public prices and deliverables before asking a founder to act. The developer portfolio moves to `/about`, with its project stories, experience, education, writing and interests retained. Old routes and project fragments reach their new homes.

The EUR 300 audit and sprint from EUR 1,500 use upright Inter, hairline sections and restrained tokens from flavius-design-taste. Schoolbell is limited to editable screenshot annotations and an About note. The partner offer is waitlist only. Light, dark and system themes are supported.

This keeps Next.js, React, Tailwind 3, the domain and existing hosting. It adds no runtime SDK for forms or analytics. The lockfile updates packages within the existing ranges and has zero runtime audit advisories.

## Before and after

Both sides use the same viewport, light theme, DPR 1 and reduced motion. The before source is tagged `v1-portfolio`. The original had no pricing section; that comparison shows the original experience/writing area and labels the limitation.

| Hero at 1280 × 900 | Before | After |
| --- | --- | --- |
| | ![Original portfolio hero](https://raw.githubusercontent.com/flvvius/portofolio/refactor/service-site/docs/teardown-001/hero-1280-before.png) | ![Service hero](https://raw.githubusercontent.com/flvvius/portofolio/refactor/service-site/docs/teardown-001/hero-1280-after.png) |

| Hero at 375 × 812 | Before | After |
| --- | --- | --- |
| | ![Original mobile hero](https://raw.githubusercontent.com/flvvius/portofolio/refactor/service-site/docs/teardown-001/hero-375-before.png) | ![Service mobile hero](https://raw.githubusercontent.com/flvvius/portofolio/refactor/service-site/docs/teardown-001/hero-375-after.png) |

[Pricing and full mobile pairs, seven decisions and unposted X/LinkedIn drafts](https://github.com/flvvius/portofolio/tree/refactor/service-site/docs/teardown-001).

## Acceptance criteria

- [x] Service homepage; portfolio on About; original writing preserved; old route and fragment handling.
- [x] Blend respected, with upright commercial copy and conventional navigation.
- [x] Public audit/sprint prices; monthly partner waitlist only.
- [ ] Real Stripe TEST purchase through redirect and inbox delivery. Owner explicitly deferred Stripe, Cal.com and email setup and requested TODOs.
- [x] Accessible before/after component with editable SVG overlays and ownership labels. Proof is clearly marked placeholder; Pricele has a real current screenshot without a fictional redesign result. Two draft concepts have no public route. Testimonials render nothing.
- [x] Scope, exclusions, fit, process, FAQ, refund promise and VAT wording flagged for owner review.
- [x] hi@flavius.pro throughout active content; no Gmail address.
- [x] Lighthouse targets, axe, keyboard/focus, contrast, doubled text, reflow, reduced motion and required breakpoints.
- [x] Canonicals, OG/Twitter image, sitemap, robots and Person/ProfessionalService offers.
- [x] Optional Umami with all five events exercised against a local recorder.
- [x] Teardown captures and social drafts delivered.

## Validation

Verified locally: production build, lint and TypeScript pass. Lighthouse mobile scores are **99 / 100 / 100 / 100** for performance, accessibility, best practices and SEO. CLS is 0. Axe reports no violations across checked pages and homepage viewport/theme states. There is no horizontal overflow in the 48 required route/width/theme combinations or the additional 320px reflow cases. Keyboard traversal and reduced motion pass across eight pages.

Local fixtures cover intake/waitlist success after provider acknowledgement, field errors, origin rejection, honeypot, rate limiting and provider failure without a false success event. They also observe audit_click, call_click, waitlist_submit, intake_submit and before_after_view. No real payment or email was sent.

Fixed failures: same-origin localhost requests, an appearance selector outside a landmark and a price/description overlap found during visual review of doubled text. Final checks pass. [Full coverage and reproduction](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/quality/README.md), [checkpoint reports](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/checkpoints.md) and [redirect map](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/redirect-map.md).

## Owner TODOs before launch

- Supply Stripe TEST/live Payment Links and Cal.com event; run the actual purchase and booking tests.
- Configure Resend with a verified sender and confirm inbox receipt.
- Supply three factual matched before/after pairs, approved claims and optional real testimonials.
- Confirm company/VAT details and review privacy/terms.
- Configure optional analytics and deployment environment values, then verify actual account receipt.
- Track the eleven remaining development-tool advisories; runtime dependencies have none. Full remediation needs a separate dependency decision, including Tailwind's major version.

[Complete TODO list](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/TODO.md). Physical devices and screen readers are unverified. This PR is ready for review with the deferred setup visible; it has not been merged or deployed to production. Social drafts have not been posted.
