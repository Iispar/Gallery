"use client";

import { Canvas } from "@react-three/fiber";
import View from "./home/View";
import { Suspense, useEffect, useState } from "react";
import { Html } from "@react-three/drei";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true); // This will set the flag to true once the component is mounted on the client
  }, []);

  if (!isBrowser) {
    return null; // Don't render the component until it's mounted on the client
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
        position={[0, window.innerWidth > 800 ? 4 : 3, 4]}
        intensity={4}
        color={0xffffff}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        castShadow
      />
      <Suspense
        fallback={
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
        }
      >
        <View />
      </Suspense>
    </Canvas>
  );
}
