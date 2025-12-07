"use client";

import { useStudioStore } from "@/lib/store/studioStore";
import ParameterSlider from "./ParameterSlider";
import ColorPalettePicker from "./ColorPalettePicker";
import ExportMenu from "./ExportMenu";
import { motion } from "framer-motion";

export default function ControlPanel({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const {
    uniforms,
    setUniform,
    saveSnapshot,
    undo,
    redo,
    artName,
    setArtName,
  } = useStudioStore();

  const handleSliderChange = (key: string, val: number) => {
    setUniform(key, val);
    // Debounce snapshot saving in real app
  };

  const handlePaletteSelect = (colors: string[]) => {
    // Convert hex strings to RGB floats
    const rgb = colors[0]
      .match(/[a-f\d]{2}/gi)
      ?.map((c) => parseInt(c, 16) / 255);
    if (rgb) setUniform("color", rgb);
    saveSnapshot();
  };

  return (
    <div className="h-full w-full bg-zinc-900 p-6 flex flex-col border-l border-zinc-800 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Studio
        </h2>
        <div className="flex gap-2">
          <button
            onClick={undo}
            className="text-zinc-500 hover:text-white px-2"
          >
            ↩
          </button>
          <button
            onClick={redo}
            className="text-zinc-500 hover:text-white px-2"
          >
            ↪
          </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
          Art Piece
        </label>
        <select
          value={artName}
          onChange={(e) => setArtName(e.target.value)}
          className="w-full bg-zinc-800 border-none rounded p-2 text-sm"
        >
          <option value="FractalFlow">Fractal Flow</option>
          <option value="PixelWaves">Pixel Waves</option>
          <option value="LavaLamp">Lava Lamp</option>
          <option value="Starfield">Starfield</option>
          <option value="VoronoiDream">Voronoi Dream</option>
        </select>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Parameters</h3>
        <ParameterSlider
          label="Complexity"
          value={uniforms.complexity?.value || 0.5}
          onChange={(v) => handleSliderChange("complexity", v)}
        />
        <ParameterSlider
          label="Speed"
          value={uniforms.speed?.value || 0.1}
          max={2}
          onChange={(v) => handleSliderChange("speed", v)}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Colors</h3>
        <ColorPalettePicker onSelect={handlePaletteSelect} />
      </div>

      <div className="mt-auto pt-8 border-t border-zinc-800">
        <ExportMenu canvasRef={canvasRef} />
      </div>
    </div>
  );
}
