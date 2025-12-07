"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MorphingShape({
  paths,
  width = 100,
  height = 100,
  color = "#fff",
}: {
  paths: string[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    <div onMouseEnter={() => setIndex((i) => (i + 1) % paths.length)}>
      <svg width={width} height={height} viewBox="0 0 100 100">
        <motion.path
          d={paths[index]}
          fill={color}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
