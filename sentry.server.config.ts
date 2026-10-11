import * as Sentry from "@sentry/nextjs";
Sentry.init({ dsn: process.env.SENTRY_DSN, enabled: Boolean(process.env.SENTRY_DSN), tracesSampleRate: 0, sendDefaultPii: false, beforeSend(event) { delete event.request; delete event.user; return event; } });
