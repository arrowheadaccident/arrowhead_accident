// One JSON-LD @graph per page (SITE-BRIEF §9.3). All values come from business.ts and frontmatter.
import { SITE_IS_PLACEHOLDER, business, team } from "@/config/business";
import type { Crumb } from "@/components/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

const ids = {
  website: absoluteUrl("/#website"),
  clinic: absoluteUrl("/#clinic"),
};

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: business.name,
    inLanguage: "en-US",
    publisher: { "@id": ids.clinic },
  };
}

function clinicNode() {
  const { address } = business;
  return {
    "@type": "Chiropractor",
    "@id": ids.clinic,
    name: business.name,
    legalName: business.legalName,
    url: absoluteUrl("/"),
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: business.hours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days.length === 1 ? row.days[0] : row.days,
      opens: row.opens,
      closes: row.closes,
    })),
    areaServed: [
      { "@type": "City", name: `${address.city}, ${address.region}` },
      { "@type": "Place", name: "Arrowhead Ranch" },
    ],
    knowsLanguage: business.languages,
    sameAs: business.sameAs,
    // geo and hasMap are added only once the real address exists (§9.3).
    ...(business.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng } }
      : {}),
    ...(business.mapEmbedUrl ? { hasMap: business.mapEmbedUrl } : {}),
  };
}

function breadcrumbNode(pageUrl: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function physicianNodes() {
  if (SITE_IS_PLACEHOLDER) return [];
  return team
    .filter((member) => !member.isPlaceholder)
    .map((member) => ({
      "@type": "Physician",
      "@id": absoluteUrl(`/about-us/#${member.slug}`),
      name: member.name,
      description: member.bio,
      ...(member.photo ? { image: absoluteUrl(member.photo) } : {}),
      worksFor: { "@id": ids.clinic },
      address: clinicNode().address,
      telephone: business.phone.e164,
    }));
}

type GraphInput = {
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  kind?: "page" | "condition" | "faq" | "post";
  faqs?: { q: string; a: string }[];
  published?: string;
  updated?: string;
  /** Adds Physician nodes (About and Pain Management) once real doctors exist. */
  withTeam?: boolean;
};

export function buildGraph({ path, title, description, crumbs, kind = "page", faqs = [], published, updated, withTeam }: GraphInput) {
  const pageUrl = absoluteUrl(path);
  const pageType = kind === "condition" ? "MedicalWebPage" : kind === "faq" ? "FAQPage" : "WebPage";

  const page: Record<string, unknown> = {
    "@type": pageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.clinic },
    ...(crumbs.length > 1 ? { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(updated ? { dateModified: updated } : {}),
  };

  if (kind === "faq") {
    page.mainEntity = faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    }));
  }

  const graph: object[] = [websiteNode(), clinicNode(), page];
  if (crumbs.length > 1) graph.push(breadcrumbNode(pageUrl, crumbs));

  if (kind === "post") {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      headline: title,
      description,
      datePublished: published,
      dateModified: updated,
      inLanguage: "en-US",
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      // The clinic is the author until real, consenting doctors are listed (§9.3).
      author: { "@id": ids.clinic },
      publisher: { "@id": ids.clinic },
    });
  }

  if (withTeam) graph.push(...physicianNodes());

  return { "@context": "https://schema.org", "@graph": graph };
}
