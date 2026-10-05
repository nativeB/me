import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { featuredProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function WorkSection() {
  const [lead, ...rest] = featuredProjects;
  // Rows alternate a 7/5 and a 5/7 split so the grid has rhythm, not a zigzag.
  const rows = [rest.slice(0, 2), rest.slice(2, 4)];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1200px] scroll-mt-16 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <h2 id="work-heading" className="reveal text-h2 font-semibold">
        Selected work
      </h2>

      <div className="mt-12 flex flex-col gap-20 md:mt-16 md:gap-24">
        <ProjectCard
          project={lead}
          layout="wide"
          plateClassName="aspect-[16/10] lg:aspect-auto lg:h-[34rem]"
          sizes="(min-width: 1200px) 660px, (min-width: 1024px) 55vw, 86vw"
        />

        {rows.map((row, r) => (
          <div
            key={r}
            className="grid grid-cols-1 gap-20 md:gap-24 lg:grid-cols-12 lg:gap-10"
          >
            {row.map((project, i) => {
              const wideCell = (r + i) % 2 === 0;
              return (
                <div
                  key={project.id}
                  className={wideCell ? "lg:col-span-7" : "lg:col-span-5"}
                >
                  <ProjectCard
                    project={project}
                    plateClassName="aspect-[16/10] lg:aspect-auto lg:h-[26rem]"
                    sizes={
                      wideCell
                        ? "(min-width: 1200px) 570px, (min-width: 1024px) 48vw, 86vw"
                        : "(min-width: 1200px) 400px, (min-width: 1024px) 34vw, 86vw"
                    }
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-20 flex md:mt-24">
        <Link
          href="/work"
          className="nudge-on-hover nudge-x-on-hover group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97]"
        >
          View all work
          <ArrowRight size={16} aria-hidden className="nudge-target" />
        </Link>
      </div>
    </section>
  );
}
