import type { Dictionary } from "./en";

// US Spanish, "usted". Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const es: Dictionary = {
  meta: {
    homeTitle: "Quiropráctico de accidentes de auto en Glendale, AZ",
    homeDescription:
      "¿Se lesionó en un accidente de auto en Glendale o Arrowhead Ranch? Examen quiropráctico el mismo día y sin costo de su bolsillo si otro conductor tuvo la culpa.",
    ogImageAlt: "{name}, Glendale, AZ. Llame al {phone}",
  },

  common: {
    skipLink: "Saltar al contenido principal",
    home: "Inicio",
    call: "Llame al {phone}",
    requestCallback: "Solicitar una llamada",
    mainNav: "Principal",
    breadcrumb: "Ruta de navegación",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    officeHours: "Horario de atención",
  },

  spoken: {
    lang: undefined,
    badge: "Hablamos español",
    title: "Hablamos español",
    text: "Nuestros médicos y asistentes hablan español.",
    interpreter: "",
    callToday: "Llámenos hoy para una cita el mismo día.",
    cta: "Llame al {phone}",
  },

  nav: {
    about: "Nosotros",
    treatments: "Tratamientos",
    painManagement: "Manejo del dolor",
    noCost: "Sin costo",
    faq: "Preguntas",
    blog: "Blog",
    contact: "Contacto",
  },

  legal: {
    terms: "Términos de uso",
    privacy: "Política de privacidad",
    disclosure: "Política de divulgación",
    englishOnly: " (en inglés)",
  },

  footer: {
    treatments: "Tratamientos por accidente",
    clinic: "Nuestra clínica",
    languages: "Idiomas",
    disclaimer:
      "La información de este sitio web es información general, no consejo médico ni legal, y no crea una relación médico-paciente. Si tiene una emergencia médica, llame al 911.",
    notAssociated: "Este sitio web no tiene ninguna relación con el Dr. Vaughn Movses ni con Arrowhead Accident Group.",
  },

  ctaBand: {
    title: "¿Se lesionó en un accidente de auto? Hágase revisar hoy.",
    text: "Citas el mismo día y sin costo de su bolsillo cuando otro conductor tiene la culpa.",
  },

  callCta: {
    label: "Reserve un examen el mismo día",
    title: "Exámenes el mismo día para lesiones por accidente de auto.",
    before: "Llame ahora o ",
    link: "solicite una llamada",
    after: ".",
  },

  sidebar: {
    label: "Contacte a la clínica",
    title: "¿Se lesionó en un choque? Examen el mismo día.",
  },

  costAndQuestions: {
    title: "¿Preguntas sobre costos o seguros?",
    noCost: "Cómo funciona la atención sin costo de su bolsillo",
    faq: "Preguntas frecuentes sobre accidentes",
  },

  hours: {
    closed: "Cerrado",
    openUntil: "Abierto hoy hasta las {time}",
    opensToday: "Abre hoy a las {time}",
    opensTomorrow: "Cerrado ahora. Abre mañana a las {time}",
    opensOn: "Cerrado ahora. Abre el {day} a las {time}",
    closedNow: "Cerrado ahora",
  },

  howItWorks: {
    title: "Del choque a la recuperación: así funciona",
    lead: "Usted se concentra en recuperarse. Nosotros nos encargamos del examen, el papeleo y el seguro.",
    steps: [
      {
        title: "Llámenos",
        text: "Llame o solicite que le llamemos. Hay citas el mismo día y al día siguiente, incluso si ya fue a la sala de emergencias.",
      },
      {
        title: "Examen completo y documentación",
        text: "Un examen completo de la columna y ortopédico detecta lesiones ocultas, y cada hallazgo se documenta para su reclamo.",
      },
      {
        title: "Su plan de tratamiento",
        text: "Atención quiropráctica y manejo del dolor, con referidos para resonancia magnética (MRI) y ortopedia cuando los necesite.",
      },
      {
        title: "Nos encargamos de la facturación",
        text: "Facturamos al seguro del conductor culpable y trabajamos con su abogado, para que usted no pague nada de su bolsillo.",
      },
    ],
  },

  valueProps: [
    { title: "Citas el mismo día", text: "Llame hoy y vea a un médico hoy o al día siguiente." },
    { title: "Sin costo de su bolsillo", text: "Si otro conductor causó su accidente, facturamos a su seguro y esperamos el pago." },
    { title: "No necesita seguro médico", text: "Puede recibir tratamiento aunque no tenga seguro médico." },
    { title: "Trabajamos con su abogado", text: "Aceptamos gravámenes (liens) y enviamos sus expedientes e informes a su abogado." },
    { title: "Quiroprácticos y médicos", text: "Atención quiropráctica, manejo del dolor y referidos ortopédicos en un solo lugar." },
    { title: "Hablamos español", text: "Nuestros médicos y asistentes hablan español." },
  ],

  team: {
    sampleTag: "Perfil de ejemplo",
    sampleBio: "Biografía de ejemplo.",
    roles: {
      "Chiropractic Physician": "Médico quiropráctico",
      "Pain Management Physician": "Médico especialista en manejo del dolor",
    },
  },

  cards: {
    readArticle: "Leer el artículo",
  },

  form: {
    title: "Solicite una llamada",
    intro: "Toma menos de un minuto. Los campos sin “opcional” son obligatorios.",
    name: "Nombre completo",
    phone: "Teléfono",
    email: "Correo electrónico",
    accidentDate: "Fecha del accidente",
    message: "¿Cómo podemos ayudarle?",
    optional: "(opcional)",
    honeypot: "Deje este campo vacío",
    consent: "Acepto que me contacten por teléfono, mensaje de texto o correo electrónico sobre mi solicitud.",
    submit: "Solicitar una llamada",
    sending: "Enviando…",
    note: "Por favor, no incluya detalles médicos. Le devolveremos la llamada en horario de atención.",
    sentTitle: "Gracias, le llamaremos pronto.",
    sentBefore: "¿Necesita ayuda ahora? Llame al ",
    sentAfter: ".",
    errors: {
      name_short: "Escriba su nombre completo.",
      name_long: "Use {max} caracteres o menos.",
      phone: "Escriba un número de teléfono de EE. UU. de 10 dígitos, como (623) 555-0123.",
      email: "Escriba un correo electrónico como nombre@ejemplo.com, o déjelo vacío.",
      accident_date: "La fecha del accidente no puede ser futura.",
      message_long: "Use {max} caracteres o menos.",
      consent: "Marque esta casilla para que podamos contactarle.",
      bad_request: "No pudimos enviar su solicitud. Inténtelo de nuevo o llámenos al {phone}.",
      send_failed: "No pudimos enviar su solicitud. Llámenos al {phone}.",
      too_many: "Demasiadas solicitudes. Llámenos al {phone}.",
      network: "No pudimos conectar con nuestro servidor. Revise su conexión e inténtelo de nuevo, o llámenos al {phone}.",
    },
  },

  home: {
    h1: "Quiropráctico para lesiones por accidentes de auto en Glendale, Arizona",
    intro:
      "Si usted o un ser querido ha tenido un choque, se debe a sí mismo un examen quiropráctico completo para encontrar lesiones ocultas que podrían afectarle durante años. Lo peor que puede hacer es esperar a ver si el dolor desaparece. Llame hoy para una cita el mismo día o al día siguiente.",
    heroPoints: ["Citas el mismo día", "Sin costo de su bolsillo cuando otro conductor tiene la culpa", "No necesita seguro médico"],
    injuriesTitle: "Lesiones por accidente de auto que tratamos",
    injuriesLead:
      "Nuestros quiroprácticos y médicos tratan solo lesiones por accidentes de auto y del trabajo. Elija su síntoma para saber más.",
    costTitle: "Sin costo de su bolsillo si usted no tuvo la culpa",
    costText:
      "Si otra persona causó su accidente, nuestra clínica factura al seguro de la persona culpable y espera el pago. Nuestra oficina tiene más de 10 años de experiencia atendiendo a víctimas de accidentes sin costo de su bolsillo.",
    costLink: "Cómo funciona la atención sin costo",
    billingPoints: [
      "Facturamos al seguro de la persona culpable y esperamos el pago.",
      "No necesita seguro médico.",
      "Si tiene abogado, trabajamos con un gravamen (lien) y esperamos el pago.",
      "Nos encargamos de todo el papeleo.",
    ],
    careLabel: "Manejo del dolor y atención en español",
    painTitle: "Manejo del dolor en la misma clínica",
    painText:
      "Ofrecemos manejo del dolor para sus lesiones con médicos generales, ortopedistas y especialistas en manejo del dolor, sin costo de su bolsillo cuando otro conductor tiene la culpa. Hay citas de emergencia: llame hoy y vea al médico hoy mismo.",
    painLink: "Sobre el manejo del dolor",
    teamTitle: "Quiroprácticos y un médico bajo un mismo techo",
    teamLead: "Cuatro médicos quiroprácticos y un médico especialista en manejo del dolor que tratan lesiones por accidentes de auto todos los días.",
    teamLink: "Más sobre nuestra clínica",
    faqTitle: "Preguntas después de un accidente de auto",
    faqLead: "Respuestas claras sobre la sala de emergencias, los daños menores y quién paga.",
    faqLink: "Lea las {count} preguntas",
    areasTitle: "Zonas que atendemos",
    areasLead: "Pacientes de accidentes de auto vienen a vernos desde Glendale, Arrowhead Ranch y estos vecindarios cercanos.",
    blogTitle: "Del blog",
    blogLink: "Todos los artículos",
  },

  page: {
    ourDoctors: "Nuestros médicos",
    relatedInjuries: "Lesiones relacionadas",
    aboutTeamLead: "Médicos quiroprácticos y un médico especialista en manejo del dolor que trabajan juntos en una sola clínica.",
  },

  blog: {
    title: "Artículos sobre lesiones por accidentes de auto | Glendale",
    description:
      "Artículos sobre lesiones por accidentes de auto, atención quiropráctica y mitos de los seguros, de nuestra clínica en Glendale, Arizona.",
    crumb: "Blog",
    h1: "Artículos sobre lesiones por accidentes de auto",
    lead: "Investigación y respuestas claras sobre lesiones por accidentes de auto, atención quiropráctica y seguros.",
    published: "Publicado",
    updated: "Actualizado",
  },

  contact: {
    title: "Contáctenos | Quiropráctico de accidentes en Glendale",
    description:
      "Llame al {phone} o solicite una llamada. Citas el mismo día para lesiones por accidentes de auto en Glendale, AZ. Hablamos español.",
    h1: "Contáctenos",
    lead: "Llame para una cita el mismo día, o envíe el formulario y le devolveremos la llamada.",
    formTitle: "Solicite una llamada",
    required: "Los campos sin “opcional” son obligatorios.",
    visit: "Visítenos",
    mapTitle: "Mapa a {name}",
    mapPlaceholder: "El mapa aparecerá cuando se confirme la dirección",
  },

  notFound: {
    title: "Página no encontrada | {name}",
    description: "La página que busca no existe o se ha movido.",
    eyebrow: "Página no encontrada",
    h1: "Esta página tomó un camino equivocado",
    text: "La página que busca no existe o se ha movido. Si se lesionó en un accidente de auto, todavía puede llamarnos ahora o empezar desde la página de inicio.",
    home: "Ir a la página de inicio",
    contact: "Contáctenos",
  },
};
