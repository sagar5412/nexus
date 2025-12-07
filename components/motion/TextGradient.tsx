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
    <span
      style={
        {
          backgroundImage: `linear-gradient(var(--gradient-angle, 45deg), ${from}, ${to})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          display: "inline-block",
          animation: "rotate-gradient 5s linear infinite",
        } as React.CSSProperties
      }
      className="font-bold"
    >
      <style jsx>{`
        @keyframes rotate-gradient {
          to {
            --gradient-angle: 405deg;
          }
        }
      `}</style>
      {text}
    </span>
  );
}
