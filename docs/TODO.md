# Owner setup and launch TODOs

The owner explicitly deferred Stripe, Cal.com and real email delivery on 11 October 2026. These are not verified by local fixtures and are not required to review this PR.

- [ ] Set NEXT_PUBLIC_STRIPE_AUDIT_URL to a Stripe TEST Payment Link. Configure its redirect to /audit/start on the test site's origin.
- [ ] Run the actual test purchase: audit button, Stripe payment, intake redirect, intake submission and received message. Save evidence without payment or personal details.
- [ ] Set the live EUR 300 audit Payment Link after testing, with the production intake redirect. Confirm the refund promise and invoice handling in Stripe.
- [ ] Set NEXT_PUBLIC_CAL_URL to the real 15-minute Cal.com event.
- [ ] Configure RESEND_API_KEY, a verified FORM_FROM_EMAIL and FORM_TO_EMAIL=hi@flavius.pro. Confirm that intake and waitlist messages reach the inbox. Do not add keys to Git or client environment variables.
- [ ] Confirm company legal name, invoice address and VAT details. Review the generic VAT, retention, ownership, refund and revision wording in privacy and terms before launch.
- [ ] Supply three real before/after pairs with matched viewport sizes, approved ownership labels and factual decisions. Pricele is slot two. Replace placeholders and add verified implementation highlights. The current Pricele capture is not a completed redesign after.
- [ ] Supply measured or observed case-study results only when they exist. No conversion claims are expected or promised.
- [ ] Publish the two concept drafts only after their assets and facts are complete. They are currently excluded from production routes and sitemap.
- [ ] Add real approved testimonials if wanted, then enable the config flag. No testimonial section renders now.
- [ ] Configure an existing Umami instance through NEXT_PUBLIC_UMAMI_SCRIPT_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID if analytics is wanted. Verify actual account event receipt. Nothing loads without both values.
- [ ] Optionally configure env-gated Sentry. Replay is disabled. The existing monitoring tunnel remains available.
- [ ] Confirm the existing Vercel deployment's environment values before merging. Keep the domain and deployment project unchanged. Build again when public env values change.
- [ ] Review the X thread and LinkedIn draft before posting. Drafts were not posted.
- [ ] Recheck on physical devices and with a screen reader if those platforms are part of release validation. Automated Chromium checks do not prove those cases.
- [ ] Track the remaining development-tool npm advisories. Runtime audit is clean; fixing all dev advisories would require dependency decisions, including a Tailwind major change that this refactor avoids.

The current site exposes clear unavailable states for checkout, booking and form delivery when configuration is missing. There is no fake successful purchase or submission. Deploying the branch without those settings creates a review site, not a launch-ready checkout.
