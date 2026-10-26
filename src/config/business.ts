// Everything marked PLACEHOLDER must be replaced before launch (SITE-BRIEF §15).

/** true => whole site is noindex, Physician schema is omitted, team cards show a "Sample profile" tag. */
export const SITE_IS_PLACEHOLDER = true;

export const business = {
  name: "Arrowhead Car Accident Chiropractor",
  legalName: "Arrowhead Glendale Arizona Collision Injury Chiropractic", // confirm
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arrowheadcaraccidentchiropractor.com",
  phone: { display: "(623) 400-6362", e164: "+16234006362" }, // main number on the old site, confirm
  email: "info@example.com", // PLACEHOLDER
  address: {
    // PLACEHOLDER
    street: "1234 W Example Rd, Suite 100",
    city: "Glendale",
    region: "AZ",
    postalCode: "85308",
    country: "US",
  },
  geo: null as null | { lat: number; lng: number }, // set with the real address
  mapEmbedUrl: null as null | string, // set with the real address
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
    { days: ["Saturday"], opens: "08:00", closes: "13:00" },
  ], // Sunday: closed (from the old Contact page)
  timeZone: "America/Phoenix",
  languages: ["en", "es"],
  sameAs: [] as string[], // real Google Business Profile / Facebook / YouTube URLs only
} as const;

export type TeamMember = {
  slug: string;
  name: string;
  credential: "DC" | "MD";
  role: string;
  bio: string;
  photo: string | null; // null => initials avatar
  isPlaceholder: boolean;
};

// PLACEHOLDER: the old site listed 4 chiropractors (DC) + 1 pain management MD. Mirror that shape.
export const team: TeamMember[] = [
  { slug: "jane-doe", name: "Dr. Jane Doe", credential: "DC", role: "Chiropractic Physician", bio: "Sample bio: training, years treating auto-injury patients, approach to care.", photo: null, isPlaceholder: true },
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
