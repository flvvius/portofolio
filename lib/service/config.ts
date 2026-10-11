function https(value?: string) {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : undefined; } catch { return undefined; }
}

export const serviceConfig = {
  origin: https(process.env.NEXT_PUBLIC_SITE_URL) || "https://flavius.pro/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hi@flavius.pro",
  stripe: https(process.env.NEXT_PUBLIC_STRIPE_AUDIT_URL),
  cal: https(process.env.NEXT_PUBLIC_CAL_URL),
  method: https(process.env.NEXT_PUBLIC_METHOD_URL),
  github: https(process.env.NEXT_PUBLIC_GITHUB_URL),
  x: https(process.env.NEXT_PUBLIC_X_URL),
  linkedin: https(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  analyticsScript: https(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL),
  analyticsId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
};

export const formsConfigured = Boolean(process.env.RESEND_API_KEY && process.env.FORM_FROM_EMAIL && process.env.FORM_TO_EMAIL);
