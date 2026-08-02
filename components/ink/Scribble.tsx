"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { RoughNotation } from "react-rough-notation";

const ACCENT = "#D96B2B";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** matchMedia is an external store, so read it as one rather than mirroring it into state. */
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

/**
 * Hand-drawn annotation in the accent orange. rough-notation does the drawing;
 * this wrapper locks the colour, the weight and the timing so no annotation
 * anywhere on the site can drift off-system.
 *
 * Under prefers-reduced-motion the mark still appears, it just appears
 * instantly. The underline carries meaning (it points at the important word),
 * so removing it would remove information.
 */
export function Scribble({
  children,
  type = "underline",
  /** ms to wait after the element is visible. */
  delay = 400,
  duration = 600,
  strokeWidth = 2,
  padding = 2,
  multiline = false,
}: {
  children: ReactNode;
  type?: "underline" | "circle" | "box" | "highlight" | "bracket" | "crossed-off";
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  multiline?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      timer = setTimeout(() => setShow(true), delay);
    };

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  /*
   * rough-notation injects its own <svg> with no aria treatment. The mark is
   * decoration wrapped around text that is already readable, so hide it from
   * assistive tech the same way every other drawing on the site is hidden.
   */
  useEffect(() => {
    ref.current
      ?.querySelectorAll("svg.rough-annotation")
      .forEach((svg) => svg.setAttribute("aria-hidden", "true"));
  }, [show]);

  return (
    <span ref={ref} className="relative inline-block">
      <RoughNotation
        type={type}
        show={show}
        color={ACCENT}
        strokeWidth={strokeWidth}
        padding={padding}
        multiline={multiline}
        iterations={2}
        /*
         * Under reduced motion the mark is drawn outright rather than with a
         * 1ms animation. A near-zero stroke-dash animation is not "less
         * motion", it's a race, and when it loses, the underline never paints
         * at all, which silently removes meaning from the page.
         */
        animate={!reduced}
        animationDuration={duration}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
