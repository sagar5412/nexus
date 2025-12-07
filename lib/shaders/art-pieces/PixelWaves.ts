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
  vec2 uv = vUv;
  float pixelSize = 20.0;
  vec2 pixelUv = floor(uv * pixelSize) / pixelSize;
  float dist = distance(pixelUv, vec2(0.5));
  float wave = sin(dist * 10.0 - time * 2.0);
  vec3 color = vec3(0.5 + 0.5 * wave, 0.2, 0.8 * dist);
  gl_FragColor = vec4(color, 1.0);
}
`;

export const uniforms = {
  time: 0,
};

export const controls = {};
