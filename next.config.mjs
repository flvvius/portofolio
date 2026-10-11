import { withSentryConfig } from "@sentry/nextjs/config";

function scriptOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.origin : "";
  } catch {
    return "";
  }
}
const analyticsOrigin = scriptOrigin(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL);
const nextConfig = {
  devIndicators: false,
  images: { formats: ["image/avif", "image/webp"] },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/the-back-room",
        destination: "/about?from=back-room",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""} ${analyticsOrigin}; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' ${analyticsOrigin} https://*.sentry.io; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'`,
          },
        ],
      },
    ];
  },
};
export default withSentryConfig(nextConfig, {
  org: "flavius-cojocaru",
  project: "javascript-nextjs",
  silent: true,
  tunnelRoute: "/monitoring",
  webpack: { treeshake: { removeDebugLogging: true } },
});
