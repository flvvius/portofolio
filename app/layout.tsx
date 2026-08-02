import type { Metadata, Viewport } from "next";
import { Schoolbell } from "next/font/google";

import "./globals.css";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ConsoleNote } from "@/components/ConsoleNote";
import { RoomTone } from "@/components/RoomTone";

/**
 * One font, every job. Schoolbell writes the hero, the body copy and the
 * margin scribbles alike, so the whole page reads as one hand rather than
 * three voices taking turns.
 *
 * It ships a single 400 weight and no italic. Bold and italic are therefore
 * synthesised by the browser, which on a handwriting face reads as pressing
 * harder and leaning in — which is what those two are for anyway.
 */
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-schoolbell",
  preload: true,
});

const baseUrl = "https://flavius.pro";

const description =
  "flavius cojocaru, full-stack engineer in bucharest. a shelf of things i've built and the stories behind them.";

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Flavius Cojocaru | Full-Stack Engineer",
    template: "%s | Flavius Cojocaru",
  },
  description,
  keywords: [
    "Flavius Cojocaru",
    "full-stack developer",
    "software engineer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Bucharest",
    "Romania",
  ],
  creator: "Flavius Cojocaru",
  authors: [{ name: "Flavius Cojocaru", url: baseUrl }],
  publisher: "Flavius Cojocaru",
  openGraph: {
    title: "Flavius Cojocaru | Full-Stack Engineer",
    description,
    url: baseUrl,
    siteName: "Flavius Cojocaru",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/main.png`,
        width: 1200,
        height: 630,
        alt: "Flavius Cojocaru, full-stack engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavius Cojocaru | Full-Stack Engineer",
    description,
    images: [`${baseUrl}/main.png`],
    site: "@flaviuscj1",
    creator: "@flaviuscj1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: { en: baseUrl },
  },
  verification: {
    google: "y0V0doFc5FrHOZkEACjH868tj1zOJy0dpOsEQNQFZTs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * `suppressHydrationWarning` covers exactly one thing: the inline script
     * below adds a `js` class to this element before React hydrates, so the
     * server and client classNames legitimately differ. The suppression is
     * one level deep, and every child is still hydration-checked normally.
     */
    <html
      lang="en"
      dir="ltr"
      className={schoolbell.variable}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        {/*
          No security meta tags here: `X-Content-Type-Options` and
          `Permissions-Policy` are only honoured as response headers, and
          next.config.mjs sets both for every path. og:locale and the hreflang
          alternate come out of `metadata` above, so writing them by hand as
          well only creates a second copy to keep in sync.
        */}
        {/*
          Sets the progressive-enhancement switch before first paint, so the
          no-JS fallbacks never flash. One statement, no network, no shift.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        {/*
          The pen wobble. Every illustration is drawn with mathematically exact
          curves and then pushed off-true by this displacement map, which is
          what stops the set reading as clipart. One filter, defined once,
          shared by every drawing, so the hand is identifiably the same hand.

          Deliberately not applied to anything animated (see Turntable) or to
          the stretched planks, where a uniform displacement would smear.
        */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          className="pointer-events-none absolute"
        >
          <filter
            id="pencil"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="3"
              seed="4"
              result="wobble"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="wobble"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        {/*
          Points at the `main` landmark every page carries, not at a section
          that only exists on the homepage. On the blog and the back room,
          `#the-shelf` was a link to nowhere.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:bg-paper-warm focus:px-4 focus:py-2 focus:font-mono focus:text-caption"
        >
          skip to the content
        </a>
        {children}
        {/* Renders nothing, it listens. One instance for the whole site. */}
        <RoomTone />
        <ConsoleNote />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
