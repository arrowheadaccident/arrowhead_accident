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
| `npm run check:content` | Cyrillic, banned strings, phone numbers, H1s, `<CallCta />`, frontmatter limits, at least 2 in-body links to other pages, in `content/` |
| `npm run check:redirects` | Old URLs against a running server (`BASE_URL`, default `http://localhost:3000`) |
| `npm run check:html` | One H1, unique title, canonical, JSON-LD, robots, `og:image` and `tel:` links on every page in the sitemap; share-image and icon URLs answer 200 with no redirect |
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

## Status (2026-10-26)

All brief phases (0–6) are built. Results on a local production build:

| Check | Result |
|---|---|
| lint, typecheck, `check:content` | pass |
| `next build` | every route static (○/●) except `ƒ /api/contact` |
| `check:redirects` | 16 URLs → 200, 8 old URLs → one 301 hop → 200 |
| `check:html` | 20 pages pass (incl. 404) |
| Keyboard / form / mobile QA (skip link, dropdown, Esc, FAQ, form errors, honeypot, rate limit, sticky bar) | pass |
| Lighthouse mobile, `/` `/whiplash-injury/` `/contact/` | Performance 95–96, Accessibility 100, Best Practices 100, SEO 66* |
| LCP / TBT / CLS (lab, simulated) | 2.8–3.0 s / 40–50 ms / 0 |

\* SEO's only failing audit is "Page is blocked from indexing", which is the intended
placeholder `noindex`. It goes to 100 when `SITE_IS_PLACEHOLDER = false`.

**Known gaps against §10 budgets**

- **First-load JS is ~161 KB gzipped (brief: ≤ 120 KB).** Next 16.4 + React 19 alone
  (react-dom ~70 KB, App Router runtime ~45 KB, Turbopack runtime) is ~136 KB on an
  empty route; the site's own code adds ~25 KB (form, zod/mini, nav, open/closed status).
  `check:html` reports this as a warning.
- **LCP is 2.8–3.0 s in Lighthouse's simulation (brief: ≤ 2.0 s).** Lighthouse puts all
  framework JS that loads before the first paint on the LCP path. Removing Inter only
  moved it to 2.7 s, and `experimental.inlineCss` made it worse, so neither is applied.
  Observed (unthrottled) LCP is ~0.2 s. Re-measure on the production host with PageSpeed Insights.
- The development machine's security software decompresses traffic to Chrome (response
  header `X-Content-Encoding-Over-Network: gzip`), so plain local Lighthouse runs see
  ~900 KB instead of ~300 KB and report Performance ~80. The numbers above re-run
  Lighthouse's audit with the real gzip transfer sizes.
