"use client";
import { useEffect } from "react";
const map: Record<string, string> = {
  work: "/work",
  process: "/process",
  pricing: "/pricing",
  "the-shelf": "/projects",
  "the-record-player": "/experience",
  "the-door": "/about#contact",
};
const projects = [
  "miez",
  "commit-ink",
  "sisc",
  "agrobot",
  "pricele",
  "joke-bot",
];
export function LegacyFragments() {
  useEffect(() => {
    function redirect() {
      const hash = location.hash.slice(1);
      const dest =
        map[hash] ||
        (projects.some((slug) => hash === `note-${slug}`)
          ? `/projects#${hash}`
          : undefined);
      if (dest) location.replace(dest);
    }
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);
  return (
    <noscript>
      <div className="service-caption">
        {Object.entries(map).map(([old, dest]) => (
          <p key={old} id={old}>
            <a href={dest}>This section has its own page.</a>
          </p>
        ))}
        {projects.map((slug) => (
          <p key={slug} id={`note-${slug}`}>
            <a href={`/projects#note-${slug}`}>Read the {slug} project.</a>
          </p>
        ))}
      </div>
    </noscript>
  );
}
