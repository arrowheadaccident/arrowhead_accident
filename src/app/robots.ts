import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// While SITE_IS_PLACEHOLDER is true, noindex is set per page with a meta tag, not here,
// so crawlers can still fetch the pages and see it (SITE-BRIEF §9.4).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
