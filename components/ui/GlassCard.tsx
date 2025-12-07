"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl border border-white/20
        bg-white/10 backdrop-blur-md shadow-xl
        dark:bg-black/20 dark:border-white/10
        ${className}
      `}
      style={{
        // Fallback for browsers not supporting color-mix yet
        borderColor: "color-mix(in srgb, var(--color-border) 20%, transparent)",
      }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              rotateX: 5,
              rotateY: 5,
              perspective: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
}
