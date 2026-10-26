# Arrowhead Car Accident Chiropractor: New Website Build Brief

> **How to use this file.** This file is the single source of truth for building the new site. Give it to the developer, or to Claude Code with a prompt like: *"Read `docs/SITE-BRIEF.md` and implement Phase 1."*
> Build one phase at a time (§13). Each phase ends with the checks in §14.
>
> Old site: https://arrowheadcaraccidentchiropractor.com/ · Audit date: 2026-10-26 · Project folder: `E:\projects\arrowhead`

---

## 1. Goal

Replace the old WordPress/Elementor site with a fast, clean Next.js site that:

1. **Turns visitors into phone calls and call-back requests.** The primary KPIs are calls and form submissions.
2. **Ranks locally.** Target searches are "car accident chiropractor Glendale AZ" and searches for specific injuries.
3. **Keeps the old URLs and the old content, cleaned up**, so nothing that already ranks is lost.

**Out of scope for this phase:** writing new content, a Spanish version, online booking, a patient portal, deployment/DNS.

---

## 2. Locked decisions

| Topic | Decision |
|---|---|
| Framework | **Next.js 16.4** (App Router), React 19, TypeScript `strict` |
| Styling | **Tailwind CSS 4** (CSS-first `@theme`) + `@tailwindcss/typography` for MDX prose |
| Content | MDX files in `content/`, rendered with `next-mdx-remote@6` (`next-mdx-remote/rsc`), frontmatter via `gray-matter`, validated with `zod` |
| Rendering | Every page is static (SSG). The only server code is `POST /api/contact` |
| Language | **English only**, `<html lang="en-US">`. No translate widget. Keep the "Hablamos Español" note |
| Content strategy | **Clean the old content; don't rewrite it.** Keep the URLs, except for the redirects in §5 |
| Business data | **Placeholder address and placeholder doctors** for now. All of it lives in `src/config/business.ts` |
| Indexing | While placeholder data is in use, the **whole site is `noindex`** |
| Node | ≥ 20.9 (installed: 20.18.1) |

---

## 3. Old site audit: what to fix

| Problem on the old site | Requirement for the new site |
|---|---|
| **10,377 Cyrillic look-alike letters** (20–32% of all letters on most pages): `whірlаѕh` is not "whiplash" to Google or to screen readers | Normalize all text (§7.1). Content check: **zero** chars in U+0400–U+052F |
| **2 addresses** (16390 N 59th Ave 85306 in the text, 20229 N 67th Ave 85308 in the maps) and **3 phones** (623-444-1111, 602-313-1925, 602-449-9430) | One NAP (name, address, phone) from `business.ts`. No phone numbers or addresses hard-coded in content |
| No H1 on Home/About/Pain Management/Contact, empty H2s, phone numbers inside headings | Exactly **one H1** per page; no phone numbers in headings |
| Two SEO plugins (Yoast + Rank Math) output duplicate, conflicting JSON-LD; no LocalBusiness schema | One JSON-LD `@graph` per page from `lib/schema.ts` (§9.3) |
| Mobile PageSpeed 63, LCP 8.1 s, a preloader spinner, 84 requests / ~590 KB, 26 CSS + 27 JS files | Budgets in §10; no preloader |
| The "call back" form has **no phone field**, and the form appears 3× on one page | One form component; phone is required (§8) |
| The call button sits below the fold on mobile; no sticky CTA | Sticky mobile call bar (§6.3) |
| Duplicate pages (`/neck-pain-whiplash/` ≈ `/whiplash-injury/`), a typo URL (`/mutiple-injuries/`), 3 orphan pages missing from the menu | Merge the duplicates, add 301 redirects (§5), put every page in the nav |
| All social icons link to another domain (`caraccidentinjurychiropractor.com`) | No social icons until real profile URLs exist |
| No analytics and no call tracking | GA4 + events (§11) |
| Broken image alts (`"?????…"`), lazy-load placeholders that leave empty cards | Every image goes through `next/image` with a real alt and width/height |
| Unverified statistics, "No cost EVER!!", mentions of other brands/doctors, a broken find-and-replace | Content rules §7.2 |
| robots.txt has two conflicting `User-agent: *` groups; Cloudflare blocks AI search crawlers | `app/robots.ts` (§9.4); review the Cloudflare "Managed robots.txt" setting at launch |
| Theme is "LoanOfficer" with a loan calculator plugin | N/a: the site is rebuilt from scratch |

---

## 4. Business data: `src/config/business.ts`

The single source of truth. Components, MDX, JSON-LD, and the footer all read from here. **Never** hard-code NAP data anywhere else.

```ts
// src/config/business.ts
// Everything marked PLACEHOLDER must be replaced before launch (§15).

/** true => whole site is noindex, Physician schema is omitted, team cards show a "Sample profile" tag. */
export const SITE_IS_PLACEHOLDER = true;

export const business = {
  name: "Arrowhead Car Accident Chiropractor",
  legalName: "Arrowhead Glendale Arizona Collision Injury Chiropractic", // confirm
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arrowheadcaraccidentchiropractor.com",
  phone: { display: "(623) 444-1111", e164: "+16234001111" }, // main number on the old site, confirm
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

// Value propositions taken from the old site's own claims (confirm before launch, §15).
export const valueProps = [
  { title: "Same-day appointments", text: "Call today and see a doctor today or the next day." },
  { title: "No out-of-pocket cost", text: "If another driver caused your accident, we bill their insurance and wait for payment." },
  { title: "No health insurance needed", text: "You can be treated even if you don't have health insurance." },
  { title: "We work with your attorney", text: "We accept liens and send your records and reports to your attorney." },
  { title: "Chiropractors and medical doctors", text: "Chiropractic care, pain management and orthopedic referrals in one place." },
  { title: "Hablamos Español", text: "Nuestros médicos y asistentes hablan español." },
];
```

---

## 5. Sitemap, URLs and redirects

`trailingSlash: true`. Every old URL ends with `/`, and the new URLs keep that.

| URL | Source | Template | Nav label |
|---|---|---|---|
| `/` | `src/app/page.tsx` (copy from the old home page) | Home | n/a |
| `/about-us/` | `content/pages/about-us.mdx` | Content + Team | About |
| `/emergency-car-collision-treatment/` | `content/pages/` | Service | Accident Treatments ▸ Same-Day Emergency Care |
| `/whiplash-injury/` | `content/conditions/` (**merged** with `/neck-pain-whiplash/`) | Condition | ▸ Whiplash |
| `/neck-chiropractor-arrowhead-az/` | `content/conditions/` | Condition | ▸ Neck Pain |
| `/headaches-closed-head-injury/` | `content/conditions/` | Condition | ▸ Headaches & Head Injury |
| `/low-back-pain/` | `content/conditions/` | Condition | ▸ Lower Back Pain |
| `/spinal-ligament-injury-treatment/` | `content/conditions/` | Condition | ▸ Spinal Ligament Injury |
| `/multiple-injuries/` | `content/conditions/` (new slug, typo fixed) | Condition | ▸ Multiple Injuries |
| `/pain-management/` | `content/pages/` | Service + Team | Pain Management |
| `/no-cost-for-your-treatment-ever/` | `content/pages/` | Service | No Out-of-Pocket Cost |
| `/car-collision-injury-chiropractor-arrowhead-glendale-arizona/` | `content/pages/` (8 Q&As) | FAQ | FAQ |
| `/blog/` | `src/app/blog/page.tsx` | Blog index | Blog |
| `/blog/car-accident-insurance-myths/` | `content/blog/` | Post | n/a |
| `/blog/chiropractic-vs-standard-care-study/` | `content/blog/` | Post | n/a |
| `/contact/` | `src/app/contact/page.tsx` | Contact | Contact |
| `/terms-of-use/` `/privacy-policy/` `/disclosure-policy/` | `content/legal/` | Legal | footer only |

**Main nav:** About · Accident Treatments ▾ · Pain Management · No Out-of-Pocket Cost · FAQ · Blog · Contact · **[Call button]**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/neck-pain-whiplash/", destination: "/whiplash-injury/", statusCode: 301 },
      { source: "/mutiple-injuries/", destination: "/multiple-injuries/", statusCode: 301 },
      {
        source: "/2016/06/24/insurance-mantas-myths-concerning-auto-accidents-phoenix-arizona/",
        destination: "/blog/car-accident-insurance-myths/",
        statusCode: 301,
      },
      {
        source: "/2016/06/24/phoenix-car-accident-injury-us-military-study-states-youre-better-off-seeing-chiropractor/",
        destination: "/blog/chiropractic-vs-standard-care-study/",
        statusCode: 301,
      },
      { source: "/category/:path*", destination: "/blog/", statusCode: 301 },
      { source: "/author/:path*", destination: "/blog/", statusCode: 301 },
      { source: "/feed/", destination: "/blog/", statusCode: 301 },
      { source: "/sitemap/", destination: "/", statusCode: 301 },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
    ];
  },
};

export default nextConfig;
```

The redirect check script (§14) reads this list of old URLs. Each one must reach a 200 page in **at most one** 301 hop. If a URL takes two hops (trailing-slash redirect first, then the custom one), fix its `source`.

```json
{
  "keep": [
    "/", "/about-us/", "/pain-management/", "/contact/", "/emergency-car-collision-treatment/",
    "/whiplash-injury/", "/neck-chiropractor-arrowhead-az/", "/headaches-closed-head-injury/",
    "/low-back-pain/", "/spinal-ligament-injury-treatment/", "/no-cost-for-your-treatment-ever/",
    "/car-collision-injury-chiropractor-arrowhead-glendale-arizona/", "/blog/",
    "/terms-of-use/", "/privacy-policy/", "/disclosure-policy/"
  ],
  "redirect": {
    "/neck-pain-whiplash/": "/whiplash-injury/",
    "/mutiple-injuries/": "/multiple-injuries/",
    "/2016/06/24/insurance-mantas-myths-concerning-auto-accidents-phoenix-arizona/": "/blog/car-accident-insurance-myths/",
    "/2016/06/24/phoenix-car-accident-injury-us-military-study-states-youre-better-off-seeing-chiropractor/": "/blog/chiropractic-vs-standard-care-study/",
    "/category/chiropractic-collision-treatment/": "/blog/",
    "/category/insurance-car-accidents/": "/blog/",
    "/sitemap/": "/",
    "/sitemap_index.xml": "/sitemap.xml"
  }
}
```

---

## 6. Design system

### 6.1 Direction

Calm, clinical, and trustworthy, with urgency reserved for the call buttons. The old site was red everywhere; the new one isn't. Design **mobile-first**: most visitors are on a phone, often shortly after an accident.

### 6.2 Tokens: `src/app/globals.css`

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-navy-950: #071a33;
  --color-navy-900: #0b2545; /* header, footer, headings */
  --color-navy-700: #13315c;
  --color-navy-500: #1f4e8c; /* links */
  --color-sky-100: #e8f0fa;  /* tinted sections */
  --color-cta-600: #c8102e;  /* call buttons ONLY (5.9:1 on white) */
  --color-cta-700: #a50d26;  /* hover */
  --color-ink: #1a2433;      /* body text */
  --color-muted: #5b6675;    /* secondary text (5.8:1 on white) */
  --color-line: #e3e8ef;
  --color-surface: #f7f9fc;
  --color-success: #1e7f4f;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --radius-card: 0.75rem;
}
```

- **Font:** Inter via `next/font/google` (weights 400/600/700, `display: "swap"`, CSS variable `--font-inter`). Use this one family only.
- **Type scale:** body 16px on mobile, 18px from `md`, line-height 1.6, prose max 70ch. H1 `text-3xl md:text-5xl font-bold`, H2 `text-2xl md:text-3xl font-bold`, H3 `text-xl font-semibold`.
- **Layout:** container `max-w-6xl`, `px-4` (16px) on mobile, `md:px-6`. Sections `py-12 md:py-20`.
- **Buttons:** min-height 48px, `rounded-full`. Primary call = `bg-cta-600 text-white`; secondary = navy outline.
- **Icons:** `lucide-react` (tree-shaken SVG). No icon fonts.

### 6.3 Global components

| Component | Spec |
|---|---|
| `TopBar` | `md+` only. Today's hours · "Hablamos Español" · phone link |
| `Header` | Wordmark logo (text: **Arrowhead** / small "Car Accident Chiropractor"), nav, red **Call** button. Mobile: logo + call icon button + menu button |
| `NavDropdown` | "Accident Treatments" is a `<button aria-expanded>` that opens on click and keyboard, not hover-only. Closes on Esc and outside click |
| `MobileCallBar` | Fixed to the bottom below `md`. Two buttons: **Call (623) 444-1111** (red) and **Request a call back** (links to `/contact/#form`). Add bottom padding to `<body>` so the bar never covers the footer |
| `Footer` | NAP, hours, treatment links, legal links, medical disclaimer, and the old disclaimer: *"This website is not associated in any way with Dr. Vaughn Movses or Arrowhead Accident Group."* Dynamic copyright year |
| `CtaBand` | "Hurt in a car accident? Get checked today." + Call + Request a call back |
| `Breadcrumbs` | Every page except Home; emits `BreadcrumbList` |
| `Phone`, `Address`, `Hours`, `ServiceAreas`, `CallCta` | MDX-usable components that read `business.ts` |
| `DoctorCard` | Initials avatar when `photo === null`; shows a small **"Sample profile"** tag when `isPlaceholder` |
| `ConditionCard` | Icon, title, `excerpt` from frontmatter, link |
| `FaqAccordion` | Native `<details>/<summary>` (no JS) |
| `ContactForm` | §8 |
| `JsonLd` | Renders `<script type="application/ld+json">` with `JSON.stringify(data).replace(/</g, "\\u003c")` |

### 6.4 Page templates

**Home**, in this order:

1. **Hero.** H1 **"Glendale Arizona Car Accident Injury Chiropractor"** (keep the old H1 text). Under it, the old intro paragraph and 3 checkmarks: *Same-day appointments* · *No out-of-pocket cost when another driver is at fault* · *No health insurance needed*. Then the Call button. The `ContactForm` card goes in the right column on desktop and below the hero text on mobile. **No large hero image**, so the H1 is the LCP element.
2. **How it works**, 4 steps: Call us → Thorough exam and documentation → Treatment plan (chiropractic, pain management, MRI/orthopedic referrals) → We bill the at-fault insurance / work with your attorney.
3. **Car accident injuries we treat:** 7 `ConditionCard`s (Emergency care + 6 conditions).
4. **No out-of-pocket cost:** the old "Auto Accident injury care" text (cleaned), linking to `/no-cost-for-your-treatment-ever/`.
5. **Pain management + Hablamos Español:** the old text.
6. **Team:** `DoctorCard` grid, linking to `/about-us/#team`.
7. **FAQ teaser:** 3 Q&As from the FAQ page + a link.
8. **Areas we serve:** `ServiceAreas` as an inline list. Do **not** create separate location pages.
9. **From the blog:** 2 posts.
10. `CtaBand`.

**Condition / Service page:** Breadcrumbs → H1 (from frontmatter) → MDX body (prose styles; the body starts at H2) → `<CallCta />` placed after the 2nd section → "Related injuries" (3 cards from `related`) → `CtaBand`. On `lg+`, add a sticky sidebar with a Call card, hours, and a compact `ContactForm`.

**FAQ page:** H1 → intro → `FaqAccordion` built from frontmatter `faqs` → `CtaBand`. The same `faqs` array feeds the `FAQPage` JSON-LD.

**About:** cleaned content → value props list → `#team` grid.

**Contact:** H1 "Contact Us" → large phone number → `ContactForm` (`id="form"`) → hours table → address + **map placeholder box** ("Map will appear once the address is confirmed") → "Hablamos Español".

**Blog index:** cards (title, date, excerpt). **Post:** H1, "Published 2016-06-24 · Updated …", body, `CtaBand`.

**404:** friendly message, links to Home and Contact, Call button (Next sets `noindex` automatically).

> Next.js 16 note: `params` is async in pages and `generateMetadata`. Use `const { slug } = await params`.

---

## 7. Content: extraction and cleaning

### 7.1 Extraction script: `scripts/extract-old-content.mjs`

A one-time Node 20 script; its dev dependencies are `cheerio` and `turndown`. For every URL in §5 (`keep` + the old source URLs of redirected pages), it does the following:

1. Fetches the HTML and selects the main content (`main`, falling back to `article` or `.elementor`).
2. Removes `script, style, noscript, header, footer, nav, form`, the "Recent News" block, post navigation, and "Read more »" teasers.
3. Converts the HTML to Markdown with turndown (ATX headings).
4. Runs `normalizeHomoglyphs()` and replaces non-breaking spaces with normal spaces.
5. Writes `content/<collection>/<new-slug>.mdx` with a frontmatter skeleton (§7.3).
6. Prints a report per file: word count, leftover Cyrillic, phone numbers found, headings.

```js
// Verified against the live site on 2026-10-26: 10,377 look-alike characters -> 0 left.
// Found on the old site: а е о р с у і ѕ (U+04xx) and ԛ (U+051B). The rest are common extras.
// NOTE: the range must include U+0500–U+052F, or "ԛuickly" survives.
const HOMOGLYPHS = {
  "а": "a", "в": "b", "е": "e", "к": "k", "м": "m", "н": "h", "о": "o", "р": "p", "с": "c",
  "т": "t", "у": "y", "х": "x", "і": "i", "ј": "j", "ѕ": "s", "һ": "h", "ӏ": "l", "ԁ": "d",
  "ԛ": "q", "ԝ": "w",
  "А": "A", "В": "B", "Е": "E", "К": "K", "М": "M", "Н": "H", "О": "O", "Р": "P", "С": "C",
  "Т": "T", "Х": "X", "І": "I", "Ј": "J", "Ѕ": "S",
};

export function normalizeHomoglyphs(text) {
  return text.replace(/[\u0444-\u052F]/g, (c) => HOMOGLYPHS[c] ?? c);
}

export const hasCyrillic = (text) => /[\u0444-\u052F]/.test(text);
```

### 7.2 Cleaning rules

Apply these to every file, then review each one by hand.

1. **Zero Cyrillic characters.**
2. **No phone numbers or addresses in the text.** Use `<Phone />` / `<Address />`. Delete **602-313-1925** and **602-449-9430** everywhere.
3. **One H1 per page**, from the frontmatter `h1` and rendered by the template. The MDX body starts at H2. Take the phone numbers out of the headings:
   - "Emergency Car Accident Injury Treatment Call 1(623) 444-1111" → "Emergency Car Accident Injury Treatment"
   - "Spinal Ligament Injury Treatment Call 1 602-313-1925" → "Spinal Ligament Injury Treatment"
   - H2s like "Call Now 1(623) 444-1111 for an appointment today!" → replace with `<CallCta />`
4. **Remove:**
   - the "Recent News" lists
   - the About page paragraph *"Thank you for visiting https://arrowheadcaraccdidentchiropractor.com … help us spread the word…"*
   - "Arrowhead Health Centers" (Pain Management intro) → "Our pain management doctors"
   - "Dr. Quackenbush" (No Cost page) → "our doctors"
   - the stray heading "US CHIROPRACTIC DIRECTORY" (blog post)
   - YouTube URLs used as text or as meta descriptions
5. **Unverified or exaggerated claims:**
   - Delete *"over three million cases of neck pain due to auto accidents are reported in Arizona 2013 alone, over 150 of those occur in phoenix on a daily basis"*.
   - "No Cost Treatment- EVER!!" → **"No Out-of-Pocket Cost for Car Accident Victims"**, plus the note *"when another driver is at fault; call us about your situation."*
   - "scientifically proven to not be related" → "often doesn't match".
   - Patient counts are inconsistent ("hundreds" on About, "thousands" on Multiple Injuries): pick one wording or remove the numbers (§15).
6. **Broken find-and-replace on the old site:** "low speeds in Arrowhead Car Accident Chiropractor Arizona" → "low speeds in Arizona"; "dozens of wrecks every day in Arrowhead Car Accident Chiropractor" → "every day in the Phoenix area". Search for `in Arrowhead Car Accident Chiropractor` everywhere.
7. **Typos and errors:**
   - Hundeds → Hundreds
   - nieghborhoods → neighborhoods
   - physicianshave → physicians have
   - mutiple → multiple
   - caraccdident → caraccident
   - "over the counter anti steroidal medications" → "over-the-counter non-steroidal anti-inflammatory drugs (NSAIDs)"
8. **Merge** `/neck-pain-whiplash/` into `/whiplash-injury/`. The texts are nearly identical; keep the fuller version and add any unique paragraphs from the other.
9. **No shouting:** ALL-CAPS sentences → sentence case (use `<strong>` if emphasis is needed); "!!" / "!!!" → "!".
10. **Location wording:** the clinic is in Glendale. "Phoenix" in body text is fine as the metro area, but titles and H1s use Glendale.
11. **Medical and legal tone:** add a medical disclaimer to the footer. On the insurance-myths post, add *"This article is general information, not legal advice."*
12. Fill every frontmatter field (§7.3), using the titles and descriptions in §9.2.

### 7.3 Frontmatter schema

`lib/content.ts` validates this with zod. **The build fails** on missing fields or lengths over the limits.

```yaml
---
title: "Whiplash Treatment After a Car Accident | Glendale, AZ"  # <title>, ≤ 60 chars
description: "…"                                                   # meta description, ≤ 155 chars
h1: "Whiplash Injury"
excerpt: "One sentence for cards, ≤ 140 chars."
navLabel: "Whiplash"           # optional, for menus
order: 2                       # sort order in menus and cards
published: "2019-08-02"
updated: "2026-10-26"
related: ["neck-chiropractor-arrowhead-az", "headaches-closed-head-injury", "low-back-pain"]
faqs: []                       # FAQ page only: [{ q: "...", a: "..." }]
---
```

### 7.4 Content map: what each page keeps

| Page (new slug) | Old words | Keep after cleaning |
|---|---|---|
| Home | 520 | Hero intro; "NO OUT OF POCKET COSTS… we bill the at-fault person's insurance and wait for payment; health insurance not necessary; with an attorney we work on a lien; all paperwork handled; over 10 years' experience"; same-day emergency appointments; Spanish-speaking doctors and assistants; pain management with medical, orthopedic and pain physicians; neighborhoods (via component) |
| `about-us` | 1185 | Intro ("Injury chiropractors serving auto accident victims throughout Glendale…"); "What makes our Arrowhead car accident chiropractors different?"; benefits list (same-day appointment, no health insurance required, no out-of-pocket costs, we bill the at-fault party, attorney–patient liaison, practice limited to auto and work injuries, Hablamos Español); first-visit checklist (accident report or at-fault insurance info; workers' comp info for work injuries) |
| `pain-management` | ~80 real | Short intro (brand sentence fixed) + team grid + condition cards. Thin page: flag it for expansion later |
| `emergency-car-collision-treatment` | 255 | Hidden injuries show up days or weeks later; the ER focuses only on life-threatening injuries; how we treat; same-day appointment |
| `whiplash-injury` (merged) | ~1000 | What whiplash is (soft tissues, facets, discs, nerve roots); flexion-extension; symptoms; cognitive symptoms; delayed onset; treatment |
| `neck-chiropractor-arrowhead-az` | 374 | Why the neck is most vulnerable; even 5 mph collisions; the team of chiropractors, MDs and pain specialists (**statistics removed**) |
| `headaches-closed-head-injury` | 1159 | Types of post-accident headaches; delayed onset (day 4–5 is often the worst); why prompt diagnosis and documentation matter for the claim |
| `low-back-pain` | 285 | Practice dedicated to auto injuries; posture/spine exam; orthopedic tests for disc herniation; no pain ≠ no injury |
| `spinal-ligament-injury-treatment` | 650 | Sprain vs strain; AMA grades 1–3; poor blood supply means slow healing (**phone removed from H1**) |
| `multiple-injuries` | 335 | List of symptoms (neck, arm, jaw, shoulder, wrist, low back, dizziness, headaches); physiotherapy modalities (ultrasound, diathermy, massage, exercise); disc herniation exam |
| `no-cost-for-your-treatment-ever` | 132 | New H1 per rule 5; at-fault billing; attorney collaboration. Add the Home page's no-out-of-pocket paragraph for substance (same clinic's own text) |
| FAQ (`car-collision-injury-…-arizona`) | 1095 | The 8 Q&As below → frontmatter `faqs` |
| `blog/car-accident-insurance-myths` | 1927 | "Mantras" #1… (swindlers, ambulance-chasing attorneys, …); add the not-legal-advice note |
| `blog/chiropractic-vs-standard-care-study` | 675 | Summary of the Goertz et al. 2013 study. Add the citation: *Goertz CM et al. "Adding chiropractic manipulative therapy to standard medical care for patients with acute low back pain." Spine. 2013;38(8):627–634* (verify) |
| Legal × 3 | 1557 / 1006 / 228 | Copy as is, update the site name, domain and "last updated" date; legal review before launch |

**The 8 FAQ questions (old site, cleaned):**

1. I've been to the hospital emergency room and my medical doctor. Do I really need to see a chiropractor?
2. I didn't go to the emergency room or my doctor. Do you offer emergency car accident care, and when can I get an appointment?
3. Should I see an attorney before I see my chiropractor?
4. What if my car sustained only minor damage?
5. What if I need an MRI or need to see an MD after you examine me?
6. If I need chiropractic care, do I have to pay for it myself?
7. The insurance company has been calling me and wants to settle. What should I do?
8. My insurance adjuster said I don't need a chiropractor because it was a low-impact accident. Is that true? *(on the old site this was written as a statement; rephrase it as a question)*

---

## 8. Contact / call-back form

| Field | Label | Type | Required | Validation |
|---|---|---|---|---|
| `name` | Full name | text | yes | 2–80 chars |
| `phone` | Phone | tel | **yes** | 10 US digits after removing non-digits (a leading `1` is allowed) |
| `email` | Email | email | no | valid email |
| `accidentDate` | Date of accident | date | no | not in the future |
| `message` | How can we help? | textarea | no | ≤ 1000 chars |
| `consent` | I agree to be contacted by phone, text or email about my request. | checkbox | **yes** | must be checked |
| `website` | *(honeypot: visually hidden, `tabIndex={-1}`, `autoComplete="off"`)* | text | n/a | must be empty |

Helper text under the button: *"Please don't include medical details. We'll call you back during business hours."*

**Client (`ContactForm`, `"use client"`):**
- Accepts a `variant: "card" | "inline" | "compact"` prop.
- Shows inline errors linked with `aria-describedby`, and disables the button while sending.
- On success, replaces the form with: *"Thank you, we'll call you shortly. Need help now? Call (623) 444-1111."*
- Fires the GA4 `generate_lead` event on success.

**Server (`src/app/api/contact/route.ts`, Node runtime):**
1. Parse the JSON body and validate it with the same zod schema (shared in `lib/contact-schema.ts`).
2. If the honeypot is filled, return `200 { ok: true }` and send nothing.
3. Rate limit per IP: 5 requests per 10 minutes, in memory. This is a per-instance limit and acceptable for now.
4. If `RESEND_API_KEY` is set, send an email via Resend to `CONTACT_TO_EMAIL` from `CONTACT_FROM_EMAIL` with the subject `New call-back request: {name}`. Otherwise, `console.info` the payload (dev only).
5. Return `{ ok: true }`, or `400 { ok: false, errors }`.
6. **Don't log personal data in production.** Log only that a request was received.

---

## 9. SEO

### 9.1 Metadata

- In the root layout:
  - `metadataBase = new URL(business.url)`
  - `title: { default: <Home title>, template: "%s" }`. There is no suffix because the titles below are written in full.
  - Default OG image from `src/app/opengraph-image.tsx` (1200×630, navy background, wordmark + phone).
- Each page's `generateMetadata` reads its frontmatter:
  - `title`, `description`
  - `alternates.canonical` (with a trailing slash)
  - `openGraph { title, description, url, type }`
  - `robots: SITE_IS_PLACEHOLDER ? { index: false, follow: false } : { index: true, follow: true }`

### 9.2 Titles and descriptions

Use these exactly. Titles must be ≤ 60 characters and descriptions ≤ 155.

```yaml
"/":
  title: "Car Accident Chiropractor in Glendale, AZ | Same-Day Care"
  description: "Hurt in a car accident in Glendale or Arrowhead Ranch? Same-day chiropractic exams and no out-of-pocket cost when another driver is at fault."
"/about-us/":
  title: "About Our Car Accident Chiropractors | Glendale, AZ"
  description: "Our Glendale chiropractors and medical doctors treat only car accident and work injuries. Same-day visits, no health insurance needed."
"/emergency-car-collision-treatment/":
  title: "Same-Day Car Accident Injury Care | Glendale, AZ"
  description: "Many car accident injuries don't show symptoms for days. Get a same-day chiropractic exam in Glendale, AZ, even after an ER visit."
"/whiplash-injury/":
  title: "Whiplash Treatment After a Car Accident | Glendale, AZ"
  description: "Neck pain, stiffness, headaches or dizziness after a crash? Learn the symptoms of whiplash and how our Glendale chiropractors treat it."
"/neck-chiropractor-arrowhead-az/":
  title: "Neck Injury Chiropractor in Glendale, AZ | Auto Injuries"
  description: "Even a low-speed collision can injure your neck. Our Glendale chiropractors diagnose and treat neck injuries from car accidents."
"/headaches-closed-head-injury/":
  title: "Headaches & Head Injury After a Car Accident | Glendale"
  description: "Headaches after a car accident can start hours or days later. Learn the common types and why a prompt exam and documentation matter."
"/low-back-pain/":
  title: "Low Back Pain After a Car Accident | Glendale Chiropractor"
  description: "Low back pain after a crash can signal a disc or spinal injury. Get a thorough exam and car accident treatment in Glendale, AZ."
"/spinal-ligament-injury-treatment/":
  title: "Spinal Ligament Injury Treatment | Glendale, AZ"
  description: "A sprain is a torn ligament, and ligaments heal slowly. Learn how spinal ligament injuries are graded and treated after a car crash."
"/multiple-injuries/":
  title: "Multiple Injuries From a Car Accident | Glendale, AZ"
  description: "Neck, back, shoulder, jaw or wrist pain after a crash? Our chiropractors and medical doctors treat multiple injuries in one place."
"/pain-management/":
  title: "Pain Management After a Car Accident | Glendale, AZ"
  description: "Medical pain management for car accident injuries in Glendale, AZ, alongside chiropractic care. No out-of-pocket cost if not at fault."
"/no-cost-for-your-treatment-ever/":
  title: "No Out-of-Pocket Car Accident Treatment | Glendale, AZ"
  description: "Not at fault? We bill the at-fault driver's insurance, work with your attorney and wait for payment. No health insurance needed."
"/car-collision-injury-chiropractor-arrowhead-glendale-arizona/":
  title: "Car Accident Chiropractor FAQ | Glendale, AZ"
  description: "Answers to common questions after a Glendale car accident: ER visits, attorneys, minor damage, MRIs, insurance calls and who pays."
"/blog/":
  title: "Car Accident Injury Articles | Glendale Chiropractor"
  description: "Articles on car accident injuries, chiropractic care and insurance myths from our Glendale, Arizona auto injury clinic."
"/blog/car-accident-insurance-myths/":
  title: "Car Accident Insurance Myths You Should Know"
  description: "Common myths about car accident victims, attorneys and chiropractors, and what is actually true when you are hurt in a collision."
"/blog/chiropractic-vs-standard-care-study/":
  title: "Study: Chiropractic Care for Low Back Pain"
  description: "A 2013 study by Goertz et al. compared standard medical care with and without chiropractic care for low back pain. Here is what it found."
"/contact/":
  title: "Contact Us | Glendale Car Accident Chiropractor"
  description: "Call (623) 444-1111 or request a call back. Same-day appointments for car accident injuries in Glendale, AZ. Hablamos Español."
"/terms-of-use/":
  title: "Terms of Use | Arrowhead Car Accident Chiropractor"
  description: "The terms that apply when you use this website."
"/privacy-policy/":
  title: "Privacy Policy | Arrowhead Car Accident Chiropractor"
  description: "How this website collects, uses and protects the information you submit."
"/disclosure-policy/":
  title: "Disclosure Policy | Arrowhead Car Accident Chiropractor"
  description: "Disclosure policy for this website."
```

### 9.3 Structured data (JSON-LD)

`lib/schema.ts` builds one `@graph` per page:

| Pages | Nodes |
|---|---|
| All | `WebSite` (`#website`) · `Chiropractor` (`#clinic`) · `WebPage` (`MedicalWebPage` on condition pages) · `BreadcrumbList` |
| FAQ | + `FAQPage` from frontmatter `faqs` |
| Blog posts | + `BlogPosting` (author = the clinic `Organization` while placeholder) |
| About / Pain Management | + `Physician` per team member **only when** `SITE_IS_PLACEHOLDER === false` and `isPlaceholder === false` |

```json
{
  "@type": "Chiropractor",
  "@id": "https://arrowheadcaraccidentchiropractor.com/#clinic",
  "name": "Arrowhead Car Accident Chiropractor",
  "url": "https://arrowheadcaraccidentchiropractor.com/",
  "telephone": "+16234001111",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1234 W Example Rd, Suite 100",
    "addressLocality": "Glendale",
    "addressRegion": "AZ",
    "postalCode": "85308",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "07:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "13:00" }
  ],
  "areaServed": [
    { "@type": "City", "name": "Glendale, AZ" },
    { "@type": "Place", "name": "Arrowhead Ranch" }
  ],
  "knowsLanguage": ["en", "es"],
  "sameAs": []
}
```

All values come from `business.ts`. Add `geo` and `hasMap` only after the real address exists.

### 9.4 Sitemap, robots and internal links

- `src/app/sitemap.ts`: every indexable route, with `lastModified` from the frontmatter `updated`.
- `src/app/robots.ts`: `{ rules: [{ userAgent: "*", allow: "/" }], sitemap: "<url>/sitemap.xml" }`. While the site is a placeholder, `noindex` is applied by the meta tag, **not** by robots.txt, so crawlers can still see the noindex.
- Cloudflare's "Managed robots.txt" currently adds AI-crawler blocks at the edge. Decide at launch (§15).
- **Internal links:**
  - each condition page → 3 related pages + FAQ + No Out-of-Pocket Cost
  - Home → every treatment
  - footer → every treatment
  - breadcrumbs everywhere except Home

### 9.5 Images

- Don't reuse the old stock photos or any real doctor photos.
- Any image goes through `next/image` with explicit `sizes`, a descriptive `alt` (`alt=""` for decorative images), and AVIF/WebP.
- Logo: a text/SVG wordmark until a vector logo is supplied.

---

## 10. Performance and accessibility budgets

| Metric | Target (old) |
|---|---|
| Lighthouse mobile: Performance / Accessibility / Best Practices / SEO | **≥ 90 / ≥ 95 / ≥ 95 / 100** (63 / 88 / 69 / 100) |
| LCP (lab, mobile) | **≤ 2.0 s** (8.1 s) |
| CLS | ≤ 0.05 (0.032) |
| TBT | ≤ 150 ms (190 ms) |
| First-load JS per route (`next build` output) | ≤ 120 KB gzipped |

- None of the following: preloader, carousels/sliders, animation libraries, icon fonts, jQuery.
- Third-party scripts: only GA4, and only when `NEXT_PUBLIC_GA_ID` is set.
- **WCAG 2.2 AA:**
  - focusable skip link, visible focus rings, contrast ≥ 4.5:1
  - labels on every input, errors linked with `aria-describedby`
  - keyboard-operable dropdown menu, tap targets ≥ 44×44 px
  - headings in order, `title` on any iframe

---

## 11. Analytics and tracking

- `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />` from `@next/third-parties/google`, rendered in the root layout **only** when the env var exists.
- `lib/track.ts` exports `track(event, params)`, which does nothing when GA is absent.
- Events:
  - `click_to_call`: all `a[href^="tel:"]`, via one delegated click listener. Parameter `location` = `data-cta-location`: `header`, `hero`, `sticky_bar`, `content`, `sidebar` or `footer`.
  - `generate_lead`: form success. Parameter `form_location` = `home_hero`, `contact`, `sidebar`.

---

## 12. Project structure

```
E:\projects\arrowhead\
├─ docs/
│  └─ SITE-BRIEF.md                 ← this file
├─ content/
│  ├─ pages/        about-us, pain-management, emergency-car-collision-treatment,
│  │                no-cost-for-your-treatment-ever,
│  │                car-collision-injury-chiropractor-arrowhead-glendale-arizona  (.mdx)
│  ├─ conditions/   whiplash-injury, neck-chiropractor-arrowhead-az, headaches-closed-head-injury,
│  │                low-back-pain, spinal-ligament-injury-treatment, multiple-injuries  (.mdx)
│  ├─ blog/         car-accident-insurance-myths, chiropractic-vs-standard-care-study  (.mdx)
│  └─ legal/        terms-of-use, privacy-policy, disclosure-policy  (.mdx)
├─ scripts/
│  ├─ extract-old-content.mjs       ← one-time (§7.1)
│  ├─ check-content.mjs             ← npm run check:content (§14)
│  └─ check-redirects.mjs           ← npm run check:redirects (§14)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx  page.tsx  not-found.tsx  globals.css  opengraph-image.tsx
│  │  ├─ [slug]/page.tsx            ← pages/ + conditions/ via generateStaticParams
│  │  ├─ contact/page.tsx
│  │  ├─ blog/page.tsx  blog/[slug]/page.tsx
│  │  ├─ api/contact/route.ts
│  │  └─ sitemap.ts  robots.ts
│  ├─ components/                   ← §6.3
│  ├─ config/business.ts            ← §4
│  └─ lib/  content.ts  schema.ts  contact-schema.ts  track.ts
├─ .env.example
└─ next.config.ts                   ← §5
```

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=https://arrowheadcaraccidentchiropractor.com
NEXT_PUBLIC_GA_ID=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

**Dependencies:**
- `next@16.4` `react` `react-dom` `tailwindcss@4` `@tailwindcss/typography`
- `next-mdx-remote@6` `gray-matter` `zod` `resend` `lucide-react` `@next/third-parties`
- Dev: `cheerio` `turndown`

---

## 13. Build phases

Do these in order. Commit after each phase.

**Phase 0: Scaffold**
- In `E:\projects\arrowhead`, run `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`. This works because the folder only contains `docs/`. Decline React Compiler if asked.
- Install the dependencies (§12) and add `.env.example`.
- Set up `next.config.ts` (§5).

**Phase 1: Foundation**
- `business.ts`, design tokens, Inter font.
- Root layout: skip link, `TopBar`, `Header` + `NavDropdown`, `Footer`, `MobileCallBar`, base JSON-LD.
- `Phone` / `Address` / `Hours` / `CallCta` / `CtaBand` components.
- Wire up the placeholder `noindex`.

**Phase 2: Content**
- Write and run `extract-old-content.mjs`.
- Apply the §7.2 rules by hand.
- Fill the frontmatter from §9.2 and the FAQ list.
- Write the zod validation in `lib/content.ts` and `check-content.mjs`.

**Phase 3: Templates and pages**
- Home, `[slug]` (pages + conditions), Contact, Blog index + post, legal, 404.
- Related cards, FAQ accordion, Team grid with "Sample profile" tags.

**Phase 4: Form**
- `ContactForm` + `lib/contact-schema.ts` + `/api/contact` + success/error states + GA event.

**Phase 5: SEO**
- `generateMetadata` everywhere, the `lib/schema.ts` graph, `sitemap.ts`, `robots.ts`, OG image.
- Run `check-redirects.mjs`.

**Phase 6: QA and polish**
- Every check in §14 passes.
- Manual review at 375 px and 768 px.
- Keyboard-only pass.

---

## 14. Acceptance checks

**Automated**

- [ ] `npm run lint`: 0 errors · `npx tsc --noEmit`: 0 errors.
- [ ] `npm run build`: every route is static except `/api/contact`.
- [ ] `npm run check:content`:
  - 0 Cyrillic characters (U+0400–U+052F) in `content/`.
  - 0 banned strings in `content/`: `602-313-1925`, `602-449-9430`, `16390`, `20229`, `Quackenbush`, `Arrowhead Health Centers`, `caraccdident`, `mutiple`, `Recent News`, `in Arrowhead Car Accident Chiropractor`.
  - every `title` ≤ 60 chars, every `description` ≤ 155.
- [ ] `npm run check:redirects` (against `next start` on `http://localhost:3000`, using the JSON in §5):
  - every `keep` URL returns 200 directly
  - every `redirect` URL takes exactly one 301 to its target, which returns 200
- [ ] Rendered HTML of every page:
  - exactly one `<h1>`
  - canonical with a trailing slash
  - one JSON-LD script that parses as valid JSON
  - `noindex, nofollow` present while `SITE_IS_PLACEHOLDER` is true
- [ ] Every `tel:` link is `tel:+16234001111`.
- [ ] Lighthouse mobile on `/`, `/whiplash-injury/` and `/contact/` meets §10.

**Manual**

- [ ] At 375 px:
  - the Call button is on the first screen of Home
  - the sticky bar never covers content
  - the menu and the dropdown work
- [ ] Keyboard only: the skip link, menu, dropdown, form and accordion all work, with visible focus.
- [ ] Form: required errors, the honeypot, the success state, and the payload logged in dev.
- [ ] No old or foreign brand names. Placeholder people show the "Sample profile" tag, and the placeholder address is obviously fake.

---

## 15. Launch checklist (after the build, not part of it)

1. **Real data.**
   - Address, `geo` and `mapEmbedUrl`; confirm the phone; a real email.
   - Real doctors: name, credential, photo (≥ 800 px, with consent), bio. Set `isPlaceholder: false`.
2. **Switch to live.** Set `SITE_IS_PLACEHOLDER = false`. This removes `noindex` and enables the `Physician` schema.
3. **Confirm the claims:**
   - "over 10 years"
   - patient counts
   - same-day availability
   - Spanish-speaking staff
   - MRI and orthopedic referrals
   - medical pain management on site
4. **Legal review:**
   - Terms, Privacy and Disclosure
   - the form consent text (calls and texts)
   - the medical disclaimer
   - use of the name "Arrowhead": Arrowhead Health Centers, Arrowhead Accident Group and Arrowhead Clinic are separate businesses
5. **Email and analytics.**
   - Verify the Resend sending domain and set the env vars on the host.
   - Create the GA4 property and mark `generate_lead` and `click_to_call` as key events.
6. **Search Console.** Verify the domain, submit `/sitemap.xml`, and inspect the old URLs.
7. **Local listings.**
   - Create or claim a Google Business Profile with **exactly** the same NAP.
   - Fix the directory listings: Healthline/WebMD currently show other addresses and phone numbers.
8. **Cloudflare and hosting.**
   - Decide on the "Managed robots.txt" setting: it currently blocks AI search assistants.
   - Add cache rules for static assets.
   - DNS cutover to the host (Vercel recommended for Next.js).
9. **Old site.** Keep a WordPress export plus `wp-content/uploads` for 90 days, then shut it down.
10. **After launch.**
    - Run Lighthouse on production.
    - Watch 404s in Search Console for 4 weeks and add any missing redirects.

---

## Appendix A: Old site facts

- **Stack:**
  - WordPress 7.1.3, theme "LoanOfficer" (glister child)
  - Elementor 4.3.5 + Elementor Pro 3.32, Contact Form 7, Page List
  - Yoast **and** Rank Math
  - Google Language Translator **and** GTranslate
  - Cloudflare (HTML not cached, TTFB ~1.05 s)
- **PageSpeed (mobile, 2026-10-26):** Performance 63 · Accessibility 88 · Best Practices 69 · SEO 100. FCP 2.2 s · LCP 8.1 s · TBT 190 ms · CLS 0.032 · SI 7.9 s. No CrUX field data (low traffic).
- **Hours (old Contact page):** Mon–Fri 7:00 AM–7:00 PM · Sat 8:00 AM–1:00 PM · Sun closed.
- **Old URLs and last-modified dates (sitemap):**
  - core pages 2026-01
  - condition pages 2019-08-02
  - blog posts published 2016-06-24, updated 2019-08
  - `/sitemap/` 2018-05-06
- **Homoglyph share by page:** whiplash 31.6% · neck-pain-whiplash 30.7% · headaches 29.7% · insurance myths 28.8% · emergency 27.9% · neck 27.1% · multiple injuries 25.8% · about 24.1% · no-cost 20.9% · study post 8.6% · home 6.8% · low back / FAQ / spinal ligament ≈ 0%.
