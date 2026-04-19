"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export default function CaseStudyCard({ project }: Props) {
  const isLeft = project.imagePosition === "left";

  const imageVariants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: 0.15,
      },
    },
  };

  return (
    <article
      className={`min-h-screen flex flex-col items-center gap-12 px-6 py-24 lg:gap-16 lg:px-24 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image / gradient panel */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full lg:w-1/2 flex flex-col gap-5"
      >
        <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-lg text-[#888] leading-7">{project.tagline}</p>
        <p className="text-[#666] leading-7">{project.description}</p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs uppercase tracking-widest border border-white/10 rounded-full px-3 py-1 text-[#555]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <div className="mt-2">
            <Button variant="outline" asChild>
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
