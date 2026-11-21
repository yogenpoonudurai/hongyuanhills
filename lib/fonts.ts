import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

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

export const fontClassNames = `${displayFont.variable} ${bodyFont.variable}`;
