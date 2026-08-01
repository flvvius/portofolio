"use client";

import type { ReactNode } from "react";

/**
 * Paper things: taped notes, sticky notes, index cards.
 *
 * Every one of these is a physical object, so it obeys the two house rules:
 * a resting rotation between -3deg and +3deg, and either a hairline ink edge
 * or a hard offset shadow — never both, never a blur.
 */

/** Torn masking tape. Decorative, always. */
export function Tape({ className, tilt = 0 }: { className?: string; tilt?: number }) {
  return (
    <span
      aria-hidden="true"
      className={["tape", className].filter(Boolean).join(" ")}
      style={{ transform: `rotate(${tilt}deg)` }}
    />
  );
}

/** A scrap of paper taped to something. */
export function TapedNote({
  children,
  tilt = -2,
  className,
}: {
  children: ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={["relative inline-block", className].filter(Boolean).join(" ")}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Tape className="-top-2.5 left-1/2 -ml-[38px]" tilt={tilt * -1.6} />
      <div className="paper-lift px-4 py-3 font-mono text-caption text-ink-soft">
        {children}
      </div>
    </div>
  );
}

/** The sticky note on the shelf. Slightly heavier stock, no tape. */
export function StickyNote({
  children,
  tilt = 3,
  className,
}: {
  children: ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={[
        "paper-edge max-w-[15rem] px-4 py-3 font-mono text-caption leading-snug text-ink-soft",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </div>
  );
}

/** Ruled index card. Used for notes in the record player section. */
export function IndexCard({
  children,
  tilt = 0,
  className,
}: {
  children: ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden paper-lift px-5 py-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* the ruled line under the heading, and the margin rule */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 w-px bg-ink/15"
      />
      {children}
    </div>
  );
}
