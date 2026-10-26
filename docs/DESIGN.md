# Design direction

Companion to `SITE-BRIEF.md` §6. The brief's tokens stay; this file records
what was added on top of them and why.

## Concept: "clear road ahead"

Visitors are often on a phone, in pain, shortly after a crash. The page has to
feel calm and clinical, make the next step obvious, and still look like it
belongs to a car-accident clinic rather than any medical template.

The subject's own vernacular is the road: lane markings, wayfinding signs,
a route from A to B. It is used in exactly two places and nowhere else:

1. **Headings are set in Overpass**, an open-source descendant of the US
   "Highway Gothic" road-sign lettering. It reads as sober wayfinding, not as
   decoration. Body text stays in Inter.
2. **"How it works" is drawn as a route.** Four numbered stops (it really is a
   sequence) joined by a dashed lane line in signal amber on deep navy. This is
   the one bold moment on the page; everything around it is quiet.

## Palette

| Name | Hex | Role |
|---|---|---|
| Night navy | `#0b2545` | Brand, headings, header text |
| Deep navy | `#071a33` | Top bar, route band, footer, CTA band |
| Link blue | `#1f4e8c` | Links, focus ring on light surfaces |
| Brake red | `#c8102e` | **Call buttons only** (5.9:1 on white) |
| Lane amber | `#f5b700` | Lane dashes, focus ring and small accents **on navy only** (never text on white) |
| Mist | `#e8f0fa` / `#f7f9fc` | Tinted sections and surfaces |

Body ink `#1a2433`, muted `#5b6675`, lines `#e3e8ef`, success `#1e7f4f`.

## Type

- Overpass 700–800 for H1–H3, tight tracking, short measure.
- Inter (variable) for everything else: 16px mobile, 18px from `md`, line-height 1.6, prose ≤ 70ch.
- No all-caps eyebrows, no arrow glyphs appended to links.

## Layout

- Left-aligned everywhere; no centered marketing stacks.
- `max-w-6xl` container, 16px gutters on mobile.
- Home hero is asymmetric (text 7 / form 5). No hero image: the H1 is the LCP element.
- Radius follows hierarchy: buttons fully rounded, cards 12px, inputs 8px, tags 6px.
- Shadows only on the call-back form card (it is the action surface). Everything else uses 1px lines.

## Motion

- One orchestrated moment: the route's lane line draws in as it scrolls into
  view (CSS scroll-driven animation, no JS; skipped under reduced motion and in
  browsers without support).
- State changes that answer a user action (menu, dropdown, accordion, form
  states) animate at 150–200ms. Nothing else moves.

## Accessibility floor

WCAG 2.2 AA: skip link, 3px focus ring (link blue on light, amber on navy),
44px+ tap targets, labelled inputs with linked errors, keyboard-operable menus,
`prefers-reduced-motion` respected.
