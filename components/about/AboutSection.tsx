"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "I've been building web products for 7+ years — currently a frontend engineer at iKhokha, a South African fintech platform. My work spans the full stack: React, Next.js, TypeScript on the frontend; Node.js, PostgreSQL, and MongoDB on the backend.",
  "I care about the details most people skip — the timing of a transition, how an error state reads, whether a form feels fast. The stuff users don't consciously notice but feel instantly. At iKhokha, I cut checkout time-to-conversion by 75% by rethinking the flow, not just the code.",
  "Outside of work: writing a novel. Based in Accra. Remote-first.",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-32 px-6 flex items-center justify-center"
    >
      <div className="max-w-130 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm uppercase tracking-widest text-[#444] mb-10"
        >
          About
        </motion.h2>

        <div className="space-y-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.15,
              }}
              className="text-lg leading-8 text-[#888]"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
