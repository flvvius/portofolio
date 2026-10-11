# Service site design brief

Audience: founders with live React products, a launch deadline or budget; small SaaS teams; agencies without a designer. The task is to understand the offer, see evidence, choose an audit or discuss a sprint.

Primary action: EUR 300 taste audit without a call, when Stripe is configured. Sprint questions use a 15-minute call or email. Monthly design partner is waitlist only. External setup was explicitly deferred, so current unavailable states and email destinations remain truthful.

Constraints: Next.js 16.4.0, React 19.2.1, Tailwind 3 and TypeScript, with Node 24 for Vercel. Keep domain, repository and hosting. Preserve factual project, role, education and writing content. The owner subsequently requested removal of the interests collection, separate page destinations and at least 25% less copy.

Direction: Editorial calm owns Inter, semantic light/dark colors, graphite actions, flat sections and short motion. Personal room supplies Schoolbell annotations, one hero underline and an About note. The visual idea is marking a screen to explain a code-delivered design decision. Canonical palette matches flavius-design-taste; the optional Tailwind 4 starter is not a migration requirement.

Composition: choose the type-led opening over the split-media option saved in compositions. The short homepage introduces the offer. Work holds comparison placeholders; Process covers steps, fit, scope and method; Pricing holds offers and waitlist; FAQ has nine answers. About links to Projects, Experience and Blog. Intake, policies and the hidden noindex Styleguide remain.

Content and proof: data/service.ts, data/site.ts, data/blog.ts and typed data/work.ts. All comparison slots are visibly placeholders. Pricele has a real current local capture, without a historical before or redesign PR. Two concept drafts are excluded from production routes and sitemap. No invented clients, quotes, metrics or results.

Theme entrypoints: app/layout.tsx loads local fonts and app/service.css; service.css imports service-tokens.css. Tailwind retains version 3 and semantic roles. Light/dark/system mode resolves actual colors and persists only the user's explicit theme choice.

## Behavior contract

| Feature | Trigger | Expected result | Verification |
| --- | --- | --- | --- |
| Auth/session | Visit a public route | No authentication flow on this site | Route source and HTTP checks |
| Permissions | Visit draft work slug | No production content, return 404 | Work collection and route tests |
| Page navigation | Select Work, Process, Pricing or About | Page URL and visible current-destination cue | Page/skill browser checks |
| Legacy URLs | Visit old service/project fragment or back-room URL | Corresponding new page; retired interests reach About | Redirect map and browser checks |
| Case-study return | Activate Back to work with Enter | /work | Skill browser check |
| Forms | Submit valid, invalid or repeated fixture data | Acknowledged delivery, inline validation or honest failure; no fabricated success | check-forms.py and form-checks.json |
| Unconfigured services | Visit Pricing/intake without provider settings | Disabled submission/email alternative; no purchase or delivery claim | Local production and API checks |
| Draft/cancel semantics | Edit intake fields | Native fields; no server autosave, wizard or cancellation mutation | ServiceForm source |
| Analytics | Click offers, submit acknowledged forms, view comparisons | Five named events; no field content | Local event recorder |
| Keyboard/focus | Tab, skip link, FAQ Enter, return link | Visible focus and native activation | Browser traversal and skill review |
| Dialogs | None in current service flow | No dialog focus contract needed | Component source |
| Responsive reading | Narrow width, dark mode or doubled text | Readable content and available controls, no overflow | Width/theme matrices and inspected captures |

Code changes in the updated-skill review are POLISH within the already-authorized refactor. The earlier page split was explicitly requested by the owner. No additional navigation destinations, purchase flow, form transport or external data changes are introduced by this review.

Known unknowns: Stripe test/live links, Cal event, real email delivery, analytics account receipt, factual comparison pairs, testimonials and company/policy review. Physical devices and screen readers remain unverified. See TODO.md and skill-review.md.
