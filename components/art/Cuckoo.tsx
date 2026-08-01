import { InkArt, Hatch, PAPER_WARM } from "./ink";

/**
 * The mascot. A small, slightly smug cuckoo drawn in one continuous-ish line.
 *
 * It appears in exactly five places and nowhere else: the logo lockup, the
 * door section (headphones), the 404 page (shrugging), the favicon, and the
 * console. It is a wink, not a brand character.
 */

/** Shared anatomy so the three poses are unmistakably the same bird. */
function Body() {
  return (
    <>
      {/* body + head, one blob, deliberately lopsided */}
      <path d="M20.5 21.5C24 13.2 40 12.4 44.2 21.2c3.6 5.8 3 12.8 1 18.6-2.8 8.2-12.6 12.2-20.6 9.4C16.3 46.4 13.2 37.4 15.2 30c.9-3.4 2.9-6.2 5.3-8.5Z" />
      {/* beak */}
      <path d="M44 24.3 54.8 27.4 44.4 30.8" />
      {/* eye */}
      <circle cx="38.6" cy="23.8" r="1.7" fill="currentColor" stroke="none" />
      {/* crest — two tufts, uneven */}
      <path d="M29.6 13.4c-1.2-4.8 1.4-7.2 3.6-5.4" />
      <path d="M35.2 12.2c-.6-5 2.4-7 4.4-4.6" />
      {/* wing */}
      <path d="M23.6 30.2c5-3.2 12.2-2 15.4 3-3.2 5-10.4 6-15.4 2.6" />
      <Hatch d="M27 31.4 30.4 35M30.6 30.8 34 34.4M34.2 30.8 36.8 33.6" />
      {/* belly shading */}
      <Hatch d="M22 41.4 26 45.8M25.6 40.6 29.8 45.2M29.6 40.4 33.4 44.4" />
      {/* tail */}
      <path d="M15.4 33c-6 .2-11 3.4-13.8 8.2 5 1.2 11 .2 15-2.2" />
      {/* legs */}
      <path d="M26.8 49.8v7.4M23.4 58.4 26.8 57.2 30.2 58.6" />
      <path d="M35 48.4v7.6M31.6 57.2 35 56 38.4 57.4" />
    </>
  );
}

export function Cuckoo({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 60 62" className={className}>
      <Body />
    </InkArt>
  );
}

/** The door section. Same bird, listening to something loud. */
export function CuckooHeadphones({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 60 62" className={className}>
      <Body />
      {/*
        Side profile, so exactly one ear cup is visible — and it sits behind
        the eye, over where an ear would actually be. Anywhere further forward
        and it covers the face, which is the whole readability of the doodle.
      */}
      <path d="M21 23.4C21.6 11.6 38.6 9.4 43.4 17.4" />
      <path d="M19.2 23.6h5.4c1.2 0 2.2 1 2.2 2.2v6.6c0 1.2-1 2.2-2.2 2.2h-5.4c-1.2 0-2.2-1-2.2-2.2v-6.6c0-1.2 1-2.2 2.2-2.2Z" fill={PAPER_WARM} />
      <path d="M22 21.4v2.2" />
      {/* two small notes, because he is enjoying it */}
      <path d="M49 15.4v-6l4.6-1.4v6" />
      <circle cx="47.6" cy="15.8" r="1.5" />
      <circle cx="52.2" cy="14.2" r="1.5" />
    </InkArt>
  );
}

/** The 404 page. Wings up, no idea. */
export function CuckooShrug({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 76 66" className={className}>
      <g transform="translate(8, 2)">
        {/* body, minus the folded wing — the wings are out */}
        <path d="M20.5 21.5C24 13.2 40 12.4 44.2 21.2c3.6 5.8 3 12.8 1 18.6-2.8 8.2-12.6 12.2-20.6 9.4C16.3 46.4 13.2 37.4 15.2 30c.9-3.4 2.9-6.2 5.3-8.5Z" />
        <path d="M44 24.3 54.8 27.4 44.4 30.8" />
        <circle cx="38.6" cy="24.6" r="1.7" fill="currentColor" stroke="none" />
        {/* raised eyebrow, singular */}
        <path d="M36 19.6c1.6-1.4 3.8-1.4 5.4 0" />
        <path d="M29.6 13.4c-1.2-4.8 1.4-7.2 3.6-5.4" />
        <path d="M35.2 12.2c-.6-5 2.4-7 4.4-4.6" />
        {/* wings, up and out */}
        <path d="M17.4 31c-6.4-1.4-11.2-5.6-13-11.6" />
        <path d="M4.4 19.4c-1.4 1.6-3.2 2.4-5.2 2.2M4.4 19.4c-.4-2 0-4 1.2-5.6" />
        <path d="M45.2 32.6c6.4-1.2 11.4-5 13.4-11" />
        <path d="M58.6 21.6c1.4 1.6 3.2 2.2 5.2 2M58.6 21.6c.2-2-.4-3.9-1.6-5.4" />
        <Hatch d="M22 41.4 26 45.8M25.6 40.6 29.8 45.2M29.6 40.4 33.4 44.4" />
        <path d="M15.4 33c-6 .2-11 3.4-13.8 8.2 5 1.2 11 .2 15-2.2" />
        <path d="M26.8 49.8v7.4M23.4 58.4 26.8 57.2 30.2 58.6" />
        <path d="M35 48.4v7.6M31.6 57.2 35 56 38.4 57.4" />
      </g>
    </InkArt>
  );
}
