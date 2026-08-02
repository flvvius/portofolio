"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Section entrance: fade + 12px rise, once, when it scrolls into view.
 *
 * IntersectionObserver rather than a scroll library: this is 20 lines and
 * ships no runtime. Without JS the element renders visible immediately, which
 * is the correct fallback: the content is the point, the rise is a garnish.
 */
export function Rise({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger, in ms. Siblings go 0, 60, 120… */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Nothing to observe with, so reveal on the next frame and move on.
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    // `rise` is inert until the `js` class is on <html> (see globals.css), so
    // the hidden start state can never strand content when JS is unavailable.
    <Tag
      ref={ref}
      className={["rise", shown ? "is-in" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={delay ? ({ "--rise-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
