# flavius.pro

Flavius's design-service site, with the developer portfolio at `/about`. A short homepage introduces the service. Work, process, pricing and FAQ have dedicated pages. Projects and experience sit beside the concise About page. The audit costs EUR 300, a sprint starts at EUR 1,500 and monthly work is waitlist only.

The site keeps Next.js 16, React 19, TypeScript, Tailwind CSS 3 and the existing Vercel deployment. Local Inter carries commercial copy; Schoolbell is limited to annotations and an About note. The theme comes from [flavius-design-taste](https://github.com/flvvius/flavius-design-taste), with complete light, dark and system modes.

## Run locally

Use Node.js 24. The package engine also overrides the existing Vercel project's discontinued Node 20 setting.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

If `.env.local` already exists, copy only the missing variables. Keep secrets out of Git. Open http://localhost:3000.

```bash
npm run lint
npm run build
npm run start
```

Public environment values are included at build time. Rebuild after changing payment, booking, project or analytics URLs. The example file explains each setting.

## Configuration and launch

Stripe Payment Links handle checkout. Set `NEXT_PUBLIC_STRIPE_AUDIT_URL` and configure the payment redirect to `/audit/start` on the same deployment. Set `NEXT_PUBLIC_CAL_URL` for sprint calls. Checkout and booking show an email fallback until configured.

The intake and waitlist use `/api/forms` and the Resend HTTP API, with no additional SDK. Configure `RESEND_API_KEY`, a verified `FORM_FROM_EMAIL` and `FORM_TO_EMAIL`. Without these values, sending is disabled and the route returns 503. The server validates input, checks the origin, rejects the honeypot and limits requests. The in-memory limiter is best effort per process, so it does not replace a distributed abuse control if traffic warrants one.

Umami loads only when both public analytics settings exist. Events contain action names, not form data. Sentry is optional and env-gated, with replay disabled. The Last.fm API and Sentry monitoring tunnel remain available for existing consumers.

The owner deferred live Stripe, Cal.com and email setup. [The TODO list](docs/TODO.md) records those steps, company/policy review and the real proof assets needed before launch. Local fixture tests do not establish payment or inbox delivery.

## Edit content

- `data/service.ts` holds service copy, scope and FAQ.
- `data/work.ts` is the typed case-study collection. Draft entries have no production route or sitemap entry.
- `data/annotations/` holds editable SVG overlay instructions separately from screenshots.
- `data/site.ts` and `data/blog.ts` retain portfolio and writing.
- `components/service/BeforeAfter.tsx` renders accessible paired media with required alt text.
- `app/service-tokens.css` defines theme tokens; `app/service.css` implements the page patterns.

The three Work-page proof slots are visibly marked placeholders. Pricele has a real local capture of its current screen, but no historical before or completed redesign. Testimonials render nothing until approved quotes exist and the flag is enabled.

## Review evidence

[The plan](docs/refactor-plan.md) contains the original inventory and design choices. [The redirect map](docs/redirect-map.md) records preserved routes and fragments. `/styleguide` is noindex and excluded from the sitemap.

[Quality evidence](docs/quality/README.md) records production checks, fixture scope and remaining limits. [Checkpoint reports](docs/checkpoints.md) cover all phases without the approval stops the owner waived. [Teardown 001](docs/teardown-001/README.md) contains matched before/after captures and unposted social drafts.

The original portfolio is tagged `v1-portfolio`. Work lives on `refactor/service-site`; review the PR before merging into the existing deployment.
