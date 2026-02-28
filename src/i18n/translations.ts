export type Lang = "en" | "es";

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.skills": ".skills()",
    "nav.about": ".about()",
    "nav.portfolio": ".portfolio()",
    "nav.contact": ".contact()",
    "nav.menu": "menu",
    "nav.close": "close",

    // Hero
    "hero.greeting": "// hello world",
    "hero.title1": "Grow your business.",
    "hero.title2": "We build the way.",
    "hero.description": "We craft digital solutions designed to bring you more leads, more sales, and real growth — not just a website.",
    "hero.viewWork": "view work",
    "hero.contactMe": "contact me",

    // About
    "about.comment": "// about",
    "about.heading": "Our Approach",
    "about.description": "With over 5 years of experience, we develop custom software, apps, and websites for SMEs. We offer AI, Cloud, and E-commerce solutions adapted to each client's needs, ensuring that every tool is a strategic investment.",
    "about.feature.software": "Custom Software",
    "about.feature.software.desc": "We develop specific tools such as CRMs and command centers designed to centralize your operation and optimize every internal process.",
    "about.feature.mobile": "Mobile Apps",
    "about.feature.mobile.desc": "We build native and hybrid applications focused on user experience, ensuring your business is always in your customers' pockets.",
    "about.feature.websites": "Websites",
    "about.feature.websites.desc": "We design high-performance platforms and E-commerce sites that not only look great but are structured to convert visits into sales.",
    "about.feature.audience": "Audience Engagement",
    "about.feature.audience.desc": "We implement AI and Google ranking strategies so your brand stands out and connects straight to the right audience.",
    "about.action.details": "Click to read more",

    // Skills
    "skills.comment": "// skills",
    "skills.heading": "What we work with",
    "skills.frontend": "<Frontend />",
    "skills.backend": "{ Backend }",
    "skills.growth": "[ Growth ]",
    "skill.react": "React / Next.js",
    "skill.typescript": "TypeScript",
    "skill.tailwind": "Tailwind CSS",
    "skill.framer": "Framer Motion",
    "skill.supabase": "Supabase",
    "skill.postgresql": "PostgreSQL / SQL",
    "skill.nodejs": "Node.js",
    "skill.restapi": "REST APIs",
    "skill.googleads": "Google Ads",
    "skill.fbads": "Facebook / Instagram Ads",
    "skill.seo": "SEO",
    "skill.emailmarketing": "Email Marketing",
    "skill.cro": "Conversion Rate Optimization",
    "skill.analytics": "Analytics & Tracking",

    // Portfolio
    "portfolio.comment": "// portfolio",
    "portfolio.heading": "Featured projects",
    "project.cryptoliquid.title": "Crypto Liquid",
    "project.cryptoliquid.desc": "Real-time crypto asset tracker with a live watchlist, latest market news, and instant asset search. Built for traders who need quick, clean data at a glance.",
    "project.smartfix.title": "SmartFix Tool",
    "project.smartfix.desc": "Web & mobile diagnostic tool for a PC/laptop repair shop. Guides customers through their potential computer issues step by step, then sends a detailed report to the shop so they can receive an accurate repair quotation.",
    "project.innovamob.title": "Innovamob",
    "project.innovamob.desc": "National company in Chile specializing in custom interior design, furniture, and kitchens. Features an SEO-structured blog designed to rank organically and attract clients.",
    "project.social.title": "Social Media App",
    "project.social.desc": "Real-time social platform with authentication, file storage, feeds, and notifications — powered by Supabase backend.",
    "project.roofcrm.title": "RoofConnect CRM (PC Only)",
    "project.roofcrm.desc": "CRM platform built for roofing businesses. Manage clients, track projects, and streamline operations with an AI-powered assistant. Powered by Supabase for secure cloud authentication. Demo: demuser@gmail.com / demouser1",
    "project.demo.credentials": "Demo credentials",
    "project.action.visit": "Visit Site ↗",
    "project.action.close": "Close",

    // Contact
    "contact.comment": "// contact",
    "contact.heading": "Let's work together",
    "contact.description": "Ready to transform your online presence into a sales engine? Let's talk about solutions that actually drive profit for your business.",
    "contact.cta": "say hello",

    // Footer
    "footer.text": "built with passion",
  },
  es: {
    // Navbar
    "nav.skills": ".habilidades()",
    "nav.about": ".nosotros()",
    "nav.portfolio": ".portafolio()",
    "nav.contact": ".contacto()",
    "nav.menu": "menú",
    "nav.close": "cerrar",

    // Hero
    "hero.greeting": "// hola mundo",
    "hero.title1": "Crece tu negocio.",
    "hero.title2": "Nosotros construimos el camino.",
    "hero.description": "Creamos soluciones digitales diseñadas para traerte más clientes, más ventas y crecimiento real — no solo un sitio web.",
    "hero.viewWork": "ver trabajo",
    "hero.contactMe": "contáctame",

    // About
    "about.comment": "// nuestro-enfoque",
    "about.heading": "Nuestro Enfoque",
    "about.description": "Con más de 5 años de trayectoria, desarrollamos software, apps y sitios web a medida para PYMEs. Ofrecemos soluciones de IA, Cloud y E-commerce adaptadas a las necesidades de cada cliente, asegurando que cada herramienta sea una inversión estratégica.",
    "about.feature.software": "Software a Medida",
    "about.feature.software.desc": "Desarrollamos herramientas específicas como CRM y centros de comando diseñados para centralizar tu operación y optimizar cada proceso interno.",
    "about.feature.mobile": "Apps Móviles",
    "about.feature.mobile.desc": "Creamos aplicaciones nativas e híbridas enfocadas en la experiencia del usuario, permitiendo que tu negocio esté siempre en el bolsillo de tus clientes.",
    "about.feature.websites": "Sitios Web",
    "about.feature.websites.desc": "Diseñamos plataformas de alto rendimiento y E-commerce que no solo lucen bien, sino que están estructuradas para convertir visitas en ventas.",
    "about.feature.audience": "Alcance de Audiencia",
    "about.feature.audience.desc": "Implementamos estrategias de IA y posicionamiento en Google para que tu marca destaque y conecte directamente con la audiencia correcta.",
    "about.action.details": "Haz clic para leer más",

    // Skills
    "skills.comment": "// habilidades",
    "skills.heading": "Con qué trabajamos",
    "skills.frontend": "<Frontend />",
    "skills.backend": "{ Backend }",
    "skills.growth": "[ Crecimiento ]",
    "skill.react": "React / Next.js",
    "skill.typescript": "TypeScript",
    "skill.tailwind": "Tailwind CSS",
    "skill.framer": "Framer Motion",
    "skill.supabase": "Supabase",
    "skill.postgresql": "PostgreSQL / SQL",
    "skill.nodejs": "Node.js",
    "skill.restapi": "REST APIs",
    "skill.googleads": "Google Ads",
    "skill.fbads": "Facebook / Instagram Ads",
    "skill.seo": "SEO",
    "skill.emailmarketing": "Email Marketing",
    "skill.cro": "Optimización de Conversión",
    "skill.analytics": "Analítica y Seguimiento",

    // Portfolio
    "portfolio.comment": "// portafolio",
    "portfolio.heading": "Proyectos destacados",
    "project.cryptoliquid.title": "Crypto Liquid",
    "project.cryptoliquid.desc": "Rastreador de criptoactivos en tiempo real con lista de seguimiento, últimas noticias del mercado y búsqueda instantánea de activos. Diseñado para traders que necesitan datos rápidos y claros.",
    "project.smartfix.title": "SmartFix Tool",
    "project.smartfix.desc": "Herramienta de diagnóstico web y móvil para una tienda de reparación de PCs y laptops. Guía a los clientes paso a paso por sus posibles problemas informáticos y envía un reporte detallado al taller para recibir una cotización de reparación.",
    "project.innovamob.title": "Innovamob",
    "project.innovamob.desc": "Empresa nacional en Chile especializada en diseño de interiores, muebles y cocinas a medida. Incluye un blog estructurado para posicionamiento SEO orgánico y atracción de clientes.",
    "project.social.title": "App de Redes Sociales",
    "project.social.desc": "Plataforma social en tiempo real con autenticación, almacenamiento de archivos, feeds y notificaciones — impulsada por backend Supabase.",
    "project.roofcrm.title": "RoofConnect CRM (Solo PC)",
    "project.roofcrm.desc": "Plataforma CRM para empresas de techado. Gestiona clientes, proyectos y operaciones con un asistente impulsado por IA. Usa Supabase para autenticación segura en la nube. Demo: demuser@gmail.com / demouser1",
    "project.demo.credentials": "Credenciales de demo",
    "project.action.visit": "Visitar Sitio ↗",
    "project.action.close": "Cerrar",

    // Contact
    "contact.comment": "// contacto",
    "contact.heading": "Trabajemos juntos",
    "contact.description": "¿Listo para transformar tu presencia en línea en un motor de ventas? Hablemos sobre soluciones que realmente generen ganancias para tu negocio.",
    "contact.cta": "saluda",

    // Footer
    "footer.text": "construido con pasión",
  },
};
