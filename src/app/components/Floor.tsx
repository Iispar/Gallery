/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import React, { useRef } from "react";
import * as THREE from "three";

export default function Floor(props: any) {
  const meshRef = useRef<Mesh>(null);
  const { w, screenWidth } = props;

  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    [
      "painted_concrete_02_diff_8k.jpg",
      "painted_concrete_02_disp_8k.jpg",
      "painted_concrete_02_nor_gl_8k.jpg",
      "painted_concrete_02_rough_8k.jpg",
    ]
  );

  const repeatX = 14;
  const repeatY = 1;
  colorMap.repeat.set(repeatX, repeatY);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  displacementMap.repeat.set(repeatX, repeatY);
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;

  normalMap.repeat.set(repeatX, repeatY);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  roughnessMap.repeat.set(repeatX, repeatY);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  // aoMap.repeat.set(repeatX, repeatY);
  // aoMap.wrapS = THREE.RepeatWrapping;
  // aoMap.wrapT = THREE.RepeatWrapping;

  useFrame(() => {
    if (!meshRef.current) return;
  });
  return (
    <>
      <mesh
        receiveShadow
        position={[w / 2 - screenWidth, -4.4, -1]}
        rotation={[-1.5, 0, 0]}
        scale={[1, 0.5, 1]}
      >
        <planeGeometry args={[w * 2 + screenWidth, 4]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </mesh>
    </>
  );
}
