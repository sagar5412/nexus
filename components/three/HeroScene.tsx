"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  Stars,
  PerformanceMonitor,
} from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import FloatingArtPiece from "./FloatingArtPiece";
import Reveal from "@/components/motion/Reveal";
import TextGradient from "@/components/motion/TextGradient";

function SceneContent() {
  const [dpr, setDpr] = useState(1.5);

  useFrame((state) => {
    // Simple mouse parallax
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y,
      0.05,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(0.5)}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <ambientLight intensity={0.5} />

      <ScrollControls pages={3} damping={0.1}>
        <Scroll>
          <FloatingArtPiece
            name="FractalFlow"
            position={[-4, 0, 0]}
            label="Fractal Flow"
          />
          <FloatingArtPiece
            name="PixelWaves"
            position={[0, 0, -2]}
            label="Pixel Waves"
          />
          <FloatingArtPiece
            name="LavaLamp"
            position={[4, 0, 0]}
            label="Lava Lamp"
          />
        </Scroll>

        <Scroll html style={{ width: "100vw", height: "100vh" }}>
          <div className="absolute top-[10vh] left-[10vw] w-[80vw]">
            <Reveal mode="fade-left" delay={0.5}>
              <h1 className="text-8xl font-black text-white/90">
                <TextGradient text="NEXUS" from="#fff" to="#aaa" />
              </h1>
              <p className="text-2xl text-gray-300 mt-4 max-w-lg">
                Where code meets creativity. Explore generative art pieces
                powered by WebGL.
              </p>
            </Reveal>
          </div>

          <div className="absolute top-[110vh] right-[10vw] max-w-lg text-right">
            <Reveal mode="scale">
              <h2 className="text-6xl font-bold text-white mb-6">
                Immersive Shader Experiences
              </h2>
              <p className="text-xl text-gray-300">
                Interact with real-time simulations. Fluid dynamics, cellular
                automata, and procedural noise at your fingertips.
              </p>
            </Reveal>
          </div>

          <div className="absolute top-[210vh] left-[50%] -translate-x-1/2 text-center w-full">
            <Reveal mode="fade-up">
              <h2 className="text-5xl font-bold text-white mb-10">
                Ready to Dive In?
              </h2>
              <div className="pointer-events-none text-gray-400">
                (Click on any art piece above to launch)
              </div>
            </Reveal>
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
