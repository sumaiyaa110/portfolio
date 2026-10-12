import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

import "./globals.css";

// Body text.
const body = Geist({ subsets: ["latin"], variable: "--font-body" });

// Headings.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

// Dates, tags and code.
const code = Geist_Mono({ subsets: ["latin"], variable: "--font-code" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: profile.name,
    description: profile.tagline,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${code.variable}`}
    >
      <body className="relative flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <div aria-hidden="true" className="backdrop no-print" />
          <SiteHeader />
          <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
