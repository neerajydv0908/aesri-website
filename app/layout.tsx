import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@fontsource/tiro-devanagari-hindi/devanagari-400.css";
import "@fontsource-variable/noto-sans-devanagari/wght.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";

const fraunces = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-standard-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-standard-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (AESRI)`,
    template: "%s · AESRI",
  },
  description: site.mission.en,
  applicationName: "AESRI",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: restores the reader's language choice, and plays
 * the home-page intro only when the home page is the first page opened in
 * this browser session.
 */
const bootScript = `(function(){try{var d=document.documentElement;var l=localStorage.getItem('aesri-lang');if(l==='hi'){d.dataset.lang='hi';d.lang='hi'}else{d.dataset.lang='en'}}catch(e){}try{if(sessionStorage.getItem('aesri-intro')||location.pathname!=='/'){document.documentElement.dataset.intro='skip'}sessionStorage.setItem('aesri-intro','1')}catch(e){document.documentElement.dataset.intro='skip'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="grain min-h-screen">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-cream-50 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
