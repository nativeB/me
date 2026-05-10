"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export default function CompactCaseStudyCard({ project }: Props) {
  const isLeft = project.imagePosition === "left";

  const imageVariants = {
    hidden: { opacity: 0, x: isLeft ? -40 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: 0.12,
      },
    },
  };

  return (
    <article
      className={`min-h-[60vh] flex flex-col items-center gap-10 px-6 py-16 lg:gap-12 lg:px-24 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full lg:w-1/2"
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ aspectRatio: project.aspectRatio ?? "4/3" }}
        >
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              style={{
                objectFit: project.objectFit ?? "cover",
                objectPosition: project.objectPosition ?? "center",
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            />
          )}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </div>
      </motion.div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full lg:w-1/2 flex flex-col gap-4"
      >
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-base text-[#888] leading-7">{project.tagline}</p>
        <p className="text-sm text-[#666] leading-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-widest border border-white/10 rounded-full px-2.5 py-1 text-[#555]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.link && (
          <div className="mt-2">
            <Button variant="outline" size="sm" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer nofollow">
                View live ↗
              </a>
            </Button>
          </div>
        )}
      </motion.div>
    </article>
  );
}
