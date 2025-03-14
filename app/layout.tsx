import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flavius's Portfolio",
  description: "Passionate Web Developer showcasing modern web projects",
  keywords: [
    "Web Developer",
    "Portfolio",
    "JavaScript",
    "React",
    "TypeScript",
    "Frontend",
    "Flavius",
    "Flavius's Portfolio",
    "Flavius's Website",
    "Flavius's Projects",
    "Flavius's Skills",
    "Flavius's Experience",
    "Flavius's Education",
    "Flavius's Contact",
    "Flavius's Blog",
    "Flavius's About",
    "Flavius's Resume",
    "Flavius's LinkedIn",
    "Flavius's GitHub",
    "Flavius's Twitter",
    "Flavius's Instagram",
    "Flavius's Facebook",
    "Flavius's YouTube",
    "Flavius's TikTok",
    "Flavius's Pinterest",
    "Flavius's Reddit",
    "Flavius's LinkedIn",
    "Flavius Cojocaru",
    "Flavius Cojocaru's Portfolio",
    "Flavius Cojocaru's Website",
    "Flavius Cojocaru's Projects",
    "Flavius Cojocaru's Skills",
    "Flavius Cojocaru's Experience",
    "Flavius Cojocaru's Education",
    "Flavius Cojocaru's Contact",
    "Flavius Cojocaru's Blog",
    "Flavius Cojocaru's About",
    "Flavius Cojocaru's Resume",
    "Flavius Cojocaru's LinkedIn",
    "Flavius Cojocaru's GitHub",
    "Flavius Cojocaru's Twitter",
    "Flavius Cojocaru's Instagram",
    "Flavius Cojocaru's Facebook",
    "Flavius Cojocaru's YouTube",
    "Flavius Cojocaru's TikTok",
    "Flavius Cojocaru's Pinterest",
    "Flavius Cojocaru's Reddit",
    "Flavius Cojocaru's LinkedIn",
    "Next.js",
    "T3 Stack",
    "Shadcn",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "MariaDB",
    "Oracle",
  ],
  openGraph: {
    title: "Flavius's Portfolio",
    description: "Passionate Web Developer showcasing modern web projects",
    url: "https://flavius.pro",
    siteName: "Flavius's Portfolio",
    type: "website",
    images: [
      {
        url: "https://flavius.pro/flavius.png",
        width: 1200,
        height: 630,
        alt: "Flavius's Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flavius's Portfolio",
    description: "Passionate Web Developer showcasing modern web projects",
    images: ["https://flavius.pro/flavius.png"],
    site: "@flaviuscj1",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/flavius.png",
  },
  alternates: {
    canonical: "https://flavius.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/flavius.png" sizes="any" />
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
      </body>
    </html>
  );
}
