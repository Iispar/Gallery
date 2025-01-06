import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

import { TextureLoader } from "three";

export default function Painting(props) {
  const { id, position, w, h, setClicked, clicked } = props;
  const texture = useLoader(TextureLoader, "image.jpeg");

  return (
    <mesh>
      <group position={position}>
        <mesh position={[0, 3, 0]} onClick={() => setClicked(null)}>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>

        <sprite scale={[w, h, 1]} onClick={() => setClicked(position)}>
          <spriteMaterial map={texture} />
        </sprite>

        <mesh position={[1.8, -1.1, 0]}>
          <planeGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </mesh>
  );
}
