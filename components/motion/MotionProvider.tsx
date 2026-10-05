"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Keeps Framer Motion's feature bundle off the critical path: `m` components
 * render immediately with their static styles, and gain animation, drag and
 * layout once the features chunk arrives.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
