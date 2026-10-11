# Acceptance criteria

These notes describe the first refactor iteration. The owner subsequently requested shorter separate pages and removal of the interests collection. See [the current page map](page-structure.md) and quality/page-structure.json for the updated structure and checks.

These checks apply to the reviewed branch and local production build. External services deferred by the owner remain unchecked.

- [x] Service homepage; developer portfolio at /about; preserved writing, projects and interests; legacy route and fragment handling.
- [x] Editorial calm typography and flat sections; editable handwritten overlays, one hero underline and one About note; upright prices and scope.
- [x] Audit EUR 300; sprint from EUR 1,500; monthly partner waitlist only, with no price or purchase action.
- [ ] Audit buyable through real Stripe and verified in TEST mode. Integration is ready; owner deferred Payment Links and the actual purchase test. See TODO.md.
- [x] Reusable paired media with required alt text, separate annotation data and honest ownership labels. Placeholder proof is visibly labelled. Draft concepts are excluded from public routes. No invented testimonials or results.
- [x] Scope, exclusions, fit, process, accessible FAQ, refund and owner-review VAT wording.
- [x] Public contact hi@flavius.pro; no Gmail address in active code or content.
- [x] Lighthouse mobile targets; axe scans; keyboard/focus, 200% rendering, contrast, responsive and reduced-motion checks. See quality/README.md for exact coverage.
- [x] Metadata, canonical URLs, OG/Twitter image, sitemap, robots and Person/ProfessionalService offers.
- [x] Optional Umami and all five named events implemented and exercised with a local recorder. Real account receipt remains deferred.
- [x] Intake and waitlist validation, failure states and provider acknowledgement checked with local fixtures. Real email receipt remains deferred.
- [x] Matched teardown captures, seven decisions and unposted X/LinkedIn drafts in teardown-001.
- [x] Existing framework, hosting choice and domain retained; no production merge or deployment performed.

Verified evidence is linked from quality/README.md and checkpoints.md. No unresolved final local test failure is accepted. The launch dependencies in TODO.md remain unverified; this checklist does not treat them as passed.
