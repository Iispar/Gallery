"use client";

import { Canvas } from "@react-three/fiber";
import View from "./View";

export default function Home() {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 0, 5] }}
    >
      <directionalLight position={[0, 3, 1]} intensity={2} castShadow />
      <View />
    </Canvas>
  );
}
