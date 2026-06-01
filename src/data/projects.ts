import type { Project } from "@/types/card";

/**
 * The four projects carried over from the original made-by-abdullah build.
 * Descriptions / stack are verbatim; type-labels, tags, stats and per-shot
 * captions are added to fill out the Portfolio's richer project layout.
 */
export const PROJECTS: Project[] = [
  {
    title: "Samar",
    typeLabel: "Mobile · Multiplayer trivia game",
    tag: "Flutter app · Yii2 backend",
    description:
      "Samar — the ultimate group trivia game. A multiplayer party game built with Flutter and a Yii2 backend. Two teams compete across 36-question rounds with strategic power-ups — block, double points, and optional help. Free to play with in-app purchases for extended gameplay, backed by smooth performance, responsive design, and secure backend integration.",
    stack: ["Yii2", "Flutter", "MySQL", "SQLite", "Redis"],
    stats: [
      { n: "36", l: "Questions per round" },
      { n: "2", l: "Teams head-to-head" },
      { n: "IAP", l: "Free with purchases" },
    ],
    projectType: "mobile",
    orientation: "landscape",
    projectUrl: "https://samar.com",
    urlLabel: "samar.com",
    shots: [
      { src: "/assets/projects/samar/home.png", label: "HOME", sub: "Lobby" },
      { src: "/assets/projects/samar/game.png", label: "GAME", sub: "Live round" },
      { src: "/assets/projects/samar/questions.png", label: "QUESTIONS", sub: "Trivia deck" },
      { src: "/assets/projects/samar/winner.png", label: "WINNER", sub: "Results" },
      { src: "/assets/projects/samar/shop.png", label: "SHOP", sub: "Power-ups" },
      { src: "/assets/projects/samar/profile.png", label: "PROFILE", sub: "Player" },
      { src: "/assets/projects/samar/login.png", label: "LOGIN", sub: "Auth" },
    ],
  },
  {
    title: "Saxon POS",
    typeLabel: "Web · Point of sale & inventory",
    tag: "Full ownership · End to end",
    description:
      "A point-of-sale system for Saxon, built end to end — database architecture, stock management, CRUD for customers, employee management, transactions and sales, barcode integration, receipt printing, and reporting including daily cashier and sales reports.",
    stack: ["Yii2", "MySQL", "Redis"],
    stats: [
      { n: "POS", l: "Stock & barcode" },
      { n: "CRM", l: "Customers & staff" },
      { n: "Reports", l: "Daily cashier & sales" },
    ],
    projectType: "web",
    urlLabel: "saxon · pos dashboard",
    shots: [
      { src: "/assets/projects/saxon/home.png", label: "DASHBOARD", sub: "Overview" },
      { src: "/assets/projects/saxon/transactions.png", label: "TRANSACTIONS", sub: "Sales" },
      { src: "/assets/projects/saxon/products.png", label: "PRODUCTS", sub: "Inventory" },
      { src: "/assets/projects/saxon/barcodes.png", label: "BARCODES", sub: "Labels" },
    ],
  },
  {
    title: "Keep Property",
    typeLabel: "Mobile · UK real-estate platform",
    tag: "Hybrid app · Yii2 + Vue",
    description:
      "A custom mobile app for Keep Property, a UK-based real-estate platform. Users search, view, and favourite property listings with rich media and location-based filters. Features user authentication, real-time listing updates, and seamless integration with the existing website — a smooth experience for buyers, renters, and investors.",
    stack: ["Yii2", "Vue.js", "MySQL", "Cordova", "Framework7"],
    stats: [
      { n: "Search", l: "Listings & filters" },
      { n: "Auth", l: "Accounts & favourites" },
      { n: "Live", l: "Real-time updates" },
    ],
    projectType: "mobile",
    orientation: "portrait",
    shots: [
      { src: "/assets/projects/keep-property/home.jpg", label: "HOME", sub: "Discover" },
      { src: "/assets/projects/keep-property/properties.jpg", label: "PROPERTIES", sub: "Listings" },
      { src: "/assets/projects/keep-property/real_estate.jpg", label: "REAL ESTATE", sub: "Detail" },
      { src: "/assets/projects/keep-property/dues.jpg", label: "DUES", sub: "Payments" },
      { src: "/assets/projects/keep-property/login.jpg", label: "LOGIN", sub: "Auth" },
    ],
  },
  {
    title: "Pepsi Lebanon",
    typeLabel: "Mobile · E-commerce platform",
    tag: "Hybrid app · Yii2 + Cordova",
    description:
      "A custom mobile e-commerce platform for Pepsi Lebanon. Users browse products, place orders, and track deliveries seamlessly. The app supports account management, promotions, and real-time inventory updates — a smooth, user-friendly shopping experience tailored for the local market.",
    stack: ["Yii2", "MySQL", "Cordova", "Framework7"],
    stats: [
      { n: "Orders", l: "Browse & checkout" },
      { n: "Promos", l: "Account & offers" },
      { n: "Track", l: "Delivery tracking" },
    ],
    projectType: "mobile",
    orientation: "portrait",
    shots: [
      { src: "/assets/projects/pepsi/home.png", label: "HOME", sub: "Storefront" },
      { src: "/assets/projects/pepsi/categories.png", label: "CATEGORIES", sub: "Browse" },
      { src: "/assets/projects/pepsi/subcategories.png", label: "SUBCATEGORIES", sub: "Filter" },
      { src: "/assets/projects/pepsi/shop.png", label: "SHOP", sub: "Cart" },
      { src: "/assets/projects/pepsi/orders.png", label: "ORDERS", sub: "History" },
      { src: "/assets/projects/pepsi/profile.png", label: "PROFILE", sub: "Account" },
    ],
  },
  {
    title: "Tree Treat",
    typeLabel: "Mobile · Sustainability app",
    tag: "Hybrid app · Plant & track trees",
    description:
      "A tree-planting and sponsorship app — users discover trees to plant or sponsor, build a collection of their own trees, save favourites, and follow each tree over time. Built around a clean, friendly mobile experience with secure accounts.",
    stack: ["Yii2", "Vue.js", "Cordova", "Framework7"],
    stats: [
      { n: "Plant", l: "Sponsor & track trees" },
      { n: "My Trees", l: "Personal collection" },
      { n: "Auth", l: "Accounts & saved" },
    ],
    projectType: "mobile",
    orientation: "portrait",
    shots: [
      { src: "/assets/projects/tree-treat/home.webp", label: "HOME", sub: "Discover" },
      { src: "/assets/projects/tree-treat/my_trees.webp", label: "MY TREES", sub: "Collection" },
      { src: "/assets/projects/tree-treat/single.webp", label: "TREE", sub: "Detail" },
      { src: "/assets/projects/tree-treat/saved.webp", label: "SAVED", sub: "Favourites" },
      { src: "/assets/projects/tree-treat/login.webp", label: "LOGIN", sub: "Auth" },
    ],
  },
  {
    title: "Zakey",
    typeLabel: "Mobile · Multi-vendor marketplace",
    tag: "Hybrid app · Customer + supplier",
    description:
      "A two-sided multi-vendor e-commerce marketplace. The customer storefront covers browsing categories, products, and flash deals; the supplier side adds a full management dashboard for listing products, organising categories, and running time-limited flash promotions. End-to-end mobile commerce tuned for the local market.",
    stack: ["Yii2", "MySQL", "Cordova", "Framework7"],
    stats: [
      { n: "2-sided", l: "Customer & supplier" },
      { n: "Flash", l: "Time-limited deals" },
      { n: "Vendor", l: "Catalog dashboard" },
    ],
    projectType: "mobile",
    orientation: "portrait",
    shots: [
      { src: "/assets/projects/zakey/home.webp", label: "HOME", sub: "Storefront" },
      { src: "/assets/projects/zakey/categories.webp", label: "CATEGORIES", sub: "Browse" },
      { src: "/assets/projects/zakey/single.webp", label: "PRODUCT", sub: "Detail" },
      { src: "/assets/projects/zakey/supplier/add.webp", label: "SUPPLIER", sub: "Add product" },
      { src: "/assets/projects/zakey/supplier/categories.webp", label: "SUPPLIER", sub: "Categories" },
      { src: "/assets/projects/zakey/supplier/flash.webp", label: "SUPPLIER", sub: "Flash deals" },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
   * E-commerce website builds carried over from my-portfolio.
   * NOTE: my-portfolio serves project copy from a backend that was
   * not reachable, so the descriptions / stacks / live URLs below
   * are inferred from the cover screenshots — please review & adjust.
   * ────────────────────────────────────────────────────────────── */
  {
    title: "Zodaya",
    typeLabel: "Web · E-commerce store",
    tag: "Online store · Storefront build",
    description:
      "An e-commerce storefront build — product catalog, category browsing, and checkout wrapped in a clean, conversion-focused storefront. (Description inferred from the cover screenshot — pending your copy.)",
    stack: ["PHP", "MySQL", "JavaScript"],
    stats: [
      { n: "Store", l: "Catalog & checkout" },
      { n: "Web", l: "Responsive storefront" },
      { n: "Live", l: "In production" },
    ],
    projectType: "web",
    urlLabel: "zodaya · store",
    shots: [{ src: "/assets/projects/zodaya/cover.webp", label: "STOREFRONT", sub: "Home" }],
  },
  {
    title: "CedarRoots",
    typeLabel: "Web · E-commerce store",
    tag: "Online store · Storefront build",
    description:
      "An online store for CedarRoots — browsable product catalog, category pages, and a streamlined purchase flow. (Description inferred from the cover screenshot — pending your copy.)",
    stack: ["PHP", "MySQL", "JavaScript"],
    stats: [
      { n: "Store", l: "Catalog & checkout" },
      { n: "Web", l: "Responsive storefront" },
      { n: "Live", l: "In production" },
    ],
    projectType: "web",
    urlLabel: "cedarroots · store",
    shots: [{ src: "/assets/projects/cedarroots/cover.webp", label: "STOREFRONT", sub: "Home" }],
  },
  {
    title: "BestForLB",
    typeLabel: "Web · E-commerce store",
    tag: "Online store · Storefront build",
    description:
      "A Lebanon-focused e-commerce platform — multi-category storefront with product listings, search, and checkout built for the local market. (Description inferred from the cover screenshot — pending your copy.)",
    stack: ["PHP", "MySQL", "JavaScript"],
    stats: [
      { n: "Store", l: "Catalog & checkout" },
      { n: "Local", l: "Lebanon market" },
      { n: "Live", l: "In production" },
    ],
    projectType: "web",
    urlLabel: "bestforlb · store",
    shots: [{ src: "/assets/projects/bestforlb/cover.webp", label: "STOREFRONT", sub: "Home" }],
  },
  {
    title: "Ole Nutrients",
    typeLabel: "Web · E-commerce store",
    tag: "Online store · Storefront build",
    description:
      "An e-commerce store for Ole Nutrients — a supplements and nutrition storefront with product catalog, detail pages, and checkout. (Description inferred from the cover screenshot — pending your copy.)",
    stack: ["PHP", "MySQL", "JavaScript"],
    stats: [
      { n: "Store", l: "Catalog & checkout" },
      { n: "Web", l: "Responsive storefront" },
      { n: "Live", l: "In production" },
    ],
    projectType: "web",
    urlLabel: "ole-nutrients · store",
    shots: [{ src: "/assets/projects/ole-nutrients/cover.png", label: "STOREFRONT", sub: "Home" }],
  },
];
