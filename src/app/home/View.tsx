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
import PaintingsRoom from "./PaintingsRoom";

export default function View() {
  const { width } = useThree((state: any) => state.viewport);
  const [clicked, setClicked] = useState(null);

  const ref = useRef();

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";

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
