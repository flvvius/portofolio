import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./service.css";
import { serviceConfig } from "@/lib/service/config";
import { Analytics } from "@/components/service/Analytics";
import { ServiceJsonLd } from "@/components/service/ServiceJsonLd";

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial"],
});
const schoolbell = localFont({
  src: "./fonts/Schoolbell-Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-schoolbell",
  fallback: ["Arial"],
});
const description =
  "I redesign AI-built apps and small SaaS products in your React codebase. EUR 300 taste audits and implementation sprints as reviewable pull requests.";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
};
export const metadata: Metadata = {
  metadataBase: new URL(serviceConfig.origin),
  title: {
    default: "Flavius: design engineer for AI-built apps",
    template: "%s | Flavius",
  },
  description,
  authors: [{ name: "Flavius Cojocaru" }],
  openGraph: {
    title: "Flavius: design engineer for AI-built apps",
    description,
    siteName: "Flavius",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavius: design engineer for AI-built apps",
    description,
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="auto"
      className={`${inter.variable} ${schoolbell.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('service-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="service-site">
        <a className="service-skip" href="#main">
          Skip to content
        </a>
        <div className="service-container">{children}</div>
        <ServiceJsonLd />
        <Analytics
          src={serviceConfig.analyticsScript}
          websiteId={serviceConfig.analyticsId}
        />
      </body>
    </html>
  );
}
