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
];

export const featuredProjects = projects.filter((p) => p.featured);
