"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedName from "./AnimatedName";
import CursorBlob from "./CursorBlob";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 600], ["0%", "12%"]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Parallax blob wrapper */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
        aria-hidden
      >
        <CursorBlob />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <AnimatedName name="Hi, I'm Quincy." />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 2.2,
          }}
          className="mt-6 text-lg sm:text-xl leading-8 text-[#888] max-w-xl mx-auto"
        >
          Senior frontend engineer. I build fintech and consumer products that
          feel good to use. Currently at iKhokha. Based in Accra.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-[#444]"
        aria-hidden
      >
        <span className="text-xs uppercase tracking-widest">scroll</span>
        <span className="animate-bounce text-lg">↓</span>
      </motion.div>
    </section>
  );
}
