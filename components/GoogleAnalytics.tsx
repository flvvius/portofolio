"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function Analytics({ gaId }: { gaId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window === "undefined" || !window.gtag) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    window.gtag("config", gaId, {
      page_path: url,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function GoogleAnalytics({
  gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: {
  gaId?: string;
}) {
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              transport_type: 'beacon',
              send_page_view: true
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <Analytics gaId={gaId} />
      </Suspense>
    </>
  );
}
