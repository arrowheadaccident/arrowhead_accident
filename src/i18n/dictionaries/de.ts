import type { Dictionary } from "./en";

// German, "Sie". The staff speak English and Spanish only, so the copy says so instead of "Hablamos Español".
// Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const de: Dictionary = {
  meta: {
    homeTitle: "Chiropraktik nach Autounfällen in Glendale, AZ",
    homeDescription:
      "Nach einem Autounfall in Glendale oder Arrowhead Ranch verletzt? Zeitnahe Untersuchung, ohne eigene Kosten bei Fremdverschulden.",
    ogImageAlt: "{name}, Glendale, AZ. Anrufen: {phone}",
  },

  common: {
    skipLink: "Zum Hauptinhalt springen",
    home: "Startseite",
    call: "Anrufen: {phone}",
    requestCallback: "Rückruf anfordern",
    mainNav: "Hauptmenü",
    breadcrumb: "Navigationspfad",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
    officeHours: "Öffnungszeiten",
  },

  spoken: {
    lang: undefined,
    badge: "Wir sprechen Englisch und Spanisch",
    title: "Englisch und Spanisch",
    text: "Unsere Ärzte und Mitarbeiter sprechen Englisch und Spanisch. Telefonate und Termine finden auf Englisch oder Spanisch statt.",
    interpreter: "Sie können gern jemanden mitbringen, der für Sie dolmetscht.",
    callToday: "",
    cta: "Anrufen: {phone}",
  },

  nav: {
    about: "Über uns",
    treatments: "Behandlungen",
    painManagement: "Schmerztherapie",
    noCost: "Keine eigenen Kosten",
    faq: "FAQ",
    blog: "Blog",
    contact: "Kontakt",
  },

  legal: {
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    disclosure: "Offenlegung",
    englishOnly: " (auf Englisch)",
  },

  footer: {
    treatments: "Unfallbehandlungen",
    clinic: "Unsere Praxis",
    languages: "Sprachen",
    disclaimer:
      "Diese Website bietet allgemeine Informationen. Sie ersetzt keine medizinische oder rechtliche Beratung und begründet kein Arzt-Patienten-Verhältnis. Rufen Sie bei einem medizinischen Notfall 911 an.",
  },

  ctaBand: {
    title: "Bei einem Autounfall verletzt? Warten Sie nicht mit der Untersuchung.",
    text: "Termine am selben Tag an Praxistagen und keine Kosten für Sie, wenn ein anderer Fahrer den Unfall verursacht hat.",
  },

  callCta: {
    label: "Untersuchung vereinbaren",
    title: "Zeitnahe Untersuchung bei Verletzungen durch einen Autounfall.",
    before: "Rufen Sie jetzt an oder ",
    link: "fordern Sie einen Rückruf an",
    after: ".",
  },

  sidebar: {
    label: "Praxis kontaktieren",
    title: "Bei einem Unfall verletzt? Zeitnahe Untersuchung.",
  },

  costAndQuestions: {
    title: "Fragen zu Kosten oder Versicherung?",
    noCost: "So funktioniert die Behandlung ohne Kosten für Sie",
    faq: "FAQ zu Autounfällen",
  },

  hours: {
    closed: "Geschlossen",
    openUntil: "Heute geöffnet bis {time} Uhr",
    openUntilReopens: "Geöffnet bis {time} Uhr, wieder ab {reopen} Uhr",
    opensToday: "Öffnet heute um {time} Uhr",
    opensTomorrow: "Jetzt geschlossen. Öffnet morgen um {time} Uhr",
    opensOn: "Jetzt geschlossen. Öffnet am {day} um {time} Uhr",
    closedNow: "Jetzt geschlossen",
  },

  howItWorks: {
    title: "Ihre Versorgung: von der Untersuchung bis zur Genesung",
    lead: "Konzentrieren Sie sich auf Ihre Genesung. Wir koordinieren Ihre Untersuchung, die Behandlungsunterlagen und die Versicherungsabrechnung.",
    steps: [
      {
        title: "Rufen Sie uns an",
        text: "Rufen Sie an oder fordern Sie einen Rückruf an. Termine am selben oder nächsten Praxistag sind möglich, auch wenn Sie schon in der Notaufnahme waren.",
      },
      {
        title: "Gründliche Untersuchung und Dokumentation",
        text: "Eine gründliche Untersuchung der Wirbelsäule und des Bewegungsapparats hilft, Verletzungen zu erkennen. Wir dokumentieren die Befunde für Ihre Versorgung und Ihren Anspruch.",
      },
      {
        title: "Ihr Behandlungsplan",
        text: "Ihr Plan kann Chiropraktik und Schmerztherapie umfassen, bei Bedarf mit Überweisungen zur MRT-Untersuchung oder zur Orthopädie.",
      },
      {
        title: "Wir übernehmen die Abrechnung",
        text: "Hat ein anderer Fahrer den Unfall verursacht, rechnen wir mit dessen Versicherung ab und arbeiten mit Ihrem Anwalt zusammen, sofern Sie einen haben. Rufen Sie uns an, um die Abrechnung zu besprechen.",
      },
    ],
  },

  valueProps: [
    { title: "Zeitnahe Termine", text: "Rufen Sie an, und ein Arzt untersucht Sie am selben oder nächsten Praxistag." },
    { title: "Keine Kosten für Sie", text: "Wenn ein anderer Fahrer Ihren Unfall verursacht hat, rechnen wir mit dessen Versicherung ab und warten auf die Zahlung." },
    { title: "Keine Krankenversicherung nötig", text: "Sie können auch ohne Krankenversicherung behandelt werden." },
    { title: "Wir arbeiten mit Ihrem Anwalt zusammen", text: "Wir können die Zahlung über einen Lien aufschieben und Behandlungsunterlagen an Ihren Anwalt weitergeben." },
    { title: "Chiropraktiker und Ärzte", text: "Abgestimmte Chiropraktik und Schmerztherapie, bei Bedarf mit Überweisung zur Orthopädie." },
    {
      title: "Englisch und Spanisch",
      text: "Unsere Ärzte und Mitarbeiter sprechen Englisch und Spanisch. Sie können gern jemanden mitbringen, der für Sie dolmetscht.",
    },
  ],

  team: {
    sampleTag: "Beispielprofil",
    sampleBio: "Beispielbiografie.",
    roles: {
      "Chiropractic Physician": "Chiropraktiker",
      "Pain Management Physician": "Arzt für Schmerztherapie",
    },
  },

  cards: {
    readArticle: "Artikel lesen",
  },

  form: {
    title: "Rückruf anfordern",
    intro: "Das Ausfüllen dauert weniger als eine Minute. Alle Felder sind Pflichtfelder, sofern sie nicht als optional markiert sind.",
    name: "Vollständiger Name",
    phone: "Telefon",
    email: "E-Mail",
    accidentDate: "Datum des Unfalls",
    message: "Wie können wir helfen?",
    optional: "(optional)",
    honeypot: "Dieses Feld leer lassen",
    consent: "Ich bin einverstanden, wegen meiner Anfrage per Telefon, SMS oder E-Mail kontaktiert zu werden.",
    submit: "Rückruf anfordern",
    sending: "Wird gesendet…",
    note: "Bitte geben Sie keine medizinischen Details an. Wir rufen Sie während der Öffnungszeiten auf Englisch oder Spanisch zurück.",
    sentTitle: "Vielen Dank. Wir rufen Sie während unserer Öffnungszeiten zurück.",
    sentBefore: "Brauchen Sie sofort Hilfe? Rufen Sie ",
    sentAfter: " an.",
    errors: {
      name_short: "Geben Sie Ihren vollständigen Namen ein.",
      name_long: "Verwenden Sie höchstens {max} Zeichen.",
      phone: "Geben Sie eine 10-stellige US-Telefonnummer ein, z. B. (623) 555-0123.",
      email: "Geben Sie eine E-Mail-Adresse wie name@beispiel.de ein oder lassen Sie das Feld leer.",
      accident_date: "Das Unfalldatum darf nicht in der Zukunft liegen.",
      message_long: "Verwenden Sie höchstens {max} Zeichen.",
      consent: "Setzen Sie dieses Häkchen, damit wir Sie kontaktieren können.",
      bad_request: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns unter {phone} an.",
      send_failed: "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns unter {phone} an.",
      too_many: "Zu viele Anfragen. Bitte rufen Sie uns unter {phone} an.",
      network: "Unser Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut, oder rufen Sie uns unter {phone} an.",
    },
  },

  home: {
    h1: "Chiropraktiker in Glendale, Arizona, für Verletzungen nach Autounfällen",
    intro:
      "Wenn Sie oder ein Angehöriger einen Autounfall hatten, kann eine gründliche Untersuchung helfen, Verletzungen zu erkennen und die Versorgung zu planen. Beschwerden treten nicht immer sofort auf. Rufen Sie an, um einen Termin am selben oder nächsten Praxistag zu vereinbaren.",
    heroPoints: ["Termine am selben Tag an Praxistagen", "Keine Kosten für Sie, wenn ein anderer Fahrer schuld ist", "Keine Krankenversicherung nötig"],
    injuriesTitle: "Unfallverletzungen, die wir behandeln",
    injuriesLead:
      "Unsere Chiropraktiker und Ärzte konzentrieren sich auf Verletzungen durch Auto- und Arbeitsunfälle. Wählen Sie eine Beschwerde oder Verletzung, um mehr zu erfahren.",
    costTitle: "Keine Kosten für Sie, wenn Sie nicht schuld sind",
    costText:
      "Wenn eine andere Person Ihren Unfall verursacht hat, rechnet unsere Praxis mit deren Versicherung ab und wartet auf die Zahlung. Unsere Praxis betreut Unfallopfer seit über 10 Jahren, ohne dass sie etwas aus eigener Tasche zahlen.",
    costLink: "So funktioniert die Behandlung ohne eigene Kosten",
    billingPoints: [
      "Wir rechnen mit der Versicherung des Unfallverursachers ab und warten auf die Zahlung.",
      "Eine Krankenversicherung ist nicht nötig.",
      "Wenn Sie einen Anwalt haben, können wir die Zahlung über einen Lien bis zum Abschluss Ihres Falls aufschieben.",
      "Wir erledigen den gesamten Papierkram für Sie.",
    ],
    careLabel: "Schmerztherapie und Sprachen",
    painTitle: "Schmerztherapie in derselben Praxis",
    painText:
      "Wir stimmen Chiropraktik und medizinische Schmerztherapie aufeinander ab und überweisen bei Bedarf zur Orthopädie. Hat ein anderer Fahrer den Unfall verursacht, ist die Behandlung ohne eigene Kosten möglich. Rufen Sie uns für einen Termin an und besprechen Sie Ihre Situation mit uns.",
    painLink: "Mehr zur Schmerztherapie",
    teamTitle: "Chiropraktiker und ein Arzt unter einem Dach",
    teamLead: "Vier Chiropraktiker und ein Arzt für Schmerztherapie, die jeden Tag Verletzungen durch Autounfälle behandeln.",
    teamLink: "Mehr über unsere Praxis",
    faqTitle: "Fragen nach einem Autounfall",
    faqLead: "Klare Antworten zu Besuchen in der Notaufnahme, geringen Fahrzeugschäden und Behandlungskosten.",
    faqLink: "Alle {count} Fragen lesen",
    areasTitle: "Unser Einzugsgebiet",
    areasLead: "Unfallpatienten kommen aus Glendale, Arrowhead Ranch und diesen Nachbarvierteln zu uns.",
    blogTitle: "Aus dem Blog",
    blogLink: "Alle Artikel",
  },

  page: {
    ourDoctors: "Unsere Ärzte",
    relatedInjuries: "Ähnliche Verletzungen",
    aboutTeamLead: "Chiropraktiker und ein Arzt für Schmerztherapie, die in einer Praxis zusammenarbeiten.",
  },

  blog: {
    title: "Artikel zu Autounfallverletzungen | Glendale",
    description:
      "Artikel über Verletzungen nach Autounfällen, chiropraktische Behandlung und Versicherungsmythen aus unserer Unfallpraxis in Glendale, Arizona.",
    crumb: "Blog",
    h1: "Artikel zu Verletzungen nach Autounfällen",
    lead: "Forschung und klare Antworten zu Unfallverletzungen, Chiropraktik und Versicherung.",
    published: "Veröffentlicht",
    updated: "Aktualisiert",
  },

  contact: {
    title: "Kontakt | Chiropraktik nach Autounfällen in Glendale",
    description:
      "Rufen Sie {phone} an oder fordern Sie einen Rückruf an. Zeitnahe Termine bei Unfallverletzungen in Glendale, AZ. Wir sprechen Englisch und Spanisch.",
    h1: "Kontakt",
    lead: "Rufen Sie für einen Termin an oder senden Sie das Formular. Wir rufen Sie während unserer Öffnungszeiten zurück.",
    formTitle: "Rückruf anfordern",
    required: "Alle Felder sind Pflichtfelder, sofern sie nicht als optional markiert sind.",
    visit: "So finden Sie uns",
    mapTitle: "Karte: {name}",
    mapPlaceholder: "Die Karte erscheint, sobald die Adresse bestätigt ist",
  },

  notFound: {
    title: "Seite nicht gefunden | {name}",
    description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    eyebrow: "Seite nicht gefunden",
    h1: "Diese Seite ist falsch abgebogen",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben. Wenn Sie bei einem Autounfall verletzt wurden, können Sie uns trotzdem jetzt anrufen oder auf der Startseite beginnen.",
    home: "Zur Startseite",
    contact: "Kontakt",
  },
};
