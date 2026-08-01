"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { CuckooClock } from "@/components/art/Logo";

/**
 * Anchored nav. The active link is the only orange thing up here, which is the
 * whole rule of the site in miniature: orange means "this, right here".
 */
export function Nav() {
  const [active, setActive] = useState(nav[0].href.slice(1));

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever tracked section covers the most of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <a
          href="#the-bar"
          className="flex items-center gap-2.5 no-underline"
          aria-label={`${site.name} — back to the top`}
        >
          <CuckooClock className="h-10 w-auto shrink-0 text-ink sm:h-12" />
          <span
            aria-hidden="true"
            className="hidden font-hand text-lg leading-[0.95] text-ink-soft sm:block"
          >
            flavius
            <br />
            studio
          </span>
        </a>

        {/*
          Five items no longer fit on a phone. Scrolling sideways keeps the nav
          on one line and the header short; wrapping would eat three lines of a
          sticky bar on the smallest screens.
        */}
        <nav aria-label="sections" className="min-w-0 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-4 whitespace-nowrap sm:gap-7">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "font-mono text-caption transition-colors duration-[180ms] sm:text-[0.95rem]",
                      "underline-offset-[6px] hover:text-accent hover:underline hover:decoration-2",
                      isActive
                        ? "text-accent underline decoration-2"
                        : "text-ink-soft no-underline",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* the counter line the whole page hangs from */}
      <div aria-hidden="true" className="h-px w-full bg-ink/15" />
    </header>
  );
}
