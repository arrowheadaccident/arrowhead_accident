# SEO Audit: Arrowhead Car Accident Chiropractor (local build)

**Date:** 2026-10-26 · **Branch:** `feat/new-site` @ `a3eb772` · **Audited:** local production build (`next build` + `next start`, port 3100) and the source in this repo.
**Business type:** local service, medical (YMYL). Single location, Glendale / Arrowhead Ranch, AZ.
**Scope:** the new site only. The live WordPress site, live SERPs, Search Console, CrUX and backlink data were **not** checked (by choice, and the new site isn't live).

> **Update, same day:** action-plan steps 1–3 are done. See [§7](#7-fixes-applied-2026-10-26). The findings below describe the site as audited at `a3eb772`.

---

## 1. Summary

| | |
|---|---|
| **SEO Health Score (launch state)** | **72 / 100** |
| Today, as built | Not indexable on purpose: every page is `noindex, nofollow` while `SITE_IS_PLACEHOLDER = true` |
| Lighthouse mobile (`/`, `/whiplash-injury/`, `/contact/`) | Performance 95–96 · Accessibility 100 · Best Practices 100 · SEO 66 (only failure: the intended `noindex`) · Agentic Browsing 100 |

"Launch state" means the score the site gets once launch-checklist items 1–2 (real NAP and doctors, flag switched off) are done and nothing else changes.

**The technical base is strong:** static HTML, one canonical per page, consistent trailing slashes, a clean sitemap, legacy redirects in one hop, a single JSON-LD `@graph`, CLS 0, and Accessibility 100. **What holds the score back is content and trust:**
six of the eleven service and condition pages have under 300 words of their own text, no medical page names a credentialed author or reviewer, the doctors are placeholders, and the site has no photos and no reviews.
For a YMYL local medical business, those are the signals that decide rankings once the technical work is done.

### Top 5 issues
1. **Launch sequencing risk (Critical).** Going live with `SITE_IS_PLACEHOLDER = true` would put `noindex` on every old URL that ranks today. Switching the flag off while the placeholder address is still there would get a fake NAP indexed. Nothing in the build prevents either mistake.
2. **Thin YMYL service pages (High).** Pain Management has 109 words, No Out-of-Pocket 194, Emergency 197, Low Back 233, Multiple Injuries 233, Neck 294.
3. **No named, credentialed author or reviewer on medical content (High).** Blog posts are authored by the clinic Organization, and condition pages have no byline and no review date.
4. **`og:image`, `twitter:image` and `apple-touch-icon` URLs 308-redirect (High, quick fix).** This comes from `trailingSlash: true` combined with the dynamic image routes.
5. **AI search crawlers blocked at Cloudflare on the live domain (High, launch decision).** The repo's `robots.txt` allows them, but the edge setting overrides it.

### Quick wins (code only, under an hour each)
- Fix the redirecting image URLs (§3, H3).
- Give the 404 page its own title (§3, L2).
- Add "after a car accident" or a location to the generic H1s (§3, M2).
- Link blog posts to the matching service pages (§3, M1).
- Add a `check:launch` guard script (§3, C1).

---

## 2. Scores

| Category | Weight | Score | Main reasons |
|---|---:|---:|---|
| Technical SEO | 22% | 88 | SSG, canonicals, redirects, sitemap and 404s are all correct. Points lost for image URLs that redirect, the missing launch guard and `/favicon.ico` 404 |
| Content quality (E-E-A-T) | 23% | 52 | Thin service pages, no author or reviewer, placeholder team, unsourced claims, two blog posts from 2016, no reviews |
| On-page SEO | 20% | 80 | Titles and descriptions are unique and in range, with one H1 each. Points lost for generic H1s, only 4 contextual body links on the whole site and neck/whiplash overlap |
| Schema / structured data | 10% | 74 | One valid `@graph`. Missing `image`/`logo`, `geo`, `hasMap`, `sameAs`, a Person author and medical review properties |
| Performance (CWV) | 10% | 82 | Lab: CLS 0, TBT 40–50 ms, LCP 2.8–3.0 s (simulated, "needs improvement"). No field data |
| AI search readiness | 10% | 62 | Agentic Browsing 100 and server-rendered FAQ passages. Points lost for AI crawlers blocked at the edge, an ambiguous entity ("Arrowhead"), no `sameAs` and no authorship |
| Images | 5% | 55 | Nothing is broken, but there are no photos at all (clinic, doctors, exterior), and the OG image URL redirects |
| **Weighted total** | | **72** | |

---

## 3. Findings by priority

Each finding lists **why** it matters, what it **depends on**, how to **verify** the fix, and a **leading indicator** to watch.

### Critical (fix before or at launch)

**C1. Make the launch a single release, with a guard.**
- **What:** [`src/config/business.ts:4`](../src/config/business.ts) has `SITE_IS_PLACEHOLDER = true`, which makes every page `noindex, nofollow` ([`src/lib/seo.ts:17`](../src/lib/seo.ts)). The address at [`business.ts:14`](../src/config/business.ts) is `1234 W Example Rd`.
- **Why:** if the DNS cutover happens with the flag on, Google re-crawls the old ranking URLs, sees `noindex` and drops them within days. If the flag is switched off while the address is still the placeholder, a fake NAP gets indexed, conflicts with the Google Business Profile and directories, and the `Chiropractor` schema publishes it.
- **Do:** add a `check:launch` script that fails when the flag is `false` and `business.ts` still contains `Example`, `example.com`, `Doe`, `Sample`, `isPlaceholder: true` or `geo: null`. Also fail a production deploy (for example `VERCEL_ENV=production`) while the flag is `true`. Ship the real data and the flag change in one commit.
- **Depends on:** real NAP and doctors from the clinic (brief §15.1).
- **Verify:** on production, `curl -s https://arrowheadcaraccidentchiropractor.com/ | grep robots` shows `index, follow`. URL Inspection in Search Console shows "Indexing allowed".
- **Leading indicator:** Search Console → Pages → "Excluded by 'noindex' tag" stays at 0 after the cutover.

**C2. One NAP, everywhere, from day one.**
- **What:** the brief (§3, §15.7) records two addresses and three phone numbers on the old site, and Healthline/WebMD listings with other addresses. `legalName` ("Arrowhead Glendale Arizona Collision Injury Chiropractic") and `name` ("Arrowhead Car Accident Chiropractor") differ, and both need confirming.
- **Why:** NAP consistency and a verified GBP are top local-pack factors. "Arrowhead" is also used by unrelated businesses (Arrowhead Health Centers, Arrowhead Clinic, Arrowhead Accident Group), so Google needs consistent signals to tell this clinic apart from them.
- **Do:** decide the exact public name, which must be the real-world name on the signage. Use it in `business.ts`, on the GBP, Yelp, Healthline, WebMD, Bing Places and Apple Business Connect. Fill `sameAs` with the GBP and other real profile URLs.
- **Depends on:** C1.
- **Verify:** a search for the brand plus "Glendale" shows one knowledge panel with the site's phone and address.
- **Leading indicator:** GBP Insights shows calls and direction requests growing month over month.

### High

**H1. Expand the thin service and condition pages.**

| Page | Own words | Missing, at minimum |
|---|---:|---|
| `/pain-management/` | 109 | Who the MD is, what is offered (only verified services), when patients are referred, how it is billed on a lien |
| `/no-cost-for-your-treatment-ever/` | 194 | Step-by-step lien and billing process, what happens if the other driver is uninsured, MedPay, what the patient signs |
| `/emergency-car-collision-treatment/` | 197 | What the same-day exam includes, ER red flags (when to go to the ER instead), what to bring |
| `/low-back-pain/` | 233 | Symptoms, red flags, how it is diagnosed (exam, x-ray, MRI referral), treatment, typical timeline |
| `/multiple-injuries/` | 233 | Same structure as above |
| `/neck-chiropractor-arrowhead-az/` | 294 | Neck injuries other than whiplash (disc, pinched nerve, facet), with a link to `/whiplash-injury/` |

- **Why:** a page ranks when it fully answers the query. For "low back pain after car accident" that means symptoms, diagnosis, treatment, timeline and cost, and competing clinic pages cover all of these. Word count is only a proxy; the plugin's gate for service pages is about 800 words. The brief put new content out of scope for the build, and `docs/CONTENT-NOTES.md` already lists Pain Management as thin.
- **Do:** write from the clinic's real process and keep every claim verifiable. Get the facts from the doctors, then have them review the copy (see H2).
- **Depends on:** H2 (the reviewer), C1 (real doctors).
- **Verify:** within 8–12 weeks of launch, Search Console shows impressions for the long-tail injury queries ("…after car accident Glendale") on each expanded URL.
- **Leading indicator:** the number of queries per URL in the Search Console Performance report.

**H2. Named, credentialed authorship and medical review.**
- **What:** blog posts use `author: { "@id": "#clinic" }` ([`src/lib/schema.ts:141`](../src/lib/schema.ts)). Condition pages have no byline, no "reviewed by" and no review date, and the team shows "Sample profile".
- **Why:** this is YMYL health content. Search quality guidelines weight expertise and trust most heavily for this kind of page, and AI answer engines also prefer passages with an identifiable expert source.
- **Do:** once real doctors exist, show "Medically reviewed by Dr. X, DC · Month YYYY" on condition pages and blog posts, linking to `/about-us/#slug`. In schema, set `BlogPosting.author` to the `Physician` node, and add `MedicalWebPage.reviewedBy` and `lastReviewed`. The `Physician` nodes are already wired to switch on with the flag.
- **Depends on:** C1.
- **Verify:** the Schema Markup Validator (validator.schema.org) shows `reviewedBy` → `Physician` on condition pages.
- **Leading indicator:** brand plus doctor-name searches start to appear in Search Console.

**H3. Image URLs that redirect.**
- **What:** [`src/lib/seo.ts:10`](../src/lib/seo.ts) sets the OG image to `/opengraph-image`. With `trailingSlash: true` ([`next.config.ts:8`](../next.config.ts)), that URL returns **308** to `/opengraph-image/`. `twitter:image` and Next's own `<link rel="apple-touch-icon" href="/apple-icon?…">` redirect the same way. On the 404 page, the auto-generated `og:image` (`/opengraph-image?hash`) redirects to a malformed `/opengraph-image/?hash=`.
- **Why:** some link-preview crawlers don't follow redirects for images, so shares can show no image. iOS home-screen icons can also fail.
- **Do:** the simplest fix is to replace the dynamic `opengraph-image.tsx` and `apple-icon.tsx` routes with static PNG files (`src/app/opengraph-image.png`, `src/app/apple-icon.png`), generated once from the current routes. Static files keep their extension and are served without a redirect. The alternative is pointing `ogImage.url` at `/opengraph-image/`, which still leaves the apple icon redirecting.
- **Verify:** `curl -sI <url>` returns 200 for every `og:image`, `twitter:image` and `apple-touch-icon` URL. Extend `npm run check:html` to assert this.
- **Leading indicator:** the Facebook Sharing Debugger and the LinkedIn Post Inspector show the image.

**H4. Allow AI search crawlers at the edge (launch decision, brief §15.8).**
- **What:** the repo's `robots.txt` allows everything, but Cloudflare's "Managed robots.txt" on the live domain blocks AI crawlers.
- **Why:** blocking the *search/answer* bots (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`, `Claude-User`) removes the clinic from ChatGPT, Perplexity and Claude answers for "car accident chiropractor near me". Google AI Overviews use Googlebot and are not affected; `Google-Extended` does not control them.
- **Do:** allow the search and user-agent bots. Make a separate, explicit decision on training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`).
- **Verify:** `curl -A "OAI-SearchBot" -sI https://…/` returns 200, and the robots.txt served by the edge matches `src/app/robots.ts`.
- **Leading indicator:** referral sessions from chatgpt.com and perplexity.ai in GA4.

**H5. Google Business Profile and reviews (off-site).**
- **Why:** GBP signals (~32%) and reviews (~20%) are the two largest local-pack factor groups (Whitespark 2026). The site removed its two unverifiable testimonials, which was the right call, so reviews have to come from the GBP.
- **Do:** set the GBP primary category to **Chiropractor**. Add secondary categories only for services that are real and on-site. Add hours that match `business.ts`, real photos, the service list and the booking/phone link. Start asking every patient for a review. Don't mark up on-site testimonials with `Review` or `AggregateRating` schema, because Google ignores self-serving reviews for LocalBusiness.
- **Depends on:** C2.
- **Verify:** the GBP is verified and appears in the local pack for "car accident chiropractor Glendale AZ" from a Glendale location.
- **Leading indicator:** review count and recency, and GBP calls.

### Medium

**M1. Contextual internal links.**
- **What:** MDX bodies contain only 4 internal links on the whole site. Navigation, footer and "Related injuries" cards do the rest. Neither blog post links to a service page.
- **Do:**
  - insurance-myths post → `/no-cost-for-your-treatment-ever/`, the FAQ and `/whiplash-injury/`
  - study post → `/low-back-pain/`
  - Emergency → each condition
  - Neck ↔ Whiplash
  - Use descriptive anchors.
- **Verify:** every content page has at least 2 in-body links to other content pages (this can be added to `check:content`).

**M2. Make generic H1s specific.**
- **What:** `Whiplash Injury` ([`whiplash-injury.mdx:4`](../content/conditions/whiplash-injury.mdx)), `Pain Management` ([`pain-management.mdx:4`](../content/pages/pain-management.mdx)) and `Spinal Ligament Injury Treatment` ([`spinal-ligament-injury-treatment.mdx:4`](../content/conditions/spinal-ligament-injury-treatment.mdx)).
- **Do:** use H1s such as "Whiplash Treatment After a Car Accident", "Pain Management After a Car Accident" and "Spinal Ligament Injuries From a Car Crash". The titles already carry the location, so the H1 doesn't need it.
- **Verify:** Search Console CTR and position for "whiplash chiropractor glendale" after re-crawl.

**M3. Remove or source the claims that weaken trust.**
- [`whiplash-injury.mdx:17`](../content/conditions/whiplash-injury.mdx): "The top three auto accident injuries in Glendale, Arizona are…" has no source for a Glendale-specific statistic.
- [`whiplash-injury.mdx:31`](../content/conditions/whiplash-injury.mdx): "the fourth or fifth day… is classically the worst" should be either sourced or phrased as the clinic's experience.
- [`chiropractic-vs-standard-care-study.mdx`](../content/blog/chiropractic-vs-standard-care-study.mdx): the H1 "Car Accident Injury? Study Says You're Better Off Seeing a Chiropractor" overstates the study, which looked at active-duty military patients aged 18–35 with acute low back pain and was not about car accidents. "Over 100 years" (line 25) is rhetorical. A suggested H1: "What a 2013 Military Study Found About Chiropractic Care for Low Back Pain".
- Citations are unlinked: add PubMed or DOI links to Goertz 2013, Liliedahl 2010, Watkinson 1991 and Hildingsson 1990. The 1990–91 sources are dated, so add a recent review if possible.
- [`headaches-closed-head-injury.mdx:40`](../content/conditions/headaches-closed-head-injury.mdx): replace the Wikipedia definition with CDC or NINDS.
- "Over 10 years" appears on 3 pages; the clinic still has to confirm it (brief §15.3).

**M4. Enrich the schema.** (Value: entity clarity for Google and AI engines. None of this creates a new rich result.)
- `Chiropractor`: add `image` (clinic photo) and `logo`, plus `geo` and `hasMap` once the address is real. Fill `sameAs` with real profiles, and omit it while empty ([`schema.ts:50`](../src/lib/schema.ts) currently emits `[]`). Add `email` when real.
- `MedicalWebPage`: set `about` → `{"@type":"MedicalCondition","name":"Whiplash"}`, and keep the clinic as `mentions`. Add `reviewedBy` and `lastReviewed` (H2).
- `BlogPosting`: add `image` (Google's Article guidelines recommend it) and a Person `author` (H2).
- Page types: `ContactPage` on `/contact/`, `AboutPage` on `/about-us/`, `CollectionPage` on `/blog/` (Low).
- `FAQPage` on the FAQ page: Google retired FAQ rich results for all sites on 2026-05-07. Keep it, since it is harmless and describes the page, but expect no SERP feature from it. **Info, no action.**

**M5. Neck vs. whiplash overlap.**
- **What:** both pages target neck pain after a crash. The neck page's first H2 is "Treating neck injuries and whiplash from auto accidents".
- **Do:** focus the neck page on non-whiplash neck injuries and link to the whiplash page for whiplash.
- **Verify:** in Search Console, check whether both URLs get impressions for the same "whiplash…" queries.

**M6. Photos.**
- **What:** the site has zero `<img>` elements.
- **Why:** real photos of the exterior with signage, reception, treatment rooms and each doctor support E-E-A-T and local relevance. They also give the GBP and `schema.image` something to use.
- **Do:** follow brief §9.5: `next/image`, real alt text, AVIF/WebP, consented doctor photos at 800 px or larger.

**M7. Measure real-user Core Web Vitals.**
- **What:** lab LCP is 2.8–3.0 s (threshold for "good": ≤ 2.5 s). Observed unthrottled LCP is about 0.2 s. A low-traffic site gets **no CrUX data**, so field numbers will never appear in PageSpeed Insights.
- **Do:** report `web-vitals` (LCP, INP, CLS) to GA4 with Next's `useReportWebVitals`. Re-run PageSpeed Insights on the production host. The known JS gap (161 KB gz versus the 120 KB budget) is framework-bound; see the README.
- **Leading indicator:** p75 LCP ≤ 2.5 s and INP ≤ 200 ms in the GA4 web-vitals events.

**M8. Pre-cutover URL inventory (not checked in this audit).**
- **What:** the redirect map covers 8 old URLs and the `/category/`, `/author/` and `/feed/` patterns. These still return 404: `/tag/*`, `/wp-content/uploads/*`, `/2016/06/24/` date archives, `/page/N/` and `/comments/feed/`.
- **Do:** before the DNS switch, export the old site's Search Console "Pages" report and its top linked pages, then redirect any URL that has impressions or backlinks.
- **Verify:** Search Console → Pages → "Not found (404)" shows no URL with external links in the 4 weeks after launch (brief §15.10).

### Low

- **L1.** `/favicon.ico` returns 404. The SVG `<link rel="icon">` works for browsers and Google, but some crawlers and clients request `/favicon.ico` directly. Add a 48×48 `favicon.ico` to `src/app/`.
- **L2.** The 404 page inherits the home `<title>` and description, because [`src/app/not-found.tsx`](../src/app/not-found.tsx) has no metadata. Set a "Page not found" title. The page already returns status 404 with `noindex`.
- **L3.** The home title has no brand name. Google's site name comes from the `WebSite` schema, so this is fine; revisit only if branded CTR is low.
- **L4.** No security headers come from `next start` (HSTS, `X-Content-Type-Options`, `Referrer-Policy`). Check what the host adds (HSTS is often added at the platform level), and add the rest in `next.config.ts` `headers()`.
- **L5.** `llms.txt` is absent. It is optional, ignored by Google and has low value for a 19-page site. Skip it unless an AI platform starts asking for it.
- **L6.** Every sitemap `lastmod` is 2026-10-26, which is true today because everything was rewritten. From now on, change `updated` only when the content really changes; otherwise Google stops trusting `lastmod`.
- **L7.** Legal pages are in the sitemap. That's fine, no action.
- **L8.** The Privacy Policy says the site "may share or sell information". This is already flagged for legal review in `CONTENT-NOTES.md`. It is also a trust signal on a site that collects phone numbers.

### Opportunities (new content, after launch)

These are outside the brief's build scope but are the main growth levers once the basics are in place.
- **A Spanish landing page (`/es/`)** with `hreflang`. "Hablamos Español" is a stated advantage, and Spanish-language searches for a "quiropráctico" after an auto accident in Glendale have little dedicated competition. This needs a native-speaker translation, not a machine one.
- **A work injury page.** About says the clinic treats "car accident and work injuries", but no page covers work injuries.
- **A "car accident doctor" page** (for the MD and pain-management angle), if the MD is real and on-site.
- **Blog cadence:** the only two posts are from 2016. Write 1–2 posts a month on post-accident questions people actually search, with links to the service pages. Use `/seo cluster` to plan them.
- **Don't create neighborhood pages.** The 22 service-area names should stay a list. One page per neighborhood would be doorway pages. Proximity comes from the GBP.

---

## 4. Action plan (dependency order)

| # | Action | Depends on | Owner | Effort |
|---|---|---|---|---|
| 1 | `check:launch` guard (C1) | — | dev | 1 h |
| 2 | Static OG and apple icons (H3), favicon.ico (L1), 404 title (L2) | — | dev | 1 h |
| 3 | H1 tweaks (M2), in-body links (M1), claim fixes and citation links (M3) | — | dev + clinic sign-off | 2–3 h |
| 4 | Real NAP, doctors and photos in `business.ts`; flag off in the same release (C1, C2, M6) | clinic data | clinic → dev | — |
| 5 | Reviewer bylines and schema enrichment (H2, M4) | 4 | dev | 2–3 h |
| 6 | Pre-cutover URL inventory and extra redirects (M8) | old-site Search Console access | dev | 2 h |
| 7 | Cloudflare AI-crawler setting (H4) | DNS on Cloudflare | owner | 15 min |
| 8 | GBP claim and categories, citations cleanup, review requests (C2, H5) | 4 | clinic | ongoing |
| 9 | RUM web-vitals in GA4 (M7) | GA4 property | dev | 1 h |
| 10 | Expand thin pages (H1), then new pages (Opportunities) | 4, 5 | clinic + writer | weeks |

Steps 1–3 can be done now with the placeholder data. Steps 4–8 are the launch itself. Steps 9–10 come after launch.

---

## 5. Page inventory

"Own words" counts the MDX body only, without the nav, sidebar, form, CTA band or footer that every page shares.

| URL | Title (chars) | Desc (chars) | Own words | H1 |
|---|---:|---:|---:|---|
| `/` | 57 | 141 | ~990 (page template) | Glendale Arizona Car Accident Injury Chiropractor |
| `/emergency-car-collision-treatment/` | 48 | 130 | 197 | Emergency Car Accident Injury Treatment |
| `/whiplash-injury/` | 54 | 135 | 844 | Whiplash Injury |
| `/neck-chiropractor-arrowhead-az/` | 56 | 128 | 294 | Neck Injury Chiropractor in Glendale, AZ |
| `/headaches-closed-head-injury/` | 55 | 132 | 902 | Headaches and Closed Head Injury After a Car Accident |
| `/low-back-pain/` | 58 | 127 | 233 | Low Back Pain From a Car Crash |
| `/spinal-ligament-injury-treatment/` | 47 | 132 | 386 | Spinal Ligament Injury Treatment |
| `/multiple-injuries/` | 52 | 130 | 233 | Multiple Injuries From a Car Collision |
| `/pain-management/` | 51 | 134 | 109 | Pain Management |
| `/no-cost-for-your-treatment-ever/` | 54 | 128 | 194 | No Out-of-Pocket Cost for Car Accident Victims |
| `/car-collision-injury-chiropractor-arrowhead-glendale-arizona/` (FAQ) | 44 | 130 | ~805 (8 Q&As) | Frequently Asked Questions After a Glendale Car Accident |
| `/about-us/` | 51 | 134 | 342 + team | About Arrowhead Car Accident Chiropractor |
| `/contact/` | 47 | 126 | template | Contact Us |
| `/blog/` | 52 | 119 | hub | Car Accident Injury Articles |
| `/blog/car-accident-insurance-myths/` | 44 | 129 | 1,532 | Car Collision Insurance Myths You Must Be Aware Of |
| `/blog/chiropractic-vs-standard-care-study/` | 42 | 137 | 581 | Car Accident Injury? Study Says You're Better Off Seeing a Chiropractor |
| `/terms-of-use/`, `/privacy-policy/`, `/disclosure-policy/` | 50–55 | 35–72 | legal | — |

**Checks that passed on every page:** status 200, exactly one H1, a self-referencing absolute canonical with a trailing slash, query strings that keep the canonical clean, a complete OG/Twitter set, `lang="en-US"` with `lang="es"` on the Spanish snippets, one valid JSON-LD `@graph`, breadcrumbs (except Home), a `tel:` link, all titles 42–58 characters, all non-legal descriptions 119–141 characters, and no duplicate titles or descriptions. `/does-not-exist/` returns a real 404 with `noindex`. URLs without a trailing slash return 308 to the slash version, and the old URLs return 301 in one hop.

---

## 6. Method and limits

- **Crawl:** every URL in `/sitemap.xml` plus a 404 probe, parsed with cheerio (titles, meta, canonicals, robots, headings, word counts, links, images, JSON-LD). Redirects and discovery files were probed with curl.
- **Lighthouse 13.5 (mobile):** run on `/`, `/whiplash-injury/` and `/contact/`. Security software on this machine decompresses traffic before Chrome sees it, so each run was gathered, the transfer sizes were rewritten to the real gzip sizes (912 KB → 299 KB on `/`), and then audited. The results match the README.
- **Visual check:** headless Chrome at 390×844. The H1, the call button and the sticky call bar are above the fold, with no horizontal overflow.
- **Not covered:**
  - the live WordPress site, live SERPs and SXO page-type comparison, Search Console, CrUX, GA4 and backlinks. The site isn't live, no API credentials are configured, and the scope was local only.
  - the plugin's Python tools: their runtime isn't installed. Run `/seo setup` to enable them, for example for PDF reports.
- **Priority definitions:** Critical blocks indexing or local trust at launch. High significantly affects rankings, so fix it within about a week of launch. Medium is an optimization, within about a month. Low is backlog.

---

## 7. Fixes applied (2026-10-26)

Action-plan steps 1–3, verified on a local production build: lint, typecheck, `check:content`, `check:html` (20 pages, 4 share-image/icon URLs) and `check:redirects` (24 checks) all pass.

| Finding | Change |
|---|---|
| C1 | `src/lib/launch-check.mjs` holds the placeholder rules. `src/lib/seo.ts` stops the build when `SITE_IS_PLACEHOLDER = false` and sample data is left (tested: the build fails with the list of problems). `npm run check:launch` fails while the flag is on or sample data is left (today: 10 problems, exit 1). |
| H3 | The share image moved to `/og.png` and the iOS icon to `/apple-touch-icon.png`. Both are route handlers with a file extension, still generated from `business.ts`, and both answer 200. `check:html` now fails on any `og:image`, `twitter:image` or icon URL that doesn't answer 200 directly. |
| L1 | `src/app/favicon.ico` (16/32/48 px, from `icon.svg`). The SVG icon is now listed in the root metadata, because setting `icons` there turns off the file-based `icon.svg` link. |
| L2 | The 404 page has its own title and description. `check:html` now fails on duplicate titles. |
| M1 | Every page except legal and FAQ links to at least 2 other pages from its body text. Total in-body links went from 4 to 34. `check:content` enforces the minimum and flags links to unknown pages. |
| M2 | New H1s: Whiplash, Pain Management, Spinal Ligament, and the study post. |
| M3 | Claims reworded as the clinic's experience, the study post's H1 and description corrected, the Watkinson figures matched to the paper, PubMed links added to all four citations, and the Wikipedia quote replaced with the CDC. Details for the clinic's sign-off are in `docs/CONTENT-NOTES.md`. |

Still open: everything from step 4 onward (real data, the launch itself, GBP, the edge AI-crawler setting, content expansion), plus M4 (schema enrichment, which needs real data) and the "over 10 years" claim, which the clinic still has to confirm.
