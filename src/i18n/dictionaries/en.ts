// Interface copy in English. Page text lives in content/*.mdx; translations of both are in
// src/i18n/dictionaries/<locale>.ts and content/<locale>/. Placeholders such as {phone} are filled with fill().

type ValueProp = { title: string; text: string; /** set when the item is in another language than the page */ lang?: string };

export const en = {
  meta: {
    homeTitle: "Car Accident Chiropractor in Glendale, AZ | Same-Day Care",
    homeDescription:
      "Hurt in a car accident in Glendale or Arrowhead Ranch? Same-day chiropractic exams and no out-of-pocket cost when another driver is at fault.",
    ogImageAlt: "{name}, Glendale, AZ. Call {phone}",
  },

  common: {
    skipLink: "Skip to main content",
    home: "Home",
    call: "Call {phone}",
    requestCallback: "Request a call back",
    mainNav: "Main",
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
    badge: "Hablamos Español",
    title: "Hablamos Español",
    text: "Nuestros médicos y asistentes hablan español.",
    /** Only for languages the staff don't speak. */
    interpreter: "",
    /** Home page card, after `text`. */
    callToday: "Llámenos hoy para una cita el mismo día.",
    cta: "Llame al {phone}",
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
    clinic: "Our clinic",
    languages: "Languages",
    disclaimer:
      "The information on this website is general information, not medical or legal advice, and does not create a doctor–patient relationship. If you have a medical emergency, call 911.",
    notAssociated: "This website is not associated in any way with Dr. Vaughn Movses or Arrowhead Accident Group.",
  },

  ctaBand: {
    title: "Hurt in a car accident? Get checked today.",
    text: "Same-day appointments, and no out-of-pocket cost when another driver is at fault.",
  },

  callCta: {
    label: "Book a same-day exam",
    title: "Same-day exams for car accident injuries.",
    before: "Call now, or ",
    link: "request a call back",
    after: ".",
  },

  sidebar: {
    label: "Contact the clinic",
    title: "Hurt in a crash? Get a same-day exam.",
  },

  costAndQuestions: {
    title: "Questions about cost or insurance?",
    noCost: "How no out-of-pocket cost works",
    faq: "Car accident FAQ",
  },

  hours: {
    closed: "Closed",
    openUntil: "Open today until {time}",
    opensToday: "Opens today at {time}",
    opensTomorrow: "Closed now. Opens tomorrow at {time}",
    opensOn: "Closed now. Opens {day} at {time}",
    closedNow: "Closed now",
  },

  howItWorks: {
    title: "From the crash to recovery, here is how it works",
    lead: "You focus on getting better. We take care of the exam, the paperwork and the insurance.",
    steps: [
      {
        title: "Call us",
        text: "Call or request a call back. Same-day and next-day appointments are available, even if you've already been to the ER.",
      },
      {
        title: "Thorough exam and documentation",
        text: "A full spinal and orthopedic exam finds hidden injuries, and every finding is documented for your claim.",
      },
      {
        title: "Your treatment plan",
        text: "Chiropractic care and pain management, with MRI and orthopedic referrals when you need them.",
      },
      {
        title: "We handle the billing",
        text: "We bill the at-fault driver's insurance and work with your attorney, so you pay nothing out of pocket.",
      },
    ],
  },

  // The old site's own claims (confirm before launch, SITE-BRIEF §15).
  valueProps: [
    { title: "Same-day appointments", text: "Call today and see a doctor today or the next day." },
    { title: "No out-of-pocket cost", text: "If another driver caused your accident, we bill their insurance and wait for payment." },
    { title: "No health insurance needed", text: "You can be treated even if you don't have health insurance." },
    { title: "We work with your attorney", text: "We accept liens and send your records and reports to your attorney." },
    { title: "Chiropractors and medical doctors", text: "Chiropractic care, pain management and orthopedic referrals in one place." },
    { title: "Hablamos Español", text: "Nuestros médicos y asistentes hablan español.", lang: "es" },
  ] as ValueProp[],

  team: {
    sampleTag: "Sample profile",
    /** Shown instead of a placeholder bio on translated pages. */
    sampleBio: "Sample bio.",
    roles: {
      "Chiropractic Physician": "Chiropractic Physician",
      "Pain Management Physician": "Pain Management Physician",
    } as Record<string, string>,
  },

  cards: {
    readArticle: "Read the article",
  },

  form: {
    title: "Request a call back",
    intro: "It takes less than a minute. Fields without “optional” are required.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    accidentDate: "Date of accident",
    message: "How can we help?",
    optional: "(optional)",
    honeypot: "Leave this field empty",
    consent: "I agree to be contacted by phone, text or email about my request.",
    submit: "Request a call back",
    sending: "Sending…",
    note: "Please don't include medical details. We'll call you back during business hours.",
    sentTitle: "Thank you, we'll call you shortly.",
    sentBefore: "Need help now? Call ",
    sentAfter: ".",
    /** Keys are the codes in src/lib/contact-schema.ts and POST /api/contact. */
    errors: {
      name_short: "Enter your full name.",
      name_long: "Use {max} characters or fewer.",
      phone: "Enter a 10-digit US phone number, like (623) 555-0123.",
      email: "Enter an email address like name@example.com, or leave it empty.",
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
    h1: "Glendale Arizona Car Accident Injury Chiropractor",
    intro:
      "If you or a loved one has been in a car collision, you owe it to yourself to get a thorough chiropractic exam to find any underlying injuries that could affect you years from now. The worst thing you can do is wait and see if the pain goes away. Call today for a same-day or next-day appointment.",
    heroPoints: ["Same-day appointments", "No out-of-pocket cost when another driver is at fault", "No health insurance needed"],
    injuriesTitle: "Car accident injuries we treat",
    injuriesLead:
      "Our chiropractors and medical doctors treat only car accident and work injuries. Pick your symptom to learn more.",
    costTitle: "No out-of-pocket cost when you're not at fault",
    costText:
      "If your accident was caused by another person, our clinic bills the at-fault person's insurance and waits for payment. Our office has over 10 years of experience caring for accident victims with no out-of-pocket costs.",
    costLink: "How no out-of-pocket cost works",
    billingPoints: [
      "We bill the at-fault person's insurance and wait for payment.",
      "Health insurance is not necessary.",
      "If you have an attorney, we work on a lien and wait for payment.",
      "All paperwork is handled for you.",
    ],
    careLabel: "Pain management and Spanish-speaking care",
    painTitle: "Pain management in the same clinic",
    painText:
      "We offer pain management for your injuries with medical physicians, orthopedic physicians and pain management physicians, with no out-of-pocket cost when another driver is at fault. Emergency appointments are available: call today and see the doctor today.",
    painLink: "About pain management",
    teamTitle: "Chiropractors and a medical doctor, under one roof",
    teamLead: "Four chiropractic physicians and a pain management physician who treat car accident injuries every day.",
    teamLink: "More about our clinic",
    faqTitle: "Questions after a car accident",
    faqLead: "Straight answers about ER visits, minor damage and who pays.",
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
      "Call {phone} or request a call back. Same-day appointments for car accident injuries in Glendale, AZ. Hablamos Español.",
    h1: "Contact Us",
    lead: "Call for a same-day appointment, or send the form and we'll call you back.",
    formTitle: "Request a call back",
    required: "Fields without “optional” are required.",
    visit: "Visit us",
    mapTitle: "Map to {name}",
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
