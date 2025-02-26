"use client";

import { Canvas } from "@react-three/fiber";
import View from "./home/View";
import { Suspense } from "react";
import { Html } from "@react-three/drei";

export default function Home() {
  return (
    <Canvas
      shadows
      style={{
        height: "100dvh",
        overflowX: "auto",
        touchAction: "auto !important",
        overflowY: "hidden",
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
          <>
            <Html>
              <div
                style={{
                  position: "absolute",
                  left: "-40px",
                  color: "#333333",
                }}
              >
                loading...
              </div>
            </Html>
          </>
        }
      >
        <View />
      </Suspense>
    </Canvas>
  );
}
