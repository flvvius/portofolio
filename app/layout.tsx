import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://flavius.pro";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Flavius Cojocaru | Full-Stack Web Developer",
    template: "%s | Flavius Cojocaru",
  },
  description:
    "building stuff that matters | coding idealist, thirst for knowledge and working on becoming better, romania based, wanting to shape my future",
  keywords: [
    "Flavius Cojocaru",
    "web developer",
    "full-stack developer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "software engineer",
    "frontend developer",
    "backend developer",
    "javascript developer",
    "UI/UX",
    "Romania",
  ],
  creator: "Flavius Cojocaru",
  authors: [{ name: "Flavius Cojocaru", url: baseUrl }],
  publisher: "Flavius Cojocaru",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Flavius Cojocaru | Full-Stack Web Developer",
    description:
      "Full-stack web developer specialized in Next.js, React, and TypeScript. Building applications that matter with a focus on user experience and performance.",
    url: baseUrl,
    siteName: "Flavius Cojocaru Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/main.png`,
        width: 1200,
        height: 630,
        alt: "Flavius Cojocaru Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavius Cojocaru | Full-Stack Web Developer",
    description:
      "Full-stack web developer specialized in Next.js, React, and TypeScript. Building applications that matter with a focus on user experience and performance.",
    images: [`${baseUrl}/main.png`],
    site: "@flaviuscj1",
    creator: "@flaviuscj1",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/main.png", sizes: "32x32", type: "image/png" },
      { url: "/main.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/main.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: baseUrl,
    },
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
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/main.png" sizes="any" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com; object-src 'none'"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
        />
        <meta property="og:locale" content="en_US" />
        <link rel="alternate" hrefLang="en" href="https://flavius.pro" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <GoogleAnalytics />
        <JsonLd />
      </body>
    </html>
  );
}
