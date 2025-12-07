import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://flavius.pro";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/*"],
        disallow: [
          "/api/*",
          "/_next/*",
          "/sentry-example-page",
          "/*.json$",
          "/private/*",
        ],
      },
      // Specific rules for Googlebot
      {
        userAgent: "Googlebot",
        allow: ["/", "/blog", "/blog/*"],
        disallow: ["/api/*", "/_next/*", "/sentry-example-page"],
      },
      // Block AI scrapers if you want (optional - remove if you want AI to index)
      // {
      //   userAgent: "GPTBot",
      //   disallow: ["/"],
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
