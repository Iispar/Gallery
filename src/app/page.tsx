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

        overflowY: "hidden",
      }}
    >
      <directionalLight
        position={[0, window.innerWidth > 800 ? 4 : 3, 5]}
        intensity={3}
        color={0xffffff}
        shadow-mapSize={[2048, 2048]}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 3, -2]} />
      </directionalLight>

      <Suspense
        fallback={
          <Html>
            <div
              style={{
                position: "absolute",
                left: "-35px",
                bottom: "0px",
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
