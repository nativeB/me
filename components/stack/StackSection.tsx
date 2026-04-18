"use client";

import { motion } from "framer-motion";
import StackItem from "./StackItem";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "Tailwind",
  "Zustand",
  "Node",
  "Vue",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "GCP",
  "Git",
  "Figma",
  "Vercel",
];

export default function StackSection() {
  return (
    <section id="stack" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm uppercase tracking-widest text-[#444] mb-10"
        >
          Tools I reach for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {stack.map((name) => (
            <StackItem key={name} name={name} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
