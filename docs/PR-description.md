The portfolio becomes a design-service site with a short homepage and separate Work, Process, Pricing and FAQ pages. About introduces Flavius; Projects and Experience hold the developer portfolio. The owner requested this page split and removal of the interests collection after reviewing the initial refactor.

Main navigation now uses page URLs. The homepage is 83% shorter; copy across the affected pages is down 35%, including all new destinations. Project stories and FAQs are condensed while prices, scope, refund terms and factual portfolio content remain available. Previously shared service and portfolio fragments reach their new pages.

The audit is EUR 300, a sprint starts at EUR 1,500 and monthly work is waitlist only. Upright Inter, restrained light/dark tokens and editable Schoolbell screenshot annotations follow flavius-design-taste. No clients, results or testimonials are invented. Work comparisons are explicitly placeholders; Pricele has a real current screenshot without a claimed redesign result.

Next.js, React, Tailwind 3, the existing domain and hosting remain. Node 24 fixes the existing Vercel project's discontinued Node 20 setting. Runtime dependency audit has no advisories; eleven development-tool advisories remain documented.

## Current review captures

![Short homepage at 375px](https://raw.githubusercontent.com/flvvius/portofolio/refactor/service-site/docs/quality/pages-home-375.png)

[Short About](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/quality/pages-about-375.png), [dedicated Pricing](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/quality/pages-pricing-375.png), [page map and measured copy reduction](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/page-structure.md).

[Original before/after teardown, seven decisions and unposted social drafts](https://github.com/flvvius/portofolio/tree/refactor/service-site/docs/teardown-001) record the first refactor iteration. Their long homepage captures are historical.

## Acceptance and validation

- [x] Short service homepage and dedicated detail pages; portfolio stories preserved and condensed; interests removed as requested.
- [x] Page-based navigation, legacy route/fragment handling and updated sitemap.
- [x] Public prices, waitlist-only monthly offer, scope, fit, FAQ and owner-review VAT wording.
- [x] Upright commercial copy, editable media annotations, honest placeholders and no fabricated testimonials.
- [x] Build, lint and TypeScript pass. The page split passes 72 route/width/theme checks, axe, internal links and compatibility navigation.
- [x] SEO, OG/Twitter cards, canonical URLs and Person/ProfessionalService offers.
- [x] Intake/waitlist delivery and all five analytics events implemented; original local provider fixtures pass.
- [ ] Actual Stripe TEST purchase, Cal booking and email inbox receipt. The owner explicitly deferred these.

[Latest page checks](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/quality/page-structure.json), [full refactor evidence and coverage limits](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/quality/README.md), [redirect map](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/redirect-map.md).

## Owner TODOs

Supply Stripe Payment Links, Cal.com booking, verified Resend sender and recipient; run actual purchase and inbox checks. Supply real matched before/after pairs and approved testimonials if wanted. Confirm company/VAT details and policies. Configure optional analytics and verify account receipt. Review the remaining development-tool advisories.

[Complete TODO list](https://github.com/flvvius/portofolio/blob/refactor/service-site/docs/TODO.md). Physical devices and screen readers are unverified. This branch is for review; no production merge or social posting has occurred.
