"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

type Props = {
  name: string;
};

export default function AnimatedName({ name }: Props) {
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-semibold tracking-tight leading-none"
      style={{ fontSize: "clamp(48px, 8vw, 90px)" }}
    >
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
