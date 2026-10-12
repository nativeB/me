import { featuredProjects } from "@/data/projects";
import WorkStack from "./WorkStack";

export default function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-360 scroll-mt-8 px-4 pb-32 pt-24 sm:px-6 md:pb-48 md:pt-40 lg:px-10"
    >
      <h2
        id="work-heading"
        className="reveal mb-14 font-display text-h2 font-bold md:mb-20"
      >
        Selected work
        <sup className="ml-2 align-super font-mono text-small font-normal tracking-normal text-accent md:ml-3 md:text-lead">
          ({featuredProjects.length})
        </sup>
      </h2>

      <WorkStack projects={featuredProjects} />
    </section>
  );
}
