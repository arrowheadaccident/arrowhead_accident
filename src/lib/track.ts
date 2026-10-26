import { sendGAEvent } from "@next/third-parties/google";

export type CtaLocation = "header" | "hero" | "sticky_bar" | "content" | "sidebar" | "footer";
export type FormLocation = "home_hero" | "contact" | "sidebar";

type Events = {
  click_to_call: { location: CtaLocation | "unknown" };
  generate_lead: { form_location: FormLocation };
};

/** Sends a GA4 event. Does nothing when GA is not configured (SITE-BRIEF §11). */
export function track<E extends keyof Events>(event: E, params: Events[E]): void {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return;
  sendGAEvent("event", event, params);
}
