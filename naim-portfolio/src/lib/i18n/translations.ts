export type Language = "es" | "en";

export const translations = {
  boot: {
    loading: {
      label: { es: "Inicializando sistema", en: "Initializing system" },
      sub: { es: "Cargando experiencia", en: "Loading experience" },
      version: { es: "v.2026", en: "v.2026" },
    },
    lang: {
      title: { es: "Selecciona tu idioma", en: "Select your language" },
      sub: {
        es: "Antes de entrar al mundo",
        en: "Before entering the world",
      },
      enter: { es: "Entrar", en: "Enter" },
      hint: {
        es: "Usa el ratón o las flechas",
        en: "Use mouse or arrow keys",
      },
    },
  },
  nav: {
    about: { es: "Sobre mí", en: "About" },
    skills: { es: "Skills", en: "Skills" },
    projects: { es: "Proyectos", en: "Projects" },
    experience: { es: "Experiencia", en: "Experience" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    badge: {
      es: "Disponible · Junior Data Analyst @ Deloitte",
      en: "Available · Junior Data Analyst @ Deloitte",
    },
    line1: { es: "Construyendo", en: "Building" },
    line2: { es: "soluciones data-driven", en: "data-driven solutions" },
    line3: { es: "con código y diseño.", en: "through code and design." },
    description: {
      es: "Naim Penabad Hermida — desarrollador web en transición a Data Science & AI. Python, SQL, AWS y un fuerte criterio de diseño.",
      en: "Naim Penabad Hermida — web developer transitioning to Data Science & AI. Python, SQL, AWS and a strong sense of design.",
    },
    ctaPrimary: { es: "Ver proyectos", en: "See projects" },
    ctaSecondary: { es: "Contactar", en: "Get in touch" },
    scroll: { es: "Desplázate", en: "Scroll" },
  },
  about: {
    eyebrow: { es: "01 — Sobre mí", en: "01 — About" },
    title: {
      es: "Del front-end a los datos.",
      en: "From front-end to data.",
    },
    p1: {
      es: "Graduado en Desarrollo de Aplicaciones Web, hoy construyo soluciones data-driven en Deloitte como Junior Data Analyst (AI & Data). Mi background une ingeniería front-end y back-end con análisis de datos, ETL y arquitecturas cloud.",
      en: "Graduated in Web Application Development, I now build data-driven solutions at Deloitte as a Junior Data Analyst (AI & Data). My background bridges front-end and back-end engineering with data analysis, ETL and cloud architectures.",
    },
    p2: {
      es: "Trabajo en la intersección entre producto, ingeniería y datos. Me obsesiona la calidad — el detalle, la fluidez y la precisión. Cada interfaz, cada pipeline, cada decisión.",
      en: "I work at the intersection of product, engineering and data. Quality is what drives me — the detail, the fluidity, the precision. Every interface, every pipeline, every decision.",
    },
    stat1Value: { es: "2+", en: "2+" },
    stat1Label: { es: "años en producto", en: "years in product" },
    stat2Value: { es: "10+", en: "10+" },
    stat2Label: { es: "tecnologías", en: "technologies" },
    stat3Value: { es: "∞", en: "∞" },
    stat3Label: {
      es: "curiosidad por aprender",
      en: "curiosity to learn",
    },
  },
  skills: {
    eyebrow: { es: "02 — Stack", en: "02 — Stack" },
    title: {
      es: "Herramientas que uso a diario.",
      en: "Tools I use every day.",
    },
    sub: {
      es: "Un stack moderno, pragmático y orientado a producto.",
      en: "A modern, pragmatic, product-oriented stack.",
    },
    groups: {
      languages: { es: "Lenguajes", en: "Languages" },
      frameworks: { es: "Frameworks", en: "Frameworks" },
      data: { es: "Data", en: "Data" },
      web: { es: "Web", en: "Web" },
      tools: { es: "Herramientas", en: "Tools" },
      cloud: { es: "Cloud", en: "Cloud" },
      ai: { es: "AI", en: "AI" },
    },
  },
  projects: {
    eyebrow: { es: "03 — Trabajo", en: "03 — Work" },
    title: {
      es: "Proyectos seleccionados.",
      en: "Selected projects.",
    },
    sub: {
      es: "Una muestra del trabajo que más me representa.",
      en: "A glimpse of the work that best represents me.",
    },
    viewProject: { es: "Ver proyecto", en: "View project" },
    items: {
      autoaudit: {
        title: { es: "Autoaudit-AI", en: "Autoaudit-AI" },
        tag: { es: "AI / Automation", en: "AI / Automation" },
        description: {
          es: "Herramienta de auditoría automatizada potenciada con IA. Análisis estructurado, reglas y reporting.",
          en: "AI-powered automated audit tool. Structured analysis, rules and reporting.",
        },
      },
      blessing: {
        title: { es: "Blessing Indigo", en: "Blessing Indigo" },
        tag: { es: "Web / Brand", en: "Web / Brand" },
        description: {
          es: "Sitio corporativo construido con cuidado tipográfico, jerarquía clara y estética minimalista.",
          en: "Corporate website built with typographic care, clear hierarchy and minimalist aesthetic.",
        },
      },
      portfolio: {
        title: { es: "This portfolio", en: "This portfolio" },
        tag: { es: "Experience / Motion", en: "Experience / Motion" },
        description: {
          es: "Una experiencia interactiva tipo producto. Next.js, GSAP, Framer Motion y atención al detalle.",
          en: "A product-grade interactive experience. Next.js, GSAP, Framer Motion and attention to detail.",
        },
      },
    },
  },
  experience: {
    eyebrow: { es: "04 — Trayectoria", en: "04 — Path" },
    title: {
      es: "Un camino entre código y datos.",
      en: "A path between code and data.",
    },
    items: {
      deloitte: {
        role: {
          es: "Junior Data Analyst — AI & Data",
          en: "Junior Data Analyst — AI & Data",
        },
        company: { es: "Deloitte", en: "Deloitte" },
        period: { es: "Tiempo completo", en: "Full-time" },
        description: {
          es: "ETL, Snowflake, dbt, Control-M e IICS. Soluciones data-driven para clientes enterprise.",
          en: "ETL, Snowflake, dbt, Control-M and IICS. Data-driven solutions for enterprise clients.",
        },
      },
      education: {
        role: {
          es: "Desarrollo de Aplicaciones Web",
          en: "Web Application Development",
        },
        company: { es: "Ciclo Formativo de Grado Superior", en: "Higher Vocational Education" },
        period: { es: "Graduado", en: "Graduated" },
        description: {
          es: "Base sólida en front-end y back-end: JavaScript, PHP, Java, Laravel, bases de datos.",
          en: "Solid foundation in front-end and back-end: JavaScript, PHP, Java, Laravel, databases.",
        },
      },
    },
  },
  contact: {
    eyebrow: { es: "05 — Contacto", en: "05 — Contact" },
    title: {
      es: "Construyamos algo juntos.",
      en: "Let's build something together.",
    },
    sub: {
      es: "Abierto a oportunidades, colaboraciones y conversaciones interesantes.",
      en: "Open to opportunities, collaborations and interesting conversations.",
    },
    emailCta: { es: "Escríbeme", en: "Email me" },
    socials: { es: "En la red", en: "Find me on" },
    footer: {
      es: "© 2026 Naim Penabad Hermida — Diseñado y construido con criterio.",
      en: "© 2026 Naim Penabad Hermida — Designed and built with care.",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;
