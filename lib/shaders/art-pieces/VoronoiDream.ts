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

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
  vec2 uv = vUv;
  uv *= 3.0; // Scale
  
  vec2 i_st = floor(uv);
  vec2 f_st = fract(uv);

  float m_dist = 1.0;

  for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x),float(y));
      vec2 point = random2(i_st + neighbor);
      point = 0.5 + 0.5*sin(time + 6.2831*point);
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      m_dist = min(m_dist, dist);
    }
  }

  vec3 color = vec3(m_dist);
  color += step(0.98, m_dist);
  gl_FragColor = vec4(color, 1.0);
}
`;

export const uniforms = {
  time: 0,
};

export const controls = {};
