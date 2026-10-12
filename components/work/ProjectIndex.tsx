"use client";

import { useState } from "react";
import Image from "next/image";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "@/data/projects";

/**
 * The rest of the work as a typographic index. On a fine pointer, a preview
 * of the hovered project trails the cursor on a spring and leans into its own
 * velocity; switching rows wipes the next image up over the last. Touch and
 * reduced-motion visitors get an inline thumbnail per row instead.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  const lean = useTransform(useVelocity(sx), [-2400, 2400], [-16, 16], { clamp: true });
  const rotate = useSpring(lean, { stiffness: 180, damping: 18 });

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    // First contact snaps into place so the preview never flies in from 0,0.
    if (active === null) {
      sx.jump(e.clientX);
      sy.jump(e.clientY);
    }
    x.set(e.clientX);
    y.set(e.clientY);
  }

  const showPreview = active !== null && !reduce;

  return (
    <div onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)}>
      <ul className="group/list border-b border-line">
        {projects.map((project, i) => {
          const body = (
            <>
              <span className="relative col-span-12 flex items-center gap-4 md:col-span-6">
                <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg sm:w-28 [@media(hover:hover)_and_(pointer:fine)]:hidden">
                  <Image
                    src={project.imageSrc}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </span>
                <span className="font-display text-[clamp(1.75rem,1.1rem+2.4vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-out group-hover/row:translate-x-3 md:group-hover/row:translate-x-5">
                  {project.title}
                </span>
              </span>
              <span className="col-span-12 text-small text-muted md:col-span-5">
                {project.tagline}
              </span>
              <span className="col-span-1 hidden justify-end md:flex">
                {project.link ? (
                  <span className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/row:rotate-45 group-hover/row:border-accent group-hover/row:bg-accent group-hover/row:text-on-accent">
                    <ArrowUpRight size={18} aria-hidden />
                  </span>
                ) : (
                  <span className="whitespace-nowrap font-mono text-meta text-subtle">Soon</span>
                )}
              </span>
            </>
          );

          const rowClass =
            "group/row grid grid-cols-12 items-center gap-x-6 gap-y-3 border-t border-line py-6 md:py-8";

          return (
            <li
              key={project.id}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="transition-opacity duration-300 ease-out group-hover/list:opacity-35 hover:opacity-100!"
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={rowClass}
                >
                  {body}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <div className={rowClass}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Fixed to the viewport, so it must never sit inside a transformed parent. */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ x: sx, y: sy, rotate }}
      >
        <m.div
          initial={false}
          animate={
            showPreview
              ? { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
              : { opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" }
          }
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative aspect-[16/10] w-[min(30vw,420px)] overflow-hidden rounded-2xl bg-surface shadow-[0_30px_70px_-20px_hsl(var(--shadow)/0.6)] ring-1 ring-line"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-[clip-path] duration-500 ease-out"
              style={{
                clipPath: active === i ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                zIndex: active === i ? 2 : 1,
              }}
            >
              <Image
                src={project.imageSrc}
                alt=""
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
          ))}
        </m.div>
      </m.div>
    </div>
  );
}
