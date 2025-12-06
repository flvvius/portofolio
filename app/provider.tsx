"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useReportWebVitals } from "next/web-vitals";

// Types from next-themes v0.4+
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }

    const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (typeof window !== "undefined" && window.gtag && analyticsId) {
      window.gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
