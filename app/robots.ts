import type { MetadataRoute } from "next";
import { serviceConfig } from "@/lib/service/config";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/styleguide", "/audit/start"] }, sitemap: new URL("/sitemap.xml", serviceConfig.origin).href }; }
