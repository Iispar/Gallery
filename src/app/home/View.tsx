/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const { camera, size } = useThree();
  const [clicked, setClicked] = useState(null);

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";

  useFrame((state) => {
    if (clicked && current !== clicked.hash) {
      const clickedPosition = new THREE.Vector3();

      clicked.ref.current.getWorldPosition(clickedPosition); // Get the world position

      vec.set(clickedPosition.x, clickedPosition.y, clickedPosition.z + 4);

      current = clicked.hash;
    } else if (clicked === null) {
      vec.set(0, 0, 5);
      current = "";
    }

    state.camera.position.lerp(vec, 0.01);
    state.camera.updateMatrixWorld();
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
