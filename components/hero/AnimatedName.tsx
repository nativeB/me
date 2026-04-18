"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
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
