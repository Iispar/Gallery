/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import React from "react";
import * as THREE from "three";

export default function Wall(props: any) {
  const { w, screenWidth } = props;

  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    [
      "Plastic013A_1K-JPG_Color.jpg",
      "Plastic013A_1K-JPG_Displacement.jpg",
      "Plastic013A_1K-JPG_NormalGL.jpg",
      "Plastic013A_1K-JPG_Roughness.jpg",
    ]
  );

  const repeatX = 50;
  const repeatY = 6;

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

  return (
    <>
      <mesh
        receiveShadow
        position={[w / 2 - screenWidth, 1.4, -0.9]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <planeGeometry args={[w * 2 + screenWidth, 9]} />
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
