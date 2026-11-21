import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
  preload: true,
});

// LXGW WenKai (SIL OFL 1.1), subset to the site's current Chinese glyph set.
// Re-run the subset step when new Chinese copy introduces new characters.
export const cnFont = localFont({
  src: "../assets/fonts/LXGWWenKai-Regular.woff2",
  variable: "--font-cn",
  display: "swap",
  preload: true,
  fallback: ["Kaiti SC", "STKaiti", "KaiTi", "Noto Serif SC", "serif"],
  adjustFontFallback: false,
});

export const fontClassNames = `${displayFont.variable} ${bodyFont.variable} ${cnFont.variable}`;
