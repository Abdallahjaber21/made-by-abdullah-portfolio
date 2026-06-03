/**
 * English dictionary — the single source of truth for all translatable copy.
 *
 * The Arabic dictionary (`ar.ts`) is generated from this file via DeepL by
 * `scripts/translate.mjs` and must match this shape exactly. The `Dict` type is
 * inferred from this object, so every consumer is type-checked against it.
 *
 * What is NOT translated (kept Latin in both locales): brand/product names,
 * tech-stack chip labels, live telemetry numbers, and email/URLs.
 */
export const en = {
  // Header / nav
  nav: {
    about: "About",
    services: "Services",
    work: "Work",
    clients: "Clients",
    approach: "Approach",
    contact: "Contact",
  },
  header: {
    role: "Engineer",
    home: "Home",
    primaryNav: "Primary",
    available: "Available",
    localeToggle: "Language",
  },

  // Hero
  hero: {
    roles: [
      "Staff software engineer",
      "Full-stack architect",
      "SaaS platform builder",
      "AI-enhanced product engineer",
      "Performance & systems specialist",
    ],
    pill: "STAFF SOFTWARE ENGINEER · 7+ YEARS",
    based: "BASED IN LEBANON · WORKING WORLDWIDE",
    titleLine1: "Engineering,",
    titleLine2a: "calmly. ",
    titleLine2em: "At scale.",
    ctaPrimary: "See selected work",
    ctaSecondary: "Start a project",
    scroll: "SCROLL TO DESCEND",
    layer: "LAYER",
  },

  // About
  about: {
    eyebrow: "01 · About",
    headingA: "Seven years building",
    headingB: "and scaling ",
    headingReal: "real",
    headingC: " software ",
    headingSystems: "systems",
    headingD: ".",
    lead: "I'm a software engineer first. I architect the parts that don't show — the schemas, the boundaries, the failure modes — so the product on top stays simple. Most of my work is backend architecture, SaaS platforms, and modernizing systems that have to keep running.",
    bio1: "A Bachelor's in Computer Science and seven-plus years shipping production software — across startups, SaaS companies, enterprise software, and freelance consulting. I've built greenfield platforms and, just as often, modernized legacy systems that couldn't afford downtime.",
    bio2: "My core is PHP — Laravel and Yii2 — paired with Next.js, TypeScript and React on the frontend, MySQL and PostgreSQL underneath, and Docker, AWS and CI/CD around it. I lean on SOLID principles and design patterns because clean architecture is what lets a team move quickly without breaking things.",
    bio3: "Lately I work as an AI-enhanced engineer — agentic workflows and LLM integrations to move faster while every architectural decision stays firmly human. AI amplifies good engineering; it doesn't replace it.",
    statYears: "Years building production software",
    statSectors: "Sectors — SaaS, enterprise, freelance",
    statLevelValue: "Staff",
    statLevel: "Engineering level",
    stackTitle: "Stack · By category",
    stackStatus: "Daily drivers",
    cat: {
      languages: "Languages",
      frameworks: "Frameworks",
      mobile: "Mobile",
      styling: "Styling",
      cloud: "Cloud",
      data: "Data",
      others: "Others",
    },
  },

  // Services
  services: {
    eyebrow: "02 · Services",
    heading: "What I'm hired for.",
    items: {
      product: {
        num: "/01 · Product engineering",
        title: "Staff-level product engineering",
        body: "One engineer accountable for outcomes — from data model and API contract through interaction, state, and shipped UI. Deep involvement, written-down decisions, working software at every gate.",
      },
      saas: {
        num: "/02 · SaaS",
        title: "SaaS platform development",
        body: "Multi-tenant platforms built to grow — auth, billing surfaces, background jobs, and clean module boundaries.",
      },
      ai: {
        num: "/03 · AI",
        title: "AI-powered application development",
        body: "LLM integrations and agentic workflows wired into real products — retrieval, tool-use, and evals, not demos.",
      },
      architecture: {
        num: "/04 · Architecture",
        title: "System architecture & modernization",
        body: "Boundaries, contracts, and staged migrations that move legacy systems forward without downtime.",
      },
      performance: {
        num: "/05 · Performance",
        title: "Performance optimization",
        body: "Query tuning, indexing, caching, and profiling — slow products and slow pipelines made fast.",
      },
      leadership: {
        num: "/06 · Leadership",
        title: "Technical leadership & consulting",
        body: "Staff-level guidance — architecture reviews, standards, mentoring, and a second pair of eyes on the decisions that are expensive to reverse.",
      },
    },
  },

  // Projects / Work
  projects: {
    eyebrowRecent: "03 · Recent work",
    eyebrowAll: "03 · All work",
    headingRecentA: "Recent work,",
    headingRecentB: "built and shipped.",
    headingAllA: "Everything I've",
    headingAllB: "built and shipped.",
    viewAll: "View all work",
    backToHome: "Back to home",
    visit: "Visit project",
    live: "LIVE",
    swipe: "SWIPE",
    landscape: "LANDSCAPE",
    portrait: "PORTRAIT",
    webApp: "WEB APP",
    screens: "SCREENS",
    views: "VIEWS",
  },

  // Clients
  clients: {
    eyebrow: "04 · Clients",
    headingA: "Teams I've",
    headingB: "built for.",
    lead: "A range of clients across games, retail, FMCG, real estate, and agencies — work shipped and running in production, not slideware.",
    testimonials: {
      samar: "“Abdallah turned our idea into a polished multiplayer game that just works. The real-time gameplay is smooth, the backend never buckles under load, and he delivered on time. Our players love it.”",
      saxon: "“He rebuilt our entire point-of-sale from the ground up — inventory, barcodes, reporting, the lot. It's fast, reliable, and the team picked it up in a day. Easily one of the best engineers we've worked with.”",
      pepsi: "“Our mobile store has never run better. Orders, delivery tracking, promotions — everything is seamless and the app feels genuinely premium. Abdallah is a true professional, start to finish.”",
    },
  },

  // Approach
  approach: {
    eyebrow: "05 · Engineering attitude",
    heading: "How I build.",
    lead: "Six convictions, learned across seven years of shipping. They are why my code reads the way it does.",
    statements: {
      s1a: "Clean architecture is how you ",
      s1em: "scale a team",
      s1b: ", not just a system. Everything else follows from the boundaries.",
      s2a: "Performance is a ",
      s2em: "feature",
      s2b: ", not an afterthought. Set the budget; defend it like a deadline.",
      s3a: "Simplicity beats cleverness. The ",
      s3em: "obvious",
      s3b: " solution is usually the one that survives.",
      s4a: "Maintainability outlives trends. Optimize for the ",
      s4em: "engineer reading this",
      s4b: " in two years.",
      s5a: "AI ",
      s5em: "amplifies",
      s5b: " engineers; it doesn't replace engineering. The judgement stays human.",
      s6a: "Good software is ",
      s6em: "understood",
      s6b: " before it is optimized. Clarity first, speed second.",
    },
  },

  // Contact
  contact: {
    meta: "GET IN TOUCH · /06",
    headingA: "Let's ",
    headingEm: "build",
    headingB: " something.",
    sub: "Tell me about the product, the system, or the problem you're solving — I'll reply within a day.",
    available: "AVAILABLE FOR WORK",
    replies: "REPLIES IN ~1 DAY",
    resume: "Résumé / CV",
    form: {
      title: "Project enquiry",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      projectType: "Project type",
      types: {
        web: "Web app",
        mobile: "Mobile app",
        saas: "SaaS platform",
        backend: "Backend / API",
        ai: "AI integration",
        other: "Other",
      },
      details: "Project details",
      detailsPlaceholder: "What are you building, and what's making it hard? Stack, timeline, and scope all help.",
      send: "Send message",
      sending: "Sending…",
      repliesKey: "REPLIES",
      repliesVal: "within ~1 day",
      basedKey: "BASED IN",
      sentHeadingA: "Message ",
      sentHeadingEm: "sent.",
      sentBody: "Thanks for reaching out — I'll get back to you within one working day. Feel free to email me directly in the meantime.",
      sentRef: "REF",
      sentStatus: "STATUS",
      sentStatusVal: "received",
      sentReply: "REPLY",
      error: "Something went wrong sending your message. Please try again, or email me directly.",
      rateLimited: "You've sent a few messages already — please wait a moment and try again, or email me directly.",
      retry: "Try again",
      errNameRequired: "Please enter your name.",
      errEmailRequired: "Please enter your email.",
      errEmailInvalid: "Please enter a valid email address.",
      errMessageRequired: "Please enter a short message.",
    },
  },

  // Loader splash
  loader: {
    label: "Loading",
  },

  // Footer
  footer: {
    rights: "© 2026",
  },

  // Telemetry HUD (mostly numbers; only labels translate)
  hud: {
    system: "SYSTEM · LIVE",
    ok: "OK",
    rps: "rps",
    p99: "p99 latency",
    nodes: "edge nodes",
    err: "error rate",
    queue: "queue depth",
  },

  // Layer rail
  layers: ["SURFACE", "ORCHESTRATION", "COMPUTE FABRIC", "TOPOLOGY", "INTELLIGENCE"],

  // Per-project copy, keyed by project title (the stable key in projects.ts).
  // Only human-readable fields are translated; stack chips & URLs stay Latin.
  work: {
    Samar: {
      typeLabel: "Mobile · Multiplayer trivia game",
      tag: "Flutter app · Yii2 backend",
      description: "Samar — the ultimate group trivia game. A multiplayer party game built with Flutter and a Yii2 backend. Two teams compete across 36-question rounds with strategic power-ups — block, double points, and optional help. Free to play with in-app purchases for extended gameplay, backed by smooth performance, responsive design, and secure backend integration.",
      stats: ["Questions per round", "Teams head-to-head", "Free with purchases"],
    },
    "Saxon POS": {
      typeLabel: "Web · Point of sale & inventory",
      tag: "Full ownership · End to end",
      description: "A point-of-sale system for Saxon, built end to end — database architecture, stock management, CRUD for customers, employee management, transactions and sales, barcode integration, receipt printing, and reporting including daily cashier and sales reports.",
      stats: ["Stock & barcode", "Customers & staff", "Daily cashier & sales"],
    },
    "Keep Property": {
      typeLabel: "Mobile · UK real-estate platform",
      tag: "Hybrid app · Yii2 + Vue",
      description: "A custom mobile app for Keep Property, a UK-based real-estate platform. Users search, view, and favourite property listings with rich media and location-based filters. Features user authentication, real-time listing updates, and seamless integration with the existing website — a smooth experience for buyers, renters, and investors.",
      stats: ["Listings & filters", "Accounts & favourites", "Real-time updates"],
    },
    "Pepsi Lebanon": {
      typeLabel: "Mobile · E-commerce platform",
      tag: "Hybrid app · Yii2 + Cordova",
      description: "A custom mobile e-commerce platform for Pepsi Lebanon. Users browse products, place orders, and track deliveries seamlessly. The app supports account management, promotions, and real-time inventory updates — a smooth, user-friendly shopping experience tailored for the local market.",
      stats: ["Browse & checkout", "Account & offers", "Delivery tracking"],
    },
    "Tree Treat": {
      typeLabel: "Mobile · Sustainability app",
      tag: "Hybrid app · Plant & track trees",
      description: "A tree-planting and sponsorship app — users discover trees to plant or sponsor, build a collection of their own trees, save favourites, and follow each tree over time. Built around a clean, friendly mobile experience with secure accounts.",
      stats: ["Sponsor & track trees", "Personal collection", "Accounts & saved"],
    },
    Zakey: {
      typeLabel: "Mobile · Multi-vendor marketplace",
      tag: "Hybrid app · Customer + supplier",
      description: "A two-sided multi-vendor e-commerce marketplace. The customer storefront covers browsing categories, products, and flash deals; the supplier side adds a full management dashboard for listing products, organising categories, and running time-limited flash promotions. End-to-end mobile commerce tuned for the local market.",
      stats: ["Customer & supplier", "Time-limited deals", "Catalog dashboard"],
    },
    Zodaya: {
      typeLabel: "Web · E-commerce store",
      tag: "Online store · Storefront build",
      description: "An e-commerce storefront build — product catalog, category browsing, and checkout wrapped in a clean, conversion-focused storefront. (Description inferred from the cover screenshot — pending your copy.)",
      stats: ["Catalog & checkout", "Responsive storefront", "In production"],
    },
    CedarRoots: {
      typeLabel: "Web · E-commerce store",
      tag: "Online store · Storefront build",
      description: "An online store for CedarRoots — browsable product catalog, category pages, and a streamlined purchase flow. (Description inferred from the cover screenshot — pending your copy.)",
      stats: ["Catalog & checkout", "Responsive storefront", "In production"],
    },
    BestForLB: {
      typeLabel: "Web · E-commerce store",
      tag: "Online store · Storefront build",
      description: "A Lebanon-focused e-commerce platform — multi-category storefront with product listings, search, and checkout built for the local market. (Description inferred from the cover screenshot — pending your copy.)",
      stats: ["Catalog & checkout", "Lebanon market", "In production"],
    },
    "Ole Nutrients": {
      typeLabel: "Web · E-commerce store",
      tag: "Online store · Storefront build",
      description: "An e-commerce store for Ole Nutrients — a supplements and nutrition storefront with product catalog, detail pages, and checkout. (Description inferred from the cover screenshot — pending your copy.)",
      stats: ["Catalog & checkout", "Responsive storefront", "In production"],
    },
  },
} as const;

/**
 * Widen the `as const` literal types into a structural shape: every string
 * literal becomes `string`, every readonly tuple becomes a mutable array of its
 * widened element type. This lets `ar.ts` (different string values, same shape)
 * satisfy the type while still catching missing/extra keys.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dict = Widen<typeof en>;
