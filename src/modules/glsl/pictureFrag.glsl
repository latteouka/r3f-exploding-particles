precision mediump float;

uniform float time;
uniform sampler2D t;
uniform sampler2D t2;
uniform float progress;

varying vec2 vUv;

void main() {
  vec4 tt = texture2D(t, vUv);
  vec4 tt2 = texture2D(t2, vUv);
  vec4 finalTexture = mix(tt, tt2, progress);
	//gl_FragColor = vec4(vUv, 0.0, 1.0);
	gl_FragColor = normalize(finalTexture);

  //if(gl_FragColor.r < 0.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
	//gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

