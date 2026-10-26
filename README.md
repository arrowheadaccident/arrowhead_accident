# Arrowhead Car Accident Chiropractor

Next.js 16 rebuild of arrowheadcaraccidentchiropractor.com. The build spec is
[`docs/SITE-BRIEF.md`](docs/SITE-BRIEF.md); design decisions are in
[`docs/DESIGN.md`](docs/DESIGN.md).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` · `npm run typecheck` | ESLint · `tsc --noEmit` |
| `npm run check:content` | Cyrillic, banned strings and frontmatter limits in `content/` |
| `npm run check:redirects` | Old URLs against a running server (`BASE_URL`, default `http://localhost:3000`) |
| `npm run check:html` | One H1, canonical, JSON-LD, robots and `tel:` links on every built page |
| `npm run extract` | One-time import of the old WordPress pages into `content/_raw/` |

## Data

All business data (NAP, hours, team, service areas) lives in
`src/config/business.ts`. While `SITE_IS_PLACEHOLDER` is `true`, every page is
`noindex` and the team shows "Sample profile" tags. See §15 of the brief for the
launch checklist.

Copy `.env.example` to `.env.local` to set the site URL, GA4 ID and Resend keys.
