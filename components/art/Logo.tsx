import { InkArt, Hatch, PAPER_WARM } from "./ink";

/**
 * The logo lockup: a cuckoo clock with the bird mid-announcement.
 *
 * This is the mascot's first of five appearances. It is drawn small and never
 * rendered above ~56px, so the detail stays at the level of a doodle.
 */
export function CuckooClock({ className }: { className?: string }) {
  return (
    <InkArt viewBox="0 0 72 62" className={className}>
      {/* roof — two planks, neither quite level */}
      <path d="M4.5 21.5 27 5l22.5 16.8" fill={PAPER_WARM} />
      <path d="M8.5 21 27 7.6 45.4 21.2" opacity="0.5" strokeWidth={1.1} />
      {/* housing */}
      <path d="M9.5 21.6 45 21.9l-.3 27.4-34.9-.3Z" fill={PAPER_WARM} />
      {/* little hood over the bird door */}
      <path d="M17.5 27.5 27 22.6l9.4 5.2" />
      {/* the bird, leaning out */}
      <path d="M28.6 32.2c1-3 6-3.2 7.4-.4 1 2 .8 4.4-.2 6.4-1.4 2.8-5.6 3.4-7.6 1s-1.4-5.4.4-7Z" />
      <path d="M35.6 34.6 42 36.2l-6.2 1.8" />
      <circle cx="33.6" cy="34" r="1.1" fill="currentColor" stroke="none" />
      {/* the sound it is making */}
      <path d="M46 30.4c1.8.6 3.2 2 4 3.8M48.4 26.6c3 1 5.4 3.4 6.6 6.4" />
      {/* pendulum + weights */}
      <path d="M27.5 49.4v6.6M18.6 49.2v4.6M36.2 49.4v3.4" opacity="0.7" strokeWidth={1.2} />
      <circle cx="27.5" cy="58" r="3.2" fill={PAPER_WARM} />
      <path d="M15.4 53.8h6.4v5.4h-6.4zM33.2 53 39 52.9l.1 4.6-5.8.1z" fill={PAPER_WARM} />
      <Hatch d="M12.5 46 18 40.5M12.5 40 17 35.5" />
    </InkArt>
  );
}
