import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import React, { useRef } from "react";
import * as THREE from "three";

export default function Wall(props) {
  const { w, screenWidth } = props;
  const meshRef = useRef<Mesh>(null);

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    [
      "Plastic013A_4K-JPG_Color.jpg",
      "Plastic013A_4K-JPG_Displacement.jpg",
      "Plastic013A_4K-JPG_NormalGL.jpg",
      "Plastic013A_4K-JPG_Roughness.jpg",
    ]
  );

  const repeatX = 10;
  const repeatY = 4;

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
        position={[w / 2 - screenWidth, 1.4, -2.8]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <planeGeometry args={[w + screenWidth, 9]} />
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
