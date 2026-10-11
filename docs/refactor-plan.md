# Service site refactor plan

Checkpoint 0 approved on 11 October 2026. Phase 1 is in progress.

## Outcome and scope

Turn flavius.pro into a site for Flavius's design engineering service. Keep the domain, repository, Next.js stack and existing deployment. Move the developer portfolio to `/about`, preserve its content and public links, and ship UI implementation as reviewable pull requests.

The buyer is an English-speaking founder with a live product, launch deadline or budget, a small SaaS team, or an agency without a designer. The first action is a self-serve EUR 300 taste audit. Sprint buyers can ask a question through a 15-minute call.

## Verified inventory

- Baseline commit `b1ec959`, tagged `v1-portfolio`. Working branch `refactor/service-site`. Worktree was clean before the inventory.
- Installed Next.js 16.0.7 and React 19.2.1, App Router, TypeScript, Tailwind CSS 3.4.1 and PostCSS. npm lockfile and existing dependencies are present. No MDX, form provider or component library is currently configured in source.
- Sentry wraps the Next configuration, with an existing `/monitoring` tunnel. Google Analytics is optional through `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Last.fm uses server-side `LASTFM_API_KEY` and `LASTFM_USER`.
- Vercel hosting is documented in README and reflected in existing source configuration. The deployment project and dashboard settings have not been verified. Keep them unchanged.
- Actual type is Schoolbell 400, loaded by `next/font/google` with swap and preload in `app/layout.tsx`. Body, display headings and Tailwind `display`, `mono`, `hand` aliases all use it. The README's Fraunces, Courier Prime and Caveat description is stale.
- `app/page.tsx` renders Nav, TheBar, TheShelf, TheRecordPlayer and TheDoor. Root layout adds the paper filter, skip link, RoomTone, ConsoleNote, JSON-LD and analytics.
- `data/site.ts` holds identity, navigation, six projects, four experience entries, education, personal copy, social links and music fallback data. Project stories are enhanced anchor links opening `CaseStudy` dialogs, not individual page routes.
- `data/blog.ts` contains one post, `exploring-something-new`. `data/backRoom.ts` contains books, film, art, places and aesthetics.
- Existing content pages are `/`, `/blog`, `/blog/exploring-something-new` and `/the-back-room`. Supporting endpoints are `/api/now-playing`, `/sitemap.xml`, `/robots.txt` and the Sentry tunnel. Public assets are `/main.png` and `/icon.svg`.
- Error UI lives in `app/not-found.tsx` and `app/global-error.tsx`.
- Drawings live in `components/art/`; annotations and entrance helpers in `components/ink/`; room sections in `components/sections/`. Other components include Nav, MenuSheet, CaseStudy, NowPlaying, HouseRecordToggle, RoomTone, ConsoleNote, GoogleAnalytics and JsonLd. Audio implementation is `lib/vinyl.ts`.
- Contact currently contains a Gmail address in `data/site.ts`. Replace it with `hi@flavius.pro` during implementation, then scan all tracked content for old contact addresses.
- The live sitemap fetched during inventory lists the same four content URLs. Save and test all of them; do not invent historical project routes that are absent from current source.
- Pricele exists locally at `/Users/flavizilla/Projects/daily_games/pricele`. Its manifest uses Next.js 14.2.15, React 18.3.1, Tailwind and Neon. Starting it and capturing screenshots is deferred to Phase 3. Read-only inspection and running it for captures are the only authorized work in that repository.

## Design sources and composition

Read the local `flavius-design-taste` repository at commit `bdab5a475050cf6e630a9738d44e1366218fe541`. `skills/` is empty, so `skills/flavius-design/` is unavailable. Follow the fallback in the brief: both direction SKILL.md files, shared principles, DNA, voice and anti-patterns, Editorial calm web/patterns/review references and Personal room implementation/review/source references.

Editorial calm controls typography, layout, navigation, prices, forms and motion. Personal room supplies editable marks on comparisons and at most one small hero underline. The signature is the act of marking a screen to explain a decision. No decorative room navigation is needed to sell that work.

Choose a left-aligned type-led hero with its purchase action beside a clear secondary proof link. The alternative, a large decorative illustration beside the hero, spends space without explaining the offer. Bring the comparison images immediately after the opening. On mobile, keep headline, explanation and actions in order, then stack each before/after pair.

### Type pairing

Use bundled Inter from Editorial calm for every heading, body paragraph, UI label, price and term. Use Schoolbell 400 from Personal room only for optional annotation notes and the permitted decorative accents. Inter's 400/500/600 hierarchy makes deliverables and prices scannable; Schoolbell retains the recognizable hand without asking buyers to read commercial information in it.

Load both locally through `next/font/local`, preserve the font licenses and provide adjusted fallbacks. Avoid runtime Google font fetching. Validate layout stability with loaded and missing fonts. Use tabular digits for amounts and keep currency and complete amount together.

Map the source scale to rem units: body 16px desktop and 17px mobile, labels 500, titles 600, section headings 16px, row titles 18px, page titles 32px and hero up to 60px. Body line height is 1.625; prose maximum 65ch and descriptions 55ch. Annotation notes start around 20px, without synthetic bold.

### Palette and tokens

Keep Editorial calm semantic roles as the main theme. Its sRGB equivalents are below; preserve the source OKLCH values with fallback support where needed.

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#fcfcfa` | `#08090c` |
| Text | `#0e0a07` | `#eae7e4` |
| Primary action | `#312a24` | `#e6e4e1` |
| On primary | `#faf8f5` | `#0c0d11` |
| Muted text | `#68625e` | `#928f88` |
| Separator | `#e3e1de` | `#ffffff1a` |
| Input boundary | `#898681` | `#727479` |
| Focus | `#5b544d` | `#897e74` |

One expressive ink hue comes from Personal room: `#d96b2b` for decorative strokes and its darker `#a44415` text variant on light backgrounds. Use the night palette's `#ffa194` for readable dark-theme annotations. Decorative ink must not replace essential control boundaries or focus roles. Validate contrast on actual rendered backgrounds in both themes.

The tokens define dark mode. Implement the complete Editorial calm light/dark role set with system preference and a conventional explicit override. Ensure forms, comparison overlays, metadata pages and browser control color schemes follow it. Screenshot assets retain their captured colors and honest labels.

Use a 4px spacing unit, 16px web gutters, 20px mobile gutters, 40px section gaps, 24px section insets and 16px row gaps. Start with the Editorial calm 896px reading container; give comparison media a wider region only if the screen needs it. Radius is 8px on controls, 10px on media and 14px on overlays. Sections and pricing rows have no surface. Use 140ms press, 150ms state swaps and 250ms overlays; all motion ends within 300ms. Reduced motion removes travel and all nonessential animation.

## Information architecture

| Route | Purpose |
| --- | --- |
| `/` | Service landing page |
| `/work` | Published case-study index, needed by the footer |
| `/work/[slug]` | Case studies from a typed content collection |
| `/about` | Identity, project shelf, experience, hackathons, education and interests |
| `/blog` and `/blog/[id]` | Retain writing at its existing URLs |
| `/audit/start` | Post-payment intake |
| `/privacy` | Data handling, contact and confidentiality |
| `/terms` | Scope, payment, refund, ownership and generic VAT note for review |
| `/styleguide` | Hidden visual specimen, noindex and excluded from sitemap |
| Unknown URLs | Useful 404 with home, work and contact links |

Use the existing TypeScript content approach to avoid introducing an MDX runtime for three entries. Case-study metadata fields match the requested frontmatter: title, client category, ownership, stack, date, summary, before/after paths, separate annotation file, decisions with reasons, code changes and limitations. Bodies have problem, changes and reasons, gallery, implementation notes and factual result sections.

Pricele is the complete example structure, labeled My own product and Example. Capture real screens if it runs. A captured current screen cannot establish a historical redesign: label each image by its actual provenance, and use explicit placeholders wherever the before or after does not exist. Never manufacture diffs or results. Two additional entries are DRAFT and omitted from production pages, static params and sitemap. Homepage slots remain visibly labeled PLACEHOLDER until real proof is supplied; draft detail links appear only in development. Explain unavailable case-study links in plain text in production.

## Homepage content, in order

1. Conventional navigation: Work, Process, Pricing, About and Get an audit.
2. Hero: Your app works. Let's make it feel finished. Explain React codebase redesign, reviewable PRs, the supported stack and no Figma handoff. Primary action Get a EUR 300 taste audit; secondary See before and after. No vibe-coded wording.
3. Three before/after proof slots, Pricele second. Each has matched viewport media, separate annotations, three decisions with reasons, ownership label and an honest detail destination or availability notice.
4. For live products, supported codebases, founders and agencies. Explicit exclusions for logos, Figma-only delivery, whole products, no code and unlimited revisions.
5. Four process steps: send app and goal; agree scope and pay; receive audit or PRs; review and merge. Audit delivery is a preview, so distinguish it from a sprint's merge step. State that design and code come from the same person.
6. Two hairline pricing rows. Audit EUR 300 fixed, one agreed flow, recorded walkthrough, ranked top 10 fixes and one annotated mockup or isolated coded screen, within three business days after complete intake. Full refund if it is not useful. Sprint from EUR 1,500 for one flow or 3–5 screens, PR delivery, codebase check before final quote and audit credit on upgrade. Sprint timing is agreed after review, not an invented deadline. Then monthly partner waitlist with one request at a time, no price and no checkout.
7. All specified scope and exclusions, including interaction states, accessibility, microcopy and no guaranteed outcomes.
8. Testimonials component exists behind a configuration flag, default off. Render no section until approved real quotes exist.
9. Accessible FAQ covering all nine brief questions, confidentiality, audit screen delivery, revisions, timing, refunds and a generic Romanian-company VAT/invoicing note visibly marked for owner review.
10. Open design system method link and the invitation to use it or hire Flavius.
11. Repeat audit action plus Book a 15-min call for sprint questions.
12. Plain footer with hi@flavius.pro, GitHub, X, LinkedIn, About, Work, privacy and terms.

## Components and cleanup

Build ServiceNav, SiteFooter, AuditLink, CallLink, BeforeAfter, AnnotationLayer, PricingRows, FAQ, IntakeForm, WaitlistForm, Testimonials and case-study views. Native details/summary can handle the FAQ without a new library. BeforeAfter is side-by-side desktop, stacked mobile, with required alt text and separate editable SVG overlays. A slider is optional and not needed for the initial delivery. Accessible captions and decision text carry the explanations independently of the handwriting. Track visibility once per comparison rather than on every scroll.

Reuse project, experience, education, blog and interests data; preserve shelf drawings as optional decorative project illustrations on `/about`, with ordinary visible project links and readable upright stories. Keep the shelf's identity without making a dialog necessary to read the work. Reuse the container and ink paths where useful, adapting their styling and semantics.

After `/about` has a verified home for all content, remove unused TheBar, room navigation, menu choreography, room-wide sounds, global paper filter/grain and obsolete entrance CSS. Retain only drawings actually used by About. Decide whether NowPlaying and explicit audio controls still serve About before removing their data or the API. Do not delete personal content to simplify cleanup. Remove unused roughjs dependencies only after an import scan. Preserve `/main.png` as a legacy public asset even when replacing the active OG image.

## Redirect and compatibility map

| Existing URL | Planned behavior |
| --- | --- |
| `/` | New service page, HTTP 200 |
| `/blog` | Keep, HTTP 200 |
| `/blog/exploring-something-new` | Keep, HTTP 200 |
| `/the-back-room` | HTTP 301 to `/about#interests`, with all collection content moved |
| `/the-back-room#books`, `#film`, `#art`, `#places`, `#aesthetics` | Compatibility handler retains fragment destination under About; fragments are never sent to the server |
| `/#the-bar` | Keep hero compatibility anchor and visible About link |
| `/#the-shelf` | Resolve client-side to `/about#projects`; visible compatibility link and no-JS reading path |
| `/#the-record-player` | Resolve client-side to `/about#experience`; visible compatibility link and no-JS reading path |
| `/#the-door` | Resolve client-side to `/about#contact`; visible compatibility link and no-JS reading path |
| `/#note-miez` | Resolve to `/about#note-miez` |
| `/#note-commit-ink` | Resolve to `/about#note-commit-ink` |
| `/#note-sisc` | Resolve to `/about#note-sisc` |
| `/#note-agrobot` | Resolve to `/about#note-agrobot` |
| `/#note-pricele` | Resolve to `/about#note-pricele`, with a separate link to `/work/pricele` |
| `/#note-joke-bot` | Resolve to `/about#note-joke-bot` |
| `/#main` | Keep skip-link destination |
| `/api/now-playing` | Preserve its current JSON contract if audio is removed from UI |
| `/monitoring` | Preserve Sentry tunnel |
| `/sitemap.xml`, `/robots.txt` | Keep endpoints, update contents |
| `/main.png`, `/icon.svg` | Keep public assets reachable |

There are no existing `/projects/[slug]` or `/work/[slug]` routes in the current source. Do not silently redirect arbitrary unknown slugs. Test known paths and all fragments explicitly in Phase 3. Use an explicit Next redirect response with status 301; Next's `permanent: true` produces 308 and would not satisfy the brief's requested status.

## Payments, forms and configuration

Stripe Payment Link comes from `NEXT_PUBLIC_STRIPE_AUDIT_URL`. Configure its post-payment redirect to `/audit/start` in Stripe. Cal.com comes from `NEXT_PUBLIC_CAL_URL`. Missing configuration displays a truthful unavailable action with a contact path, never a working-looking checkout or invented URL.

No email provider is configured in source. Plan a single Next route handler using server-side fetch to Resend, shared by intake and waitlist, without an SDK. Adding a paid service requires separate approval under the brief; implementation can remain env-gated while provider choice is confirmed. Use `RESEND_API_KEY`, `FORM_FROM_EMAIL` and recipient `hi@flavius.pro`. Validate required fields, lengths, email and URLs server-side; use origin checks, a honeypot and rate limiting appropriate to the deployed runtime. Do not log submitted URLs or personal data to analytics/Sentry. Show provider errors as failures rather than successful submissions.

Intake fields are name, email, company, app URL, optional repo URL, focus flow, goal, stack, optional Loom link and preferred contact. No repo credentials or payment card details. The intake page alone does not prove payment; document payment reconciliation or session verification before fulfillment. Waitlist uses the same mechanism and has no purchase action.

Provide `.env.example`, explicitly exempted from the existing broad `.env*` ignore rule. Document external destinations as env values: site URL, Stripe, Cal, design-system repo, GitHub, X, LinkedIn, email, provider and optional analytics. Never expose server secrets through NEXT_PUBLIC names.

Use env-gated Vercel Analytics if the existing deployment supports it without adding a paid tier. This keeps hosting setup simple. Confirm account availability before enabling. Emit audit_click, call_click, waitlist_submit, intake_submit and before_after_view, with successful submit events only after provider acceptance. Update the CSP for the selected provider's actual browser requests. Server-to-server mail delivery does not require exposing Resend to the browser.

## SEO, policies and verification

Set title Flavius: design engineer for AI-built apps, service description, route-specific canonicals, Open Graph and Twitter metadata. Generate an OG image with Next's image response using upright type and one ink accent; no raster-generation dependency is needed. Add Person and ProfessionalService JSON-LD with public audit and starting sprint offers. Exclude draft studies, styleguide and private intake from sitemap; noindex styleguide and intake. Keep real blog canonicals.

Privacy and terms must state refunds, generic VAT handling for owner review, confidentiality, least-privilege repo access, access revocation and ownership of delivered work. Request legal/company details before treating these pages as approved terms. Audit is an annotated mockup or isolated preview, never a promised production merge.

Quality evidence must include mobile production Lighthouse scores of at least 90 Performance, 95 Accessibility, 95 Best Practices and 100 SEO; axe; visible focus; all links/forms/FAQ by keyboard; 200% zoom; reduced motion; and responsive checks at 375, 768, 1280 and 1536px. Validate both themes, no-JS content, font fallback, actual contrast and layout stability. A development screenshot is inventory evidence, not a performance result.

Verify purchase in Stripe TEST mode from CTA to payment, redirect, complete intake and received submission. Local mocks alone cannot pass this gate. Test credentials, Payment Link settings and a working delivery account are prerequisites. Do not process live payments or publish the site to close the test gap.

## Checkpoints and remaining inputs

- Phase 0: this inventory, redirect plan and baseline captures. Stop for OK.
- Phase 1: tokens and hidden styleguide. Send 375/1280 screenshots and stop.
- Phase 2: complete homepage and env-gated actions. Full-page captures, stranger test and stop.
- Phase 3: secondary pages and redirects. Link checker and every legacy URL checked; stop.
- Phase 4: measured quality fixes and real Stripe test-mode purchase/delivery evidence; stop.
- Phase 5: `docs/teardown-001/` matched hero, pricing and mobile pairs, 5–7 decisions with reasons, 6–8 post X thread and LinkedIn draft. Prepare PR body with screenshots, acceptance checklist and owner TODOs. Opening the PR is publication and needs approval under the brief; prepare the complete reviewable result first.

Owner inputs before launch: real proof images and annotation facts; approved ownership labels; real quotes only if wanted; Stripe test/live Payment Links and redirect settings; Cal URL; confirmed email provider and verified sender; analytics availability; revision policy and sprint timing; Romanian company/invoice details; approved privacy/terms wording. None is needed to review the design foundation.

## Evidence status

Verified: clean baseline, repository identity, branch/tag, installed framework versions, actual font source, content and routes, live sitemap, local design source files and Pricele location. Baseline screenshots at both required widths are complete; HTTP 200 and loaded Schoolbell were confirmed in Chromium. Eight supporting local routes returned HTTP 200. Visually inspected both hero captures. Browser results and filenames are recorded in `docs/before/capture-report.json`.

Failed: both homepage browser runs raised `Multiple Sentry Session Replay instances are not supported`. Captures retain the development indicator; these are baseline evidence rather than production assets. Sandbox denied Git ref writes and Chromium launch on the first attempts. Retried with approval. Next development startup reports an old browser-mapping database, Sentry client-config deprecation and Node dependency deprecations. Record them for the quality phase; inventory does not require unrelated upgrades.

Unverified: production hosting dashboard, historical URLs outside current source and live sitemap, Pricele runtime, form delivery, payment flow, analytics account, Lighthouse, axe and final responsive/accessibility targets. No redesign or launch claim is made at this checkpoint.

## Execution updates

The owner approved Phase 0 and subsequently instructed continuous execution with no further approvals. Checkpoints remain evidence reports without stop gates. The root theme now applies throughout the site. Optional Umami was chosen over Vercel Analytics because it adds no runtime package and accepts an existing hosted or self-hosted account. No analytics account was provisioned.

The back-room redirect is HTTP 301 to `/about?from=back-room`. The browser retains original fragments, and About resolves a bare arrival to `#interests` then removes the compatibility query. Known fragment URLs therefore reach their corresponding collections instead of losing their destination.
