# Arrowhead Car Accident Chiropractor

Next.js 16 rebuild of arrowheadcaraccidentchiropractor.com. The build spec is
[`docs/SITE-BRIEF.md`](docs/SITE-BRIEF.md); design decisions are in
[`docs/DESIGN.md`](docs/DESIGN.md); content cleanup decisions and open questions
for the clinic are in [`docs/CONTENT-NOTES.md`](docs/CONTENT-NOTES.md).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` · `npm run typecheck` | ESLint · route types + `tsc --noEmit` |
| `npm run check:content` | Cyrillic, banned strings, phone numbers, H1s, `<CallCta />`, frontmatter limits, at least 2 in-body links to other pages, in `content/` and its translations |
| `npm run check:redirects` | Old URLs against a running server (`BASE_URL`, default `http://localhost:3000`) |
| `npm run check:html` | One H1, unique title, canonical, JSON-LD, robots, `og:image`, `tel:` links, `<html lang>` and two-way hreflang on every page in the sitemap; share-image and icon URLs answer 200 with no redirect |
| `npm run check:launch` | Fails while `SITE_IS_PLACEHOLDER` is on or `business.ts` still has sample data. Must pass before the DNS cutover |
| `npm run extract` | One-time import of the old WordPress pages into `content/_raw/` (git-ignored) |

`check:redirects` and `check:html` need a production server: `npm run build && npm start`.

## Data and content

- All business data (NAP, hours, team, service areas) lives in `src/config/business.ts`.
  While `SITE_IS_PLACEHOLDER` is `true`, every page is `noindex, nofollow` and the team
  shows "Sample profile" tags. See §15 of the brief for the launch checklist.
- Setting `SITE_IS_PLACEHOLDER = false` while `business.ts` still has sample data stops the build.
  The opposite mistake (going live while still a placeholder) is what `npm run check:launch` catches:
  use `npm run check:launch && npm run build` as the production build command.
- The share image is `/og.png` and the iOS icon `/apple-touch-icon.png` (route handlers in `src/app/`),
  not the `opengraph-image` / `apple-icon` conventions: with `trailingSlash: true` those URLs 308-redirect.
- Pages are MDX in `content/`. MDX can use `<Phone />`, `<Address />`, `<Hours />`,
  `<ServiceAreas />`, `<CallCta />`, `<ValueProps />` and `<BusinessName />`.
- Copy `.env.example` to `.env.local` to set the site URL, GA4 ID and Resend keys.
  Without Resend keys the call-back form logs the request in dev and drops it (with a
  warning) in production.

## Languages

English, Spanish, German, Simplified Chinese and Vietnamese (`src/i18n/config.ts`). Translation
decisions and what still needs a native-speaker review are in [`docs/CONTENT-NOTES.md`](docs/CONTENT-NOTES.md).

- **URLs:** English has no prefix (`/whiplash-injury/`, unchanged); the others use `/es/`, `/de/`, `/zh/`
  (hreflang `zh-Hans`) and `/vi/` with the same slugs. Every page lives in `src/app/[lang]/`;
  `next.config.ts` rewrites English URLs to `lang = "en"` and 301-redirects `/en/…` to the unprefixed URL.
  Unmatched URLs get `src/app/global-not-found.tsx` (English, with a line per language).
- **Interface copy** (nav, buttons, form, home page, hours, 404) is in `src/i18n/dictionaries/<locale>.ts`.
  English is the source; the others must have the same shape (TypeScript checks it). Server Components read
  it with `getI18n()` (`src/i18n/server.ts`, via `next/root-params`); Client Components get strings as props.
- **Page text:** `content/<locale>/<collection>/<slug>.mdx` translates `content/<collection>/<slug>.mdx`. Its
  frontmatter has only the text fields (title, description, h1, excerpt, navLabel, faqs, optional updated);
  order, icon, related pages and dates come from the English file. Links are written as English paths
  (`/whiplash-injury/`); the site adds the language prefix. A page with no translation (the legal pages)
  exists in English only, and the language switcher sends that language to its home page instead.
- `check:content` validates translations too: same MDX components and FAQ count as the English page, links
  only to pages that exist in that language, the same title and description limits.
- Each page lists its other languages as `<link rel="alternate" hreflang>` (plus `x-default`), and so does
  the sitemap. `check:html` checks that `<html lang>` matches the URL and that hreflang links point both ways.
- The contact form sends the page's language with the request; the email to the clinic shows it.

## Status (2026-10-26)

All brief phases (0–6) are built. Results on a local production build:

| Check | Result |
|---|---|
| lint, typecheck, `check:content` | pass |
| `next build` | every route static (○/●) except `ƒ /api/contact` |
| `check:redirects` | 16 URLs → 200, 8 old URLs → one 301 hop → 200 |
| `check:html` | 84 pages pass in 5 languages (incl. 404); 80 with reciprocal hreflang |
| Keyboard / form / mobile QA (skip link, dropdown, Esc, FAQ, form errors, honeypot, rate limit, sticky bar) | pass |
| Lighthouse mobile, `/` `/whiplash-injury/` `/contact/` | Performance 95–96, Accessibility 100, Best Practices 100, SEO 66* |
| LCP / TBT / CLS (lab, simulated) | 2.8–3.0 s / 40–50 ms / 0 |

\* SEO's only failing audit is "Page is blocked from indexing", which is the intended
placeholder `noindex`. It goes to 100 when `SITE_IS_PLACEHOLDER = false`.

**Known gaps against §10 budgets**

- **First-load JS is ~161 KB gzipped (brief: ≤ 120 KB).** Next 16.4 + React 19 alone
  (react-dom ~70 KB, App Router runtime ~45 KB, Turbopack runtime) is ~136 KB on an
  empty route; the site's own code adds ~26 KB (form, zod/mini, nav, language menu, open/closed status).
  `check:html` reports this as a warning.
- **LCP is 2.8–3.0 s in Lighthouse's simulation (brief: ≤ 2.0 s).** Lighthouse puts all
  framework JS that loads before the first paint on the LCP path. Removing Inter only
  moved it to 2.7 s, and `experimental.inlineCss` made it worse, so neither is applied.
  Observed (unthrottled) LCP is ~0.2 s. Re-measure on the production host with PageSpeed Insights.
- The development machine's security software decompresses traffic to Chrome (response
  header `X-Content-Encoding-Over-Network: gzip`), so plain local Lighthouse runs see
  ~900 KB instead of ~300 KB and report Performance ~80. The numbers above re-run
  Lighthouse's audit with the real gzip transfer sizes.
