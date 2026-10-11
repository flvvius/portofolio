# Checkpoint 1

Design foundation completed on 11 October 2026. Awaiting review before Phase 2.

| Viewport | Light | Dark |
| --- | --- | --- |
| 375px | [Mobile](styleguide-375-light.png) | [Mobile dark](styleguide-375-dark.png) |
| 1280px | [Desktop](styleguide-1280-light.png) | [Desktop dark](styleguide-1280-dark.png) |

The hidden `/styleguide` route contains semantic color roles, the Inter type scale, controls, hairline sections, a reusable BeforeAfter component with separate editable SVG annotations, pricing rows, native FAQ disclosures and form specimens. Placeholder interfaces are visibly labeled and make no client or results claims. Forms do not submit during this phase.

The source tokens come from Editorial calm at design-taste commit `bdab5a475050cf6e630a9738d44e1366218fe541`. The theme uses its colors, spacing, radius, type and motion values. Personal room contributes Schoolbell and orange annotation ink. Both fonts are bundled locally with their licenses. Tokens are scoped to the service theme while the existing portfolio awaits its move to About.

Consolidated duplicate client Sentry initialization by removing `sentry.client.config.ts` and retaining the current `instrumentation-client.ts` entry. Disabled default personal-data collection. Replay no longer raises the duplicate-instance browser error in these runs.

Verified: TypeScript, targeted ESLint and production build pass. Chromium 153.0.8010.12 checked light and dark at 375, 768, 1280 and 1536px, with no horizontal overflow. Inter and Schoolbell loaded. FAQ opens and closes through keyboard activation. Reduced motion produces zero-duration button transitions. Doubled root text at a 640px viewport fits after pricing rows were changed to stack earlier. Known reading content remains visible with JavaScript disabled. The route is noindex and omitted from the sitemap. No page errors were recorded. See `checks.json` and `docs/scripts/check-styleguide.py` for scope and evidence. Mobile light and desktop light captures were visually inspected during development; screenshots are self-review evidence.

Failed and fixed: the first enlarged-text run overflowed in the sprint pricing description. Earlier stacking and shrinkable columns corrected it, and the full browser check was rerun. The baseline Sentry duplicate initialization error was also corrected.

Unverified: Lighthouse targets, axe, full-site keyboard walkthrough, browser zoom beyond the text-enlargement check, screen readers, font fallback geometry, form delivery, Stripe checkout and production hosting. These remain later-phase work. Build tools report an old browser compatibility database; no dependency upgrades were needed for this phase.

No deployment, payment-provider setup or publication was performed. Next is the complete service homepage after checkpoint approval.
