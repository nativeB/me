import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/work/ProjectCard";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Work | Quincy Hutchison",
  description:
    "Selected projects from 7+ years building fintech, consumer, and AI products.",
};

export default function WorkPage() {
  const [lead, ...rest] = projects;

  return (
    <>
      <main id="main" className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="pb-16 pt-10 md:pb-24 md:pt-16">
          <Link
            href="/"
            className="nudge-on-hover nudge-back-on-hover -ml-1 inline-flex items-center gap-2 rounded-sm px-1 text-small text-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft size={16} aria-hidden className="nudge-target" />
            Back home
          </Link>

          <h1 className="mt-10 text-display font-semibold">
            <span className="hero-line">
              <span className="enter-line">All work.</span>
            </span>
          </h1>
          <p
            className="enter-fade mt-8 max-w-[44ch] text-lead text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Everything I&rsquo;ve shipped, from the headline projects to the
            quieter ones. Some old, some new, all mine.
          </p>
        </header>

        <div className="flex flex-col gap-20 pb-24 md:gap-24 md:pb-32">
          <ProjectCard
            project={lead}
            layout="wide"
            headingLevel="h2"
            priority
            plateClassName="aspect-[16/10] lg:aspect-auto lg:h-[34rem]"
            sizes="(min-width: 1200px) 660px, (min-width: 1024px) 55vw, 86vw"
          />
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
            {rest.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                headingLevel="h2"
                plateClassName="aspect-[16/11]"
                sizes="(min-width: 1200px) 480px, (min-width: 768px) 40vw, 86vw"
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
