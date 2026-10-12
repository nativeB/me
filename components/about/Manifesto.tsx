"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type Props = {
  text: string;
  /** Trailing phrase that lands in the accent colour. */
  emphasis?: string;
  headingId: string;
};

/**
 * The about statement, pinned (CSS sticky) while the visitor scrolls through
 * it. Each word brightens from a ghost in reading order, so the sentence is
 * read at the pace of the scroll. Screen readers get the plain sentence.
 */
export default function Manifesto({ text, emphasis, headingId }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const emphasisStart = emphasis ? words.length - emphasis.split(" ").length : words.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 1,
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative h-[200svh] md:h-[230svh]">
      <div className="sticky top-0 flex min-h-svh flex-col justify-center py-24">
        <h2 id={headingId} className="mb-8 font-mono text-meta uppercase tracking-[0.2em] text-subtle md:mb-12">
          About
        </h2>
        <p className="sr-only">{text}</p>
        <p
          aria-hidden
          className="max-w-[24ch] font-display text-[clamp(2.125rem,0.9rem+4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
        >
          {words.map((word, i) => (
            <span
              key={i}
              data-word
              className={i >= emphasisStart ? "text-accent" : undefined}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
