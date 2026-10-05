"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, MotionConfig, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import type { Project } from "@/data/projects";

type Props = {
  projects: Project[];
};

// How each depth in the stack rests, and how it fans out when hovered.
const REST_ROTATE = [0, -2.5, 2, -1.5, 1];
const VISIBLE_DEPTH = 4;

function pose(depth: number, fanned: boolean) {
  if (fanned) {
    return {
      x: depth * -26,
      y: depth * -10,
      rotate: depth * -3.5,
      scale: 1 - depth * 0.03,
      opacity: depth < VISIBLE_DEPTH ? 1 : 0,
    };
  }
  return {
    x: depth * 6,
    y: depth * -14,
    rotate: REST_ROTATE[depth] ?? 0,
    scale: 1 - depth * 0.045,
    opacity: depth < VISIBLE_DEPTH ? 1 : 0,
  };
}

// Settles without wobble at rest; a flick carries its own velocity in.
const settle = { type: "spring", duration: 0.55, bounce: 0.12 } as const;
const fling = { type: "spring", duration: 0.45, bounce: 0 } as const;

const FLICK_DISTANCE = 90;
const FLICK_VELOCITY = 500;

/**
 * Signature hero piece: the featured projects as a physical stack.
 * Drag or flick the top card to send it to the back; tap or use the button
 * to advance. Everything is rendered in its resting position on the server,
 * so the stack is complete before any script runs.
 */
export default function ProjectDeck({ projects }: Props) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const [leaving, setLeaving] = useState<{ index: number; dir: 1 | -1 } | null>(
    null,
  );
  const [fanned, setFanned] = useState(false);
  const dragged = useRef(false);
  // Only the top card's screenshot loads with the page. The cards behind it are
  // mostly covered, so theirs wait for an idle moment and stay off the critical path.
  const [backImages, setBackImages] = useState(false);

  useEffect(() => {
    const show = () => setBackImages(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(show, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(show, 1200);
    return () => clearTimeout(id);
  }, []);

  // Subtle 3D tilt toward a fine pointer, written straight to the element and
  // eased by a CSS transition (no React renders per pointer move).
  const tiltRef = useRef<HTMLDivElement>(null);

  const top = order[0];
  const current = projects[top];

  function advance(dir: 1 | -1 = -1) {
    if (leaving) return;
    if (reduce) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }
    setLeaving({ index: top, dir });
  }

  function onLeft(index: number) {
    if (leaving?.index !== index) return;
    setOrder((o) => [...o.slice(1), o[0]]);
    setLeaving(null);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const flicked =
      Math.abs(info.offset.x) > FLICK_DISTANCE ||
      Math.abs(info.velocity.x) > FLICK_VELOCITY;
    if (flicked) {
      const dir = (info.offset.x || info.velocity.x) > 0 ? 1 : -1;
      setLeaving({ index: top, dir });
    }
    // Let the click that follows a drag know it was a drag.
    requestAnimationFrame(() => {
      dragged.current = false;
    });
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 400ms var(--ease-out)";
    el.style.transform = `perspective(1400px) rotateX(${py * -8}deg) rotateY(${px * 8}deg)`;
  }

  function onPointerLeave() {
    const el = tiltRef.current;
    if (el) {
      el.style.transition = "transform 700ms var(--ease-out)";
      el.style.transform = "";
    }
    setFanned(false);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        className="relative pt-12"
      >
        <div
          ref={tiltRef}
          onPointerMove={onPointerMove}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse" && !reduce) setFanned(true);
          }}
          onPointerLeave={onPointerLeave}
          className="relative aspect-[16/10] w-full"
        >
          {projects.map((project, index) => {
            const depth = order.indexOf(index);
            const isTop = depth === 0;
            const isLeaving = leaving?.index === index;
            const target = isLeaving
              ? {
                  x: `${leaving.dir * 115}%`,
                  y: 0,
                  rotate: leaving.dir * 14,
                  scale: 0.98,
                  opacity: 1,
                }
              : pose(depth, fanned && !leaving);

            return (
              <div
                key={project.id}
                className="enter-deal absolute inset-0"
                style={
                  {
                    zIndex: isLeaving
                      ? projects.length + 1
                      : projects.length - depth,
                    "--i": projects.length - 1 - index,
                    "--deal-rotate": `${(index % 2 ? 1 : -1) * 6}deg`,
                  } as React.CSSProperties
                }
                aria-hidden={!isTop}
              >
                <m.div
                  initial={false}
                  animate={target}
                  transition={isLeaving ? fling : settle}
                  onAnimationComplete={() => onLeft(index)}
                  drag={isTop && !leaving ? "x" : false}
                  dragSnapToOrigin
                  dragElastic={0.7}
                  onDragStart={() => {
                    dragged.current = true;
                  }}
                  onDragEnd={onDragEnd}
                  onTap={
                    isTop
                      ? () => {
                          if (!dragged.current) advance(-1);
                        }
                      : undefined
                  }
                  // The Next button is the keyboard path; cards stay out of the tab order.
                  tabIndex={-1}
                  whileTap={isTop ? { scale: 0.985 } : undefined}
                  className={`relative h-full w-full touch-pan-y select-none overflow-hidden rounded-[20px] shadow-[0_30px_80px_-30px_hsl(var(--shadow)/0.55),0_10px_24px_-12px_hsl(var(--shadow)/0.35)] ${
                    isTop && !leaving
                      ? "cursor-grab active:cursor-grabbing"
                      : ""
                  }`}
                  style={{
                    background: `radial-gradient(120% 90% at 20% 0%, ${project.gradientTo} 0%, ${project.gradientFrom} 70%)`,
                  }}
                >
                  {/* Every card frames its screenshot in the same fixed window, so
                      no card resizes on load and the first card stays the largest paint. */}
                  <div className="absolute inset-x-[7%] bottom-0 top-[9%] overflow-hidden rounded-t-lg shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.06)]">
                    {(index === 0 || backImages) && (
                      <Image
                        src={project.imageSrc}
                        alt={isTop ? project.imageAlt : ""}
                        fill
                        sizes="(min-width: 1200px) 480px, (min-width: 1024px) 40vw, 86vw"
                        priority={index === 0}
                        draggable={false}
                        className="pointer-events-none object-cover object-left-top"
                      />
                    )}
                  </div>
                  {/* Depth cue: cards further back sit slightly in shadow. */}
                  <m.div
                    aria-hidden
                    initial={false}
                    animate={{
                      opacity: isLeaving ? 0 : Math.min(depth * 0.14, 0.42),
                    }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0 bg-bg"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.1),inset_0_0_0_1px_rgb(255_255_255/0.05)]"
                  />
                </m.div>
              </div>
            );
          })}
        </div>

        <div
          className="enter-fade mt-8 flex items-start justify-between gap-4"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <p aria-live="polite" className="min-h-[3.2em] min-w-0 text-small">
            <span key={current.id} className="caption-swap line-clamp-2 block">
              <a
                href={`#${current.id}`}
                className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                {current.title}
              </a>
              <span className="text-subtle"> {current.tagline}</span>
            </span>
          </p>
          <button
            type="button"
            onClick={() => advance(-1)}
            className="nudge-on-hover nudge-x-on-hover inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-small font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-surface active:scale-[0.97]"
          >
            Next
            <ArrowRight size={14} aria-hidden className="nudge-target" />
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
