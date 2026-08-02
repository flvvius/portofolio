import { InkArt, Hatch, ACCENT, PAPER_WARM } from "./ink";

/**
 * The turntable, seen from just above. The record is a separate <g> so it can
 * spin on its own (4s linear, and not at all under prefers-reduced-motion).
 */
export function Turntable({ className }: { className?: string }) {
  return (
    // `ink-art-plain` keeps the wobble filter off the SVG as a whole, so the
    // record can spin without the browser re-running a displacement map 60
    // times a second. The static furniture gets the filter on its own group,
    // which is also more truthful: a vinyl record really is a perfect circle.
    <InkArt viewBox="0 0 200 190" className={`ink-art-plain ${className ?? ""}`}>
      <g filter="url(#pencil)">
        {/* plinth, corners rounded by hand, so none of them match */}
        <path
          d="M12.5 17.5c0-3.9 3-7 6.9-6.9l162 1.6c3.7 0 6.7 3.1 6.6 6.9l-1.8 149.4c0 3.8-3.2 6.8-7 6.7l-160.6-1.7c-3.8 0-6.8-3.2-6.7-7Z"
          fill={PAPER_WARM}
        />
        <Hatch d="M18 160 26 152M18 152.5 26.5 144M22.5 163 30 155.5M26 166 34 158" />
        <Hatch d="M166 152 174 144M170 158 178 150M162 146 170 138" />

        {/* platter */}
        <circle cx="86" cy="88" r="63" />
        <circle cx="86" cy="88" r="59.5" opacity="0.45" strokeWidth={1.1} />
      </g>

      {/* the spinning part, unfiltered and round on purpose */}
      <g className="spin-record">
        <circle cx="86" cy="88" r="55" fill="#2B211A" stroke="none" />
        {/* grooves, lighter so they read as reflections not lines */}
        <circle cx="86" cy="88" r="49" stroke={PAPER_WARM} strokeWidth={0.9} opacity="0.35" />
        <circle cx="86" cy="88" r="42" stroke={PAPER_WARM} strokeWidth={0.9} opacity="0.3" />
        <circle cx="86" cy="88" r="34" stroke={PAPER_WARM} strokeWidth={0.9} opacity="0.25" />
        {/* the one permitted orange fill on the whole site's illustrations */}
        <circle cx="86" cy="88" r="18" fill={ACCENT} stroke="none" />
        <circle cx="86" cy="88" r="18" />
        {/* the label has a mark on it, so you can see it turning */}
        <path d="M86 74v-4M86 106v4" strokeWidth={1.2} opacity="0.7" />
        <circle cx="86" cy="88" r="2.6" fill={PAPER_WARM} stroke="none" />
      </g>

      <g filter="url(#pencil)">
        {/*
          THE PICKUP
          Drawn as the assembly it actually is, back to front: base plate,
          gimbal, arm *tube* (two edges and a fill, not a hairline), headshell
          held at its own angle, cartridge, stylus touching the groove.

          The arm is one straight run from pivot to headshell. The bent
          polyline it replaces read as a piece of wire. Everything below hangs
          off the two points P1 (163,50) and P2 (124,108); if you move the arm,
          move both and re-derive, or the headshell detaches from the tube.
        */}

        {/* base plate the whole assembly is bolted to */}
        <path
          d="M150.6 41c0-1.6 1.3-2.9 2.9-2.9l19.8.2c1.6 0 2.8 1.4 2.8 3l-.2 19.6c0 1.6-1.4 2.9-3 2.8l-19.6-.2c-1.6 0-2.9-1.3-2.8-2.9Z"
          fill={PAPER_WARM}
        />
        {/* gimbal housing, and the bolt through the middle of it */}
        <circle cx="163" cy="48" r="8.5" fill={PAPER_WARM} />
        <circle cx="163" cy="48" r="5" opacity="0.45" strokeWidth={1.1} />
        <circle cx="163" cy="48" r="2.4" fill="currentColor" stroke="none" />

        {/* the arm tube */}
        <path d="M157.2 54.8 120.2 108.8l3.6 2.4 37-54Z" fill={PAPER_WARM} />
        {/* one highlight down the length, so the tube reads as round */}
        <path d="M159 56.4 122.3 110" opacity="0.3" strokeWidth={1} />

        {/* headshell, set at its own angle to the arm */}
        <path
          d="M126.6 110.5 119.3 121.2l-6.9-4.7 7.3-10.7Z"
          fill={PAPER_WARM}
        />
        {/* finger lift */}
        <path d="M126.6 110.6 131 113.6" strokeWidth={1.5} />
        {/* cartridge, and the stylus actually in the groove */}
        <path d="M117 114 113.6 119" opacity="0.5" strokeWidth={1.1} />
        <path d="M115.8 118.9 114.6 122.1" strokeWidth={1.3} />

        {/* counterweight: stub, then the weight itself, threaded */}
        <path d="M168.4 41.6 175 34.6" strokeWidth={1.5} />
        <circle cx="179.4" cy="30.6" r="5.4" fill={PAPER_WARM} />
        <path d="M176.4 26.6 183 33.4" opacity="0.4" strokeWidth={1.1} />

        {/* controls */}
        <path d="M150 150h22v10h-22z" fill={PAPER_WARM} />
        <path d="M161 150v10" opacity="0.5" strokeWidth={1.1} />
        <circle cx="133" cy="155" r="6.5" fill={PAPER_WARM} />
        <path d="M133 155v-4" strokeWidth={1.2} />
        {/* 33 / 45, because every turntable has them */}
        <path d="M150 166.5h9M164 166.5h9" opacity="0.4" strokeWidth={1.1} />
      </g>
    </InkArt>
  );
}

/** The little vinyl that sits in the "now playing" chip. */
export function MiniRecord({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 32 32" className={`ink-art-plain ${className ?? ""}`}>
      <g className="spin-record">
        <circle cx="16" cy="16" r="14" fill="#2B211A" stroke="none" />
        <circle cx="16" cy="16" r="10.5" stroke={PAPER_WARM} strokeWidth={0.8} opacity="0.35" />
        <circle cx="16" cy="16" r="5.5" fill={ACCENT} stroke="none" />
        <path d="M16 10.5v-1.5" stroke={PAPER_WARM} strokeWidth={1} />
        <circle cx="16" cy="16" r="1" fill={PAPER_WARM} stroke="none" />
      </g>
      <circle cx="16" cy="16" r="14" />
    </InkArt>
  );
}
