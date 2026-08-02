"use client";

import { useEffect } from "react";
import { ping } from "@/lib/vinyl";

/**
 * The sounds the room makes when you touch it.
 *
 * One delegated listener on the document rather than handlers on every link,
 * button and shelf object. Sixty components do not need to know that the site
 * has audio, and adding an onPointerEnter to each of them would be sixty
 * chances to forget one.
 *
 * The rules that keep this from being unbearable, in rough order of how badly
 * things go without them:
 *
 *  - Mouse only. A touch device fires hover on tap, so every tap would play
 *    the hover sound and the press sound a few milliseconds apart.
 *  - Nothing plays unless the record is already on. `ping` enforces that.
 *    The header toggle is the site's sound switch, and it means the opt-out
 *    covers this too.
 *  - Rate limited. Dragging the pointer across a nav bar crosses five links in
 *    about 80ms, and five ticks in 80ms is a stutter, not an interface.
 *  - Re-entering the element you just left stays quiet for a moment, so a
 *    cursor resting on a boundary doesn't machine-gun.
 */

/** Anything you can actually operate. */
const CONTROLS = "a[href], button, [data-sfx]";

/** Things that read as objects rather than links. They get the softer sound. */
const OBJECTS = ".shelf-object, .coaster";

/** Minimum gap between any two interface sounds. */
const MIN_GAP = 55;

/** How long the element you just left stays silent if you wander back onto it. */
const REPEAT_LOCKOUT = 250;

export function RoomTone() {
  useEffect(() => {
    let lastAt = 0;
    let lastTarget: Element | null = null;

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest(CONTROLS);
      if (!control) return;

      /*
       * pointerover bubbles from every descendant, so moving from a link's
       * text to the arrow inside it fires again. If we came from inside the
       * same control, the pointer never actually entered anything new.
       */
      if (
        event.relatedTarget instanceof Node &&
        control.contains(event.relatedTarget)
      ) {
        return;
      }

      const now = performance.now();
      if (now - lastAt < MIN_GAP) return;
      if (control === lastTarget && now - lastAt < REPEAT_LOCKOUT) return;

      lastAt = now;
      lastTarget = control;

      // The shelf object lives *inside* its anchor, so this looks down from the
      // control rather than up from it.
      const isObject =
        control.matches(OBJECTS) || control.querySelector(OBJECTS) !== null;

      ping(isObject ? "shuffle" : "tick");
    };

    /*
     * Press is allowed on touch as well as mouse. A tap is unambiguous: nobody
     * taps a button by accident the way they sweep a cursor over one.
     */
    const onDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(CONTROLS)) return;

      lastAt = performance.now();
      ping("knock");
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerdown", onDown);

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}
