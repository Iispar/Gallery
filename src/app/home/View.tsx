/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useState } from "react";
import { painting } from "../data/paintings";

import PaintingsRoom from "./PaintingsRoom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const [clicked, setClicked] = useState(null);

  const w = 2.2;

  const gap = 3;

  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      distance={0.9}
      damping={0}
      pages={(width / 3 - xW + (painting.length + 1) * xW) / width}
      enabled={clicked === null}
      prepend
    >
      <Scroll>
        <PaintingsRoom clicked={clicked} setClicked={setClicked} />
      </Scroll>
    </ScrollControls>
  );
}
