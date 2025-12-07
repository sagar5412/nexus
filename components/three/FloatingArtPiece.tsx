"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { createShaderMaterial } from "@/lib/shaders/createShaderMaterial";
import { useRouter } from "next/navigation";
import * as FractalFlow from "@/lib/shaders/art-pieces/FractalFlow";
import * as PixelWaves from "@/lib/shaders/art-pieces/PixelWaves";
import * as LavaLamp from "@/lib/shaders/art-pieces/LavaLamp";

// Reuse the pieces map or import from centralized location if possible.
// For now, re-importing to avoid circular deps or complex refactors.
const PREVIEW_PIECES = {
  FractalFlow,
  PixelWaves,
  LavaLamp,
};

type PieceName = keyof typeof PREVIEW_PIECES;

interface FloatingArtPieceProps {
  name: PieceName;
  position: [number, number, number];
  label: string;
}

export default function FloatingArtPiece({
  name,
  position,
  label,
}: FloatingArtPieceProps) {
  const router = useRouter();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const piece = PREVIEW_PIECES[name] as any;

  const MaterialComponent = useMemo(() => {
    return createShaderMaterial(
      name + "Preview",
      piece.vertexShader,
      piece.fragmentShader,
      piece.uniforms,
    );
  }, [name, piece]);

  useFrame((state, delta) => {
    if (materialRef.current?.uniforms?.time) {
      materialRef.current.uniforms.time.value += delta;
    }
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      );
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={() => router.push(`/gallery/art?art=${name}`)}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
            setHovered(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
            setHovered(false);
          }}
        >
          <planeGeometry args={[3, 3]} />
          {/* @ts-ignore */}
          <MaterialComponent ref={materialRef} />
        </mesh>
        <Text
          position={[0, -2, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          fillOpacity={hovered ? 1 : 0.7}
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}
