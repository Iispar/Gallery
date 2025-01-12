"use client";

import { Canvas } from "@react-three/fiber";
import View from "./View";
import { useEffect, useRef, useState } from "react";
import { DirectionalLight } from "three";

export default function Home() {
  const directionalLightRef = useRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (directionalLightRef.current) {
      setIsReady(true);
    }
  });
  return (
    <Canvas
      shadows
      style={{
        height: "100vh",
      }}
    >
      <directionalLight
        position={[0, 5, 4]}
        intensity={2}
        color={0xffffff}
        ref={directionalLightRef}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        castShadow
      />

      {isReady && (
        <directionalLightHelper
          args={[directionalLightRef?.current, 2, 0xff0000]}
        />
      )}
      <View />
    </Canvas>
  );
}
