#include curlNoise.glsl

precision mediump float;

uniform float distortFactor;

// DEFAULT
// attribute vec3 position;
// attribute vec2 uv;
// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

void main() {
	vUv = uv;

  vec3 distortion = vec3(position.x * 2.0, position.y, 1.0) 
    * curlNoise(vec3(
          position.x * 0.02 + time * 3.0, 
          position.y * 0.008 + time , 
          (position.x + position.y) * 0.001 * sin(time) * cos(time)
          )) * distortFactor;

  vec3 finalPosition = position + distortion;

  vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
  gl_PointSize = 1.0;
	gl_Position = projectionMatrix * mvPosition;
}


