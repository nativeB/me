"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = { from: number; to: number; decimals?: number };

/**
 * A figure that counts down to its real value the first time it scrolls into
 * view. The server renders the final value, so without JS (or with reduced
 * motion) the number is simply correct.
 */
export default function CountDown({ from, to, decimals = 1 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();

  // Reset to the starting figure while it is still below the fold.
  useEffect(() => {
    if (reduce || !ref.current) return;
    ref.current.textContent = from.toFixed(decimals);
  }, [from, decimals, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const controls = animate(from, to, {
      duration: 2.4,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {to.toFixed(decimals)}
    </span>
  );
}
