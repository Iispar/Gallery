/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useThree } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { painting } from "../data/paintings";

import PaintingsRoom from "./PaintingsRoom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const [clicked, setClicked] = useState(null);
  const [damping, setDamping] = useState(0);

  const w = 2.2;
  const gap = 3;
  const xW = w + gap;

  const handleWheel = (event: WheelEvent) => {
    if (event.deltaY !== 0) {
      setDamping(0.2);
    }
  };

  const handleTouchStart = () => {
    setDamping(0.1);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <ScrollControls
      horizontal
      distance={0.9}
      damping={damping}
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
