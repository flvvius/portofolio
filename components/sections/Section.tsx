import type { ReactNode } from "react";
import { Rise } from "@/components/ink/Rise";

/** The 12-column grid everything sits on, including the things that break it. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["mx-auto w-full max-w-[1180px] px-5 sm:px-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      // Half the rhythm on each side, so the gap *between* two sections lands
      // on the spec's 96 / 160 rather than double it.
      className={["py-12 lg:py-20", className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * Section title + the three-line mono intro that always follows it.
 * WONK is off here, so the hero keeps the wobble to itself.
 */
export function SectionHead({
  title,
  intro,
  align = "left",
}: {
  title: string;
  intro: string[];
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:text-right" : undefined}>
      <Rise as="h2" className="font-display-section text-section text-ink">
        {title}
      </Rise>
      <Rise delay={60} className="mt-5">
        <p
          className={[
            "measure font-mono text-ink-soft",
            align === "right" ? "sm:ml-auto" : "",
          ].join(" ")}
        >
          {intro.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Rise>
    </div>
  );
}
