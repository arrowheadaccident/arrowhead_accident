import type { Dictionary } from "./en";

// German, "Sie". The staff speak English and Spanish only, so the copy says so instead of "Hablamos Español".
// Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const de: Dictionary = {
  meta: {
    homeTitle: "Unfall-Chiropraktiker in Glendale, AZ | Termin am selben Tag",
    homeDescription:
      "Nach einem Autounfall in Glendale oder Arrowhead Ranch verletzt? Chiropraktische Untersuchung am selben Tag, keine Kosten für Sie, wenn ein anderer schuld ist.",
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
    noCost: "Keine Kosten",
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
      "Die Informationen auf dieser Website sind allgemeine Informationen, keine medizinische oder rechtliche Beratung, und begründen kein Arzt-Patienten-Verhältnis. Bei einem medizinischen Notfall rufen Sie 911 an.",
    notAssociated: "Diese Website steht in keinerlei Verbindung mit Dr. Vaughn Movses oder der Arrowhead Accident Group.",
  },

  ctaBand: {
    title: "Bei einem Autounfall verletzt? Lassen Sie sich heute untersuchen.",
    text: "Termine am selben Tag und keine Kosten für Sie, wenn ein anderer Fahrer den Unfall verursacht hat.",
  },

  callCta: {
    label: "Untersuchung am selben Tag vereinbaren",
    title: "Untersuchung am selben Tag bei Verletzungen durch einen Autounfall.",
    before: "Rufen Sie jetzt an oder ",
    link: "fordern Sie einen Rückruf an",
    after: ".",
  },

  sidebar: {
    label: "Praxis kontaktieren",
    title: "Bei einem Unfall verletzt? Untersuchung noch heute.",
  },

  costAndQuestions: {
    title: "Fragen zu Kosten oder Versicherung?",
    noCost: "So funktioniert die Behandlung ohne Kosten für Sie",
    faq: "FAQ zu Autounfällen",
  },

  hours: {
    closed: "Geschlossen",
    openUntil: "Heute geöffnet bis {time} Uhr",
    opensToday: "Öffnet heute um {time} Uhr",
    opensTomorrow: "Jetzt geschlossen. Öffnet morgen um {time} Uhr",
    opensOn: "Jetzt geschlossen. Öffnet am {day} um {time} Uhr",
    closedNow: "Jetzt geschlossen",
  },

  howItWorks: {
    title: "Vom Unfall bis zur Genesung: So funktioniert es",
    lead: "Sie konzentrieren sich auf Ihre Genesung. Wir kümmern uns um die Untersuchung, den Papierkram und die Versicherung.",
    steps: [
      {
        title: "Rufen Sie uns an",
        text: "Rufen Sie an oder fordern Sie einen Rückruf an. Termine am selben oder nächsten Tag sind möglich, auch wenn Sie schon in der Notaufnahme waren.",
      },
      {
        title: "Gründliche Untersuchung und Dokumentation",
        text: "Eine vollständige Wirbelsäulen- und orthopädische Untersuchung findet verborgene Verletzungen, und jeder Befund wird für Ihren Schadensanspruch dokumentiert.",
      },
      {
        title: "Ihr Behandlungsplan",
        text: "Chiropraktische Behandlung und Schmerztherapie, mit Überweisungen zum MRT und zum Orthopäden, wenn Sie sie brauchen.",
      },
      {
        title: "Wir übernehmen die Abrechnung",
        text: "Wir rechnen mit der Versicherung des Unfallverursachers ab und arbeiten mit Ihrem Anwalt zusammen, sodass Sie nichts aus eigener Tasche zahlen.",
      },
    ],
  },

  valueProps: [
    { title: "Termine am selben Tag", text: "Rufen Sie heute an, und ein Arzt untersucht Sie heute oder morgen." },
    { title: "Keine Kosten für Sie", text: "Wenn ein anderer Fahrer Ihren Unfall verursacht hat, rechnen wir mit dessen Versicherung ab und warten auf die Zahlung." },
    { title: "Keine Krankenversicherung nötig", text: "Sie können auch ohne Krankenversicherung behandelt werden." },
    { title: "Wir arbeiten mit Ihrem Anwalt zusammen", text: "Wir akzeptieren ein Pfandrecht (Lien) und senden Ihre Unterlagen und Berichte an Ihren Anwalt." },
    { title: "Chiropraktiker und Ärzte", text: "Chiropraktik, Schmerztherapie und orthopädische Überweisungen an einem Ort." },
    {
      title: "Englisch und Spanisch",
      text: "Unsere Ärzte und Mitarbeiter sprechen Englisch und Spanisch. Sie können gern jemanden mitbringen, der für Sie dolmetscht.",
    },
  ],

  team: {
    sampleTag: "Beispielprofil",
    sampleBio: "Beispiel-Biografie.",
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
    intro: "Dauert weniger als eine Minute. Felder ohne „optional“ sind Pflichtfelder.",
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
    sentTitle: "Vielen Dank, wir rufen Sie in Kürze an.",
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
      "Wenn Sie oder ein Angehöriger einen Autounfall hatten, sollten Sie sich gründlich chiropraktisch untersuchen lassen, um verborgene Verletzungen zu finden, die Sie noch Jahre später beeinträchtigen könnten. Das Schlimmste, was Sie tun können, ist abzuwarten, ob der Schmerz von selbst vergeht. Rufen Sie heute an für einen Termin am selben oder am nächsten Tag.",
    heroPoints: ["Termine am selben Tag", "Keine Kosten für Sie, wenn ein anderer Fahrer schuld ist", "Keine Krankenversicherung nötig"],
    injuriesTitle: "Unfallverletzungen, die wir behandeln",
    injuriesLead:
      "Unsere Chiropraktiker und Ärzte behandeln ausschließlich Verletzungen durch Auto- und Arbeitsunfälle. Wählen Sie Ihr Symptom, um mehr zu erfahren.",
    costTitle: "Keine Kosten für Sie, wenn Sie nicht schuld sind",
    costText:
      "Wenn eine andere Person Ihren Unfall verursacht hat, rechnet unsere Praxis mit deren Versicherung ab und wartet auf die Zahlung. Unsere Praxis betreut Unfallopfer seit über 10 Jahren, ohne dass sie etwas aus eigener Tasche zahlen.",
    costLink: "So zahlen Sie nichts",
    billingPoints: [
      "Wir rechnen mit der Versicherung des Unfallverursachers ab und warten auf die Zahlung.",
      "Eine Krankenversicherung ist nicht nötig.",
      "Wenn Sie einen Anwalt haben, arbeiten wir mit einem Pfandrecht (Lien) und warten auf die Zahlung.",
      "Wir erledigen den gesamten Papierkram für Sie.",
    ],
    careLabel: "Schmerztherapie und Sprachen",
    painTitle: "Schmerztherapie in derselben Praxis",
    painText:
      "Wir bieten Schmerztherapie für Ihre Verletzungen durch Allgemeinmediziner, Orthopäden und Schmerztherapeuten an, ohne Kosten für Sie, wenn ein anderer Fahrer schuld ist. Notfalltermine sind möglich: Rufen Sie heute an und kommen Sie noch heute zum Arzt.",
    painLink: "Mehr zur Schmerztherapie",
    teamTitle: "Chiropraktiker und ein Arzt unter einem Dach",
    teamLead: "Vier Chiropraktiker und ein Arzt für Schmerztherapie, die jeden Tag Verletzungen durch Autounfälle behandeln.",
    teamLink: "Mehr über unsere Praxis",
    faqTitle: "Fragen nach einem Autounfall",
    faqLead: "Klare Antworten zu Notaufnahme, kleinen Schäden und der Frage, wer zahlt.",
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
    title: "Kontakt | Unfall-Chiropraktiker in Glendale",
    description:
      "Rufen Sie {phone} an oder fordern Sie einen Rückruf an. Termine am selben Tag bei Unfallverletzungen in Glendale, AZ. Wir sprechen Englisch und Spanisch.",
    h1: "Kontakt",
    lead: "Rufen Sie für einen Termin am selben Tag an, oder senden Sie das Formular, und wir rufen Sie zurück.",
    formTitle: "Rückruf anfordern",
    required: "Felder ohne „optional“ sind Pflichtfelder.",
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
