"use client";

import { motion } from "framer-motion";

const PALETTES = [
  { name: "Neon", colors: ["#ff00ff", "#00ffff", "#ffff00"] },
  { name: "Sunset", colors: ["#ff4e50", "#fc913a", "#f9d423"] },
  { name: "Ocean", colors: ["#2193b0", "#6dd5ed", "#ffffff"] },
  { name: "Matrix", colors: ["#000000", "#00ff00", "#003300"] },
];

export default function ColorPalettePicker({
  onSelect,
}: {
  onSelect: (colors: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      {PALETTES.map((palette) => (
        <motion.button
          key={palette.name}
          className="h-10 rounded overflow-hidden flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(palette.colors)}
        >
          {palette.colors.map((c) => (
            <div
              key={c}
              style={{ backgroundColor: c }}
              className="flex-1 h-full"
            />
          ))}
        </motion.button>
      ))}
    </div>
  );
}
