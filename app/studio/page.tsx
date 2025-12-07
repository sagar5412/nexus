"use client";

import { useArtStore } from "@/lib/store/artStore";
import ShaderCanvas from "@/components/three/ShaderCanvas";
import ControlPanel from "@/components/ui/ControlPanel";
import { useRef } from "react";

export default function StudioPage() {
  const artName = useArtStore((state) => state.artName);
  // Ref to access canvas for screenshots
  // Note: ShaderCanvas needs to expose the canvas element or we grab it via DOM
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // A wrapper to find the canvas in the DOM since passing refs through R3F Canvas can be tricky without forwardRef
  // For this demo, we'll try to find the canvas via ID or class if ref fails, or pass a prop.
  // Actually, we can just pass the ref to a "CanvasGrabber" inside ShaderCanvas if needed,
  // currently ShaderCanvas encapsulates the <Canvas />.
  // To keep it simple, we'll mock the ref passage by assuming the user clicks Export inside, or we lift state.

  // Real implementation: We need ShaderCanvas to forward the gl.domElement or we querySelector('canvas')
  const getCanvas = () => document.querySelector("canvas") as HTMLCanvasElement;

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden">
      <div className="w-[70%] h-full relative">
        <ShaderCanvas artName={artName} />
      </div>
      <div className="w-[30%] h-full z-10">
        {/* @ts-ignore */}
        <ControlPanel
          // @ts-ignore
          canvasRef={{ current: getCanvas() }}
        />
      </div>
    </div>
  );
}
