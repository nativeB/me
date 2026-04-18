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
};

export const projects: Project[] = [
  {
    id: "scriptor",
    title: "Scriptor",
    tagline: "A writing companion for long-form fiction authors using AI.",
    description:
      "Built to solve the specific frustration of losing narrative thread across long manuscripts. AI-assisted continuity checking, character tracking, and prose suggestions that stay in the author's voice.",
    stack: ["React", "Next.js", "TypeScript", "OpenAI"],
    imageAlt: "Scriptor app interface",
    imageSrc: null,
    gradientFrom: "#0d0d1a",
    gradientTo: "#1a1a3e",
    link: null,
    imagePosition: "left",
  },
  {
    id: "ikhokha",
    title: "iKhokha",
    tagline: "Senior frontend work on a South African fintech platform.",
    description:
      "Led frontend architecture for merchant-facing dashboards and payment flows. Focused on performance on low-bandwidth connections and accessibility across device categories.",
    stack: ["React", "TypeScript", "Vue"],
    imageAlt: "iKhokha dashboard interface",
    imageSrc: null,
    gradientFrom: "#001a33",
    gradientTo: "#003366",
    link: null,
    imagePosition: "right",
  },
  {
    id: "aidahbot",
    title: "Aidahbot",
    tagline: "Conversational AI platform. Real-time messaging at scale.",
    description:
      "Built backend services, real-time messaging infrastructure, and database architecture for aidah.chat. Designed for high message throughput with multi-model AI routing.",
    stack: ["Node", "PostgreSQL", "MongoDB", "AWS"],
    imageAlt: "Aidahbot conversation interface",
    imageSrc: null,
    gradientFrom: "#111111",
    gradientTo: "#1f1f1f",
    link: "https://aidah.chat",
    imagePosition: "left",
  },
];
