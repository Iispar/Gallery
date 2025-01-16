"use client";

import { Canvas } from "@react-three/fiber";
import View from "./View";

export default function Home() {
  return (
    <Canvas
      shadows
      style={{
        height: "100vh",
      }}
    >
      <directionalLight
        position={[0, 5, 4]}
        intensity={4}
        color={0xffffff}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        castShadow
      />
      <View />
    </Canvas>
  );
}
