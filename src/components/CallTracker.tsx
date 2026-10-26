"use client";

import { useEffect } from "react";
import { track, type CtaLocation } from "@/lib/track";

/** One delegated listener for every tel: link (SITE-BRIEF §11). Location comes from data-cta-location. */
export function CallTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!link) return;
      const location = (link.getAttribute("data-cta-location") as CtaLocation | null) ?? "unknown";
      track("click_to_call", { location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
