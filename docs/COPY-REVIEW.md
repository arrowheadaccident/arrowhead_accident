# Multilingual copy review — October 26, 2026

Reviewed the live website copy in 16 English MDX files, 52 translated MDX files and
all five interface dictionaries. English is the reference for meaning. This includes
headings, metadata, excerpts, navigation, accessible labels, forms, FAQs, service
descriptions and articles. `content/_raw/` is archival source material and is excluded.

## Editorial changes

- Replaced awkward English, repetition, fear-based wording and ambiguous claims
  with clear patient-facing language. Standardized the noun “callback” and kept
  “call back” as a verb.
- Aligned Spanish, German, Simplified Chinese and Vietnamese with the revised
  English. Retained formal “usted,” “Sie” and “quý vị” forms of address.
- Distinguished same-day outpatient appointments from emergency medical services.
  Corrected claims that emergency departments treat only life-threatening injuries
  or that primary care doctors cannot manage accident injuries.
- Removed fixed fourth/fifth-day symptom predictions, promises of full recovery,
  assumptions that every crash causes whiplash and claims that pain alone proves
  a particular injury. Corrected sprain/strain and closed-head-injury definitions.
- Reworked the insurance article's unsupported stereotypes and blanket settlement
  claims. Kept its six-topic structure and relevant references; clarified that
  small, older study groups do not predict every patient's recovery.
- Distinguished the 2013 military trial's clinical outcomes from the 2010 study's
  retrospective insurance-cost findings. Neither establishes outcomes for all
  car accident injuries. Existing quotations remain identified as quotes, and
  translated quotations remain identified as translations.
- Explained US medical liens as arrangements for deferred payment from claim
  proceeds, without implying exact equivalence to a domestic legal term.
- Removed translations of “medical doctor” that added an unsupported specialty,
  such as internal medicine or general practice. Orthopedic services are described
  consistently as referrals when needed, matching the existing service list.
- Corrected grammar in the English legal pages. Replaced the disclosure template's
  incompatible site-type alternatives with a neutral introduction. Kept the existing
  under-18 restriction as a site rule, removing the unsupported assertion that a
  minor's visit is unlawful and the incorrectly named COPA reference.

## Terminology

| Meaning | Spanish | German | Simplified Chinese | Vietnamese |
| --- | --- | --- | --- | --- |
| Whiplash | latigazo cervical | Schleudertrauma | 挥鞭伤 | chấn thương giật cổ (whiplash) |
| No out-of-pocket cost | sin costo de su bolsillo | keine Kosten aus eigener Tasche / keine eigenen Kosten | 无需自付费用 | không phải tự chi trả |
| Medical lien | gravamen (lien), with a payment explanation | Lien, with a payment explanation | 医疗费用偿付安排（lien） | thỏa thuận thanh toán từ khoản bồi thường (lien) |
| Medical doctor | médico | Arzt | 临床医生 | bác sĩ y khoa |

## Source checks

- [CDC: concussion symptoms and danger signs](https://www.cdc.gov/traumatic-brain-injury/signs-symptoms/index.html)
- [MedlinePlus: head injuries](https://medlineplus.gov/ency/article/000028.htm)
- [AAOS: sprains, strains and soft tissue injuries](https://www.orthoinfo.org/diseases--conditions/sprains-strains-and-other-soft-tissue-injuries/)
- [NCCIH: spinal manipulation](https://www.nccih.nih.gov/health/spinal-manipulation-what-you-need-to-know)
- [Goertz et al., 2013](https://pubmed.ncbi.nlm.nih.gov/23060056/)
- [Liliedahl et al., 2010](https://pubmed.ncbi.nlm.nih.gov/21109053/)
- [Watkinson et al., 1991](https://pubmed.ncbi.nlm.nih.gov/1834570/)
- [Hildingsson and Toolanen, 1990](https://pubmed.ncbi.nlm.nih.gov/2402991/)
- [Freeman et al., 1999](https://pubmed.ncbi.nlm.nih.gov/9921598/)
- [Arizona DIFI: automobile insurance](https://difi.az.gov/consumer/automobile-insurance)

## Existing facts and policies requiring owner confirmation

Language editing cannot establish the clinic's actual business arrangements.
Existing promises of no out-of-pocket cost, appointment availability, staff counts,
experience, accepted liens and interpreting arrangements still require the owner's
confirmation, as already recorded in `SITE-BRIEF.md` and `CONTENT-NOTES.md`.
Sample team profiles, example contact details and placeholder/noindex settings remain.

Legal pages remain English-only. Their existing data-sharing/sale language,
advertising disclosures, damages clauses, submission rights and arbitration terms
require review against actual practices; they have not been replaced with invented
policies or represented as legally approved. No independent human native-speaker or
clinical/legal sign-off is implied by this language review.

## Validation

- `npm run check`: lint, route types, TypeScript and all 68 content files passed.
- `npm run build`: all 92 static page outputs generated successfully.
- `npm run check:html`: 84 URLs passed, including the 404 page; 80 pages have
  reciprocal language links, and all four preview/icon URLs passed.
- Checked interpolation placeholders in all 644 translated interface strings;
  placeholders match the English source. `git diff --check` is clean.
- The HTML checker still reports the documented JavaScript-size warning
  (161.9 KB gzipped for regular pages versus the 120 KB target). This copy review
  does not change the application runtime or its performance budget.
