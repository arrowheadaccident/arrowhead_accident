import type { Dictionary } from "./en";

// US Spanish, "usted". Machine-assisted translation: have a native speaker review it before launch (docs/CONTENT-NOTES.md).
export const es: Dictionary = {
  meta: {
    homeTitle: "Quiropráctico de accidentes de auto en Glendale, AZ",
    homeDescription:
      "¿Se lesionó en un accidente de auto en Glendale o Arrowhead Ranch? Examen quiropráctico sin demora y sin costo de su bolsillo si otro conductor tuvo la culpa.",
    ogImageAlt: "{name}, Glendale, AZ. Llame al {phone}",
  },

  common: {
    skipLink: "Saltar al contenido principal",
    home: "Inicio",
    call: "Llame al {phone}",
    requestCallback: "Solicitar que me llamen",
    mainNav: "Navegación principal",
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
  },

  nav: {
    about: "Nosotros",
    treatments: "Tratamientos",
    painManagement: "Manejo del dolor",
    noCost: "Sin costo de su bolsillo",
    faq: "Preguntas frecuentes",
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
    treatments: "Tratamientos de lesiones por accidentes",
    languages: "Idiomas",
    aboutTitle: "Atención de lesiones por accidentes de auto",
    noCostLead: "Sin costo de su bolsillo.",
    noCost:
      "Si otra persona causó su accidente, {name} le cobrará al seguro de la persona responsable y esperará el pago. No necesita seguro médico. Si tiene un abogado, trabajaremos con su abogado mediante un gravamen (lien) y esperaremos el pago. Nos encargamos de todo el papeleo.",
    experience:
      "Nuestra clínica tiene más de 10 años de experiencia atendiendo a víctimas de accidentes sin costo de su bolsillo.",
    appointments: "Citas sin demora. Llame para una cita el mismo día o el siguiente día de consulta:",
    painManagement:
      "Ofrecemos manejo del dolor de sus lesiones con médicos y especialistas en manejo del dolor, y derivaciones a ortopedia cuando sea necesario, sin costo de su bolsillo.",
    callUs: "Llámenos:",
    clinicTitle: "Quiropráctico de accidentes de auto en Glendale, Arizona",
    contactTitle: "Contáctenos",
  },

  ctaBand: {
    title: "¿Se lesionó en un accidente de auto? No espere para hacerse revisar.",
    text: "Citas el mismo día en días de consulta y sin costo de su bolsillo cuando otro conductor tiene la culpa.",
  },

  callCta: {
    label: "Reserve un examen",
    title: "Exámenes sin demora para lesiones por accidente de auto.",
    before: "Llame ahora o ",
    link: "solicite que le llamemos",
    after: ".",
  },

  sidebar: {
    label: "Contacte a la clínica",
    title: "¿Se lesionó en un choque? Examen sin demora.",
  },

  costAndQuestions: {
    title: "¿Preguntas sobre costos o seguros?",
    noCost: "Cómo funciona la atención sin costo de su bolsillo",
    faq: "Preguntas frecuentes sobre accidentes",
  },

  hours: {
    closed: "Cerrado",
    openUntil: "Abierto hoy hasta las {time}",
    openUntilReopens: "Abierto hasta las {time}, reabre a las {reopen}",
    opensToday: "Abre hoy a las {time}",
    opensTomorrow: "Cerrado ahora. Abre mañana a las {time}",
    opensOn: "Cerrado ahora. Abre el {day} a las {time}",
    closedNow: "Cerrado ahora",
  },

  howItWorks: {
    title: "Su atención, desde el examen hasta la recuperación",
    lead: "Concéntrese en recuperarse. Coordinamos su examen, los expedientes de tratamiento y la facturación al seguro.",
    steps: [
      {
        title: "Llámenos",
        text: "Llame o solicite que le llamemos. Hay citas el mismo día o el siguiente día de consulta, incluso si ya fue a la sala de emergencias.",
      },
      {
        title: "Examen completo y documentación",
        text: "Un examen completo de la columna y del sistema musculoesquelético ayuda a identificar lesiones. Documentamos los resultados para respaldar su atención y su reclamo.",
      },
      {
        title: "Su plan de tratamiento",
        text: "Su plan puede incluir atención quiropráctica y manejo del dolor, con derivaciones para una resonancia magnética o a ortopedia cuando sea necesario.",
      },
      {
        title: "Nos encargamos de la facturación",
        text: "Cuando otro conductor tiene la culpa, facturamos a su seguro y colaboramos con su abogado, si tiene uno. Llámenos para hablar sobre las condiciones de facturación.",
      },
    ],
  },

  team: {
    sampleTag: "Perfil de ejemplo",
    sampleBio: "Biografía de ejemplo.",
    roles: {
      "Founder and Chiropractic Physician": "Fundador y médico quiropráctico",
      "Chiropractic Physician": "Médico quiropráctico",
      "Pain Management Physician": "Médico especialista en manejo del dolor",
    },
  },

  founder: {
    eyebrow: "Conozca a nuestro fundador",
    credentialsTitle: "Credenciales",
    credentials: [
      "Certificación del American Board of Forensic Professionals (DABFP)",
      "Certificación en traumatología del latigazo cervical y de lesiones cerebrales",
      "Certificación en análisis forense de riesgo en colisiones a baja velocidad",
      "Fellow en acupuntura médica (FIAMA)",
    ],
    story: [
      "El Dr. Vaughn Anthony Movses, D.C., es un respetado médico quiropráctico dedicado a brindar una atención excepcional a los pacientes en Glendale, AZ. Con su amplia formación médica y su enfoque compasivo, el Dr. Movses ofrece soluciones de atención médica personalizadas, adaptadas a las necesidades únicas de cada paciente. Su compromiso con el bienestar del paciente va más allá de la práctica médica tradicional, ya que prioriza construir relaciones de confianza y fomentar una comunicación abierta.",
      "Los pacientes pueden esperar una atención integral y de apoyo por parte del Dr. Movses, quien está profundamente comprometido con mantenerse al día de los avances más recientes en el campo. Convenientemente ubicado en {street} en Glendale, AZ,",
      "El Dr. Movses recibe a personas de todas las edades y orígenes en su consulta, donde pueden recibir el más alto nivel de atención médica en un ambiente cálido y acogedor.",
    ],
    quote:
      "Un accidente de auto puede cambiarle la vida en segundos. Mi objetivo es sencillo: un examen minucioso, respuestas honestas y un plan de tratamiento pensado para sus lesiones, para que pueda recuperarse y volver a su rutina.",
    link: "Ver el perfil completo",
  },

  cards: {
    readArticle: "Leer el artículo",
  },

  form: {
    title: "Solicite que le llamemos",
    intro: "Completar el formulario toma menos de un minuto. Todos los campos son obligatorios salvo los marcados como opcionales.",
    name: "Nombre completo",
    phone: "Teléfono",
    email: "Correo electrónico",
    accidentDate: "Fecha del accidente",
    message: "¿Cómo podemos ayudarle?",
    optional: "(opcional)",
    honeypot: "Deje este campo vacío",
    consent: "Acepto que me contacten por teléfono, mensaje de texto o correo electrónico sobre mi solicitud.",
    submit: "Solicitar que me llamen",
    sending: "Enviando…",
    note: "Por favor, no incluya detalles médicos. Le devolveremos la llamada en horario de atención.",
    sentTitle: "Gracias. Le llamaremos durante el horario de atención.",
    sentBefore: "¿Necesita ayuda ahora? Llame al ",
    sentAfter: ".",
    errors: {
      name_short: "Escriba su nombre completo.",
      name_long: "Use {max} caracteres o menos.",
      phone: "Escriba un número de teléfono de EE. UU. de 10 dígitos, como (623) 555-0123.",
      email: "Escriba una dirección de correo válida, como nombre@ejemplo.com, o deje el campo vacío.",
      accident_date: "La fecha del accidente no puede ser posterior a hoy.",
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
      "Si usted o un ser querido ha tenido un accidente de auto, un examen completo puede ayudar a identificar lesiones y orientar su atención. Los síntomas no siempre aparecen de inmediato. Llame para una cita el mismo día o el siguiente día de consulta.",
    heroPoints: ["Citas el mismo día en días de consulta", "Sin costo de su bolsillo cuando otro conductor tiene la culpa", "No necesita seguro médico"],
    injuriesTitle: "Lesiones por accidente de auto que tratamos",
    injuriesLead:
      "Nuestros quiroprácticos y médicos se centran en lesiones por accidentes de auto y laborales. Elija un síntoma o una lesión para obtener más información.",
    costTitle: "Sin costo de su bolsillo si usted no tuvo la culpa",
    costText:
      "Si otra persona causó su accidente, nuestra clínica factura al seguro de la persona responsable y espera el pago. Nuestra oficina tiene más de 10 años de experiencia atendiendo a víctimas de accidentes sin costo de su bolsillo.",
    costLink: "Cómo funciona la atención sin costo",
    billingPoints: [
      "Facturamos al seguro de la persona responsable y esperamos el pago.",
      "No necesita seguro médico.",
      "Si tiene abogado, podemos aplazar el pago mediante un gravamen (lien) hasta que su caso se resuelva.",
      "Nos encargamos de todo el papeleo.",
    ],
    faqTitle: "Preguntas después de un accidente de auto",
    faqLead: "Respuestas claras sobre las visitas a emergencias, los daños menores del vehículo y los costos del tratamiento.",
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
      "Llame al {phone} o solicite una llamada. Citas sin demora para lesiones por accidentes de auto en Glendale, AZ. Hablamos español.",
    h1: "Contáctenos",
    lead: "Llame para una cita o envíe el formulario y le llamaremos durante el horario de atención.",
    formTitle: "Solicite que le llamemos",
    required: "Todos los campos son obligatorios salvo los marcados como opcionales.",
    visit: "Visítenos",
    mapTitle: "Mapa de ubicación de {name}",
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
