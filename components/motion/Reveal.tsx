"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  mode?: "fade-up" | "fade-left" | "scale" | "blur";
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  width = "fit-content",
  mode = "fade-up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getVariants = () => {
    const base = {
      visible: { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" },
    };

    switch (mode) {
      case "fade-left":
        return { hidden: { opacity: 0, x: 75 }, ...base };
      case "scale":
        return { hidden: { opacity: 0, scale: 0.8 }, ...base };
      case "blur":
        return { hidden: { opacity: 0, filter: "blur(10px)" }, ...base };
      default: // fade-up
        return { hidden: { opacity: 0, y: 75 }, ...base };
    }
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", width, overflow: "hidden" }}
      className={className}
    >
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
