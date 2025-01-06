/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useState } from "react";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const [clicked, setClicked] = useState(null);

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (clicked) {
      console.log(clicked);
      state.camera.position.lerp(
        vec.set(clicked[0] + 0.5, clicked[1], clicked[2] + 4),
        0.01
      );
      state.camera.updateProjectionMatrix();
    } else {
      state.camera.position.lerp(vec.set(0, 0, 5), 0.01);
      state.camera.updateProjectionMatrix();
    }

    return null;
  });

  return (
    <ScrollControls
      horizontal
      damping={0.2}
      distance={0.9}
      pages={(width / 3 - xW + paintings.length * xW) / width}
      enabled={clicked === null}
    >
      <Scroll>
        <group>
          {paintings.map((illu, idx) => (
            <Painting
              setClicked={(e) => setClicked(e)}
              key={idx}
              id={idx}
              position={[idx * xW - width / 3, 1.5, -2]}
              w={w}
              h={h}
            />
          ))}
        </group>
        <Wall screenWidth={width} w={paintings.length * xW} />
        <Floor screenWidth={width} w={paintings.length * xW} />
      </Scroll>
    </ScrollControls>
  );
}
