import { Inter, Overpass } from "next/font/google";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

// Headings: an open-source descendant of the US "Highway Gothic" road-sign lettering (docs/DESIGN.md).
const overpass = Overpass({ subsets: ["latin"], display: "swap", variable: "--font-overpass" });

// Vietnamese letters (ơ, ư, ạ, ế…) are in a separate subset. It is not preloaded, so other languages don't
// download it; Vietnamese pages put it in front of the latin files (see fontStyle). No fallback font of its
// own: a metric-adjusted Arial in front of the latin Inter would take over every Latin letter.
const interVi = Inter({ subsets: ["vietnamese"], display: "swap", preload: false, adjustFontFallback: false });
const overpassVi = Overpass({ subsets: ["vietnamese"], display: "swap", preload: false, adjustFontFallback: false });

/** Classes for <html>. Chinese falls back to system fonts (globals.css). */
export const fontClassName = `${inter.variable} ${overpass.variable}`;

/** Inline style for <html>: adds the Vietnamese subset on Vietnamese pages. */
export function fontStyle(locale: Locale): CSSProperties | undefined {
  if (locale !== "vi") return undefined;
  return {
    "--font-inter": `${interVi.style.fontFamily}, ${inter.style.fontFamily}`,
    "--font-overpass": `${overpassVi.style.fontFamily}, ${overpass.style.fontFamily}`,
  } as CSSProperties;
}
