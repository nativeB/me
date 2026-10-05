import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Project } from "@/data/projects";
import ProjectPlate from "./ProjectPlate";

type Props = {
  project: Project;
  layout?: "wide" | "stacked";
  /** Height/aspect classes for the plate so cards in a row line up. */
  plateClassName?: string;
  sizes: string;
  headingLevel?: "h2" | "h3";
  /** Load the screenshot eagerly when the card sits in the first viewport. */
  priority?: boolean;
};

export default function ProjectCard({
  project,
  layout = "stacked",
  plateClassName = "aspect-[16/10]",
  sizes,
  headingLevel = "h3",
  priority,
}: Props) {
  const Heading = headingLevel;
  const wide = layout === "wide";

  return (
    <article
      id={project.id}
      className={`lift-on-hover nudge-on-hover group relative scroll-mt-24 ${
        wide ? "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10" : "flex flex-col gap-6"
      }`}
    >
      <div className={`reveal ${wide ? "lg:col-span-8" : ""}`}>
        <ProjectPlate
          project={project}
          sizes={sizes}
          priority={priority}
          className={plateClassName}
          shotClassName="lift-target"
        />
      </div>

      <div
        className={`reveal-late flex flex-col gap-3 ${
          wide ? "lg:col-span-4 lg:justify-end lg:pb-2" : ""
        }`}
      >
        <Heading className="text-h3 font-medium">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-baseline gap-1.5 rounded-sm after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              <ArrowUpRight
                size={18}
                weight="regular"
                aria-hidden
                className="nudge-target self-center text-subtle transition-colors duration-200 group-hover:text-accent"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            project.title
          )}
        </Heading>
        <p className="text-body text-muted">{project.tagline}</p>
        <p className="max-w-[60ch] text-small text-subtle">{project.description}</p>
        <p className="mt-1 font-mono text-meta text-subtle">
          <span className="sr-only">Built with: </span>
          {project.stack.join(", ")}
        </p>
      </div>
    </article>
  );
}
