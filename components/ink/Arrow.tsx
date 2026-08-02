"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#D96B2B";
const INK_SOFT = "#5C4F43";

/**
 * Hand-drawn pointing arrows, generated with rough.js rather than hand-authored
 * path data, so the wobble is real rather than my impression of wobble.
 *
 * Two tones, and the difference is load-bearing:
 *   accent: points at something you can click. Orange is a promise.
 *   ink:    points at something you should read. Used for the annotations
 *            around the shelf, where six orange arrows would spend the entire
 *            page's supply of orange on captions.
 *
 * They are always aria-hidden, and the thing being pointed at carries its own
 * accessible label.
 */

type Variant = "down-right" | "down-left" | "right" | "left" | "up-right";

export type Tone = "accent" | "ink";

type Preset = {
  viewBox: string;
  /** The shaft. */
  d: string;
  /** Arrowhead: barb → tip → barb. */
  head: [number, number][];
};

const PRESETS: Record<Variant, Preset> = {
  "down-right": {
    viewBox: "0 0 70 62",
    d: "M5 7C26 3 50 16 56 44",
    head: [
      [47, 40],
      [57, 51],
      [63, 38],
    ],
  },
  "down-left": {
    viewBox: "0 0 70 62",
    d: "M65 7C44 3 20 16 14 44",
    head: [
      [7, 38],
      [13, 51],
      [23, 40],
    ],
  },
  right: {
    viewBox: "0 0 84 34",
    d: "M4 21C24 9 52 9 75 16",
    head: [
      [66, 9],
      [78, 17],
      [67, 25],
    ],
  },
  left: {
    viewBox: "0 0 84 34",
    d: "M80 21C60 9 32 9 9 16",
    head: [
      [18, 9],
      [6, 17],
      [17, 25],
    ],
  },
  "up-right": {
    viewBox: "0 0 70 62",
    d: "M5 55C26 59 50 46 56 18",
    head: [
      [47, 22],
      [57, 11],
      [63, 24],
    ],
  },
};

export function Arrow({
  variant = "down-right",
  seed = 7,
  tone = "accent",
  className,
}: {
  variant?: Variant;
  /** Fixed seed keeps the wobble identical between server and client renders. */
  seed?: number;
  tone?: Tone;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const preset = PRESETS[variant];

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let cancelled = false;

    // The catch is the point: if the roughjs chunk never arrives, the arrow
    // stays an empty decorative <svg>, which is a drawing nobody sees rather
    // than an unhandled rejection in everyone's console.
    void (async () => {
      const { default: rough } = await import("roughjs");
      if (cancelled || !ref.current) return;

      const rc = rough.svg(ref.current);
      const options = {
        stroke: tone === "ink" ? INK_SOFT : ACCENT,
        // Annotation arrows are lighter, since they sit next to body copy, not
        // next to a call to action.
        strokeWidth: tone === "ink" ? 1.3 : 1.9,
        roughness: 1.5,
        bowing: 1.4,
        seed,
      };

      const shaft = rc.path(preset.d, options);
      const head = rc.linearPath(preset.head, { ...options, seed: seed + 1 });

      ref.current.replaceChildren(shaft, head);
    })().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [preset, seed, tone]);

  return (
    <svg
      ref={ref}
      viewBox={preset.viewBox}
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    />
  );
}

/**
 * An arrow with a handwritten word next to it. Never more than a few words.
 */
export function ScribbleNote({
  children,
  variant = "down-right",
  seed = 7,
  tone = "accent",
  arrowClassName = "w-12",
  className,
  /** Put the label before the arrow instead of after. */
  labelFirst = false,
  /**
   * Stack the arrow under the label instead of beside it. For notes written
   * directly above the thing they point at, where a sideways arrow would
   * leave the label centred on the object and the arrow pointing past it.
   */
  stack = false,
  /**
   * Off for the few notes that are the only copy describing the thing they
   * point at (the shelf captions). The arrow hides itself either way.
   */
  decorative = true,
}: {
  children: React.ReactNode;
  variant?: Variant;
  seed?: number;
  tone?: Tone;
  arrowClassName?: string;
  className?: string;
  labelFirst?: boolean;
  stack?: boolean;
  decorative?: boolean;
}) {
  const label =
    tone === "ink" ? (
      // Ink annotations are the quiet ones: smaller, softer, no accent. Same
      // hand as everything else, just said under the breath.
      <span className="font-mono text-[0.78rem] leading-snug text-ink-soft">
        {children}
      </span>
    ) : (
      <span className="font-hand text-xl leading-none text-accent sm:text-2xl">
        {children}
      </span>
    );
  const arrow = (
    <Arrow variant={variant} seed={seed} tone={tone} className={arrowClassName} />
  );

  return (
    <span
      aria-hidden={decorative ? "true" : undefined}
      className={[
        "pointer-events-none inline-flex",
        stack ? "flex-col items-center gap-1" : "items-end gap-1.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {labelFirst ? (
        <>
          {label}
          {arrow}
        </>
      ) : (
        <>
          {arrow}
          {label}
        </>
      )}
    </span>
  );
}
