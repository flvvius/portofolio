"use client";
import { useEffect } from "react";
const map: Record<string, string> = {
  "the-shelf": "projects",
  "the-record-player": "experience",
  "the-door": "contact",
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
        (projects.some((slug) => hash === `note-${slug}`) ? hash : undefined);
      if (dest) location.replace(`/about#${dest}`);
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
            <a href={`/about#${dest}`}>The portfolio moved to About.</a>
          </p>
        ))}
        {projects.map((slug) => (
          <p key={slug} id={`note-${slug}`}>
            <a href={`/about#note-${slug}`}>
              Read the {slug} project on About.
            </a>
          </p>
        ))}
      </div>
    </noscript>
  );
}
