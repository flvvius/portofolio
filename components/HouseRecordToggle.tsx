"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getHouseRecord, houseRecordState } from "@/lib/vinyl";

/** Resting heights, and the clock each bar keeps while it is still faking. */
const METER_BARS = [
  { h: "60%", d: "780ms" },
  { h: "100%", d: "1120ms" },
  { h: "45%", d: "640ms" },
  { h: "80%", d: "940ms" },
];

/**
 * The sign in the window, turned into the switch behind the counter.
 *
 * The level meter has been bouncing in this corner since the site launched
 * without anything to measure. Making *it* the play button is the whole joke
 * and the whole justification: the one element already claiming there is sound
 * in the room is the element that turns the sound on, and once it is on the
 * bars stop guessing and read the analyser instead.
 *
 * The record is on by default, as far as a browser will let it be.
 *
 * Nothing can make sound on a page nobody has touched. Every current browser
 * hands back a suspended AudioContext until there is a real user gesture, and
 * that is not a bug to route around. So this tries on mount, and if it is
 * refused it arms itself and starts on the first click, key or tap instead. To
 * a visitor that is indistinguishable from music that was already playing.
 *
 * The one thing it will not do is ignore a no. Turning it off writes an opt-out
 * that survives reloads, because being played at again after you have already
 * said no once is the version of this feature that people actually hate.
 *
 * It also goes quiet when the tab does.
 */

/** Remembers a visitor who turned the record off. Never remembers "on". */
const OPT_OUT = "house-record:off";

export function HouseRecordToggle({ className }: { className?: string }) {
  const bars = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  /*
   * Playing state lives in the module store rather than in this component, so
   * the "on the platter" chip over in the hero reads the same boolean this
   * button writes. Two copies of it would eventually disagree, and a chip that
   * disagrees with the speakers is worse than no chip.
   */
  const playing = useSyncExternalStore(
    houseRecordState.subscribe,
    houseRecordState.get,
    houseRecordState.getServerSnapshot
  );

  const [calm, setCalm] = useState(false);
  /** false while the tab is in the background */
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const toggle = useCallback(() => {
    const engine = getHouseRecord();

    if (engine.playing) {
      engine.stop();
      houseRecordState.set(false);
      remember(OPT_OUT, true);
    } else {
      void engine.start().then((started) => houseRecordState.set(started));
      // Pressing play is also how you take back a previous no.
      remember(OPT_OUT, false);
    }
  }, []);

  /*
   * Default on. Tries immediately, and if the autoplay policy refuses, starts
   * on the first gesture that qualifies instead.
   *
   * The listeners go on FIRST, synchronously, and come off again if the
   * immediate attempt happens to succeed. Registering them in the callback of
   * the attempt instead (the obvious way round) leaves a gap of at least one
   * microtask where a click lands on nothing, and if the attempt ever fails to
   * settle the listeners are never added at all.
   *
   * Scroll is deliberately not in the list: it does not unlock audio in Safari
   * or Chrome, so arming on it would spend the retry for nothing.
   */
  useEffect(() => {
    if (optedOut(OPT_OUT)) return;

    const engine = getHouseRecord();
    const events = ["pointerdown", "keydown", "touchend"] as const;
    let cancelled = false;

    const disarm = () => {
      events.forEach((name) => document.removeEventListener(name, onGesture));
    };

    const attempt = async () => {
      // Not into a tab nobody is looking at. The listeners stay armed, so a
      // visitor who arrives via a background tab gets the record on their
      // first gesture instead.
      if (cancelled || engine.playing || document.hidden) return;
      const started = await engine.start();
      if (cancelled || !started) return;
      houseRecordState.set(true);
      disarm();
    };

    function onGesture(event: Event) {
      // The button starts the record through its own handler. Reacting to the
      // same press here too would start it and then immediately toggle it off.
      if (event.target instanceof Node && button.current?.contains(event.target)) {
        return;
      }
      void attempt();
    }

    events.forEach((name) => document.addEventListener(name, onGesture));
    void attempt();

    return () => {
      cancelled = true;
      disarm();
    };
  }, []);

  /* Quiet when the tab is. Nobody wants to hunt six tabs for the music. */
  useEffect(() => {
    const onVisibility = () => {
      const engine = getHouseRecord();
      setAwake(!document.hidden);
      if (!engine.playing) return;
      if (document.hidden) engine.suspend();
      else engine.resume();
    };

    // A page can be loaded straight into a background tab, so the first read
    // is here rather than waiting for a change that already happened.
    setAwake(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /*
   * Hand the meter to the analyser for exactly as long as there is something
   * to measure. Expressing it as an effect rather than as timers started from
   * the click handler means the loop can never outlive the sound, including
   * on unmount, which is how you end up with a stray rAF on the blog.
   */
  useEffect(() => {
    const container = bars.current;
    const engine = getHouseRecord();
    if (!playing || !awake || calm || !container) return;

    let frame = requestAnimationFrame(function drive() {
      paintMeter(container, engine.levels());
      frame = requestAnimationFrame(drive);
    });

    return () => {
      cancelAnimationFrame(frame);
      // Hand the bars back to CSS by clearing what we wrote over them.
      paintMeter(container, null);
    };
  }, [playing, awake, calm]);

  /*
   * Note there is no teardown here on purpose.
   *
   * This button unmounts on every client-side route change, and it used to
   * dispose the audio graph on the way out, which meant clicking through to
   * the blog stopped the music and dropped the needle again on arrival. The
   * engine is a singleton now precisely so it can outlive the component that
   * happens to be showing its state. The meter loop above still cleans up
   * after itself, which is the only thing here that was ever per-mount.
   */

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={
        playing ? "lift the needle, stop the music" : "drop the needle, play the music"
      }
      className={[
        "group inline-flex shrink-0 items-center gap-2 text-accent",
        "transition-transform duration-[160ms] ease-out active:scale-[0.97]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span ref={bars} aria-hidden="true" className="flex h-[13px] items-end gap-[2.5px]">
        {/* Staggered durations, not delays: delays re-sync, durations drift. */}
        {METER_BARS.map((bar) => (
          <span
            key={bar.d}
            className={`w-[2.5px] bg-accent ${
              playing && awake && !calm ? "eq-bar-live" : "eq-bar"
            }`}
            style={{ height: bar.h, animationDuration: bar.d }}
          />
        ))}
      </span>

      {/*
        Two labels stacked in one grid cell, crossfading on hover. The cell is
        as wide as the widest of them at all times, so nothing in the header
        moves when the text changes, and both alternates are the same length,
        so the sign never shifts under its own state either.
      */}
      <span
        aria-hidden="true"
        className="hidden whitespace-nowrap font-mono text-[0.8rem] lowercase lg:grid"
      >
        <span className="needle-label col-start-1 row-start-1 blur-0 group-hover:opacity-0 group-hover:blur-[2px] group-focus-visible:opacity-0 group-focus-visible:blur-[2px]">
          listening bar
        </span>
        <span className="needle-label col-start-1 row-start-1 opacity-0 blur-[2px] group-hover:opacity-100 group-hover:blur-0 group-focus-visible:opacity-100 group-focus-visible:blur-0">
          {playing ? "lift the needle" : "drop the needle"}
        </span>
      </span>
    </button>
  );
}

/**
 * Persist the opt-out, or clear it.
 *
 * Wrapped because Safari throws on localStorage in private browsing, and a
 * portfolio that white-screens over a remembered mute preference has its
 * priorities upside down. Forgetting the preference is the acceptable failure.
 */
function remember(key: string, value: boolean) {
  try {
    if (value) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  } catch {
    // Private mode, or storage is full. Nothing here is worth an exception.
  }
}

/** Same caveat in the other direction: an unreadable store means no opt-out. */
function optedOut(key: string) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

/**
 * Write the levels straight onto each bar, deliberately not a custom property
 * on the parent, which would recalculate styles for all four children sixty
 * times a second to save three lines of code.
 *
 * `null` clears the inline styles and gives the bars back to the stylesheet.
 */
function paintMeter(container: HTMLElement, levels: number[] | null) {
  const children = container.children;
  for (let i = 0; i < children.length; i += 1) {
    const bar = children[i] as HTMLElement;
    // Floor of 0.22, because a meter that hits zero between chords reads as broken
    // rather than as quiet.
    bar.style.transform = levels ? `scaleY(${Math.max(0.22, levels[i])})` : "";
  }
}
