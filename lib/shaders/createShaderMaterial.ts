import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

type Uniforms = { [key: string]: any };

export function createShaderMaterial(
  name: string,
  vertexShader: string,
  fragmentShader: string,
  uniforms: Uniforms,
) {
  const Material = shaderMaterial(uniforms, vertexShader, fragmentShader);

  // Register the material so it can be used as a JSX element <name />
  extend({ [name]: Material });

  return Material;
}
