# Content cleanup notes

What changed when the old WordPress text was cleaned (SITE-BRIEF §7.2), and
what still needs a decision from the clinic. Source: `npm run extract`
on 2026-10-26 (19 pages, 0 look-alike characters left after normalizing).

## Applied everywhere

- Cyrillic look-alikes normalized; `npm run check:content` enforces zero.
- Every phone number and address removed from the text. Content uses
  `<Phone />`, `<Address />`, `<BusinessName />`, and the old "Call now…" headings became `<CallCta />`.
- One H1 per page (from frontmatter); bodies start at H2. Phone numbers removed from headings.
- ALL-CAPS and "!!"/"!!!" removed, light grammar fixes, sentence-case headings.
- "in Arrowhead Car Accident Chiropractor" find-and-replace damage fixed (FAQ page).
- Patient counts removed ("hundreds" / "thousands"), as decided on 2026-10-26.

## Other brands and people removed

| Where | Old text | Now |
|---|---|---|
| Whiplash | "Penny Injury Chiropractic" (twice) | "our chiropractic physicians" / "our office" |
| No Out-of-Pocket Cost | "Dr. Quackenbush and his… staff" | "Our doctors and… staff" |
| Pain Management | "Arrowhead Health Centers" | "Our pain management doctors" |
| Insurance myths post | "Phoenix Injury Chiropractor John Quackenbush" related videos | removed |
| Study post | "US Chiropractic Directory" heading, links and "Related articles" | removed; proper citations added |
| Terms of Use | Owner "Dr. John Quackenbush", 20229 N 67th Ave | `<BusinessName legal />`, `<Address />` |
| About / Pain Management | Photos and names of five real doctors | placeholder team from `business.ts` |
| Home | Two testimonials with names | not carried over (unverified; add real, consented reviews later) |

## Claims removed or softened (please confirm before launch)

- Neck page: "over three million cases of neck pain… in Arizona 2013" statistic deleted.
- Spinal ligament page: the CRMA x-ray analysis section ("better than MRI",
  "25% whole person impairment") was removed. **If the clinic offers CRMA, send a
  short, verified description and it can go back.**
- Spinal ligament page: "Number 1 cause of neck pain and disability" headline and
  "considered permanent" softened to "can be permanent".
- Headaches page: "the most common example of TBI is whiplash" corrected; "TBIs do
  not show up on MRI or CT" softened to "often do not show up on standard MRI or CT".
- Multiple injuries: "disrupt normal nerve and blood supply" softened.
- Study post: first-person "34 years" / "30 plus years" claims and the unverified
  "85,402 patients" figure removed. Citations verified: Goertz et al., *Spine*
  2013;38(8):627–634 and Liliedahl et al., *JMPT* 2010;33(9):640–643.
- Insurance myths post: "tell a fake injury in about 30 seconds" softened; "we work
  with only the best attorneys in Phoenix" → "If you need an attorney, just let us know."
  Added: "This article is general information, not legal advice."
- About page: "Law center for car accident injuries" benefit removed.

Still on the site and listed in §15 for confirmation: "over 10 years", same-day
appointments, Spanish-speaking staff, MRI/orthopedic referrals on a lien, medical
pain management on site.

## Structure changes

- `/neck-pain-whiplash/` merged into `/whiplash-injury/` (texts were ~98% identical;
  the merged page keeps the brand-free wording from `/neck-pain-whiplash/`).
- About: the first-visit checklist and service areas became their own sections; the
  benefits list renders from `valueProps` in `business.ts`.
- FAQ: the 8 Q&As moved to frontmatter (`faqs`), which feeds both the accordion and
  the `FAQPage` JSON-LD. Q8 was rephrased as a question.
- No Out-of-Pocket Cost: the home page's billing paragraph was added as a list.

## SEO audit changes (2026-10-26, please confirm)

From `docs/SEO-AUDIT.md`, action-plan step 3.

- **H1s made specific:** Whiplash → "Whiplash Treatment After a Car Accident"; Pain Management →
  "Pain Management After a Car Accident"; Spinal ligament → "Spinal Ligament Injury Treatment After a Car Crash";
  study post → "What a 2013 Military Study Found About Chiropractic Care for Low Back Pain" (the old H1 said the
  study was about car accident injuries; it was about acute low back pain in active-duty military personnel).
- **Claims reworded as the clinic's experience:** Whiplash "the top three auto accident injuries in Glendale" →
  "three of the injuries we see most often"; "the fourth or fifth day… is classically the worst" (Whiplash, Neck,
  study post) → "in our experience… often the fourth or fifth day".
- **Study post:** "The chiropractic profession has said this for over 100 years" removed; the description of
  standard care now matches the study (medication, physical therapy, self-care advice) and says the study was not
  about car accidents.
- **Insurance myths post:** the Watkinson figures now match the paper (35 patients with soft tissue neck injuries;
  symptoms in 86% after 10.8 years; neck degenerative changes in 68%).
- **Sources:** PubMed links added to all four citations; the Headaches page's Wikipedia quote replaced with
  the CDC's description of TBI and a link to it.
- **Internal links:** every page except legal and FAQ now links to at least 2 other pages from its text
  (`check:content` enforces it). Small wording changes made for this: Emergency lists neck pain, headaches and
  low back pain; Low Back adds "such as a spinal ligament sprain"; Whiplash adds "(see spinal ligament injuries)";
  Headaches "a proper examination" → "a prompt examination"; About "other back injuries" → "low back injuries";
  the insurance myths post adds "If you have one, we can work on a lien and wait for payment until your case
  settles."

## Needs legal review (§15.4)

- **Privacy Policy still says "We may share or sell information with third parties
  for marketing or other purposes."** The new site collects names and phone numbers
  through the call-back form, so this sentence should be reviewed before launch.
- Terms of Use was copied as is (sentence case only). It contains unusual clauses
  (liquidated damages for linking to the site, waiving all claims).
- Disclosure Policy is generic template text ("written and edited by me…").
- "Last updated" dates on all three were set to 2026-10-26.

## Thin pages to expand later

- Pain Management (~110 words of real text).
- No Out-of-Pocket Cost and Emergency care are short but complete.
