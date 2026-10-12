import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { projects } from "@/data/projects";
import ProjectIndex from "./ProjectIndex";

export default function IndexSection() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      aria-labelledby="index-heading"
      className="mx-auto max-w-360 px-4 pb-32 sm:px-6 md:pb-48 lg:px-10"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <h2 id="index-heading" className="reveal font-display text-h2 font-bold">
          More projects
        </h2>
        <Link
          href="/work"
          className="nudge-on-hover nudge-x-on-hover reveal inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97]"
        >
          Full archive
          <ArrowRight size={16} aria-hidden className="nudge-target" />
        </Link>
      </div>

      <ProjectIndex projects={rest} />
    </section>
  );
}
