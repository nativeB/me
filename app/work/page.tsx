import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/work/ProjectCard";
import KineticName from "@/components/hero/KineticName";
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
      <main id="main" className="relative bg-bg">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-10">
          <header className="pb-16 pt-28 md:pb-28 md:pt-36">
            <Link
              href="/"
              className="nudge-on-hover nudge-back-on-hover -ml-1 inline-flex items-center gap-2 rounded-sm px-1 text-small text-muted transition-colors duration-200 hover:text-fg"
            >
              <ArrowLeft size={16} aria-hidden className="nudge-target" />
              Back home
            </Link>

            <h1 className="mt-10 font-display text-[min(22vw,14rem)] leading-[0.86] tracking-[-0.045em]">
              <span className="sr-only">All work</span>
              <KineticName lines={[{ text: "All work." }]} />
            </h1>
            <p
              className="enter-fade mt-10 max-w-[44ch] text-lead text-muted"
              style={{ "--i": 6 } as React.CSSProperties}
            >
              Everything I&rsquo;ve shipped, from the headline projects to the
              quieter ones. Some old, some new, all mine.
            </p>
          </header>

          <div className="flex flex-col gap-24 pb-32 md:gap-32 md:pb-48">
            <ProjectCard
              project={lead}
              layout="wide"
              headingLevel="h2"
              priority
              plateClassName="aspect-[16/10] lg:aspect-auto lg:h-[36rem]"
              sizes="(min-width: 1440px) 900px, (min-width: 1024px) 62vw, 92vw"
            />
            <div className="grid grid-cols-1 gap-24 md:grid-cols-2 md:gap-x-6 md:gap-y-28 lg:gap-x-8">
              {rest.map((project, i) => (
                <div key={project.id} className={i % 2 ? "md:mt-32" : undefined}>
                  <ProjectCard
                    project={project}
                    headingLevel="h2"
                    plateClassName="aspect-[16/11]"
                    sizes="(min-width: 1440px) 680px, (min-width: 768px) 46vw, 92vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
