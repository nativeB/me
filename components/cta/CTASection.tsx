"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Email", href: "mailto:your@email.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
  { label: "GitHub", href: "https://github.com/your-handle" },
];

export default function CTASection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-semibold tracking-tight leading-tight"
        style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
      >
        Looking for a senior
        <br />
        frontend engineer?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="mt-6 text-lg text-[#666] max-w-md"
      >
        Open to remote roles, contract or full-time. EU/EST timezone overlap
        from Accra.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="mt-12 flex flex-col sm:flex-row gap-4"
      >
        {links.map(({ label, href }) => (
          <motion.div
            key={label}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.25)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-full"
          >
            <Button variant="outline" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-sm text-[#444]"
      >
        Reply within 24 hours.
      </motion.p>
    </section>
  );
}
