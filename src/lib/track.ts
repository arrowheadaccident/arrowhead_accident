export type CtaLocation = "header" | "hero" | "sticky_bar" | "content" | "sidebar" | "footer";
export type FormLocation = "home_hero" | "contact" | "sidebar";

type Events = {
  click_to_call: { location: CtaLocation | "unknown" };
  generate_lead: { form_location: FormLocation };
};

declare global {
  interface Window {
    /** Defined by <GoogleAnalytics /> (@next/third-parties) only when NEXT_PUBLIC_GA_ID is set. */
    gtag?: (command: "event", name: string, params: Record<string, unknown>) => void;
  }
}

/**
 * Sends a GA4 event. Does nothing when GA is not configured (SITE-BRIEF §11).
 * Calls window.gtag directly so client bundles don't pull in @next/third-parties.
 */
export function track<E extends keyof Events>(event: E, params: Events[E]): void {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
