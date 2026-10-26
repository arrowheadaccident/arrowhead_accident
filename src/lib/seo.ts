import type { Metadata } from "next";
import { SITE_IS_PLACEHOLDER, business, team } from "@/config/business";
import { placeholderProblems } from "@/lib/launch-check.mjs";

// Going live with sample data would get a fake NAP indexed, so the build stops instead (docs/SEO-AUDIT.md C1).
// The opposite mistake, launching while still a placeholder, is caught by `npm run check:launch`.
if (!SITE_IS_PLACEHOLDER) {
  const problems = placeholderProblems({ business, team });
  if (problems.length) {
    throw new Error(`SITE_IS_PLACEHOLDER is false but src/config/business.ts still has placeholder data:\n- ${problems.join("\n- ")}`);
  }
}

export const HOME_TITLE = "Car Accident Chiropractor in Glendale, AZ | Same-Day Care";
export const HOME_DESCRIPTION =
  "Hurt in a car accident in Glendale or Arrowhead Ranch? Same-day chiropractic exams and no out-of-pocket cost when another driver is at fault.";

/**
 * Page-level openGraph replaces the root one, so every page sets the image explicitly. It is a route
 * with a file extension (src/app/og.png/route.tsx) because `trailingSlash: true` 308-redirects
 * extensionless metadata routes such as /opengraph-image (docs/SEO-AUDIT.md H3).
 */
export const ogImage = {
  url: "/og.png",
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
