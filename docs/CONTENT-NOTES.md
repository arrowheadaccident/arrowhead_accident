# Content cleanup notes

**Later review:** [Multilingual copy review](COPY-REVIEW.md) records the October 26,
2026 language and meaning corrections. It supersedes the wording examples and
terminology below where they differ. The remaining owner-confirmation items still apply.

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

Still on the site and listed in §15 for confirmation: "over 10 years", same-day (on clinic days)
appointments, Spanish-speaking staff, MRI/orthopedic referrals on a lien, medical
pain management on site.

## Structure changes

- `/neck-pain-whiplash/` merged into `/whiplash-injury/` (texts were ~98% identical;
  the merged page keeps the brand-free wording from `/neck-pain-whiplash/`).
- About: the first-visit checklist and service areas became their own sections; the
  benefits list renders from `valueProps` in the dictionaries (`src/i18n/dictionaries/`).
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

## Translations: Spanish, German, Simplified Chinese, Vietnamese (2026-10-26)

Added after the brief, which said English only. Decisions made on 2026-10-26:

- **Everything but the legal pages is translated:** home, contact, about, the service pages, the six
  conditions, the FAQ and both blog posts. Terms of Use, Privacy Policy and Disclosure Policy stay in English
  (legal text should go to a professional translator); every language links to the English versions, marked
  "(in English)" in that language.
- **The staff speak English and Spanish only.** Spanish pages keep "Hablamos español". German, Chinese and
  Vietnamese pages say "We speak English and Spanish" instead, the form says the call back will be in
  English or Spanish, and the contact page and home page add "You are welcome to bring someone who can
  interpret." **Please confirm that sentence.**
- **The translations are machine-assisted** (written by Claude, not by a native speaker). Have each
  language reviewed by a native speaker before launch, ideally someone who knows US insurance terms.
  The site stays `noindex` until then anyway.

Terminology to check in the review:

| | Spanish | German | Chinese | Vietnamese |
|---|---|---|---|---|
| chiropractor | quiropráctico | Chiropraktiker | 整脊医生 | bác sĩ nắn chỉnh cột sống |
| whiplash | latigazo cervical | Schleudertrauma | 挥鞭伤 | chấn thương giật cổ (whiplash) |
| no out-of-pocket cost | sin costo de su bolsillo | keine Kosten für Sie | 无需自付费用 | không tốn tiền túi |
| lien | gravamen (lien) | Pfandrecht (Lien) | 留置权（lien） | quyền lưu giữ (lien) |
| at-fault driver | conductor culpable | Unfallverursacher | 肇事司机 / 过错方 | tài xế có lỗi |
| medical doctor (MD) | médico | Arzt | 西医医生 | bác sĩ y khoa |

Changes made while translating:

- German adds km/h after mph figures ("5 mph (rund 8 km/h)") and explains that "Schleudertrauma" is the
  everyday word (doctors say HWS-Distorsion), since the English point "whiplash is not a medical term" does
  not carry over literally.
- Quotes from the Goertz study are our own translations; each study post says so. Citations stay in English.
- The share image (`/og.png`) has English text in every language; only its alt text is translated.
- The team cards show translated placeholder bios. Real bios will need translations too.
- The "Hablamos Español" value proposition moved from `business.ts` to the dictionaries
  (`src/i18n/dictionaries/`), where each language says what is true for it.

## Clinic details update (2026-10-29)

The site belongs to Dr. Vaughn Movses. Changes in `src/config/business.ts` and the copy:

- Footer sentence "This website is not associated in any way with Dr. Vaughn Movses or
  Arrowhead Accident Group." removed in all languages. No other non-affiliation claims existed.
- Phone: (602) 313-1925 (`tel:+16023131925`). It replaces (623) 444-1111, which is now on the
  banned list; the old e164 value (`+16234001111`) didn't even match the displayed number.
- Address: 6320 W Union Hills Dr Ste 1400-B, Glendale, AZ 85308. Geo coordinates are the
  OpenStreetMap footprint of "Building B" at 6320 W Union Hills Dr; the Contact page map is a
  Google Maps embed of the address (no API key). Check the pin against the Google Business Profile.
- Hours: Mon, Tue, Thu 9:00 AM–12:00 PM and 2:00–6:30 PM; Wed, Fri, Sat, Sun closed. The data
  model now has intervals per day, the open/closed status knows the lunch break ("Open until
  12:00 PM, reopens at 2:00 PM"), and JSON-LD has one `OpeningHoursSpecification` per interval.
- "Same-day" claims softened because the clinic is open three days a week: short labels say
  "prompt" ("Prompt Care", "Prompt appointments"); sentences say "the same or next clinic day"
  or "same-day appointments on clinic days". Changed in the dictionaries, the OG image text and
  About, Car accident FAQ, Emergency care, Headaches and Low back pain, in all five languages.
  **The new Spanish, German, Chinese and Vietnamese sentences need the same native review as
  the rest of the translations.**
- Name: "Arrowhead Car Accident Chiropractor" → **"Arrowhead Injury Care"** (`business.name`: JSON-LD,
  site name, footer ©, `<BusinessName />`), plus the logo's second line, the OG image, the About H1
  in all languages and the legal page titles. Unchanged on purpose: the domain
  (`arrowheadcaraccidentchiropractor.com`), descriptive "car accident chiropractor" wording in titles
  and H1s (search terms, not the name), and `legalName` ("Arrowhead Glendale Arizona Collision Injury
  Chiropractic", still to confirm), which Terms of Use names as the site owner.

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
