export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  vec2 pos1 = vec2(sin(time * 0.5) * 0.3, cos(time * 0.3) * 0.3);
  vec2 pos2 = vec2(sin(time * 0.8) * 0.4, cos(time * 0.6) * -0.2);
  
  float d1 = length(uv - pos1);
  float d2 = length(uv - pos2);
  
  float metaball = 0.1 / d1 + 0.1 / d2;
  vec3 color = vec3(smoothstep(0.5, 0.6, metaball));
  color *= vec3(1.0, 0.5, 0.0); // Lava orange
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export const uniforms = {
  time: 0,
};

export const controls = {};
