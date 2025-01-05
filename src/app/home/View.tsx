/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Sprite from "../components/Sprite";

export default function View({ w = 3.2, h = 4.4, gap = 2 }) {
  const { width } = useThree((state: any) => state.viewport);
  const paintings = [1, 2, 3, 4, 5];
  const xW = w + gap;
  const viewWidth = 100;
  return (
    <ScrollControls
      horizontal
      damping={0.2}
      distance={0.9}
      pages={(width / 3 - xW + paintings.length * xW) / width}
    >
      <Scroll>
        <group>
          {paintings.map((illu, idx) => (
            <Sprite
              key={idx}
              position={[idx * xW - width / 3, 2, -2]}
              w={w}
              h={h}
            />
          ))}
        </group>
        <Wall w={viewWidth} />
        <Floor w={viewWidth} />
      </Scroll>
    </ScrollControls>
  );
}
