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
| Whiplash | "Penny Injury Chiropractic" (twice) | ~~"our chiropractic physicians" / "our office"~~ `<BusinessName />` since 2026-10-30 (old text restored) |
| No Out-of-Pocket Cost | "Dr. Quackenbush and his… staff" | ~~"Our doctors and… staff"~~ "Dr. Vaughn Movses and his… staff" since 2026-10-30 (old text restored) |
| Pain Management | "Arrowhead Health Centers" | "Our pain management doctors" |
| Insurance myths post | "Phoenix Injury Chiropractor John Quackenbush" related videos | removed |
| Study post | "US Chiropractic Directory" heading, links and "Related articles" | removed; proper citations added |
| Terms of Use | Owner "Dr. John Quackenbush", 20229 N 67th Ave | `<BusinessName legal />`, `<Address />` |
| About / Pain Management | Photos and names of five real doctors | placeholder team from `business.ts` |
| Home | Two testimonials with names | not carried over (unverified; add real, consented reviews later) |

## Claims removed or softened (please confirm before launch)

- ~~Neck page: "over three million cases of neck pain… in Arizona 2013" statistic deleted.~~ Undone on
  2026-10-30: the old text is back word for word (see "Neck page: old text restored").
- Spinal ligament page: the CRMA x-ray analysis section ("better than MRI",
  "25% whole person impairment") was removed. **If the clinic offers CRMA, send a
  short, verified description and it can go back.**
- Spinal ligament page: "Number 1 cause of neck pain and disability" headline and
  "considered permanent" softened to "can be permanent".
- ~~Headaches page: "the most common example of TBI is whiplash" corrected; "TBIs do
  not show up on MRI or CT" softened to "often do not show up on standard MRI or CT".~~ Undone on
  2026-10-30: the old text is back word for word (see "Headaches: old text restored").
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
  the merged page keeps the brand-free wording from `/neck-pain-whiplash/`). Since 2026-10-30 the page has the
  live old `/whiplash-injury/` text (see "Whiplash: old text restored").
- About: the first-visit checklist and service areas became their own sections; the
  benefits list rendered from `valueProps` in the dictionaries (`src/i18n/dictionaries/`).
  All three were replaced by the old site's text on 2026-10-30 (see the About sections below).
- FAQ: the 8 Q&As moved to frontmatter (`faqs`), which feeds both the accordion and
  the `FAQPage` JSON-LD. Q8 was rephrased as a question.
- No Out-of-Pocket Cost: the home page's billing paragraph was added as a list. Replaced by the old site's text on
  2026-10-30 (see "No Out-of-Pocket Cost: old text restored").

## SEO audit changes (2026-10-26, please confirm)

From `docs/SEO-AUDIT.md`, action-plan step 3.

- **H1s made specific:** Whiplash → "Whiplash Treatment After a Car Accident"; Pain Management →
  "Pain Management After a Car Accident"; Spinal ligament → "Spinal Ligament Injury Treatment After a Car Crash";
  study post → "What a 2013 Military Study Found About Chiropractic Care for Low Back Pain" (the old H1 said the
  study was about car accident injuries; it was about acute low back pain in active-duty military personnel).
- **Claims reworded as the clinic's experience:** ~~Whiplash "the top three auto accident injuries in Glendale" →
  "three of the injuries we see most often"~~ (old text back on 2026-10-30); "the fourth or fifth day… is
  classically the worst" (~~Whiplash~~, ~~Neck~~ (old text back on 2026-10-30), study post) → "in our experience…
  often the fourth or fifth day".
- **Study post:** "The chiropractic profession has said this for over 100 years" removed; the description of
  standard care now matches the study (medication, physical therapy, self-care advice) and says the study was not
  about car accidents.
- **Insurance myths post:** the Watkinson figures now match the paper (35 patients with soft tissue neck injuries;
  symptoms in 86% after 10.8 years; neck degenerative changes in 68%).
- **Sources:** PubMed links added to all four citations; ~~the Headaches page's Wikipedia quote replaced with
  the CDC's description of TBI and a link to it~~ (the Wikipedia quote is back since 2026-10-30, and the CDC
  link is gone).
- **Internal links:** every page except legal and FAQ now links to at least 2 other pages from its text
  (`check:content` enforces it). Small wording changes made for this: Emergency lists neck pain, headaches and
  low back pain; ~~Low Back adds "such as a spinal ligament sprain"~~ (old text back on 2026-10-30); ~~Whiplash adds "(see spinal ligament injuries)"~~ (old text back on 2026-10-30);
  ~~Headaches "a proper examination" → "a prompt examination"~~ (old text back on 2026-10-30); About "other back injuries" → "low back injuries";
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
- Phone: (623) 600-4878 (`tel:+16236004878`), set later the same day. It replaces (623) 444-1111
  and then (602) 313-1925, both on the banned list; the old e164 value (`+16234001111`) didn't
  even match the displayed number.
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
  (Low back pain says "today or the next day!" again since 2026-10-30, see "Low back pain: old text restored".)
  **The new Spanish, German, Chinese and Vietnamese sentences need the same native review as
  the rest of the translations.**
- Name: "Arrowhead Car Accident Chiropractor" → **"Arrowhead Injury Care"** (`business.name`: JSON-LD,
  site name, footer ©, `<BusinessName />`), plus the logo's second line, the OG image, the About H1
  in all languages and the legal page titles. Unchanged on purpose: the domain
  (`arrowheadcaraccidentchiropractor.com`), descriptive "car accident chiropractor" wording in titles
  and H1s (search terms, not the name), and `legalName` ("Arrowhead Glendale Arizona Collision Injury
  Chiropractic", still to confirm), which Terms of Use names as the site owner.
- Footer rebuilt after the clinic's old footer: "Auto accident injury care" text; "Visit us" with
  "Glendale, Arizona car accident chiropractor", address, phone and hours above the map; and a
  "Contact us" call-back form (the site's compact form, not the old Name/Email/Subject/Message one). The old text was cleaned:
  sentence case, no "!", the current name, "Prompt appointments… same or next clinic day" instead of
  "Emergency services… see the doctor today", and "orthopedic referrals when needed" instead of
  "orthopedic physicians". Below it, one band: logo and treatment links on the left, languages, legal
  links and © on the right. The "Our clinic" links (same as the header) were dropped, and the general
  disclaimer ("This website provides general information… call 911.") was removed at the owner's request.
  Translations need native review.

## Home: founder section (2026-10-30)

The home page section "Pain management and Spanish-speaking care" was replaced by a founder card: Dr.
Vaughn Movses (portrait, credentials) and the vision quote with a link to the full profile. It is its own
section between "Your care, from examination to recovery" and "Car accident injuries we treat". At the
user's request, to keep the home page light:

- **The dark "Hablamos español" card was removed from the home page.** Spanish is still announced by the
  hero badge next to the call button, the footer and the contact page. The `spoken.callToday` and
  `spoken.cta` strings were only used by that card and were deleted.
- **The "Pain management in the same clinic" card was removed from the home page.** Pain management is
  still in the main menu and on its own page.
- **The team section ("Chiropractors and a medical doctor under one roof") was removed from the home
  page.** The full team stays on About (`/about-us/#team`). Its strings and the pain card's strings
  (`home.team*`, `home.pain*`, `home.careLabel`) were deleted in all five languages.
- **Dr. Vaughn Movses is now a real team member** (`founder` in `business.ts`, `isPlaceholder: false`). The
  card replaces the placeholder "Dr. Jane Doe", so the team still has four chiropractors and one MD. Team
  cards now show every letter after the name (`postNominals`: "DC, DABFP, FIAMA").
- **Credentials come from the old site's About page and need the clinic's confirmation:** certified by the
  American Board of Forensic Professionals (DABFP), certified in whiplash and brain injury traumatology and in
  low-speed motor vehicle forensic risk analysis (the old site credited both to "SRISD", left out here),
  and "Fellow International American Medical Acupuncture" (FIAMA), shortened to "Fellow in medical
  acupuncture". The old address on that page (17100 N 67th Lane, Suite 300) was not used.
- **The vision quote was written by Claude, not by Dr. Movses.** Dr. Movses must approve or rewrite it
  before launch: "A car accident can turn your life upside down in seconds. My goal is simple: a careful
  exam, honest answers and a treatment plan built around your injuries, so you can recover and get back to
  your routine."
- **Photo:** `public/founder.png`, supplied by the user on 2026-10-30 (`custommer photos/Founder.png`). It
  shows on the home page and on the About team card (team cards now show `photo` when it is set; the others
  keep their initials). **Two problems to fix with a better file:** it is only 341×511 px, so it looks soft
  on high-density screens at the desktop size (280×364 CSS px), and it carries a **"ZocDoc" watermark** in
  the lower left. The layouts crop from the top, so the watermark is not visible anywhere on the site, but
  the file itself still contains it (and, after launch, the Physician JSON-LD links to it). Please ask the
  clinic for the original portrait, at least 800 px wide, without a watermark.
- ~~Gendered wording avoided~~ and ~~the full bio on About stays in English~~: both replaced on 2026-10-30, see
  the next section.

## About: founder story (2026-10-30)

At the user's request, the About page now opens with Dr. Vaughn Movses, right under the page title: portrait,
post-nominals, a three-paragraph story, the vision quote and a credentials card. The section has the id
`vaughn-movses`, so the home page link "Read the full profile" lands on it. Strings moved from `home.founder*`
to a shared `founder` group in every dictionary.

- **The story is the old site's About text word for word** (photo of `/about-us/` supplied by the user,
  `custommer photos/custommer photos/about us/processed-7B7A2775-….jpeg`). At the user's request it keeps the
  original's errors as they are: "as He prioritizes" (capital H), "to her practice" (the rest says his), and the
  second paragraph ending in a comma (its sentence continues in the third). The only change: the old address
  (17100 n 67th Lane, Suite 300) is replaced by the current street from `business.ts` (`{street}` placeholder).
- **Translations follow the same text**, including the comma at the end of the second paragraph. "Her practice"
  is translated without a pronoun (es "su consulta", de "in der Praxis", zh "来到诊所", vi "đến với phòng
  khám"), since the user confirmed he/his.
- **He/his:** the user confirmed on 2026-10-30 that Dr. Movses uses he/his. Our own copy uses the natural
  masculine forms: es "Conozca a nuestro fundador", role "Fundador y médico quiropráctico"; de "Lernen Sie
  unseren Gründer kennen", role "Gründer und Chiropraktiker"; zh 他; vi ông.
- **The story is translated into es, de, zh and vi** (user's decision), not left in English. Machine-assisted
  like the rest: native review needed.
- The "Our doctors" grid on About leaves Dr. Movses out, since he is featured at the top; other pages with the
  team grid still show his card (with the short `bio` from `business.ts`).
- Meta descriptions of the five About pages now name the founder ("Meet founder Dr. Vaughn Movses, DC, and our
  Glendale team. …").

## About: old intro text restored (2026-10-30)

At the user's request, the sections "Injury chiropractors serving auto accident victims throughout Glendale" and
"What to bring to your first visit" were replaced by the old site's section, word for word from two photos of
`/about-us/` (`custommer photos/custommer photos/about us/1 processed-7B7A2775-….jpeg` and
`2 processed-AD93C07D-….jpeg`): the heading "We are Arrowhead Glendale Arizona Injury Chiropractors Serving Auto
Accident Victims throughout the greater Glendale, Arizona." and five paragraphs, up to "…can help you today!".
"What to bring" is gone as a list; the same items are in the second paragraph. `<CallCta />` stays after it.

- **Kept as in the original, at the user's request:** "Then you are in the right place Arrowhead…" (run-on),
  "to get you get medical attention", "the know how", "your phoenix car accident injuries" (lowercase, and the
  clinic is in Glendale), the old names "Arrowhead Glendale Arizona chiropractic auto injury clinic" and
  "Arrowhead Glendale Az Injury Chiropractic" (the site is now Arrowhead Injury Care), the "!" and the curly
  apostrophes (’, the rest of the site uses ').
- **This brings back claims the cleanup had softened** (SEO audit, compliance): "we take immediate action…
  right away!", "you will receive treatment right away", "We always wait until after your case has been settled
  to get paid", "making sure you don't pay any out-of-pocket costs". The clinic should confirm it stands behind
  them.
- Links were added on words of the original text, without changing it: "whiplash" → `/whiplash-injury/`, "back
  related injuries" → `/low-back-pain/`, "out-of-pocket costs" → the no-cost page (check:content needs at least
  two body links per page).
- **Translations follow the same text.** Spelling slips that can't be translated are not copied: "phoenix" is
  written "Phoenix" (zh 凤凰城), and "get you get" reads normally.

## About: "What makes … different?" restored (2026-10-30)

At the user's request, "Areas we serve" and "What makes our car accident chiropractors different?" were
replaced by the old site's section, word for word from photos 2 and 3 of `/about-us/`
(`… about us/2 processed-AD93C07D-….jpeg`, `3 processed-19A346D1-….jpeg`): the heading "What makes our
Arrowhead Car Accident Chiropractors different?", the intro paragraph, the bold "You will enjoy the following
benefits…", eight bullets, the "Contact us today…" paragraph and the neighborhoods paragraph. The page text ends
there, followed by "Our doctors".

- **"Areas we serve" was removed from About** (user's choice): the neighborhoods are listed once, in the old
  paragraph. The home page keeps its "Areas we serve" section.
- **The eight benefits keep the earlier look** (user's request): `<ValueProps>` now wraps the Markdown list in
  the MDX and shows it as the two-column grid with an icon per item (calendar, shield, wallet, receipt,
  handshake, scales, stethoscope, languages, by position). The text stays in the content files, word for word.
  The old dictionary `valueProps` (title + text) were deleted in all five languages.
- **Left out, user's choice:** the bold "Amberwood North, Paradise Gates and Yorkshire Estates" and the three
  paragraphs that follow it on the old page ("Thank you for visiting…", "One of the most important things for
  us…", "At www.arrowheadcaraccidentchiropractor.com we are committed…"). They were added below the team for a
  while on 2026-10-30, then removed at the user's request. So the neighborhoods paragraph now ends at "Western
  Meadows", and Amberwood North, Paradise Gates and Yorkshire Estates aren't named on About (the home page's
  "Areas we serve" still lists them). SITE-BRIEF §7.2, rule 4 also said to remove those paragraphs.
- **Kept as in the original:** "physicianshave", "Hundeds", "nieghborhoods", "Lexington place" and "Hidden Manor"
  listed twice, "Woodridge Vi" (truncated), the capitals in "No cost No out of pocket appointment" and "Doctors of
  chiropractic", "Liaison- we", the curly quotes in “at the fault party”, the "!".
- **Brings back what earlier cleanups removed:** a patient count ("Hundeds of injured people", removed site-wide
  on 2026-10-26 at the user's request), "Same Day Appointment" (the site says same or next clinic day), "No
  out-of-pocket costs in all cases we accept", and "Law center for car accident injuries" (the clinic is not a
  law office). The clinic should confirm these before launch.
- The phone number is the `<Phone />` component (a tap-to-call link showing "(623) 600-4878"), so the sentence
  still reads "Contact us today at 1 (623) 600-4878 …"; check:content doesn't allow numbers typed into content.
- "Hablamos Español" stays in Spanish on every page, marked `lang="es"`. Translations follow the same text;
  neighborhood names stay in English.

## Headaches: old text restored (2026-10-30)

At the user's request, the whole body of `/headaches-closed-head-injury/` ("Headaches after a car accident",
"Why prompt assessment matters", "Head injuries can occur without a direct blow", "Symptoms and diagnosis",
"Follow-up care after a collision") was replaced by the old site's text, word for word from three photos of the
old page (`custommer photos/custommer photos/headaches/1–3 processed-….jpeg`). The photos start mid-sentence
("…the chances that doctors will find…") and stop at "…it is", so the user chose to take the beginning (the
heading, three paragraphs and "Prompt medical/chiropractic treatment… First, it increases") and the end of the
last sentence from the live old page, read on 2026-10-30 (look-alike Cyrillic letters replaced).

- **Structure:** the old page's centered bold lines are H2s ("Headaches are a very common symptom after a car
  accident-", "Headaches after a Car Accident and head pain…", "Car accident headache symptoms may come about…",
  "What Exactly is a Traumatic Brain Injury (TBI)?", "Common Symptoms of a Traumatic Brain Injury (TBI)?"), the
  three symptom list titles are H3s, the Wikipedia definition is a blockquote, and "Traumatic Brain Injuries
  (TBI) are a leading basis…" and the closing "If you or a loved one…" paragraph are bold. The closing text was
  an H2 on the old site; it is a paragraph here because it holds the phone number. `<CallCta />` sits after
  "Second, it helps protect your legal rights…". H1, title, meta description and excerpt are unchanged (the
  description still mentions follow-up care, which the page no longer has a section on).
- **Kept as in the original:** "accident-" (hyphen at the end of the first heading), "the a lot of symptoms",
  "your worse day", the comma splice "as quickly as possible, it is important", "whether you experiencing",
  "are the danger is that Closed Head injuries usually not initially diagnosed", "Closed head injuries
  indicates", "the most common example of traumatic brain injury are whiplash", "are very abstract do not even
  show up", "to work in correctly", "Common Symptoms of a Traumatic Brain Injury (TBI)?" (question mark), the
  capitals in "Car Accident", "Traumatic brain injury" and "Closed Head injuries", the "!", "&" and curly quotes.
- **Changed:** the old phone 1(623) 400-6362 is the `<Phone />` component (current number), so the sentence reads
  "Call the Arrowhead Car Accident Chiropractic team now 1 (623) 600-4878." The old team name stays. Links were
  added on words of the text: "whiplash injuries" → `/whiplash-injury/`, "Prompt medical/chiropractic
  treatment" → `/emergency-car-collision-treatment/`; "Wikipedia" links to the English article on traumatic
  brain injury.
- **Removed, user's choice:** the 911 paragraph with the CDC's warning signs (worsening headache, repeated
  vomiting, seizures, weakness, slurred speech, trouble staying awake). The page no longer tells readers when to
  go to an emergency department.
- **This brings back medical claims the cleanup had corrected** (see "Claims removed or softened" and "SEO audit
  changes" above). The clinic should confirm it stands behind them, ideally with a medical reviewer: TBIs "do not even
  show up on MRI or CT scans"; whiplash is "the most common example of traumatic brain injury"; a closed head
  injury "indicates that there is no fracture of the skull" (it means a nonpenetrating injury; a fracture is
  possible); the diagnosis depends on "your car accident chiropractor who will make a clinical diagnosis" (a
  possible brain injury needs a medical assessment); prompt treatment "reduces the risk of long-term
  disability"; "the fourth or fifth day can be your worse day". The sentence "Chiropractic care for neck pain
  does not replace medical assessment of a possible brain injury" is gone too.
- **Translations follow the same text** (es, de, zh, vi), with the same headings, bold lines, links and
  components. As on About, slips that can't be translated are not copied (the run-on sentences read normally;
  the "closed head injury" sentence is split with a semicolon). The trailing hyphen stays ("——" in Chinese).
  The Wikipedia link points to the English article and says "(in English)" in each language. Native review
  needed like the rest.

## Low back pain: old text restored (2026-10-30)

At the user's request, the whole body of `/low-back-pain/` ("Experienced care for accident injuries", "How we
examine your back after a car accident") was replaced by the old site's text, word for word. The user pasted it
in chat; it matches the live old page (read on 2026-10-30) paragraph for paragraph, apart from the phone number.

- **Structure:** five paragraphs, no subheadings, as on the old page. `<CallCta />` sits after the long third
  paragraph ("If you are suffering from a spinal injury…"), before "If you have more questions…". H1, title, meta
  description and excerpt are unchanged (the old H1 was "Low Back Pain resulting From A Car Crash").
- **Kept as in the original:** "Arrowhead AZ", "Glendale Arizona" and "Arrowhead Glendale Az" without commas,
  "dedicates its practice… only, it’s all we do" (comma splice, curly apostrophe), "protocols includes", "to
  determine any potential spinal injury or damage has taken place", the "&" and the "!".
- **Changed:** the old phone 1(623) 400-6362 is the `<Phone />` component, so the sentence reads "contact us
  today at 1 (623) 600-4878." Links were added on words of the text: "spinal injury" →
  `/spinal-ligament-injury-treatment/`, "neck pain" → `/neck-chiropractor-arrowhead-az/`.
- **This brings back claims the cleanup had softened.** The clinic should confirm them before launch:
  - "one of only a few… clinics that dedicates its practice to the proper care of auto accident victims only,
    it’s all we do": the previous text said "car accident and work-related injuries", and About still says
    "Practice limited to auto & work injuries" and "workplace injury".
  - "we can see you today or the next day!": the clinic is open Mon, Tue and Thu only, so the rest of the site
    says "the same or next clinic day" (see "Clinic details update").
  - "These chiropractic & orthopedic tests will help us determine if your disc is injured and herniated":
    physical tests can suggest a disc injury, but confirming a herniation usually needs imaging. The sentence
    "If a disc injury or another condition is suspected, imaging or a specialist referral may be needed" is gone,
    and so is the medical history step.
  - "the specific car accident injury treatment you need to fully recover" reads as a promise of full recovery.
- **Translations follow the same text** (es, de, zh, vi), with the same links and components. As on About and
  Headaches, slips that can't be translated are not copied (the comma splice and "protocols includes" read
  normally, and the opening sentence gets a colon or "sepa que"/"请放心" so it reads as one thought). Native
  review needed like the rest.

## Neck page: old text restored (2026-10-30)

At the user's request, the whole body of `/neck-chiropractor-arrowhead-az/` ("Treating neck injuries and whiplash
from auto accidents", "Why even a low-speed collision can hurt your neck", "A team of chiropractors, medical
doctors and pain specialists") was replaced by the old site's text, word for word, taken from the live old page
on 2026-10-30. The old text is full of look-alike Cyrillic letters ("рrоvіdе", "ԛ"); they are replaced by Latin
ones, so the words read the same but search engines and screen readers see real English.

- **Structure:** one subheading and six paragraphs, as on the old page. The old H3 "Neck Injury Chiropractor
  Glendale Arizona Treating Auto Accident Whiplash" is an H2 (bodies start at H2). The closing "Give Us a call
  today… & Be Seen Today !" was an H2 on the old site; it is a bold paragraph here because it holds the phone
  number, as on Headaches. `<CallCta />` sits after the whiplash paragraph, where it was before. H1, title,
  meta description and excerpt are unchanged (the old H1 was "Neck Chiropractor Glendale AZ").
- **Kept as in the original:** "Glendale Arizona" and "Arrowhead Arizona" without commas, "auto accidents neck
  injuries", "in Arizona 2013 alone", "phoenix" in lower case, "motor vehicle accident" without an article,
  "chiropractors medical doctors and…" without a comma, "thus having the ability", "sometime you will
  experience", "Believe it or not Clinically the worse day…", the capitals in "Give Us a call" and "Be Seen
  Today", the space before the last "!", the "&" and the curly apostrophe.
- **Changed:** the old phone 1(623) 400-6362 is the `<Phone />` component, so the line reads "Give Us a call
  today 1 (623) 600-4878 & Be Seen Today !". Links were added on words of the text, as before: "Whiplash" →
  `/whiplash-injury/`, "ligaments" → `/spinal-ligament-injury-treatment/`.
- **This brings back claims the cleanup had removed** (see "Claims removed or softened" and "SEO audit changes"
  above). The clinic should confirm them before launch:
  - "over three million cases of neck pain due to auto accidents are reported in Arizona 2013 alone, over 150 of
    those occur in phoenix on a daily basis": no source, and three million is close to half of Arizona's
    population; 150 a day would be about 55,000 a year, not three million. This is the statistic the cleanup
    deleted.
  - "Be Seen Today !": the clinic is open Mon, Tue and Thu only, so the rest of the site says "the same or next
    clinic day" (see "Clinic details update").
  - "Clinically the worse day following a car accident is the 4th or 5th day!": the SEO cleanup had made it "in
    our experience… often the fourth or fifth day".
  - "the odds are that you more than likely have suffered neck injury" after any accident, "If you are
    experiencing pain there is obvious injury", and "hidden micro type injuries" when there is no pain: the
    previous text said not every crash causes whiplash and that pain alone does not identify an injury.
  - "Chiropractic care is efficient and effective at relieving injury and pain", "a complete and accurate exam
    and diagnosis", "interventional pain management specialists" and "physiotherapy techniques designed for
    spinal realignment": the team in `business.ts` is still a placeholder, so these depend on who works there.
  - "Even in a collision with a speed as low as five miles per hour… violent traumatic force", "causes neck
    vertebrae to collide": the sentence "Vehicle damage alone does not determine whether you have an injury" is
    gone, and so is "Tell your clinician about new or worsening symptoms".
- **Translations follow the same text** (es, de, zh, vi), with the same heading, links, bold line and components.
  As on the other restored pages, slips that can't be translated are not copied (commas, "Phoenix" capitalized,
  "the worst day"). Native review needed like the rest.

## Whiplash: old text restored (2026-10-30)

At the user's request, the whole body of `/whiplash-injury/` ("What is whiplash?", "Symptoms of whiplash after a
motor vehicle accident", "Please don't delay getting care after a car accident") was replaced by the old site's
text, word for word, taken from the live old page on 2026-10-30. Look-alike Cyrillic letters ("Sуmрtоmѕ", "ԛ")
are replaced by Latin ones.

- **Structure:** three subheadings, two sub-subheadings, eleven paragraphs and the closing call line, as on the old page. Bodies start
  at H2, so the old H3s "Symptoms and Treatment of whiplash related to a Glendale Arizona Car accident" and
  "Symptoms of whiplash following a motor vehicle accident" are H2s, like the old H2 "Is Whiplash a reality or a
  Myth?"; the old bold lines "Headache" and "Soft Tissue Injury – Sprains, Strains, Bumps and Bruises oh my!!!"
  are H3s under the symptoms section. "Please Do Not Delay Seeking Medical Attention After a Car Accident." stays
  at the end of the ankle paragraph, as on the old page (the cleanup had made it an H2). `<CallCta />` sits after
  the "reality or a Myth?" section, where it was before. H1, title, meta description and excerpt are unchanged
  (the old H1 was "Whiplash Injury").
- **Kept as in the original:** "Glendale Arizona" without commas, the capitals in "Car accident", "Myth", "Whip",
  "Chiropractic attention" and "Please Do Not Delay…", "an up close look", "very important and crucial",
  "Whiplash which is caused by…" (no main verb), "extension- flexion", "Actually the definition… may include many
  different types of injury, whiplash normally has…", "the disks"/"discs" and "the vertebra", "following an auto
  accident injuries of whiplash remain", "This is realistic.", "from 20 to 30 or even 5 MPH to zero", "Symptoms
  of soft tissue include", "a severely sprained an ankle", the first-person "have told me", "The most dangerous
  words… is", "following car accident", "none of the treatment… were intended", "make an appointment to seek an
  appointment", "Here is an definitive fact when you are involved a car accident", "always, always", the "!",
  "&", en dash and curly quotes.
- **Changed:** "Penny Injury Chiropractic" (twice, another clinic's name) is `<BusinessName />`, so it reads
  "Arrowhead Injury Care" (user's choice). The old phone 1(623) 400-6362 in the closing heading is the `<Phone />`
  component, and the heading is a bold paragraph because it holds the number, as on Neck and Headaches: "Call Now
  1 (623) 600-4878 for an appointment today!". "oh my!!!" is "oh my!" because `check:content` rejects repeated
  "!!" site-wide. Links were added on words of the text: "neck pain" → `/neck-chiropractor-arrowhead-az/`,
  "closed head injury" (end of the Headache section) → `/headaches-closed-head-injury/`, "ligament" →
  `/spinal-ligament-injury-treatment/`.
- **Video, back at the user's request:** the old page's YouTube video (`30YPCGnBy4A`, "Phoenix Chiropractor |
  Whiplash Accident Injury | Personal Injury Doctor", from the "Phoenix Car Accident Chiropractor" channel, not
  the clinic's) sits right under the first heading, as on the old page, in all 5 languages through `<YouTube />`.
  It was first left out; the user asked for it on 2026-10-30. It works like the no-cost page's video: thumbnail
  until played, player from youtube-nocookie.com on click. **To check:** YouTube's player shows the video's own
  "Phoenix" title, and the video is in English on the translated pages too (their accessible title says so).
- **This brings back claims the cleanup had softened** (see "Claims removed or softened" and "SEO audit changes"
  above). The clinic should confirm them before launch, ideally with a medical reviewer:
  - "The top three auto accident injuries in Glendale Arizona": no source; the SEO cleanup had made it "three of
    the injuries we see most often".
  - "the fourth or fifth day following a car accident is classically the worst", now said by "the injury
    chiropractors at Arrowhead Injury Care": the cleanup had made it "in our experience… often".
  - "injuries of whiplash remain and heal in a very incorrect way" even without pain, and "car accidents that
    cause severe whiplash can absolutely cause memory problems… depression".
  - "the ER doctor is only concerned with life threatening injuries" and "none of the treatment in an ER or 'Doc in
    a Box clinic' were intended to help with long term treatment": dismissive of emergency and urgent care.
  - "insurance companies will absolutely think that you weren't really injured": stated as a "definitive fact".
  - "Most people who have a severely sprained an ankle have told me…": first person, but the page has no named
    author.
  - "Call Now… for an appointment today!": the clinic is open Mon, Tue and Thu only, so the rest of the site says
    "the same or next clinic day" (see "Clinic details update").
  - Gone with the old text: "Tell your clinician about all symptoms so that other injuries can be considered",
    "Seek urgent care for severe or worsening symptoms", "Follow any discharge instructions you receive" and
    "discuss your circumstances with your insurer or attorney".
- **Translations follow the same text** (es, de, zh, vi), with the same headings, links, bold line and
  components, `<BusinessName />` included. As on the other restored pages, slips that can't be translated are not
  copied (the sentence without a main verb, "a severely sprained an ankle", "an definitive fact"); "oh my!" is
  "¡ay, Dios mío!", "oje!", "天哪！" and "trời ơi!", "Doc in a Box clinic" is a walk-in clinic in each language,
  and German adds km/h after the mph figures. Native review needed like the rest.

## No Out-of-Pocket Cost: old text restored (2026-10-30)

At the user's request, the whole body of `/no-cost-for-your-treatment-ever/` ("No out-of-pocket cost when another
driver is at fault", "How billing works" and the closing links paragraph) was replaced by the old site's text, word
for word, taken from the live old page on 2026-10-30. Look-alike Cyrillic letters are replaced by Latin ones.

- **Structure:** one subheading, one paragraph and the closing call line, as on the old page. Bodies start at H2, so
  the old H3 "We Never Look To You As The Glendale Arizona Auto Collision Victim For Payment." is an H2. The old
  bold-italic closing line stays bold italic. The video sits where it was on the old page, after the paragraph,
  and `<CallCta />` follows it.
- **H1:** the old H1, "No Cost Treatment- EVER! For Car Crash Victims" (user's choice). The old one has "EVER!!";
  it has one "!" because `check:content` rejects repeated "!!" site-wide, as with "oh my!" on Whiplash. Title, meta
  description, excerpt and nav label are unchanged ("No Out-of-Pocket Car Accident Treatment | Glendale, AZ").
- **Kept as in the original:** "Glendale Arizona" without a comma, the capitals in the subheading, "and are not at
  fault you will" (no comma), "no out of pocket fees what so ever", "Call today for a no cost no obligation
  consultation Call…" (no punctuation).
- **Changed:** "Dr. Quackenbush" (another clinic's doctor) is "Dr. Vaughn Movses", so it reads "Dr. Vaughn Movses
  and his knowledgeable chiropractic staff" (user's choice). The old phone 1(623) 400-6362 is the `<Phone />`
  component: "Call 1 (623) 600-4878". Links were added on words of the text (user's choice): "car accident" → the
  car accident FAQ, "insurance companies" → the insurance myths post.
- **Video, back at the user's request:** the old page's YouTube video (`WrqDOxZmRug`, "Phoenix Car Accident
  Treatment No Cost | 602-456-7252", from the "Phoenix Car Accident Chiropractor" channel) is on the page in all 5
  languages through the new `<YouTube />` component. It was first left out, as on Whiplash; the user asked for it
  on 2026-10-30. Until it is played the page shows only the thumbnail (served through `/_next/image`, so the
  visitor's browser makes no request to YouTube); a click loads the player from youtube-nocookie.com. Without
  JavaScript the link opens the video on youtube.com. **To check:** YouTube's player shows the video's own title,
  with the other number 602-456-7252, and the video is in English on the translated pages too (their accessible
  title says so). The Privacy Policy does not mention embedded YouTube videos (see "Needs legal review").
- **This brings back claims the cleanup had softened.** The clinic should confirm them before launch:
  - "No Cost Treatment- EVER!" and "you will have no out of pocket fees what so ever": absolute, with no word on
    how billing works; the cleanup had said "Call us to discuss your situation and how billing works".
  - "a no cost no obligation consultation": not said elsewhere on the site.
  - Gone with the old text: "Health insurance is not necessary", the lien explanation ("ask us about the terms"),
    "We handle the paperwork" and "over 10 years of experience". The meta description and excerpt still say
    "We bill the at-fault driver's insurance… wait for payment" and "No health insurance needed", which the body
    no longer says.
- **Translations follow the same text** (es, de, zh, vi), with the same heading, links, bold-italic line and
  components. The H1 keeps the capitals on the "EVER" word ("NUNCA", "NIE", "KHÔNG BAO GIỜ"; Chinese has no
  capitals, so "永远"); the Vietnamese H1 says "miễn phí" (free) to stay within the 90-character limit. Native
  review needed like the rest.

## Needs legal review (§15.4)

- **YouTube embed (2026-10-30):** the no-cost and whiplash pages play a YouTube video after a click (youtube-nocookie.com).
  The Privacy Policy should say that playing it loads content from YouTube/Google.
- **Privacy Policy still says "We may share or sell information with third parties
  for marketing or other purposes."** The new site collects names and phone numbers
  through the call-back form, so this sentence should be reviewed before launch.
- Terms of Use was copied as is (sentence case only). It contains unusual clauses
  (liquidated damages for linking to the site, waiving all claims).
- Disclosure Policy is generic template text ("written and edited by me…").
- "Last updated" dates on all three were set to 2026-10-26.

## Thin pages to expand later

- Pain Management (~110 words of real text).
- ~~No Out-of-Pocket Cost and~~ Emergency care ~~are~~ is short but complete. No Out-of-Pocket Cost is the old page's
  one paragraph since 2026-10-30 (~80 words).
