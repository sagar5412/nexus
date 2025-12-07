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

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  float stars = 0.0;
  for(float i=0.0; i<50.0; i++){
    vec2 pos = vec2(random(vec2(i)), random(vec2(i*2.0)));
    float speed = 0.1 + random(vec2(i*3.0)) * 0.5;
    pos.x = fract(pos.x + time * speed * 0.1);
    float size = 0.002 + random(vec2(i*4.0)) * 0.003;
    float dist = length(uv - pos);
    stars += smoothstep(size, size*0.5, dist);
  }
  gl_FragColor = vec4(vec3(stars), 1.0);
}
`;

export const uniforms = {
  time: 0,
};

export const controls = {};
