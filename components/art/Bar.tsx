import { InkArt, Hatch, PAPER, PAPER_WARM } from "./ink";

/**
 * The door section's furniture: a sketched bar counter and the coasters
 * stacked on it.
 *
 * The four social glyphs are hand-drawn here rather than pulled from an icon
 * set on purpose. Every other line on this site comes from the same pen, and
 * dropping in a cleaner third-party set is exactly the mismatch the
 * illustration protocol exists to prevent.
 */

export function Counter({ className }: { className?: string }) {
  return (
    <InkArt
      viewBox="0 0 1000 64"
      preserveAspectRatio="none"
      className={["ink-art-plain", className].filter(Boolean).join(" ")}
    >
      {/* counter top, with the near edge slightly proud */}
      <path d="M4 6.5 996 3.5l1 13L3 20Z" fill={PAPER_WARM} />
      <path d="M3 20 997 16.5l1 8L2 28Z" fill={PAPER} />
      {/*
        The front of the counter, cross-hatched like a woodcut. The strokes are
        deliberately uneven in spacing and length, because this SVG is stretched, so it
        can't take the wobble filter and has to earn its hand-drawn feel here.
      */}
      <Hatch d="M40 60 74 32M92 62 130 28M150 58 182 33M204 62 242 30M258 59 292 34M318 62 352 31M370 57 406 32M430 62 466 29M484 60 518 33M542 62 578 31M596 58 630 34M654 62 690 30M708 59 744 32M764 62 800 28M820 57 854 33M878 62 914 31M932 60 968 32" opacity={0.32} />
    </InkArt>
  );
}

type Glyph = "github" | "x" | "linkedin" | "email";

function GlyphArt({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case "github":
      return (
        <>
          {/* the octocat, reduced to a head and one arm */}
          <path d="M28 39.4c-6.4 1.6-8-2.8-10.4-3.6M17.6 46.6c0-3 .2-5 1.6-6.6-4.6-.6-9-2.4-9-10.2 0-2.2.8-4 2-5.4-.4-1.2-.6-3.4.2-5.6 0 0 1.8-.6 6 2.2a20 20 0 0 1 10.6 0c4.2-2.8 6-2.2 6-2.2.8 2.2.6 4.4.2 5.6 1.2 1.4 2 3.2 2 5.4 0 7.8-4.4 9.6-9 10.2 1.4 1.4 1.8 3.2 1.8 5.6v4" />
        </>
      );
    case "x":
      return (
        <>
          <path d="M13.4 13.6 32.2 40.2M32.6 13.4 13 40.4" />
        </>
      );
    case "linkedin":
      return (
        <>
          <path d="M13.5 21.6v18.8M18.5 40.4V21.6M18.5 27.4c1-3.6 4-5.8 7.4-5.6 4 .2 6.6 3 6.6 7.2v11.4" />
          <circle cx="13.5" cy="14.6" r="2.4" fill="currentColor" stroke="none" />
        </>
      );
    case "email":
      return (
        <>
          <path d="M9.5 19.6c0-1.5 1.2-2.7 2.7-2.6l21.6.4c1.5 0 2.6 1.3 2.6 2.8l-.4 15.4c0 1.5-1.3 2.7-2.8 2.6l-21.4-.4c-1.5 0-2.7-1.3-2.6-2.8Z" fill={PAPER} />
          <path d="M9.8 20.4 23 30.6 36.4 21" />
        </>
      );
  }
}

/**
 * A coaster. Pulpboard circle, slightly out of round, with the glyph pressed
 * into the top half. The bottom half is left clear for the real text label
 * that sits over it. Tilt and hover colour come from the `.coaster` class.
 */
export function Coaster({
  glyph,
  className,
}: {
  glyph: Glyph;
  className?: string;
}) {
  return (
    <InkArt viewBox="0 0 92 92" className={className}>
      {/* outer edge, four arcs of slightly different radius */}
      <path d="M46 4.5c22.6 0 41.2 18.4 41.5 41 .3 22.8-18.4 42-41 42.5-23 .5-42.2-18.4-42-41.5C4.7 23.2 23.2 4.5 46 4.5Z" fill={PAPER_WARM} />
      {/* pressed rim */}
      <path d="M46 10.5c19.4 0 35.3 15.8 35.5 35.2.2 19.6-15.8 36-35.4 36.3C26.4 82.2 10.6 66 10.5 46.4 10.4 26.6 26.2 10.5 46 10.5Z" opacity="0.45" strokeWidth={1.1} />
      <g transform="translate(23, 10) scale(0.86)">
        <GlyphArt glyph={glyph} />
      </g>
    </InkArt>
  );
}
