export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  imageAlt: string;
  imageSrc: string | null;
  gradientFrom: string;
  gradientTo: string;
  link: string | null;
  imagePosition: "left" | "right";
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  aspectRatio?: string;
};

export const projects: Project[] = [
  {
    id: "scriptor",
    title: "Scriptor",
    tagline: "A writing companion for long-form fiction authors using AI.",
    description:
      "Built to solve the specific frustration of losing narrative thread across long manuscripts. AI-assisted continuity checking, character tracking, and prose suggestions that stay in the author's voice.",
    stack: ["React", "Next.js", "TypeScript", "OpenAI"],
    imageAlt: "Scriptor consistency checker interface",
    imageSrc: "/images/scriptor.png",
    gradientFrom: "#0d0d1a",
    gradientTo: "#1a1a3e",
    link: "https://scriptor-g157.vercel.app/",
    imagePosition: "left",
    objectFit: "contain",
    objectPosition: "center",
  },
  {
    id: "ikhokha",
    title: "iKhokha",
    tagline: "Senior frontend work on a South African fintech platform.",
    description:
      "Led the migration of the checkout backbone from Shopify to an internal system powered by Swell, reducing average time-to-conversion from 19.1 minutes to ~4.3 minutes — a 75% improvement. Built a dynamic popup management system and debugging tooling that significantly reduced troubleshooting time across the decision pipeline.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Swell",
      "Framer Motion",
      "Storybook",
    ],
    imageAlt: "iKhokha fintech platform",
    imageSrc: "/images/ikhokha.png",
    gradientFrom: "#001a33",
    gradientTo: "#003366",
    link: "https://ikhokha.com/",
    imagePosition: "right",
    objectFit: "contain",
    objectPosition: "center",
  },
  {
    id: "wemow",
    title: "Wemow",
    tagline: "Lawn care services, simplified.",
    description:
      "Part of the team that built the Wemow platform at Syncline — a consumer app making it easy to schedule and manage recurring lawn care services. Built interactive dashboards, optimized backend services, and contributed to the full-stack delivery serving 1,000+ daily users.",
    stack: ["Vue.js", "Node.js", "MongoDB", "AWS"],
    imageAlt: "Wemow mobile app showing appointments",
    imageSrc: "/images/wemow.png",
    gradientFrom: "#0a1f0a",
    gradientTo: "#1a3a1a",
    link: "http://wemow.com/",
    imagePosition: "left",
    objectPosition: "center",
    aspectRatio: "3/4",
  },
  {
    id: "atlas",
    title: "Atlas General Agency",
    tagline: "Full site revamp, agent dashboard, and custom insurance tooling.",
    description:
      "One of the key engineers on a full revamp of the Atlas General Agency platform at Moblers. Built a new agent dashboard from scratch, custom insurance quote flows, and bespoke tooling across the full stack. Complex domain, high-stakes UX.",
    stack: [
      "Vue.js",
      "Node.js",
      "php",
      "PostgreSQL",
      "AWS",
      "Typescript",
      "Tailwind",
    ],
    imageAlt: "Atlas General Agency website",
    imageSrc: "/images/atlas.png",
    gradientFrom: "#0a0f1a",
    gradientTo: "#0f1f3a",
    link: "https://www.atlasgeneral.com/",
    imagePosition: "right",
    objectPosition: "top",
  },
];
