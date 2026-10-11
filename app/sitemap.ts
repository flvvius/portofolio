import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blog";
import { studies } from "@/data/work";
import { serviceConfig } from "@/lib/service/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = serviceConfig.origin.replace(/\/$/, "");
  return [
    "",
    "/work",
    "/process",
    "/pricing",
    "/faq",
    "/projects",
    "/experience",
    "/about",
    "/blog",
    "/privacy",
    "/terms",
    ...getAllBlogPosts().map((post) => `/blog/${post.id}`),
    ...studies
      .filter((study) => !study.draft)
      .map((study) => `/work/${study.slug}`),
  ].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
