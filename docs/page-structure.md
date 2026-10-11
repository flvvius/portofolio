# Shorter pages

The owner asked to remove the interests collection and reduce the long page into separate destinations. This supersedes the original twelve-section homepage and the requirement to retain the back-room collection.

| Page | Purpose |
| --- | --- |
| / | Short introduction, two offers and links to detail |
| /work | Three honest placeholder comparisons and the Pricele example link |
| /process | Four steps, fit, scope and open design method |
| /pricing | Prices, deliverables, calls and partner waitlist |
| /faq | Nine concise answers |
| /about | Short biography and contact |
| /projects | Six condensed project stories |
| /experience | Roles and education |

Main navigation now links to pages. The interests collection and rotation list are removed. Old service and portfolio fragments resolve to the corresponding pages. Retired interests links reach About.

Measured main-content copy falls from 2,392 to 1,558 words across the affected pages, including all the new destinations and the unchanged Pricele detail. That is a 34.9% reduction, not just redistribution. The homepage falls from 1,077 to 181 words, an 83.2% reduction. Counts use whitespace-delimited main textContent consistently, including FAQ answers; shared navigation/footer and unchanged policies, intake and blog are outside this comparison.

Verified: production build, lint, TypeScript, new internal links, all nine affected routes, 72 viewport/theme states, axe and legacy routing. See quality/page-structure.json. The heading-level issue exposed by moving pricing to its own page was corrected before the final check.

Unverified: live Stripe, Cal.com and email remain deferred in TODO.md. Earlier teardown captures describe the original refactor; current review screenshots are quality/pages-home-375.png, pages-about-375.png and pages-pricing-375.png.
