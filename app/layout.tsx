import type { Metadata, Viewport } from "next";
import { Fraunces, Courier_Prime, Caveat } from "next/font/google";

import "./globals.css";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ConsoleNote } from "@/components/ConsoleNote";
import { RoomTone } from "@/components/RoomTone";

/**
 * Three fonts, each with exactly one job.
 *
 * Fraunces carries the display voice, and the SOFT and WONK axes are what let the
 * hero wobble while section titles stay composed (see globals.css).
 * Courier Prime is everything you actually read. Caveat only ever writes two
 * or three words at a time, in the margins.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
  preload: true,
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-courier",
  preload: true,
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  // Margin scribbles are decorative and below the fold, so don't spend LCP on them.
  preload: false,
});

const baseUrl = "https://flavius.pro";

const description =
  "flavius cojocaru, full-stack engineer in cluj-napoca. a shelf of things i've built, the stories behind them, and whatever's currently on rotation.";

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
    "Cluj-Napoca",
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
      className={`${fraunces.variable} ${courier.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(), display-capture=()"
        />
        <meta property="og:locale" content="en_US" />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
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

        <a
          href="#the-shelf"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:bg-paper-warm focus:px-4 focus:py-2 focus:font-mono focus:text-caption"
        >
          skip to the shelf
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
