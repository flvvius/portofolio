import { InkArt, Hatch, ACCENT, PAPER_WARM } from "./ink";

/**
 * The turntable, seen from just above. The record is a separate <g> so it can
 * spin on its own (4s linear, and not at all under prefers-reduced-motion).
 */
export function Turntable({ className }: { className?: string }) {
  return (
    // `ink-art-plain` keeps the wobble filter off the SVG as a whole, so the
    // record can spin without the browser re-running a displacement map 60
    // times a second. The static furniture gets the filter on its own group —
    // which is also more truthful: a vinyl record really is a perfect circle.
    <InkArt viewBox="0 0 200 190" className={`ink-art-plain ${className ?? ""}`}>
      <g filter="url(#pencil)">
        {/* plinth — corners rounded by hand, so none of them match */}
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

      {/* the spinning part — unfiltered, and round on purpose */}
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
        {/* tonearm */}
        <circle cx="166" cy="42" r="9" fill={PAPER_WARM} />
        <circle cx="166" cy="42" r="3" fill="currentColor" stroke="none" />
        <path d="M164.6 50.4 148 100.6 121 112.4" />
        <path d="m124.6 105.4 6.4 2.6-3.4 8-6.6-3.6z" fill={PAPER_WARM} />

        {/* counterweight */}
        <path d="M172.6 34.6 180 27.4" />
        <circle cx="182.5" cy="25" r="5" fill={PAPER_WARM} />

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
