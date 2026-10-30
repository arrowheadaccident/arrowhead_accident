// Interface copy in English. Page text lives in content/*.mdx; translations of both are in
// src/i18n/dictionaries/<locale>.ts and content/<locale>/. Placeholders such as {phone} are filled with fill().

type ValueProp = { title: string; text: string; /** set when the item is in another language than the page */ lang?: string };

export const en = {
  meta: {
    homeTitle: "Car Accident Chiropractor in Glendale, AZ | Prompt Care",
    homeDescription:
      "Hurt in a car accident in Glendale or Arrowhead Ranch? Prompt chiropractic exams and no out-of-pocket cost when another driver is at fault.",
    ogImageAlt: "{name}, Glendale, AZ. Call {phone}",
  },

  common: {
    skipLink: "Skip to main content",
    home: "Home",
    call: "Call {phone}",
    requestCallback: "Request a callback",
    mainNav: "Main navigation",
    breadcrumb: "Breadcrumb",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    officeHours: "Office hours",
  },

  /** The languages the clinic's staff speak (English and Spanish). */
  spoken: {
    /** lang attribute when the text is not in the page's language. */
    lang: "es" as string | undefined,
    badge: "Hablamos español",
    title: "Hablamos español",
    text: "Nuestros médicos y asistentes hablan español.",
    /** Only for languages the staff don't speak. */
    interpreter: "",
  },

  nav: {
    about: "About",
    treatments: "Accident Treatments",
    painManagement: "Pain Management",
    noCost: "No Out-of-Pocket Cost",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contact",
  },

  /** The legal pages exist in English only; other languages add a note to the link. */
  legal: {
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    disclosure: "Disclosure Policy",
    englishOnly: "",
  },

  footer: {
    treatments: "Accident treatments",
    languages: "Languages",
    /** The clinic's own footer text (top row), from the old site. {name} is the business name. */
    aboutTitle: "Auto accident injury care",
    noCostLead: "No out-of-pocket costs.",
    noCost:
      "If your accident was caused by another person, {name} will bill the at-fault person's insurance and wait for payment. Health insurance is not necessary. If you have an attorney, we will work on a lien with your attorney and wait for payment. All paperwork is handled for you.",
    experience: "Our office has over 10 years of experience caring for accident victims with no out-of-pocket costs.",
    appointments: "Prompt appointments available. Call for an appointment on the same or next clinic day:",
    painManagement:
      "We offer pain management of your injuries with medical and pain management physicians, and orthopedic referrals when needed, with no out-of-pocket costs.",
    callUs: "Call us:",
    clinicTitle: "Glendale, Arizona car accident chiropractor",
    contactTitle: "Contact us",
  },

  ctaBand: {
    title: "Hurt in a car accident? Don't wait to get checked.",
    text: "Same-day appointments on clinic days and no out-of-pocket cost when another driver is at fault.",
  },

  callCta: {
    label: "Book an exam",
    title: "Prompt exams for car accident injuries.",
    before: "Call now, or ",
    link: "request a callback",
    after: ".",
  },

  sidebar: {
    label: "Contact the clinic",
    title: "Hurt in a crash? Get a prompt exam.",
  },

  costAndQuestions: {
    title: "Questions about cost or insurance?",
    noCost: "How no out-of-pocket cost works",
    faq: "Car accident FAQ",
  },

  hours: {
    closed: "Closed",
    openUntil: "Open today until {time}",
    openUntilReopens: "Open until {time}, reopens at {reopen}",
    opensToday: "Opens today at {time}",
    opensTomorrow: "Closed now. Opens tomorrow at {time}",
    opensOn: "Closed now. Opens {day} at {time}",
    closedNow: "Closed now",
  },

  howItWorks: {
    title: "Your care, from examination to recovery",
    lead: "Focus on getting better. We coordinate your examination, treatment records and insurance billing.",
    steps: [
      {
        title: "Call us",
        text: "Call or request a callback. Appointments are available the same or next clinic day, even if you've already been to the ER.",
      },
      {
        title: "Thorough exam and documentation",
        text: "A thorough spinal and orthopedic examination helps identify injuries. We document the findings to support your care and your claim.",
      },
      {
        title: "Your treatment plan",
        text: "Your plan may include chiropractic care and pain management, with MRI or orthopedic referrals when needed.",
      },
      {
        title: "We handle the billing",
        text: "When another driver is at fault, we bill their insurance and work with your attorney, if you have one. Call us to discuss your billing arrangements.",
      },
    ],
  },

  // The old site's own claims (confirm before launch, SITE-BRIEF §15).
  valueProps: [
    { title: "Prompt appointments", text: "Call us and see a doctor the same day or on the next clinic day." },
    { title: "No out-of-pocket cost", text: "If another driver caused your accident, we bill their insurance and wait for payment." },
    { title: "No health insurance needed", text: "You can be treated even if you don't have health insurance." },
    { title: "We work with your attorney", text: "We can defer payment under a lien and share treatment records with your attorney." },
    { title: "Chiropractors and medical doctors", text: "Coordinated chiropractic care and pain management, with orthopedic referrals when needed." },
    { title: "Hablamos español", text: "Nuestros médicos y asistentes hablan español.", lang: "es" },
  ] as ValueProp[],

  team: {
    sampleTag: "Sample profile",
    /** Shown instead of a placeholder bio on translated pages. */
    sampleBio: "Sample bio.",
    roles: {
      "Founder and Chiropractic Physician": "Founder and Chiropractic Physician",
      "Chiropractic Physician": "Chiropractic Physician",
      "Pain Management Physician": "Pain Management Physician",
    } as Record<string, string>,
  },

  /** Dr. Movses: the home page card and the top of About. */
  founder: {
    eyebrow: "Meet our founder",
    credentialsTitle: "Credentials",
    /** From the old site's About page; the clinic should confirm them. */
    credentials: [
      "Certified by the American Board of Forensic Professionals (DABFP)",
      "Certified in whiplash and brain injury traumatology",
      "Certified in low-speed collision forensic risk analysis",
      "Fellow in medical acupuncture (FIAMA)",
    ],
    /** Word for word from the old site's About page, errors included (the user's choice); only {street} is current. */
    story: [
      "Dr. Vaughn Anthony Movses, D.C., is a respected chiropractic physician dedicated to providing exceptional care to patients in Glendale, AZ. With his extensive medical training and compassionate approach, Dr. Movses offers personalized healthcare solutions tailored to each patient's unique needs. His commitment to patient well-being extends beyond traditional medical practice, as He prioritizes building trusting relationships and fostering open communication.",
      "Patients can expect comprehensive and supportive care from Dr. Movses, who is deeply invested in staying abreast of the latest advancements in the field. Conveniently located at {street} in Glendale, AZ,",
      "Dr. Movses welcomes individuals of all ages and backgrounds to her practice, where they can receive the highest standard of medical attention in a warm and welcoming environment.",
    ],
    /** Drafted for the clinic: Dr. Movses must approve it (docs/CONTENT-NOTES.md). */
    quote:
      "A car accident can turn your life upside down in seconds. My goal is simple: a careful exam, honest answers and a treatment plan built around your injuries, so you can recover and get back to your routine.",
    link: "Read the full profile",
  },

  cards: {
    readArticle: "Read the article",
  },

  form: {
    title: "Request a callback",
    intro: "This takes less than a minute. All fields are required unless marked optional.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    accidentDate: "Date of accident",
    message: "How can we help?",
    optional: "(optional)",
    honeypot: "Leave this field empty",
    consent: "I agree to be contacted by phone, text or email about my request.",
    submit: "Request a callback",
    sending: "Sending…",
    note: "Please don't include medical details. We'll call you back during business hours.",
    sentTitle: "Thank you. We'll call you during business hours.",
    sentBefore: "Need help now? Call ",
    sentAfter: ".",
    /** Keys are the codes in src/lib/contact-schema.ts and POST /api/contact. */
    errors: {
      name_short: "Enter your full name.",
      name_long: "Use {max} characters or fewer.",
      phone: "Enter a 10-digit US phone number, like (623) 555-0123.",
      email: "Enter a valid email address, such as name@example.com, or leave this field empty.",
      accident_date: "The accident date can't be in the future.",
      message_long: "Use {max} characters or fewer.",
      consent: "Check this box so we can contact you.",
      bad_request: "We couldn't send your request. Please try again or call us at {phone}.",
      send_failed: "We couldn't send your request. Please call us at {phone}.",
      too_many: "Too many requests. Please call us at {phone}.",
      network: "We couldn't reach our server. Check your connection and try again, or call us at {phone}.",
    } as Record<string, string>,
  },

  home: {
    h1: "Car Accident Injury Chiropractor in Glendale, Arizona",
    intro:
      "If you or a loved one has been in a car accident, a thorough examination can help identify injuries and guide your care. Symptoms may not appear right away. Call for an appointment on the same or next clinic day.",
    heroPoints: ["Same-day appointments on clinic days", "No out-of-pocket cost when another driver is at fault", "No health insurance needed"],
    injuriesTitle: "Car accident injuries we treat",
    injuriesLead:
      "Our chiropractors and medical doctors focus on car accident and work-related injuries. Choose a symptom or injury to learn more.",
    costTitle: "No out-of-pocket cost when you're not at fault",
    costText:
      "If your accident was caused by another person, our clinic bills the at-fault person's insurance and waits for payment. Our office has over 10 years of experience caring for accident victims with no out-of-pocket costs.",
    costLink: "How no out-of-pocket cost works",
    billingPoints: [
      "We bill the at-fault person's insurance and wait for payment.",
      "Health insurance is not necessary.",
      "If you have an attorney, we can defer payment under a lien until your case settles.",
      "All paperwork is handled for you.",
    ],
    faqTitle: "Questions after a car accident",
    faqLead: "Clear answers about ER visits, minor vehicle damage and treatment costs.",
    faqLink: "Read all {count} questions",
    areasTitle: "Areas we serve",
    areasLead: "Car accident patients come to us from Glendale, Arrowhead Ranch and these nearby neighborhoods.",
    blogTitle: "From the blog",
    blogLink: "All articles",
  },

  page: {
    ourDoctors: "Our doctors",
    relatedInjuries: "Related injuries",
    aboutTeamLead: "Chiropractic physicians and a pain management medical doctor, working together in one clinic.",
  },

  blog: {
    title: "Car Accident Injury Articles | Glendale Chiropractor",
    description:
      "Articles on car accident injuries, chiropractic care and insurance myths from our Glendale, Arizona auto injury clinic.",
    crumb: "Blog",
    h1: "Car Accident Injury Articles",
    lead: "Research and plain answers about car accident injuries, chiropractic care and insurance.",
    published: "Published",
    updated: "Updated",
  },

  contact: {
    title: "Contact Us | Glendale Car Accident Chiropractor",
    description:
      "Call {phone} or request a callback. Prompt appointments for car accident injuries in Glendale, AZ. Hablamos español.",
    h1: "Contact Us",
    lead: "Call for an appointment, or submit the form and we'll call you back during business hours.",
    formTitle: "Request a callback",
    required: "All fields are required unless marked optional.",
    visit: "Visit us",
    mapTitle: "Map showing {name}",
    mapPlaceholder: "Map will appear once the address is confirmed",
  },

  notFound: {
    title: "Page Not Found | {name}",
    description: "The page you're looking for doesn't exist or has moved.",
    eyebrow: "Page not found",
    h1: "This page took a wrong turn",
    text: "The page you're looking for doesn't exist or has moved. If you were hurt in a car accident, you can still call us now or start from the home page.",
    home: "Go to the home page",
    contact: "Contact us",
  },
};

export type Dictionary = typeof en;
