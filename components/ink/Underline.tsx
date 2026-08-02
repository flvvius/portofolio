import { InkArt } from "@/components/art/ink";

/**
 * The hand-drawn rule under a nav item.
 *
 * Static path data rather than rough.js: there are five of these sitting in the
 * header on every page, and re-rolling five random paths on mount (and again on
 * every resize) to draw five 90px lines is not a trade worth making. Four
 * pre-drawn waves, picked by position, buy the same "nobody used a ruler"
 * without any of it.
 *
 * Stretched with preserveAspectRatio="none", so it takes the width of whatever
 * word it sits under. That is also why it opts out of the wobble filter: a
 * displacement map smears badly once the two axes have different scales. It is
 * also why the stroke is non-scaling: a long label and a short one have to come off
 * the same nib.
 */
const STROKES = [
  "M1 3.2C18 1.6 38 4.3 56 2.4 74 0.9 88 3.4 99 2.2",
  "M1 2.4C20 4.2 40 1.4 58 3.2 76 4.7 90 2.1 99 3.5",
  "M1 3.7C16 2.1 34 4.5 52 2.6 72 1.2 86 3.9 99 2.5",
  "M1 2.7C22 4.5 42 1.7 60 3.6 78 5.1 88 2.3 99 3.1",
];

export function HandUnderline({
  seed = 0,
  className,
}: {
  /** Which of the four strokes to use. Anything integer-ish works. */
  seed?: number;
  className?: string;
}) {
  return (
    <InkArt
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className={["ink-art-plain", className].filter(Boolean).join(" ")}
    >
      <path
        d={STROKES[Math.abs(Math.trunc(seed)) % STROKES.length]}
        strokeWidth={1.6}
      />
    </InkArt>
  );
}
