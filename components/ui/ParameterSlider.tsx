"use client";

import { motion } from "framer-motion";

interface ParameterSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
}

export default function ParameterSlider({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-gray-300">
          {value.toFixed(2)}
        </span>
      </div>
      <motion.input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />
    </div>
  );
}
