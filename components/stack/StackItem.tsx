"use client";

import { motion } from "framer-motion";

type Props = {
  name: string;
};

export default function StackItem({ name }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 0 24px rgba(124, 58, 237, 0.35)",
        borderColor: "rgba(124, 58, 237, 0.4)",
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="border border-white/10 rounded-md px-3 py-2 cursor-default
                 text-xs uppercase tracking-widest text-[#555]
                 hover:text-[#ededed] transition-colors duration-150"
    >
      {name}
    </motion.div>
  );
}
