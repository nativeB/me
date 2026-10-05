import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Classes for the screenshot wrapper, e.g. hover lift or scroll settle. */
  shotClassName?: string;
  decorative?: boolean;
};

/**
 * A screenshot sitting on a brand-tinted plate. The plate gives every project
 * its own colour without inventing any artwork, and the screenshot keeps its
 * true aspect ratio (no cropping of someone's UI).
 */
export default function ProjectPlate({
  project,
  sizes,
  priority,
  className = "",
  shotClassName = "",
  decorative,
}: Props) {
  return (
    <div
      className={`relative isolate flex items-center justify-center overflow-hidden rounded-[20px] p-[7%] ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, ${project.gradientTo} 0%, ${project.gradientFrom} 70%)`,
      }}
    >
      <div
        className={`relative flex h-full w-full items-center justify-center ${shotClassName}`}
      >
        <Image
          src={project.imageSrc}
          alt={decorative ? "" : project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? undefined : "low"}
          className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.06)]"
        />
      </div>
      {/* Light catching the top edge of the plate. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.08),inset_0_0_0_1px_rgb(255_255_255/0.04)]"
      />
    </div>
  );
}
