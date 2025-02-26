"use client";

import { Canvas } from "@react-three/fiber";
import View from "./home/View";
import { Suspense, useEffect, useState } from "react";
import { Html } from "@react-three/drei";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

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
        position={[0, window.innerWidth > 800 ? 4 : 3, 5]}
        intensity={4}
        color={0xffffff}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        castShadow
      />
      <Suspense
        fallback={
          <Html>
            <div
              style={{
                position: "absolute",
                left: "-35px",
                color: "#333333",
              }}
            >
              loading...
            </div>
          </Html>
        }
      >
        <View />
      </Suspense>
    </Canvas>
  );
}
