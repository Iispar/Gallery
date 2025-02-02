"use client";

import { Canvas } from "@react-three/fiber";
import View from "./View";
import { Suspense } from "react";
import { Html } from "@react-three/drei";

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
      <Suspense
        fallback={
          <Html>
            <div> loading... </div>
          </Html>
        }
      >
        <View />
      </Suspense>
    </Canvas>
  );
}
