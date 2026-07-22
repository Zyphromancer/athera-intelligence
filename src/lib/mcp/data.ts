export type PublicProject = {
  title: string;
  category: string;
  badge?: string;
  pitch: string;
  outcomes: string[];
  tags: string[];
  caseStudySlug?: string;
};

export const publicProjects: PublicProject[] = [
  {
    title: "TrenFotball",
    category: "Client work · Sports platform",
    badge: "Client work",
    pitch:
      "A video-driven training platform for a Norwegian football coaching business. Custom video pipeline, structured session library, and a CMS the client manages themselves.",
    outcomes: [
      "Next.js and TypeScript throughout",
      "Vimeo-backed video delivery",
      "Client-managed content, no developer dependency",
    ],
    tags: ["Next.js", "TypeScript", "Vimeo API", "Tailwind"],
    caseStudySlug: "trenfotball",
  },
  {
    title: "Sentinel AI",
    category: "Studio project · In development",
    badge: "In development",
    pitch:
      "Real-time forensic engine that scores images, video frames and text for AI-generated content.",
    outcomes: [
      "96% precision on the internal benchmark",
      "Sub-300 ms inference per asset",
      "In active development",
    ],
    tags: ["Python", "PyTorch", "FastAPI", "Chrome Extension"],
  },
  {
    title: "Meridian",
    category: "Concept build · Financial services",
    badge: "Concept",
    pitch:
      "A refined marketing platform concept for a private wealth firm — editorial, fast, and CMS-driven.",
    outcomes: [
      "0.6 s median LCP on 4G",
      "+38% qualified leads in Q1",
      "9-language localisation",
    ],
    tags: ["Next.js", "TypeScript", "Headless CMS", "Edge"],
  },
  {
    title: "Orbit",
    category: "Mobile app development",
    pitch:
      "Cross-platform fitness app with workout tracking, wearable sync and offline-first data.",
    outcomes: [
      "Shipped iOS + Android in 14 weeks",
      "4.9★ average across 2,400 reviews",
      "Apple Watch and HealthKit integration",
    ],
    tags: ["React Native", "Expo", "Swift", "HealthKit"],
  },
  {
    title: "Lumen",
    category: "AI development",
    pitch:
      "A private RAG assistant for an in-house legal team — grounded answers with citations, on their own corpus.",
    outcomes: [
      "40k+ documents ingested and indexed",
      "Sub-2 s answers with source citations",
      "SOC 2-aligned, deployed in VPC",
    ],
    tags: ["LLMs", "Vector DB", "RAG", "Streaming"],
  },
];

export type PublicTransformation = {
  title: string;
  caption: string;
  category: string;
};

export const publicTransformations: PublicTransformation[] = [
  { title: "Financial services — homepage concept", caption: "A dated 2012 template reimagined as a refined editorial identity.", category: "Web · Financial services" },
  { title: "SaaS — analytics dashboard", caption: "Cluttered light-mode admin panel rebuilt into a focused dark dashboard.", category: "SaaS · Analytics" },
  { title: "ML engineering — from notebook to platform", caption: "A tangle of Jupyter cells and matplotlib plots replaced with a monitored model-performance surface.", category: "ML engineering" },
  { title: "AI chat — bot to enterprise assistant", caption: "A generic 2020 chat widget rebuilt as a citation-aware assistant with real thread history.", category: "AI · Chat & assistants" },
  { title: "Healthcare — patient portal", caption: "A dense hospital-table portal reframed around a single patient's morning.", category: "Healthcare · Web app" },
  { title: "E-commerce — product page", caption: "A discount-heavy 2015 layout replaced with an editorial product page.", category: "E-commerce · Web" },
  { title: "Consumer — fitness app", caption: "A chaotic stats grid pared back to one number that matters.", category: "Mobile · Consumer" },
  { title: "Data annotation — labeling tool", caption: "A spreadsheet-style labeler replaced with a keyboard-first ML annotation surface.", category: "ML · Tooling" },
  { title: "AI ops — logs to insight", caption: "Raw server logs turned into a live model-operations overview.", category: "AI ops · Observability" },
];

export const companyInfo = {
  name: "Athera Intelligence",
  tagline: "Coding, web, mobile, and AI development — direct with the engineer.",
  services: [
    "Web development",
    "Mobile app development",
    "AI development (RAG, agents, custom models)",
    "ML engineering & tooling",
    "Design & product engineering",
  ],
  locations: ["London, UK", "Trondheim, Norway"],
  contactEmail: "contact@athera-intelligence.com",
  website: "https://www.athera-intelligence.com",
  engagementModel:
    "Fixed price agreed upfront. Direct communication with the engineer building the product. Full source and documented handover — no lock-in.",
  midRangePrice: "€18,000 – €26,000 for a 6-week lean engagement",
};