/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Html, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const { camera, size, gl } = useThree();
  const [clicked, setClicked] = useState(null);
  const ref = useRef();

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";

  useFrame((state) => {
    // TODO: When scrolling in clicked state scrolling is allowed. Scroll > leave > scroll
    // results in the scrolling to jump
    if (clicked && current !== clicked.hash) {
      const clickedPosition = new THREE.Vector3();

      clicked.ref.current.getWorldPosition(clickedPosition); // Get the world position

      vec.set(
        clickedPosition.x + 0.5,
        clickedPosition.y,
        clickedPosition.z + 4
      );

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
      pages={(width / 3 - xW + (paintings.length + 1) * xW) / width}
      enabled={clicked === null}
    >
      <Scroll>
        <mesh position={[-width / 2, 2, -1.2]}>
          <planeGeometry />
          <meshStandardMaterial />

          <Html transform portal={{ current: gl.domElement.parentNode }}>
            <div style={{ pointerEvents: "none" }}>meow</div>
          </Html>
        </mesh>
        {paintings.map((illu, idx) => (
          <Painting
            setClicked={(e) => setClicked(e)}
            clicked={clicked}
            key={idx}
            id={idx}
            position={[idx * xW - width / 3 + 2, 1.5, -1.2]}
            w={w}
            h={h}
          />
        ))}

        <Wall screenWidth={width} w={(paintings.length + 2) * xW} />
        <Floor screenWidth={width} w={(paintings.length + 2) * xW} />
      </Scroll>
    </ScrollControls>
  );
}
