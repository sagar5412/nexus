"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerformanceMonitor,
  Stats,
  useTexture,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { useControls } from "leva";
import { createShaderMaterial } from "@/lib/shaders/createShaderMaterial";
import * as FractalFlow from "@/lib/shaders/art-pieces/FractalFlow";
import * as PixelWaves from "@/lib/shaders/art-pieces/PixelWaves";
import * as LavaLamp from "@/lib/shaders/art-pieces/LavaLamp";
import * as Starfield from "@/lib/shaders/art-pieces/Starfield";
import * as VoronoiDream from "@/lib/shaders/art-pieces/VoronoiDream";
import * as THREE from "three";

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
      // Safe access to uniforms
      const uniforms = materialRef.current.uniforms;
      if (uniforms.time) {
        uniforms.time.value += delta;
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore - dynamic component */}
      <MaterialComponent ref={materialRef} />
    </mesh>
  );
}

export default function ShaderCanvas({ artName }: { artName: string }) {
  const [dpr, setDpr] = useState(1.5);
  const [perfMode, setPerfMode] = useState(false);

  // Fallback to FractalFlow if artName is invalid
  const validArtName = (
    ART_PIECES.hasOwnProperty(artName) ? artName : "FractalFlow"
  ) as ArtPieceName;

  useEffect(() => {
    if (perfMode) {
      // Logic to reduce quality/complexity could go here
      console.warn("Performance mode enabled: Reducing quality");
    }
  }, [perfMode]);

  return (
    <div className="h-screen w-full bg-black">
      <Canvas
        dpr={dpr}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
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
