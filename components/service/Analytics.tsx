"use client";
import Script from "next/script";
import { useEffect, type ReactNode } from "react";

declare global {
  interface Window {
    umami?: { track: (name: string, data?: Record<string, string>) => void };
  }
}
export type ServiceEvent =
  | "audit_click"
  | "call_click"
  | "waitlist_submit"
  | "intake_submit"
  | "before_after_view";
export function track(name: ServiceEvent, data?: Record<string, string>) {
  window.umami?.track(name, data);
}
export function Analytics({
  src,
  websiteId,
}: {
  src?: string;
  websiteId?: string;
}) {
  return src && websiteId ? (
    <Script src={src} data-website-id={websiteId} strategy="afterInteractive" />
  ) : null;
}
export function EventLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: ServiceEvent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track(event)}>
      {children}
    </a>
  );
}
export function ComparisonView({ id }: { id: string }) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("before_after_view", { study: id });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [id]);
  return null;
}
