"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP } from "@/components/motion/gsap";

function linkLabel(link: string) {
  return link.includes("apps.apple.com") ? "View on App Store" : "Visit site";
}

/**
 * Featured projects as a physical stack. Every card is position: sticky, so
 * the pinning is native and can't drift; GSAP only scrubs the depth cues:
 * as the next card slides up, the one beneath sinks back and dims, and each
 * screenshot rises into its plate as its card arrives.
 */
export default function WorkStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card.querySelector("[data-shot]"),
            { yPercent: 16, rotate: 2.5 },
            {
              yPercent: 0,
              rotate: 0,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true },
            },
          );

          const next = cards[i + 1];
          if (!next) return;
          const behind = {
            trigger: next,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          };
          gsap.to(card.querySelector("[data-body]"), {
            scale: 0.88,
            ease: "none",
            scrollTrigger: behind,
          });
          gsap.to(card.querySelector("[data-shade]"), {
            opacity: 0.7,
            ease: "none",
            scrollTrigger: behind,
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      {projects.map((project, i) => (
        <li
          key={project.id}
          id={project.id}
          data-card
          className="sticky mb-[16svh] scroll-mt-24 last:mb-0"
          style={{ top: `calc(5.5rem + ${i} * 0.85rem)` }}
        >
          <article
            data-body
            aria-labelledby={`${project.id}-title`}
            className="h-[min(76svh,760px)] origin-top rounded-[2rem] bg-surface p-1.5 ring-1 ring-line will-change-transform"
          >
            <div
              className="relative isolate flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_0_rgb(255_255_255/0.1)] lg:grid lg:grid-cols-12"
              style={{
                background: `radial-gradient(130% 110% at 85% 10%, ${project.gradientTo} 0%, ${project.gradientFrom} 62%)`,
              }}
            >
              <div className="relative z-10 flex flex-col gap-5 p-6 sm:p-8 lg:col-span-5 lg:justify-between lg:p-12">
                <div>
                  <h3
                    id={`${project.id}-title`}
                    className="font-display text-[clamp(2.5rem,1.4rem+3.6vw,5.25rem)] font-bold leading-[0.9] tracking-[-0.045em] text-white"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[30ch] text-lead text-white/75">{project.tagline}</p>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="hidden max-w-[46ch] text-small text-white/60 md:line-clamp-4">
                    {project.description}
                  </p>
                  <p className="font-mono text-meta text-white/55">
                    <span className="sr-only">Built with: </span>
                    {project.stack.join(", ")}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="group inline-flex h-12 items-center gap-3 self-start rounded-full bg-white pl-5 pr-1.5 text-small font-medium text-zinc-950 transition-transform duration-200 ease-out active:scale-[0.97]"
                    >
                      {linkLabel(project.link)}
                      <span className="grid size-9 place-items-center rounded-full bg-zinc-950/8 transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                        <ArrowUpRight size={16} aria-hidden />
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="relative min-h-0 flex-1 lg:col-span-7">
                <div
                  data-shot
                  className="absolute left-6 top-0 w-[150%] origin-top-left sm:left-8 lg:left-0 lg:top-[13%] lg:w-[128%]"
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    sizes="(min-width: 1440px) 1000px, (min-width: 1024px) 70vw, 140vw"
                    className="h-auto w-full rounded-xl shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.08)]"
                  />
                </div>
              </div>

              {/* Light catching the top edge, and the dimming as the card sinks back. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.12),inset_0_0_0_1px_rgb(255_255_255/0.05)]"
              />
              <div
                data-shade
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
              />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
