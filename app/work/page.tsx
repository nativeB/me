import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import CompactCaseStudyCard from "@/components/work/CompactCaseStudyCard";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Work — Quincy Hutchison",
  description:
    "Selected projects from 7+ years building fintech, consumer, and AI products.",
};

export default function WorkPage() {
  return (
    <main>
      <header className="px-6 lg:px-24 pt-24 pb-12 max-w-6xl mx-auto">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#666] hover:text-[#ededed] transition-colors duration-200"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          Back
        </Link>

        <h1
          className="mt-12 font-semibold tracking-tight leading-none"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          All work.
        </h1>
        <p className="mt-6 text-lg text-[#888] max-w-xl">
          Everything I&apos;ve shipped, from the headline projects to the
          quieter ones. Some old, some new, all mine.
        </p>
      </header>

      <section>
        {projects.map((project) => (
          <CompactCaseStudyCard key={project.id} project={project} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
