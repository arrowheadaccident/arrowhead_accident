import type { Metadata } from "next";
import { SITE_IS_PLACEHOLDER, business } from "@/config/business";

export const HOME_TITLE = "Car Accident Chiropractor in Glendale, AZ | Same-Day Care";
export const HOME_DESCRIPTION =
  "Hurt in a car accident in Glendale or Arrowhead Ranch? Same-day chiropractic exams and no out-of-pocket cost when another driver is at fault.";

/** Page-level openGraph replaces the root one, so every page points at src/app/opengraph-image.tsx explicitly. */
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.name}, Glendale, AZ. Call ${business.phone.display}`,
};

export const robots: Metadata["robots"] = SITE_IS_PLACEHOLDER
  ? { index: false, follow: false }
  : { index: true, follow: true };

/** Absolute URL for a site path ("/whiplash-injury/"). */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, business.url).toString();
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({ title, description, path, type = "website", publishedTime, modifiedTime }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: business.name,
      locale: "en_US",
      images: [ogImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
    robots,
  };
}
