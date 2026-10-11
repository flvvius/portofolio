# Design handoff

These notes describe the first refactor iteration. The owner subsequently requested shorter separate pages and removal of the interests collection. See [the current page map](page-structure.md) and quality/page-structure.json for the updated structure and checks.

The original portfolio hid the service behind a room-like presentation. The new homepage states the audience, deliverables, public prices and next action. The old project stories, experience, education, writing and interests now live on About and the retained blog routes.

Source baseline is v1-portfolio at b1ec959. The implementation is on refactor/service-site for review through a PR. The scope keeps the same Next.js/React/Tailwind stack, domain, repository and hosting. It includes code and review assets; production merge, external account setup and social posting are outside the delivered scope.

Editorial calm owns the typography, spacing, palette and layout. Personal room supplies marks on media and a restrained personal note. Inter keeps offers and prices readable. The type-led composition keeps the offer beside its cost and action; the alternate split composition is saved in compositions.

The logical batches are inventory, design foundation, service homepage, secondary pages, removal of unused room interactions, quality corrections and final review evidence. Plans and checkpoint reports record the decisions. Before/after captures are in before and teardown-001; final responsive captures are in homepage and secondary.

## Verified

The production build, lint and TypeScript pass. Browser checks confirm routes, legacy fragments, internal links, theme persistence, draft exclusion, keyboard focus, reduced motion and no-JavaScript reading. Axe and rendered contrast checks pass in the tested states. Lighthouse mobile meets every requested target. Exact commands and results are in quality/README.md.

Local fixtures confirm form validation, origin checks, honeypot rejection, rate limiting, acknowledged success and honest provider failure. The five analytics actions reach a local recorder, with no form data. These checks exercise the implementation without buying anything or sending real email.

The behavior contract preserves project and writing content, Last.fm API compatibility, old back-room destinations, root fragments and the existing monitoring tunnel. Captures use the same viewport dimensions for teardown comparisons. The original had no pricing section, so that comparison explicitly uses the original experience/writing area.

## Failed and corrected

A valid localhost form request initially failed the origin check; comparing the request host and protocol corrected it. Axe caught a theme selector outside a landmark; it now sits in the footer. Visual review of all text doubled caught a price crossing into its description; the grid now reserves enough width. The final targeted checks pass.

The first baseline dependency setup accidentally cleared the working install through a symlink. The working dependencies were restored with npm ci, and the final baseline runs in a separate temporary checkout with its original lockfile. Both final builds and captures completed.

## Unverified

The owner explicitly deferred actual Stripe purchase/redirect, Cal booking and email inbox delivery. Real proof pairs, approved testimonials, company details, policy review and analytics account receipt remain owner inputs. Physical devices and screen readers were not exercised. Automated results apply to Chromium and the recorded local states.

## Self-review rubric

Scores are a self-review, from 0 to 4, against the service buyer's task. The original site was a portfolio, so the before score measures its fit for the new service brief rather than judging its original purpose.

| Category | Before | After | Evidence |
| --- | --- | --- | --- |
| Hierarchy | 1 | 4 | Offer, audience and price now precede portfolio content. |
| Grouping and density | 2 | 4 | Visible comparisons, hairline pricing rows and scope groups. |
| Product fit | 1 | 3 | Design/code service is clear; genuine proof assets still needed. |
| Responsive composition | 2 | 4 | Tested widths, reflow, doubled text and matched captures. |
| States and copy | 2 | 3 | Honest missing-configuration, validation and provider failure states; live setup deferred. |
| Interaction | 2 | 3 | Routes, focus and local forms pass; checkout and booking need accounts. |
| Accessibility | 2 | 4 | Final axe, measured contrast, focus and keyboard checks pass in recorded cases. |

Before accessibility and interaction scores are provisional visual review, not a claim of a full baseline audit. Final functional and accessibility gates are assessed independently of these scores. Taste approval remains the owner's decision.

The next useful work is the concrete owner setup in TODO.md, then a real test purchase and inbox check. The current branch is ready for code and design review with those limits visible.
