import * as THREE from "three";
import vertex from "../../modules/glsl/pictureVert.glsl";
import fragment from "../../modules/glsl/pictureFrag.glsl";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";

const state = {
  progress: 0,
  distortFactor: 0,
  texture1: 0,
  texture2: 1,
};

const Picture = () => {
  // const gui = GUIController.instance;
  // gui.addNumericSlider(state, "progress", 0, 1, 0.01);
  // gui.addNumericSlider(state, "distortFactor", 0, 3, 0.05);

  const parentRef = useRef<THREE.Points>(null);
  const geometry = useRef<THREE.PlaneGeometry>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const textures = useLoader(THREE.TextureLoader, [
    "/pic1.jpg",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg",
    "/pic6.jpg",
  ]);

  const uniforms = useMemo(
    () => ({
      time: { type: "f", value: 0 },
      t: { type: "t", value: textures[state.texture1] },
      t2: { type: "t", value: textures[state.texture2] },
      distortFactor: { type: "t", value: 0 },
      progress: { type: "f", value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    material.current!.uniforms.time.value = clock.elapsedTime;
    material.current!.uniforms.t.value = textures[state.texture1 % 6];
    material.current!.uniforms.t2.value = textures[state.texture2 % 6];

    //material.current.uniforms.distortFactor.value = distortFactor;
  });

  const playOne = useCallback(() => {
    gsap.to(material.current!.uniforms.distortFactor, {
      value: 3.5,
      duration: 3,
      ease: "power2.inOut",
    });
    gsap.to(material.current!.uniforms.progress, {
      value: 1,
      delay: 3,
      duration: 1,
    });
    gsap.to(material.current!.uniforms.distortFactor, {
      value: 0,
      duration: 3,
      delay: 3,
      ease: "power2.inOut",
      onComplete: () => {
        state.texture1 = state.texture2 + 1;
        playTwo();
      },
    });
  }, []);
  const playTwo = useCallback(() => {
    gsap.to(material.current!.uniforms.distortFactor, {
      value: 3.5,
      duration: 3,
      ease: "power2.inOut",
    });
    gsap.to(material.current!.uniforms.progress, {
      value: 0,
      delay: 3,
      duration: 1,
    });
    gsap.to(material.current!.uniforms.distortFactor, {
      value: 0,
      duration: 3,
      delay: 3,
      ease: "power2.inOut",
      onComplete: () => {
        state.texture2 = state.texture1 + 1;
        playOne();
      },
    });
  }, []);

  useLayoutEffect(() => {
    playOne();
  }, []);
  return (
    <>
      <points ref={parentRef}>
        <planeGeometry args={[640, 427, 640, 427]} ref={geometry} />
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          side={THREE.DoubleSide}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};
export default Picture;
