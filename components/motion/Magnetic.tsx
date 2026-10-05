"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Fraction of the pointer's offset from center the element follows. */
  strength?: number;
  className?: string;
};

/**
 * Pulls its child a few pixels toward a fine pointer and eases home on leave.
 * The transform is written straight to the element (no React renders) and a
 * CSS transition interpolates it, so the motion stays interruptible and runs
 * on the compositor. Inert on touch and under reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transition = "transform 250ms var(--ease-out)";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    // Release is slower than the follow, so it settles rather than snaps.
    el.style.transition = "transform 600ms var(--ease-out)";
    el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
