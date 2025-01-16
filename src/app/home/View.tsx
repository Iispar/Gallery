/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useState } from "react";

import PaintingsRoom from "./PaintingsRoom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const [clicked, setClicked] = useState(null);

  const w = 2.2;

  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      damping={0.2}
      distance={0.9}
      pages={(width / 3 - xW + (paintings.length + 1) * xW) / width}
      enabled={clicked === null}
    >
      <Scroll>
        <PaintingsRoom clicked={clicked} setClicked={setClicked} />
      </Scroll>
    </ScrollControls>
  );
}
