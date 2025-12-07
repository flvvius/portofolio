"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyLoadProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  threshold?: number;
};

/**
 * Lazy loads children only when they enter the viewport.
 *
 * Why this is better:
 * - Heavy components (Globe, Canvas effects) don't load until visible
 * - Saves bandwidth for users who don't scroll
 * - Faster initial page load (better LCP)
 *
 * @example
 * <LazyLoad placeholder={<GlobeSkeleton />}>
 *   <GlobeDemo />
 * </LazyLoad>
 */
export const LazyLoad = ({
  children,
  placeholder = null,
  rootMargin = "100px", // Start loading 100px before visible
  threshold = 0,
}: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to load once
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return <div ref={ref}>{isVisible ? children : placeholder}</div>;
};
