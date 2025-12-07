"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor, Stats } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { createShaderMaterial } from "@/lib/shaders/createShaderMaterial";
import * as FractalFlow from "@/lib/shaders/art-pieces/FractalFlow";
import * as PixelWaves from "@/lib/shaders/art-pieces/PixelWaves";
import * as LavaLamp from "@/lib/shaders/art-pieces/LavaLamp";
import * as Starfield from "@/lib/shaders/art-pieces/Starfield";
import * as VoronoiDream from "@/lib/shaders/art-pieces/VoronoiDream";
import * as THREE from "three";
import { useArtStore } from "@/lib/store/artStore";

const ART_PIECES = {
  FractalFlow,
  PixelWaves,
  LavaLamp,
  Starfield,
  VoronoiDream,
};

type ArtPieceName = keyof typeof ART_PIECES;

function ArtPiece({ name }: { name: ArtPieceName }) {
  const piece = ART_PIECES[name];
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Subscribe to store for live updates
  const storeUniforms = useArtStore((state) => state.uniforms);
  const storeColor = useArtStore((state) => state.color);
  const isPlaying = useArtStore((state) => state.isPlaying);

  const MaterialComponent = useMemo(() => {
    return createShaderMaterial(
      name,
      piece.vertexShader,
      piece.fragmentShader,
      piece.uniforms,
    );
  }, [name, piece]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;

      // Standard time animation
      if (uniforms.time && isPlaying) {
        // Apply speed multiplier if it exists in store
        const speed = storeUniforms["speed"] || 1;
        uniforms.time.value += delta * speed;
      }

      // Sync complexity
      if (uniforms.complexity && storeUniforms["complexity"] !== undefined) {
        uniforms.complexity.value = storeUniforms["complexity"];
      }

      // Sync color
      if (uniforms.color1 && storeColor) {
        uniforms.color1.value = storeColor;
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <MaterialComponent ref={materialRef} />
    </mesh>
  );
}

export default function ShaderCanvas({ artName }: { artName: string }) {
  const [dpr, setDpr] = useState(1.5);
  const [perfMode, setPerfMode] = useState(false);

  const validArtName = (
    ART_PIECES.hasOwnProperty(artName) ? artName : "FractalFlow"
  ) as ArtPieceName;

  return (
    <div className="h-full w-full bg-black">
      <Canvas
        dpr={dpr}
        gl={{
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          // Helpers
        }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            onIncline={() => setDpr(2)}
            onDecline={() => {
              setDpr(1);
              setPerfMode(true);
            }}
          />
          <ArtPiece name={validArtName} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.5} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          <OrbitControls enableZoom={false} />
          <Stats className="!left-auto !right-0 !top-auto !bottom-0" />
        </Suspense>
      </Canvas>
      {perfMode && (
        <div className="absolute bottom-4 left-4 bg-red-900/50 text-white px-4 py-2 rounded backdrop-blur">
          Performance optimized
        </div>
      )}
    </div>
  );
}
