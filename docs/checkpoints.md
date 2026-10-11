# Refactor checkpoint reports

The owner approved Phase 0 and then requested the remaining work without approval stops. On 11 October 2026, they deferred Stripe, Cal.com and real email setup and asked to record those as TODOs. The reports distinguish local evidence from external setup.

## Phase 0

Done: inventoried Next.js 16, React 19, TypeScript, Tailwind 3, routes, content and actual Schoolbell usage; tagged the baseline and created the branch.
Evidence: docs/refactor-plan.md, docs/before and tag v1-portfolio.
Failures: the README's claimed font pairing did not match the original code; the plan records the actual usage.
Decisions needed: none for implementation; later proof and account settings belong to the owner.
Next step: apply Editorial calm tokens with a small Personal room annotation layer.

## Phase 1

Done: local Inter and Schoolbell, semantic light/dark tokens, hidden styleguide and editable annotation layer.
Evidence: docs/styleguide, docs/design-brief.md and both rendered composition options in docs/compositions.
Failures: none remain from the foundation checks.
Decisions needed: none; chose the type-led composition to keep offer, price and action together.
Next step: build the twelve homepage sections.

## Phase 2

Done: service homepage, public pricing, scope, process, FAQ, method, waitlist, footer and env-gated integrations.
Evidence: docs/homepage contains full-page and hero captures at 375 and 1280 in both themes.
Failures: live account settings are absent; the page shows clear unavailable states and email alternatives.
Decisions needed: checkout, booking and provider settings are deferred in docs/TODO.md.
Next step: retain the portfolio and writing on secondary pages.

From the page alone, the service is for founders and teams with live React products and agencies without a designer. The audit provides one agreed flow, a recorded walkthrough, ten ranked fixes and one redesigned screen within three business days of complete intake. It costs EUR 300. A sprint starts at EUR 1,500 and delivers code as reviewable PRs. The next action is the audit button or a call for sprint questions; the current unconfigured review build explains the email fallback. Monthly work is waitlist only.

## Phase 3

Done: About portfolio, work collection, Pricele example, intake, policies, writing and 404; route and fragment compatibility.
Evidence: docs/secondary, docs/redirect-map.md and docs/quality/checks.json.
Failures: none remain in internal page links or legacy fragment checks. Draft concepts intentionally return 404.
Decisions needed: company details and policy review remain owner TODOs.
Next step: verify production behavior and fix accessibility failures.

## Phase 4

Done: production build, lint, TypeScript, Lighthouse, axe, responsive checks, keyboard traversal, doubled rendering, reduced motion and local form fixtures.
Evidence: docs/quality lists commands, scores and machine-readable reports.
Failures: fixed the theme selector's missing landmark, a localhost origin mismatch a test recorder navigation issue and doubled-text price overlap. No final automated failure remains.
Decisions needed: real purchase and inbox checks were explicitly deferred; local fixtures cover the implemented behavior only.
Next step: finish matched teardown captures and PR evidence.

## Phase 5

Done: matched hero, pricing and mobile comparisons; seven decisions; X and LinkedIn drafts; final review documents and PR.
Evidence: docs/teardown-001, docs/acceptance.md and docs/handoff.md.
Failures: the original site had no pricing; its experience/writing area is the explicitly labelled comparison. No social drafts were posted.
Decisions needed: supply the items in docs/TODO.md before launch.
Next step: review the PR, then configure and verify the deferred external services before merging for production.

## Verification boundaries

Verified: local builds, browser checks, saved screenshots, route compatibility and local provider/event fixtures.
Failed: no unresolved failure in the final automated checks. Earlier failures and their fixes are recorded above and in the quality report.
Unverified: actual Stripe purchase/redirect, Cal booking, Resend inbox delivery, analytics account receipt, physical devices, screen-reader interaction and owner policy review. These are not presented as passed.
