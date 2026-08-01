/**
 * The "listening bar" sign that sits in the top-right corner of the header.
 *
 * Four bars of a level meter, bouncing on their own clocks so the group never
 * lands in step. This is the one piece of constant motion on the site besides
 * the record, and like the record it stops entirely under reduced motion —
 * at which point the bars settle at readable heights and still say "meter".
 */
export function ListeningBar({ className }: { className?: string }) {
  return (
    <span
      className={["inline-flex items-center gap-2 text-accent", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden="true"
        className="flex h-[13px] items-end gap-[2.5px]"
      >
        {/* Staggered durations, not delays — delays re-sync, durations drift. */}
        {[
          { h: "60%", d: "780ms" },
          { h: "100%", d: "1120ms" },
          { h: "45%", d: "640ms" },
          { h: "80%", d: "940ms" },
        ].map((bar) => (
          <span
            key={bar.d}
            className="eq-bar w-[2.5px] bg-accent"
            style={{ height: bar.h, animationDuration: bar.d }}
          />
        ))}
      </span>
      <span className="font-mono text-[0.8rem] lowercase">listening bar</span>
    </span>
  );
}
