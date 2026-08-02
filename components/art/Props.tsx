import { InkArt, Hatch, PAPER_WARM } from "./ink";

/**
 * The props. Objects that belong to the room but don't belong to any one
 * section's argument: a shelf of books on the counter, a moka pot in the
 * corner, the clock on the wall.
 *
 * They obey the same protocol as everything else here: one nib, cross-hatch
 * shading only, nothing drawn perfectly straight.
 */

/** A short row of books with a plant at the end. Sits in the counter strip. */
export function Bookshelf({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 132 70" className={className}>
      {/* books, each leaning at its own angle so the row has a rhythm */}
      <path d="M12.4 20.6h9.2v38.2h-9.2z" fill={PAPER_WARM} />
      <path d="M14.8 26.4h4.6M14.8 30.2h4.6" opacity="0.45" strokeWidth={1.1} />

      <path d="M23.6 24.2h7.6v34.6h-7.6z" fill={PAPER_WARM} />
      <path d="M25.6 29.6h3.6" opacity="0.45" strokeWidth={1.1} />

      {/* one has fallen against the next, every shelf has this book */}
      <path d="M33.6 58.8 36 26.6l7.4 1.6-3.2 30.8z" fill={PAPER_WARM} />

      <path d="M44.8 17.8h10v41h-10z" fill={PAPER_WARM} />
      <path d="M47.2 24h5.2M47.2 28.4h5.2M47.2 32.8h5.2" opacity="0.45" strokeWidth={1.1} />

      <path d="M56.8 27.4h6.8v31.4h-6.8z" fill={PAPER_WARM} />
      <path d="M65.4 22.6h8.8v36.2h-8.8z" fill={PAPER_WARM} />
      <path d="M67.8 28h4" opacity="0.45" strokeWidth={1.1} />
      <path d="M76 30.8h6.2v28h-6.2z" fill={PAPER_WARM} />

      {/* the plant, because there is always a plant */}
      <path d="M96.6 58.6h13.8l-1.8 9.4H98.4z" fill={PAPER_WARM} />
      <path d="M103.4 58.4V46" />
      <path d="M103.4 50.6c-4.4-1-7-4.4-7.2-9 4 .4 6.8 3.6 7.2 9Z" />
      <path d="M103.6 47.8c.6-5 3.8-8.4 8.2-8.6-.4 5-3.4 8.4-8.2 8.6Z" />
      <path d="M103.4 42.4c-3-1.6-4.4-4.6-4-8.2 3 1.4 4.4 4.4 4 8.2Z" />

      <Hatch d="M116 54 122 48M118 58 124 52" />

      {/* the plank they all stand on */}
      <path d="M4 58.8h124" />
      <path d="M8 62.6h116" opacity="0.4" strokeWidth={1.1} />
    </InkArt>
  );
}

/** Moka pot and a cup, mid-morning. Bottom-left of the shelf section. */
export function MokaPot({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 150 118" className={className}>
      {/*
        Steam. Long S-curves, because drawn short they read as two tally marks
        floating between the pot and the cup rather than as anything rising.
      */}
      <path
        d="M106 68c5-6-4-10 1-16.4s-2.6-9.6 1.4-14.6"
        opacity="0.55"
        strokeWidth={1.3}
      />
      <path
        d="M117.6 70c4.4-5.4-3.4-8.8.8-14.4s-2.2-8.2 1.2-12.4"
        opacity="0.45"
        strokeWidth={1.3}
      />

      {/* the pot: lower chamber, waist, upper chamber, lid, handle */}
      <path d="M30.6 108.4 24 76.6h44.4l-6.6 31.8z" fill={PAPER_WARM} />
      <path d="M25.6 74.2h41.4v2.6H25.6z" fill={PAPER_WARM} />
      <path d="M31.4 74 27 43.4h38.6L61.4 74z" fill={PAPER_WARM} />
      <path d="M28.4 41.4h36.2v2.2H28.4z" fill={PAPER_WARM} />
      {/* lid, with its knob */}
      <path d="M33.6 41.2 36.4 28h20.2l2.8 13.2z" fill={PAPER_WARM} />
      <path d="M46.4 28v-4.4" />
      <circle cx="46.4" cy="21" r="3.2" fill={PAPER_WARM} />
      {/* the handle, which on a real moka pot is a fat triangle */}
      <path d="M67.6 50.6c9.4 1.4 14.4 6 15 13.6M82.6 64.2c-.4 6-4.8 9.6-13 10.6" />
      <path d="M67.4 56.6c6 1.4 9.2 4.2 9.6 8.2-.2 3.6-3.2 5.8-9 6.6" />
      {/* spout */}
      <path d="M25.8 52.6c-4.4.6-7 2.6-7.8 6" />
      <Hatch d="M34 96 40 89M36 102 43 94M46 100 52 93" />

      {/* the cup */}
      <path d="M98 76.6h30l-3.4 26.4c-.4 3.2-3 5.6-6.2 5.6h-11c-3.2 0-5.8-2.4-6.2-5.6z" fill={PAPER_WARM} />
      <path d="M127.6 82.4c5.4-1 8.4 1 8.8 5.6.2 4.6-2.6 7.2-8 7.8" />
      <path d="M96 76.4h34" />
      {/* saucer */}
      <path d="M90 110.6h46" />
      <Hatch d="M104 98 110 92M107 103 113 97" />
    </InkArt>
  );
}

/**
 * The cuckoo clock again, appearance three of five, this time hanging from a
 * cord with its weights down, the way it does on a wall.
 */
export function HangingCuckoo({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 84 150" className={className}>
      {/* the cord it hangs from, running off the top of the frame */}
      <path d="M42 0v14" opacity="0.55" strokeWidth={1.2} />

      {/* roof */}
      <path d="M13 32 42 13l29 19.4" fill={PAPER_WARM} />
      <path d="M18 31.4 42 15.8l24 15.8" opacity="0.5" strokeWidth={1.1} />
      {/* housing */}
      <path d="M18.4 32.2h47.2v35.4H18.4z" fill={PAPER_WARM} />
      {/* the clock face */}
      <circle cx="42" cy="49.6" r="11.4" fill={PAPER_WARM} />
      <path d="M42 49.6V42M42 49.6l6 3.4" strokeWidth={1.3} />
      <path d="M42 38.8v1.8M52.8 49.6H51M42 60.4v-1.8M31.2 49.6H33" opacity="0.5" strokeWidth={1.1} />
      {/* the bird's door, shut for once */}
      <path d="M35.4 32.4h13.2v6.2H35.4z" fill={PAPER_WARM} opacity="0.9" />

      {/* pendulum and the two pine-cone weights */}
      <path d="M42 67.8v36.6" opacity="0.7" strokeWidth={1.2} />
      <circle cx="42" cy="108.6" r="4.4" fill={PAPER_WARM} />
      <path d="M27.6 67.6v52M56.4 67.6v42" opacity="0.6" strokeWidth={1.1} />
      <path d="M23.6 120h8v14h-8zM52.4 110h8v13h-8z" fill={PAPER_WARM} />
      <path d="M25.6 124.4h4M25.6 128h4M54.4 114.4h4" opacity="0.45" strokeWidth={1.1} />

      <Hatch d="M20 62 26 56M20 56 25 50.5" />
    </InkArt>
  );
}
