export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  imageAlt: string;
  imageSrc: string;
  /** Intrinsic size of the screenshot, so the layout is reserved before it loads. */
  imageWidth: number;
  imageHeight: number;
  /** Brand-tinted plate the screenshot sits on. */
  gradientFrom: string;
  gradientTo: string;
  link: string | null;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "ikhokha",
    title: "iKhokha",
    tagline: "Senior frontend work on a South African fintech platform.",
    description:
      "Led the migration of the checkout backbone from Shopify to an internal system powered by Swell, cutting average time-to-conversion from 19.1 minutes to about 4.3 minutes, a 75% improvement. Built a dynamic popup management system and debugging tooling that significantly reduced troubleshooting time across the decision pipeline.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Swell",
      "Framer Motion",
      "Storybook",
    ],
    imageAlt: "iKhokha website homepage with the headline “You're made to make it”",
    imageSrc: "/images/ikhokha.png",
    imageWidth: 1891,
    imageHeight: 959,
    gradientFrom: "#001a33",
    gradientTo: "#003366",
    link: "https://ikhokha.com/",
    featured: true,
  },
  {
    id: "wevibe",
    title: "WeVibe",
    tagline: "Anonymous local community. iOS app, live on the App Store.",
    description:
      "Built and shipped a full iOS app solo. It connects people with posts and conversations in their local area, completely anonymously: no accounts, no profiles, no personal data. Location-based feed, real-time updates, channels and polls. Designed, built and published under my own developer account.",
    stack: ["React Native", "Node.js", "MongoDB", "Railway"],
    imageAlt: "WeVibe App Store listing with four iOS app screenshots",
    imageSrc: "/images/wevibe.png",
    imageWidth: 2362,
    imageHeight: 1560,
    gradientFrom: "#1a0a2e",
    gradientTo: "#3b1fa8",
    link: "https://apps.apple.com/us/app/wevibe/id6756529528",
    featured: true,
  },
  {
    id: "pagebreak",
    title: "Pagebreak",
    tagline: "An autonomous AI news site that finds trends and writes daily.",
    description:
      "A fully autonomous newsroom with no human in the loop. It scans for emerging trends across topics, writes articles daily and publishes on its own. Built end to end: agent orchestration, content pipeline, publishing and the reader-facing site.",
    stack: ["Next.js", "TypeScript", "Anthropic", "Node.js", "PostgreSQL"],
    imageAlt: "Pagebreak front page with a lead story and a column of headlines",
    imageSrc: "/images/pagebreak.png",
    imageWidth: 3024,
    imageHeight: 1678,
    gradientFrom: "#0a0a0a",
    gradientTo: "#262626",
    link: "https://www.pagebreak.co/",
    featured: true,
  },
  {
    id: "scriptor",
    title: "Scriptor",
    tagline: "A writing companion for long-form fiction authors using AI.",
    description:
      "Built to solve a specific frustration: losing the narrative thread across a long manuscript. AI-assisted continuity checking, character tracking and prose suggestions that stay in the author's voice.",
    stack: ["React", "Next.js", "TypeScript", "Anthropic"],
    imageAlt: "Scriptor consistency checker listing continuity issues in a manuscript",
    imageSrc: "/images/scriptor.png",
    imageWidth: 1919,
    imageHeight: 956,
    gradientFrom: "#0d0d1a",
    gradientTo: "#1a1a3e",
    link: "https://scriptor-g157.vercel.app/",
    featured: true,
  },
  {
    id: "duel-of-names",
    title: "Duel of Names",
    tagline: "An audible AI game built in 24 hours for a hackathon.",
    description:
      "Two beings face each other, each declaring what they become, until one reaches a name the other cannot answer. Three Claude Sonnet calls per turn (opponent, judge, fading coach), streaming TTS via ElevenLabs, five voices and three difficulty modes. The judge produces real literary narrations; the duel must climb to earn its endings.",
    stack: ["React", "TypeScript", "Anthropic", "ElevenLabs", "Replit"],
    imageAlt: "Duel of Names game screen with the duel transcript",
    imageSrc: "/images/duel-of-names.png",
    imageWidth: 2128,
    imageHeight: 1680,
    gradientFrom: "#1a0a0a",
    gradientTo: "#3a1a1a",
    link: "https://duel-of-names.replit.app/",
    featured: true,
  },
  {
    id: "atlas",
    title: "Atlas General Agency",
    tagline: "Full site revamp, agent dashboard and custom insurance tooling.",
    description:
      "One of the key engineers on a full revamp of the Atlas General Agency platform at Moblers. Built a new agent dashboard from scratch, custom insurance quote flows and bespoke tooling across the full stack. Complex domain, high-stakes UX.",
    stack: [
      "Vue.js",
      "Node.js",
      "PHP",
      "PostgreSQL",
      "AWS",
      "TypeScript",
      "Tailwind",
    ],
    imageAlt: "Atlas General Agency website homepage",
    imageSrc: "/images/atlas.png",
    imageWidth: 1850,
    imageHeight: 952,
    gradientFrom: "#0a0f1a",
    gradientTo: "#0f1f3a",
    link: "https://www.atlasgeneral.com/",
  },
  {
    id: "wemow",
    title: "Wemow",
    tagline: "Lawn care services, simplified.",
    description:
      "Part of the team that built the Wemow platform at Syncline, a consumer app that makes it easy to schedule and manage recurring lawn care. Built interactive dashboards, optimized backend services and contributed to full-stack delivery for 1,000+ daily users.",
    stack: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    imageAlt: "Wemow mobile app showing upcoming appointments",
    imageSrc: "/images/wemow.png",
    imageWidth: 482,
    imageHeight: 823,
    gradientFrom: "#0a1f0a",
    gradientTo: "#1a3a1a",
    link: "http://wemow.com/",
  },
  {
    id: "zoning-watchdog",
    title: "Zoning Watchdog",
    tagline: "Kente HQ. Planning-agenda alerts for 10 US cities.",
    description:
      "Reads city planning, zoning and council agendas through official public APIs, extracts rezonings and variances with an LLM under a daily token budget, and emails subscribers a daily digest of what changed near the addresses they watch.",
    stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Claude API"],
    imageAlt: "Zoning Watchdog launch poster",
    imageSrc: "/images/zoning-watchdog.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    gradientFrom: "#0b1f17",
    gradientTo: "#14532d",
    link: "https://zoning.kentehq.com",
  },
  {
    id: "deal-gatekeeper",
    title: "Deal Gatekeeper",
    tagline: "Kente HQ. Escrow for creator–sponsor deals.",
    description:
      "Sponsors fund a deal up front, creators upload work to a watermarked preview, and payment releases only on approval. Payments and payouts run through Paystack, with private uploads on Cloudflare R2.",
    stack: ["Next.js", "TypeScript", "Prisma", "Paystack", "Cloudflare R2"],
    imageAlt: "Deal Gatekeeper launch poster",
    imageSrc: "/images/deal-gatekeeper.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    gradientFrom: "#1c1206",
    gradientTo: "#7c4a03",
    link: "https://creator.kentehq.com",
  },
  {
    id: "invoice-collector",
    title: "Invoice Collector",
    tagline: "Kente HQ. Invoices sent and paid over WhatsApp.",
    description:
      "A business owner texts one line, like 'Invoice GHS 50 for Ama', and the customer gets a WhatsApp invoice with a payment link, automatic reminders and a receipt. Built on the WhatsApp Cloud API and Paystack.",
    stack: ["Next.js", "TypeScript", "WhatsApp Cloud API", "Paystack", "PostgreSQL"],
    imageAlt: "Invoice Collector launch poster",
    imageSrc: "/images/invoice-collector.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    gradientFrom: "#04201a",
    gradientTo: "#0f766e",
    link: "https://invoices.kentehq.com",
  },
  {
    id: "gift-ledger",
    title: "Gift Ledger",
    tagline: "Kente HQ. PR gifting tracker for Shopify brands. Coming soon.",
    description:
      "Turns tagged Shopify orders into a ledger of creator gifts, tracks each parcel to delivery, and checks whether the creator posted about it.",
    stack: ["FastAPI", "React", "Shopify API", "PostgreSQL"],
    imageAlt: "Gift Ledger launch poster",
    imageSrc: "/images/gift-ledger.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    gradientFrom: "#1f0b16",
    gradientTo: "#9d174d",
    link: null,
  },
  {
    id: "dental-noshow",
    title: "Dental No-Show Recovery",
    tagline: "Kente HQ. Fills cancelled dental slots. Coming soon.",
    description:
      "Texts the waitlist the moment an appointment is cancelled and books the first patient who replies, so empty chairs get filled instead of lost.",
    stack: ["Next.js", "TypeScript", "Prisma", "Twilio"],
    imageAlt: "Dental No-Show Recovery launch poster",
    imageSrc: "/images/dental-noshow.jpg",
    imageWidth: 1920,
    imageHeight: 1080,
    gradientFrom: "#071a2b",
    gradientTo: "#1d4ed8",
    link: null,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
