"use client";

import { motion } from "framer-motion";

export default function TextGradient({
  text,
  from = "#f00",
  to = "#00f",
}: {
  text: string;
  from?: string;
  to?: string;
}) {
  return (
    <motion.span
      style={{
        backgroundImage: `linear-gradient(45deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% 200%",
        display: "inline-block",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {text}
    </motion.span>
  );
}
