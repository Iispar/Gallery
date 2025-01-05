"use client";

import { Canvas } from "@react-three/fiber";
import Floor from "../components/Floor";
import Wall from "../components/Wall";

export default function Home() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "#000000" }}>
      <directionalLight position={[0, 2, 1]} intensity={2} castShadow />

      <Wall />
      <Floor />
    </Canvas>
  );
}
