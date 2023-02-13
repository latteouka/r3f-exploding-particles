import { Canvas } from "@react-three/fiber";
import Picture from "./Pictures";

export const TCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 1100],
        fov: 50,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 2000,
      }}
      dpr={window.devicePixelRatio}
      shadows
    >
      <color attach="background" args={["#000"]} />
      <Picture />
    </Canvas>
  );
};
