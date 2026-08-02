import type { ReactElement } from "react";
import { InkArt, Hatch, ACCENT, INK, PAPER, PAPER_WARM } from "./ink";
import type { ShelfObjectKind } from "@/data/site";

/**
 * Six things standing on a shelf. Each one is drawn at the proportions it
 * would actually have leaning against a wall, so the row reads as objects of
 * different heights rather than icons in a grid.
 *
 * One object per project, never a repeat: two identical drawings on one plank
 * stop reading as two things and start reading as a pattern.
 */

function RecordSleeve() {
  return (
    <InkArt viewBox="0 0 132 112" className="h-full w-auto">
      {/* the record, half out of the sleeve to the right */}
      <circle cx="90" cy="58" r="34" fill={INK} stroke="none" />
      <circle cx="90" cy="58" r="26" stroke={PAPER_WARM} strokeWidth={0.8} opacity="0.3" />
      <circle cx="90" cy="58" r="19" stroke={PAPER_WARM} strokeWidth={0.8} opacity="0.22" />
      <circle cx="90" cy="58" r="11" fill={ACCENT} stroke="none" />
      <circle cx="90" cy="58" r="1.6" fill={PAPER_WARM} stroke="none" />
      <circle cx="90" cy="58" r="34" />

      {/* sleeve, a square that never quite was */}
      <path d="M5.5 12.5 94 10.6l2 96.4L7.5 108.5Z" fill={PAPER_WARM} />
      {/* opening along the right edge, where the record slid out */}
      <path d="M94 10.6 96 107" opacity="0.5" strokeWidth={1.1} />
      {/* sleeve art: a horizon and a sun, minimal on purpose */}
      <path d="M15 76c14-17 30-17 44-2.5s18 13 26 8" />
      <circle cx="36" cy="45" r="10" />
      <Hatch d="M12 100 23 89M12 91 21 82M19 102 29 92M26 103 35 94" />
    </InkArt>
  );
}

function BookSpine() {
  return (
    <InkArt viewBox="0 0 44 118" className="h-full w-auto">
      {/* pages, offset behind the cover */}
      <path d="M12 8.5h26.5c1.4 0 2.5 1.1 2.5 2.5v96c0 1.4-1.1 2.5-2.5 2.5H12Z" fill={PAPER} />
      <Hatch d="M35 16v88M38 18v84" opacity={0.4} />
      {/* cover */}
      <path d="M5.5 9c0-1.7 1.3-3 3-3l17.5.4c1.6 0 2.9 1.4 2.9 3l-.7 100c0 1.7-1.4 3-3 3l-17.4-.4c-1.7 0-3-1.4-3-3Z" fill={PAPER_WARM} />
      {/* title bands */}
      <path d="M8.5 26.5 26 27M8.5 32 22.5 32.4" />
      <path d="M8 88.5 26 89" />
      <Hatch d="M9 66 24 66.4M9 72 20 72.3M9 78 24 78.4" />
    </InkArt>
  );
}

function Cassette() {
  return (
    <InkArt viewBox="0 0 112 74" className="h-full w-auto">
      <path d="M5.5 8c0-1.9 1.5-3.4 3.4-3.4l94.2 1c1.8 0 3.3 1.5 3.3 3.4l-.6 56c0 1.9-1.6 3.4-3.5 3.4l-94-1c-1.9 0-3.4-1.6-3.4-3.5Z" fill={PAPER_WARM} />
      {/* label */}
      <path d="M14 12.5 98 13.2l-.4 26L13.6 38.5Z" fill={PAPER} />
      <path d="M20 22.5 74 23M20 30 58 30.4" opacity="0.6" strokeWidth={1.1} />
      {/* reels */}
      <circle cx="36" cy="52" r="11" />
      <circle cx="36" cy="52" r="4.5" />
      <circle cx="76" cy="52.5" r="11" />
      <circle cx="76" cy="52.5" r="4.5" />
      {/* tape between them */}
      <path d="M47 50.5c8-2.4 17-2.4 25 0" />
      {/* window ledge + screws */}
      <path d="M25 63.5 87 64" opacity="0.5" strokeWidth={1.1} />
      <circle cx="12.5" cy="59" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="99" cy="60" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="99.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </InkArt>
  );
}

function CoffeeBag() {
  return (
    <InkArt viewBox="0 0 76 106" className="h-full w-auto">
      {/* body, wider at the base like a bag that has been stood up */}
      <path d="M12.5 24 63 22.5l4 76.5c.1 2.2-1.6 4-3.8 4L14 101.6c-2.1 0-3.8-1.8-3.7-4Z" fill={PAPER_WARM} />
      {/* rolled top, folded twice */}
      <path d="M12.5 24 15 13.4l46-1.4 2 10.5" fill={PAPER} />
      <path d="M15 13.4 61 12" opacity="0.55" strokeWidth={1.1} />
      {/* tin tie */}
      <path d="M22 8.6 54 7.6" />
      {/* label */}
      <path d="M22 44.5 56 43.8l.8 22-34.4.7Z" fill={PAPER} />
      <path d="M28 54 48 53.6" opacity="0.7" strokeWidth={1.1} />
      <circle cx="39.4" cy="49" r="2.4" />
      {/* degassing valve */}
      <circle cx="55" cy="34" r="3.4" />
      <Hatch d="M18 92 28 82M18 84.5 26 76.5M24 94 34 84" />
    </InkArt>
  );
}

function Notebook() {
  return (
    <InkArt viewBox="0 0 84 110" className="h-full w-auto">
      {/* pages behind */}
      <path d="M20 9 74 7.6c2 0 3.6 1.5 3.6 3.5l.4 91c0 2-1.6 3.6-3.6 3.6L20 106.4Z" fill={PAPER} />
      {/* cover */}
      <path d="M17 10.4c0-1.9 1.5-3.4 3.4-3.4l48 .6c1.9 0 3.4 1.6 3.4 3.5l-.6 90c0 1.9-1.6 3.4-3.5 3.4l-48-.6c-1.9 0-3.4-1.6-3.4-3.5Z" fill={PAPER_WARM} />
      {/* spiral binding */}
      <path d="M20 18c-5.5.4-8 2-8 4.4s2.6 3.6 8 3.6" />
      <path d="M20 34c-5.5.4-8 2-8 4.4s2.6 3.6 8 3.6" />
      <path d="M20 50c-5.5.4-8 2-8 4.4s2.6 3.6 8 3.6" />
      <path d="M20 66c-5.5.4-8 2-8 4.4s2.6 3.6 8 3.6" />
      <path d="M20 82c-5.5.4-8 2-8 4.4s2.6 3.6 8 3.6" />
      {/* elastic closure */}
      <path d="M58 8.2 57.4 104" strokeWidth={2.2} />
      {/* a label someone wrote on and never updated */}
      <path d="M26 40.5 50 40l.4 16-24.4.5Z" fill={PAPER} />
      <path d="M30 47.5 45 47.2M30 52 40 51.8" opacity="0.65" strokeWidth={1.1} />
    </InkArt>
  );
}

/**
 * The tip jar. Glass, so it takes the lighter paper and the coins show through
 * it; every other object here is the warmer stock.
 *
 * No orange on the coins, however much they ask for it. The record label is
 * the only orange fill on the site and it stays that way.
 */
function TipJar() {
  return (
    <InkArt viewBox="0 0 74 98" className="h-full w-auto">
      {/* the lid, and the screw band under it */}
      <path d="M20.8 6.6 53.4 5.8l.9 9-34.3.9Z" fill={PAPER_WARM} />
      <path d="M21.4 15.6 53.6 14.8" opacity="0.5" strokeWidth={1.1} />

      {/* neck, shoulders, then straight down to the base it stands on */}
      <path
        d="M21.2 15.4 20.6 22.6c-4.4 3-8.4 7-9 12.6-1.2 18-.8 37 .6 54.6l49.2-.6c1.4-17.4 1.6-36.4.6-54.4-.6-5.6-4.6-9.6-8.8-12.6l-.4-7.2Z"
        fill={PAPER}
      />

      {/* the coins, piled on the floor of it and none of them level */}
      <circle cx="26.6" cy="80.4" r="6.4" fill={PAPER_WARM} />
      <circle cx="39.8" cy="82.4" r="6.9" fill={PAPER_WARM} />
      <circle cx="52.4" cy="79.6" r="5.8" fill={PAPER_WARM} />
      <circle cx="33.2" cy="70.8" r="5.6" fill={PAPER_WARM} />
      <circle cx="46.2" cy="69.4" r="6.1" fill={PAPER_WARM} />

      {/* a label somebody wrote a number on and never corrected */}
      <path d="M22.6 44.6 51.8 43.8l.5 13.4-29.4.8Z" fill={PAPER_WARM} />
      <path d="M27.4 50.6 45.4 50M27.6 54 38.6 53.6" opacity="0.65" strokeWidth={1.1} />

      {/* on the shoulder, where the light on a jar actually sits */}
      <Hatch d="M16.6 40.4 20.8 34.8M16.8 48.4 20.6 43.4" />
    </InkArt>
  );
}

const OBJECTS: Record<ShelfObjectKind, () => ReactElement> = {
  record: RecordSleeve,
  book: BookSpine,
  cassette: Cassette,
  coffee: CoffeeBag,
  notebook: Notebook,
  jar: TipJar,
};

/** Relative heights, so the shelf row has a real silhouette, not a card grid. */
export const OBJECT_HEIGHT: Record<ShelfObjectKind, string> = {
  record: "h-[150px] sm:h-[196px] lg:h-[226px]",
  book: "h-[164px] sm:h-[214px] lg:h-[246px]",
  cassette: "h-[96px] sm:h-[124px] lg:h-[142px]",
  coffee: "h-[146px] sm:h-[190px] lg:h-[218px]",
  notebook: "h-[154px] sm:h-[200px] lg:h-[232px]",
  // Between the cassette and the coffee bag, so the second row rises, dips
  // and rises again instead of running flat.
  jar: "h-[118px] sm:h-[152px] lg:h-[176px]",
};

export function ShelfObject({ kind }: { kind: ShelfObjectKind }) {
  const Art = OBJECTS[kind];
  return <Art />;
}

/** The plank everything stands on. Stretches to whatever width it's given. */
export function Plank({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 22"
      preserveAspectRatio="none"
      // Stretched to whatever width it's given, so the wobble filter would
      // smear along x. It gets its unevenness from the path data instead.
      className={["ink-art ink-art-plain", className].filter(Boolean).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 2.5 998 1l1 18L1 20.5Z" fill={PAPER_WARM} />
      {/* wood grain, uneven */}
      <path d="M60 10.5 340 9.6M420 11.4 690 10.4M760 9.4 950 9" opacity="0.45" strokeWidth={1.1} />
    </svg>
  );
}

/** Bracket under the plank. Two per shelf, deliberately not symmetrical. */
export function Bracket({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 30 36" className={className}>
      <path d="M2.5 1.5 26.5 1 3 32Z" fill={PAPER_WARM} />
      <Hatch d="M6 8 11 6.5M7 14 14 11.5M8 20 13 18" opacity={0.4} />
    </InkArt>
  );
}
