import type { ReactNode } from "react";
import { Rise } from "@/components/ink/Rise";

/** The 12-column grid everything sits on — including the things that break it. */
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
 * The numbered tag above a section title — "02. projects".
 *
 * It exists to do the one job the poetic titles can't: tell you plainly what
 * you are looking at, and where you are in the sequence. Orange, because it is
 * a wayfinding mark; underscored with a dashed rule so it reads as a tab on a
 * divider rather than a link.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-block border-b border-dashed border-accent/60 pb-1",
        "font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

/**
 * Section title + the three-line mono intro that always follows it.
 * WONK is off here — the hero keeps the wobble to itself.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro: string[];
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:text-right" : undefined}>
      {eyebrow && (
        <Rise className="mb-4 block">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Rise>
      )}
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
