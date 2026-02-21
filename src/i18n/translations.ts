export type Lang = "en" | "es";

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.skills": ".skills()",
    "nav.portfolio": ".portfolio()",
    "nav.contact": ".contact()",
    "nav.menu": "menu",
    "nav.close": "close",

    // Hero
    "hero.greeting": "// hello world",
    "hero.title1": "You imagine it.",
    "hero.title2": "We build it.",
    "hero.description": "Full-stack developer specializing in crafting beautiful, performant web applications — from pixel-perfect frontends to robust backend architectures.",
    "hero.viewWork": "view work",
    "hero.contactMe": "contact me",

    // Skills
    "skills.comment": "// skills",
    "skills.heading": "What we work with",
    "skills.frontend": "<Frontend />",
    "skills.backend": "{ Backend }",

    // Portfolio
    "portfolio.comment": "// portfolio",
    "portfolio.heading": "Featured projects",
    "project.cryptoliquid.title": "Crypto Liquid",
    "project.cryptoliquid.desc": "Real-time crypto asset tracker with a live watchlist, latest market news, and instant asset search. Built for traders who need quick, clean data at a glance.",
    "project.smartfix.title": "SmartFix Tool",
    "project.smartfix.desc": "Web & mobile diagnostic tool for a PC/laptop repair shop. Guides customers through their potential computer issues step by step, then sends a detailed report to the shop so they can receive an accurate repair quotation.",
    "project.analytics.title": "Analytics Dashboard",
    "project.analytics.desc": "Data visualization dashboard with interactive charts, custom SQL queries, and automated reporting via serverless functions.",
    "project.social.title": "Social Media App",
    "project.social.desc": "Real-time social platform with authentication, file storage, feeds, and notifications — powered by Supabase backend.",
    "project.roofcrm.title": "RoofConnect CRM (PC Only)",
    "project.roofcrm.desc": "CRM platform built for roofing businesses. Manage clients, track projects, and streamline operations with an AI-powered assistant. Powered by Supabase for secure cloud authentication. Demo: demuser@gmail.com / demouser1",
    "project.demo.credentials": "Demo credentials",

    // Contact
    "contact.comment": "// contact",
    "contact.heading": "Let's work together",
    "contact.description": "Have a project in mind? I'm always open to discussing new opportunities and interesting ideas.",
    "contact.cta": "say hello",

    // Footer
    "footer.text": "built with passion",
  },
  es: {
    // Navbar
    "nav.skills": ".habilidades()",
    "nav.portfolio": ".portafolio()",
    "nav.contact": ".contacto()",
    "nav.menu": "menú",
    "nav.close": "cerrar",

    // Hero
    "hero.greeting": "// hola mundo",
    "hero.title1": "Tú lo imaginas.",
    "hero.title2": "Nosotros lo construimos.",
    "hero.description": "Desarrollador full-stack especializado en crear aplicaciones web hermosas y de alto rendimiento — desde frontends pixel-perfect hasta arquitecturas backend robustas.",
    "hero.viewWork": "ver trabajo",
    "hero.contactMe": "contáctame",

    // Skills
    "skills.comment": "// habilidades",
    "skills.heading": "Con qué trabajamos",
    "skills.frontend": "<Frontend />",
    "skills.backend": "{ Backend }",

    // Portfolio
    "portfolio.comment": "// portafolio",
    "portfolio.heading": "Proyectos destacados",
    "project.cryptoliquid.title": "Crypto Liquid",
    "project.cryptoliquid.desc": "Rastreador de criptoactivos en tiempo real con lista de seguimiento, últimas noticias del mercado y búsqueda instantánea de activos. Diseñado para traders que necesitan datos rápidos y claros.",
    "project.smartfix.title": "SmartFix Tool",
    "project.smartfix.desc": "Herramienta de diagnóstico web y móvil para una tienda de reparación de PCs y laptops. Guía a los clientes paso a paso por sus posibles problemas informáticos y envía un reporte detallado al taller para recibir una cotización de reparación.",
    "project.analytics.title": "Panel de Analíticas",
    "project.analytics.desc": "Panel de visualización de datos con gráficos interactivos, consultas SQL personalizadas e informes automatizados mediante funciones serverless.",
    "project.social.title": "App de Redes Sociales",
    "project.social.desc": "Plataforma social en tiempo real con autenticación, almacenamiento de archivos, feeds y notificaciones — impulsada por backend Supabase.",
    "project.roofcrm.title": "RoofConnect CRM (Solo PC)",
    "project.roofcrm.desc": "Plataforma CRM para empresas de techado. Gestiona clientes, proyectos y operaciones con un asistente impulsado por IA. Usa Supabase para autenticación segura en la nube. Demo: demuser@gmail.com / demouser1",
    "project.demo.credentials": "Credenciales de demo",

    // Contact
    "contact.comment": "// contacto",
    "contact.heading": "Trabajemos juntos",
    "contact.description": "¿Tienes un proyecto en mente? Siempre estoy abierto a discutir nuevas oportunidades e ideas interesantes.",
    "contact.cta": "saluda",

    // Footer
    "footer.text": "construido con pasión",
  },
};
