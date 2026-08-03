"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Marks that draw themselves when they scroll into view.
 *
 * These are the counterpart to `Scribble`, not a replacement for it. Scribble
 * wraps rough.js, which measures the box it has been given and rolls a fresh
 * wobbly path to fit — worth its runtime when the thing being marked is a run
 * of prose whose width nobody can know in advance.
 *
 * Everything here is the other case: a mark whose shape is fixed and known, on
 * an element whose size is set in the layout. A ring round a number is always
 * the same ring. So the path is authored once, and the only thing left at
 * runtime is one class.
 *
 * The whole set leans on `pathLength="1"`. An SVG path carrying that attribute
 * reports itself as one unit long no matter what its real geometry is, so
 * `stroke-dasharray: 1; stroke-dashoffset: 1` hides any of these lines
 * completely and animating the offset to zero draws it — a 40px strike and a
 * 600px trail off exactly the same two declarations. Nothing has to measure
 * anything. (See `.draw-in` in globals.css.)
 */

/**
 * Adds `is-drawn` the first time the element is on screen.
 *
 * Fails open, twice over: with no IntersectionObserver the mark is drawn on the
 * next frame, and the class only ever *adds* ink. A mark that never gets its
 * class is a mark nobody sees, which is the acceptable failure. A mark that
 * needs the class to become visible would be a word silently missing its line.
 */
function useDrawnOnScroll<T extends SVGElement>() {
  const ref = useRef<T>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || drawn) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [drawn]);

  return { ref, className: drawn ? "draw-in is-drawn" : "draw-in" };
}

/** Per-mark timing, handed to the transition in globals.css. */
function timing(delay: number, duration: number) {
  return {
    "--draw-delay": `${delay}ms`,
    "--draw-duration": `${duration}ms`,
  } as CSSProperties;
}

/*
 * Stretched marks (`Squiggle`, `Strike`, `Trail`) take the width of whatever
 * they sit under, which means `preserveAspectRatio="none"` and therefore two
 * axes at different scales. That rules out the shared pencil filter, since a
 * displacement map smears badly once the axes disagree.
 *
 * What it also rules out — and this cost an hour, so it is written down —
 * is `vector-effect: non-scaling-stroke`, which everything else drawn on this
 * site uses. Chrome will honour `pathLength` or `non-scaling-stroke` for dash
 * purposes, but not both: with the vector effect on, `stroke-dasharray: 1`
 * resolves to one *screen pixel* instead of the whole normalised path, and the
 * mark renders as a row of dashes with the gaps landing wherever. Computed
 * style reports `1px` either way, so this is only visible on screen.
 *
 * So these marks scale their own stroke. Which turns out to be the behaviour
 * you want anyway: the weight of an underline tracks the size of the type it
 * is under, and the stroke widths below are set in viewBox units to land near
 * the site's nib once that scaling has happened.
 */
const STRETCHED = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
};

/**
 * The wave under a word. Four strokes, picked by seed, so three of these in a
 * paragraph don't come out identical.
 */
const WAVES = [
  "M1 4.1C17 1.9 37 5.4 55 3.1 73 1.2 87 4.6 99 2.8",
  "M1 3.0C21 5.3 41 1.6 59 4.0 77 6.0 91 2.4 99 4.3",
  "M1 4.6C15 2.3 35 5.7 53 3.2 73 1.1 87 4.9 99 3.0",
  "M1 2.9C23 5.6 43 1.8 61 4.5 79 6.4 89 2.5 99 3.7",
];

export function Squiggle({
  seed = 0,
  delay = 300,
  duration = 700,
  className,
}: {
  seed?: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, className: drawClass } = useDrawnOnScroll<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={["pointer-events-none block", className]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        {...STRETCHED}
        pathLength={1}
        className={drawClass}
        style={timing(delay, duration)}
        strokeWidth={1.9}
        d={WAVES[Math.abs(Math.trunc(seed)) % WAVES.length]}
      />
    </svg>
  );
}

/**
 * A word with the wave drawn under it.
 *
 * The squiggle is absolutely positioned inside an inline-block, so it takes the
 * width of the word and nothing else — no measuring, no resize listener, and no
 * layout of its own to shift. `-bottom-[0.06em]` and the em-height keep it
 * proportional to the type it is marking, so the same component sits correctly
 * under a 7rem headline and a 1.26rem caption.
 */
export function Marked({
  children,
  seed = 0,
  delay = 300,
  duration = 700,
}: {
  children: React.ReactNode;
  seed?: number;
  delay?: number;
  duration?: number;
}) {
  return (
    <span className="relative inline-block">
      {children}
      {/*
        `w-full` is not decoration on top of `inset-x-0`, it is the thing doing
        the work. An <svg> is a replaced element, so pinning both edges does not
        stretch it the way it would a div — with `width: auto` it keeps its own
        intrinsic size and sits there at whatever that is, which is how you get
        one underline length for every word on the page.
      */}
      <Squiggle
        seed={seed}
        delay={delay}
        duration={duration}
        className="absolute inset-x-0 -bottom-[0.06em] h-[0.16em] w-full text-accent"
      />
    </span>
  );
}

/**
 * The line through a word that has been crossed off.
 *
 * Decorative on purpose: it is positioned over an `<s>`, which already tells a
 * screen reader the word is struck, and the list it belongs to says so again in
 * its own heading. The drawing is never the only thing carrying that meaning,
 * which is also why it is safe for it to be the thing that animates.
 */
export function Strike({
  seed = 0,
  delay = 0,
  duration = 420,
  className,
}: {
  seed?: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, className: drawClass } = useDrawnOnScroll<SVGSVGElement>();

  // Struck a touch off-level, and off-level in both directions, so a stack of
  // six doesn't come out looking ruled.
  const lift = seed % 2 === 0 ? 1 : -1;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      // `w-full` for the same reason as the squiggle: a replaced element does
      // not stretch to its insets, so without it every word gets the same
      // 144px of strike whatever its actual length.
      className={["pointer-events-none absolute inset-x-0 block w-full", className]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        {...STRETCHED}
        pathLength={1}
        className={drawClass}
        style={timing(delay, duration)}
        strokeWidth={1.7}
        d={`M0.5 ${5 + lift * 1.3}C24 ${5 - lift * 1.8} 48 ${
          5 + lift * 1.9
        } 72 ${5 - lift * 1.2}C84 ${5 - lift * 0.6} 92 ${5 + lift * 0.9} 99.5 ${
          5 + lift * 0.4
        }`}
      />
    </svg>
  );
}

/**
 * The ring round a step number. Not a circle: four uneven arcs closing on
 * themselves a little past where they started, the way you'd draw one without
 * lifting the pen.
 */
export function StepRing({
  delay = 120,
  duration = 500,
  className,
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, className: drawClass } = useDrawnOnScroll<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      viewBox="0 0 52 52"
      aria-hidden="true"
      focusable="false"
      className={["pointer-events-none absolute inset-0 block", className]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2.4}
        pathLength={1}
        className={drawClass}
        style={timing(delay, duration)}
        d="M33 5.2C43.5 8 49.2 16.5 48.6 26.8 48 37.5 40.4 45.8 29.4 47.2 18.6 48.6 8.4 43 4.8 33.4 1.1 23.4 4.6 12.4 13.8 7.2 18.4 4.6 24 3.7 30.2 4.6"
      />
    </svg>
  );
}

/**
 * The line running between the three steps.
 *
 * The viewBox is 169 x 100 because that is the aspect the steps block actually
 * comes out at on a wide screen, and matching it is what keeps the two axes
 * scaling by the same factor — which matters here more than anywhere else in
 * this file, since a stretched stroke on a long diagonal is the one place the
 * unevenness would be obvious. (These marks scale their own stroke; see above.)
 *
 * The path is fitted to where the rings actually land, measured rather than
 * guessed: step one sits top-left, two right and a third of the way down, three
 * back in the middle at three quarters. It leaves the first ring travelling
 * flat, so it passes *over* step one's copy rather than through it, and only
 * starts falling once it is clear of the text.
 */
export function Trail({
  delay = 200,
  duration = 1400,
  className,
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { ref, className: drawClass } = useDrawnOnScroll<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      viewBox="0 0 169 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={["pointer-events-none block", className].filter(Boolean).join(" ")}
    >
      <path
        {...STRETCHED}
        pathLength={1}
        className={drawClass}
        style={timing(delay, duration)}
        strokeWidth={0.32}
        opacity={0.45}
        d="M10 5C44 5 74 12 108 33C118 42 108 52 93 58C79 64 71 67 64 70"
      />
    </svg>
  );
}
