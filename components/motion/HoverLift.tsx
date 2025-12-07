"use client";

import { motion } from "framer-motion";

export default function HoverLift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ cursor: "pointer" }}
    >
      <div style={{ pointerEvents: "none" }}>{children}</div>
    </motion.div>
  );
}
