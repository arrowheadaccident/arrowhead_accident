// Everything marked PLACEHOLDER must be replaced before launch (SITE-BRIEF §15).

/** true => whole site is noindex, Physician schema is omitted, team cards show a "Sample profile" tag. */
export const SITE_IS_PLACEHOLDER = true;

export const business = {
  name: "Arrowhead Injury Care",
  legalName: "Arrowhead Glendale Arizona Collision Injury Chiropractic", // confirm
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arrowheadcaraccidentchiropractor.com",
  phone: { display: "(623) 600-4878", e164: "+16236004878" },
  email: "info@example.com", // PLACEHOLDER
  address: {
    street: "6320 W Union Hills Dr Ste 1400-B",
    city: "Glendale",
    region: "AZ",
    postalCode: "85308",
    country: "US",
  },
  geo: { lat: 33.654705, lng: -112.198566 } as null | { lat: number; lng: number }, // Building B, OpenStreetMap
  mapEmbedUrl: "https://maps.google.com/maps?q=6320+W+Union+Hills+Dr+Ste+1400-B,+Glendale,+AZ+85308&z=16&output=embed" as null | string,
  // Days not listed are closed. Each day's intervals in order; the gap between them is the lunch break.
  hours: [
    {
      days: ["Monday", "Tuesday", "Thursday"],
      intervals: [
        { opens: "09:00", closes: "12:00" },
        { opens: "14:00", closes: "18:30" },
      ],
    },
  ],
  timeZone: "America/Phoenix",
  languages: ["en", "es"],
  sameAs: [] as string[], // real Google Business Profile / Facebook / YouTube URLs only
} as const;

export type TeamMember = {
  slug: string;
  name: string;
  credential: "DC" | "MD";
  postNominals?: string; // every letter after the name, when there is more than `credential`
  role: string;
  bio: string;
  photo: string | null; // null => initials avatar
  isPlaceholder: boolean;
};

/** Owner and founder, featured on the home page. Credentials from the old site's About page: confirm them. */
export const founder: TeamMember = {
  slug: "vaughn-movses",
  name: "Dr. Vaughn Movses",
  credential: "DC",
  postNominals: "DC, DABFP, FIAMA",
  role: "Founder and Chiropractic Physician",
  bio: "Founder of Arrowhead Injury Care. Certified by the American Board of Forensic Professionals, a Fellow in medical acupuncture, and certified in whiplash and brain injury traumatology and in low-speed collision forensic risk analysis.",
  photo: "/founder.png", // 341×511 from the clinic; has a Zocdoc watermark at the bottom, cropped off by object-top
  isPlaceholder: false,
};

// PLACEHOLDER: the old site listed 4 chiropractors (DC) + 1 pain management MD. Mirror that shape.
export const team: TeamMember[] = [
  founder,
  { slug: "john-doe", name: "Dr. John Doe", credential: "DC", role: "Chiropractic Physician", bio: "Sample bio.", photo: null, isPlaceholder: true },
  { slug: "alex-sample", name: "Dr. Alex Sample", credential: "DC", role: "Chiropractic Physician", bio: "Sample bio.", photo: null, isPlaceholder: true },
  { slug: "chris-sample", name: "Dr. Chris Sample", credential: "DC", role: "Chiropractic Physician", bio: "Sample bio.", photo: null, isPlaceholder: true },
  { slug: "pat-example", name: "Dr. Pat Example", credential: "MD", role: "Pain Management Physician", bio: "Sample bio.", photo: null, isPlaceholder: true },
];

// From the old site, de-duplicated (it listed "Hidden Manor" and "Lexington Place" twice).
export const serviceAreas = [
  "Glendale", "Arrowhead Ranch", "Sierra Verde at Arrowhead Ranch", "Highlands at Arrowhead Ranch",
  "Arrowhead Crossing", "Arrowhead Towne Center", "Hidden Manor", "Sunset Vista", "Casa Campana",
  "Lexington Place", "Woodridge Village" /* old site: "Woodridge Vi" (truncated), confirm */,
  "Dave Brown Utopia", "Parkview North", "Hearthstone Place Estates", "Bellair Gardens", "Overland Trail",
  "Village at Canyon View", "Autumn Ridge", "Western Meadows", "Amberwood North", "Paradise Gates",
  "Yorkshire Estates",
];

export const telHref = `tel:${business.phone.e164}`;

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;
