export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  return 105.0 * dot( m*m, vec3( dot(p,x0), dot(p.yz,x12.xy), dot(p.z,x12.zw) ) );
}

void main() {
  vec2 uv = vUv;
  float noise = snoise(uv * 3.0 + time * 0.1);
  vec3 finalColor = mix(color, vec3(0.0, 0.5, 1.0), noise);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const uniforms = {
  time: 0,
  color: new Float32Array([1.0, 0.0, 0.0]), // RGB
};

export const controls = {
  color: { value: "#ff0000" },
};
