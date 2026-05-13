export interface Project {
  id: string;
  title: string;
  editedAt: string;
  thumbnail: string;
  imageBg?: string;
  imageFit?: "top" | "center";
}

export const projects: Project[] = [
  {
    id: "zoromi-landing",
    title: "Zoromi Landingpage",
    editedAt: "May 12, 2026",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "zoromi",
    title: "Zoromi",
    editedAt: "May 8, 2026",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "bydh",
    title: "BYDH",
    editedAt: "May 6, 2026",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
  },
  {
    id: "ondo-pos",
    title: "Ondo POS",
    editedAt: "May 4, 2026",
    thumbnail: "/projects/ondo-pos.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "atlas-finance",
    title: "Atlas Finance Dashboard",
    editedAt: "May 2, 2026",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "noted-app",
    title: "Noted — Productivity",
    editedAt: "Apr 28, 2026",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "vela-ecom",
    title: "Vela eCommerce",
    editedAt: "Apr 24, 2026",
    thumbnail: "/projects/ondo-pos.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "kosmo-banking",
    title: "Kosmo Banking",
    editedAt: "Apr 20, 2026",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
  },
  {
    id: "stride-fitness",
    title: "Stride Fitness App",
    editedAt: "Apr 16, 2026",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
  },
  {
    id: "haven-realty",
    title: "Haven Realty",
    editedAt: "Apr 12, 2026",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "lumo-design",
    title: "Lumo Design Studio",
    editedAt: "Apr 9, 2026",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
  {
    id: "pulse-crm",
    title: "Pulse CRM",
    editedAt: "Apr 5, 2026",
    thumbnail: "/projects/ondo-pos.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
  },
];

export interface Template {
  id: string;
  title: string;
  category: "Dashboard" | "Landing" | "Mobile App" | "E-commerce" | "Marketing";
  tier: "Free" | "Pro";
  thumbnail: string;
  imageBg?: string;
  imageFit?: "top" | "center";
  uses: number;
}

export interface PublicDesign {
  id: string;
  title: string;
  prompt: string;
  author: string;
  authorTone: "blue" | "violet" | "amber" | "emerald" | "rose";
  category: "Dashboard" | "Landing" | "Mobile App" | "E-commerce" | "Marketing";
  thumbnail: string;
  imageBg: string;
  imageFit: "top" | "center";
  likes: number;
  remixes: number;
  daysAgo: number;
}

export const publicDesigns: PublicDesign[] = [
  {
    id: "pub-1",
    title: "Zoromi Landingpage",
    prompt: "SaaS landing for AI content tool with hero, features, pricing",
    author: "Jimmy Sullivan",
    authorTone: "blue",
    category: "Landing",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 1240,
    remixes: 89,
    daysAgo: 2,
  },
  {
    id: "pub-2",
    title: "BYDH Travel App",
    prompt: "Mobile flight booking app, Sydney to NYC route",
    author: "Lena Park",
    authorTone: "violet",
    category: "Mobile App",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
    likes: 2103,
    remixes: 156,
    daysAgo: 4,
  },
  {
    id: "pub-3",
    title: "Analytics Dashboard",
    prompt: "Welcome dashboard with KPI cards and trend charts",
    author: "Marc Olsen",
    authorTone: "amber",
    category: "Dashboard",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 980,
    remixes: 42,
    daysAgo: 6,
  },
  {
    id: "pub-4",
    title: "Ondo POS Landing",
    prompt: "Point-of-sale landing page with hero and product highlights",
    author: "Sara Chen",
    authorTone: "emerald",
    category: "Landing",
    thumbnail: "/projects/ondo-pos.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 612,
    remixes: 28,
    daysAgo: 8,
  },
  {
    id: "pub-5",
    title: "Zoromi Marketing",
    prompt: "Long-form marketing site for SaaS analytics platform",
    author: "Adam Walsh",
    authorTone: "rose",
    category: "Marketing",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 540,
    remixes: 19,
    daysAgo: 10,
  },
  {
    id: "pub-6",
    title: "Flight Booking Mobile",
    prompt: "Three-screen mobile flow for booking flights",
    author: "Noor Khalid",
    authorTone: "violet",
    category: "Mobile App",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
    likes: 432,
    remixes: 17,
    daysAgo: 12,
  },
  {
    id: "pub-7",
    title: "KPI Overview",
    prompt: "Clean dashboard with charts and recent activity feed",
    author: "Tomás Rivera",
    authorTone: "blue",
    category: "Dashboard",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 389,
    remixes: 14,
    daysAgo: 14,
  },
  {
    id: "pub-8",
    title: "POS Storefront",
    prompt: "E-commerce landing for hardware POS product",
    author: "Mira Hoshino",
    authorTone: "amber",
    category: "E-commerce",
    thumbnail: "/projects/ondo-pos.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    likes: 276,
    remixes: 9,
    daysAgo: 16,
  },
];

export interface GeneratedDesign {
  id: string;
  title: string;
  prompt: string;
  projectId: string;
  projectName: string;
  thumbnail: string;
  imageBg: string;
  imageFit: "top" | "center";
  generatedAt: string; // human-friendly
  group: "today" | "yesterday" | "this-week" | "older";
  device: "desktop" | "mobile" | "tablet";
}

export const generatedDesigns: GeneratedDesign[] = [
  { id: "g-1", title: "Hero — bold variant", prompt: "Make the hero more bold — add a product screenshot on the right", projectId: "zoromi-landing", projectName: "Zoromi Landingpage", thumbnail: "/projects/zoromi-landing.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "3 min ago", group: "today", device: "desktop" },
  { id: "g-2", title: "Hero — V1", prompt: "Make a SaaS landing page for Zoromi analytics dashboard", projectId: "zoromi-landing", projectName: "Zoromi Landingpage", thumbnail: "/projects/zoromi-landing.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "12 min ago", group: "today", device: "desktop" },
  { id: "g-3", title: "Welcome dashboard", prompt: "Dashboard with welcome banner and 4 stat cards", projectId: "zoromi", projectName: "Zoromi", thumbnail: "/projects/zoromi.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "1 hour ago", group: "today", device: "desktop" },
  { id: "g-4", title: "BYDH — onboarding", prompt: "3 mobile screens for flight booking onboarding", projectId: "bydh", projectName: "BYDH", thumbnail: "/projects/bydh.png", imageBg: "#EFEEF1", imageFit: "center", generatedAt: "Yesterday, 16:42", group: "yesterday", device: "mobile" },
  { id: "g-5", title: "Ondo POS — hero", prompt: "Landing hero with product screenshot floating", projectId: "ondo-pos", projectName: "Ondo POS", thumbnail: "/projects/ondo-pos.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "Yesterday, 11:20", group: "yesterday", device: "desktop" },
  { id: "g-6", title: "Pricing table", prompt: "3-tier pricing with annual toggle", projectId: "zoromi-landing", projectName: "Zoromi Landingpage", thumbnail: "/projects/zoromi-landing.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "3 days ago", group: "this-week", device: "desktop" },
  { id: "g-7", title: "FAQ section", prompt: "Accordion FAQ with brand-aware styling", projectId: "zoromi-landing", projectName: "Zoromi Landingpage", thumbnail: "/projects/zoromi-landing.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "4 days ago", group: "this-week", device: "desktop" },
  { id: "g-8", title: "Activity feed", prompt: "Sidebar activity widget on dashboard", projectId: "zoromi", projectName: "Zoromi", thumbnail: "/projects/zoromi.png", imageBg: "#F9F9F9", imageFit: "top", generatedAt: "1 week ago", group: "older", device: "desktop" },
  { id: "g-9", title: "Boarding pass screen", prompt: "Mobile boarding pass with barcode and flight info", projectId: "bydh", projectName: "BYDH", thumbnail: "/projects/bydh.png", imageBg: "#EFEEF1", imageFit: "center", generatedAt: "2 weeks ago", group: "older", device: "mobile" },
];

export interface CommunityPost {
  id: string;
  title: string;
  thumbnail: string;
  imageBg: string;
  imageFit: "top" | "center";
  author: string;
  authorTone: "blue" | "violet" | "amber" | "emerald" | "rose";
  authorRole: string;
  caption: string;
  likes: number;
  comments: number;
  remixes: number;
  postedAt: string;
}

export const communityPosts: CommunityPost[] = [
  {
    id: "c-1",
    title: "Zoromi Landingpage",
    thumbnail: "/projects/zoromi-landing.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    author: "Jimmy Sullivan",
    authorTone: "blue",
    authorRole: "Product Designer · Acme",
    caption: "Iterated this hero with bold variant + floating chart cards. Loving the brand-aware AI — saved me ~3 hours.",
    likes: 1240,
    comments: 38,
    remixes: 89,
    postedAt: "2 days ago",
  },
  {
    id: "c-2",
    title: "BYDH Travel App",
    thumbnail: "/projects/bydh.png",
    imageBg: "#EFEEF1",
    imageFit: "center",
    author: "Lena Park",
    authorTone: "violet",
    authorRole: "Mobile Designer · Wayfind",
    caption: "Three-screen booking flow generated from a 1-line prompt. The mobile preview is *chef's kiss*.",
    likes: 2103,
    comments: 86,
    remixes: 156,
    postedAt: "4 days ago",
  },
  {
    id: "c-3",
    title: "Analytics Dashboard",
    thumbnail: "/projects/zoromi.png",
    imageBg: "#F9F9F9",
    imageFit: "top",
    author: "Marc Olsen",
    authorTone: "amber",
    authorRole: "Founder · Quanta",
    caption: "Used the dashboard generator for an internal KPI tool. Shipped to prod the next day.",
    likes: 980,
    comments: 24,
    remixes: 42,
    postedAt: "1 week ago",
  },
];

export const communityFeatured = [
  { id: "f-1", name: "Lena Park", role: "Mobile Designer", tone: "violet" as const, designs: 142, followers: "12k" },
  { id: "f-2", name: "Marc Olsen", role: "Founder", tone: "amber" as const, designs: 87, followers: "8.4k" },
  { id: "f-3", name: "Sara Chen", role: "PM @ Stripe", tone: "emerald" as const, designs: 64, followers: "5.2k" },
  { id: "f-4", name: "Tomás Rivera", role: "Indie hacker", tone: "blue" as const, designs: 53, followers: "3.1k" },
];

export const templates: Template[] = [
  { id: "tpl-saas-dash", title: "SaaS Analytics Dashboard", category: "Dashboard", tier: "Free", thumbnail: "/projects/zoromi.png", uses: 12480 },
  { id: "tpl-startup-landing", title: "Startup Landing", category: "Landing", tier: "Free", thumbnail: "/projects/zoromi-landing.png", uses: 8920 },
  { id: "tpl-banking-mobile", title: "Banking Mobile", category: "Mobile App", tier: "Pro", thumbnail: "/projects/bydh.png", imageBg: "#EFEEF1", imageFit: "center", uses: 7340 },
  { id: "tpl-ecom-store", title: "Modern eCom Store", category: "E-commerce", tier: "Pro", thumbnail: "/projects/ondo-pos.png", uses: 6210 },
  { id: "tpl-fintech-dash", title: "Fintech Portfolio", category: "Dashboard", tier: "Pro", thumbnail: "/projects/zoromi.png", uses: 5990 },
  { id: "tpl-agency-marketing", title: "Agency Marketing Site", category: "Marketing", tier: "Free", thumbnail: "/projects/zoromi-landing.png", uses: 5420 },
  { id: "tpl-fitness-mobile", title: "Fitness Tracker", category: "Mobile App", tier: "Free", thumbnail: "/projects/bydh.png", imageBg: "#EFEEF1", imageFit: "center", uses: 4810 },
  { id: "tpl-realestate", title: "Real Estate Marketplace", category: "Landing", tier: "Pro", thumbnail: "/projects/ondo-pos.png", uses: 4380 },
  { id: "tpl-crm-suite", title: "Sales CRM Suite", category: "Dashboard", tier: "Pro", thumbnail: "/projects/zoromi.png", uses: 3970 },
];
