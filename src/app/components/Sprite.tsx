/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Sprite(props) {
  const { position, w, h } = props;
  const texture = useLoader(TextureLoader, "image.png");

  return (
    <group position={position}>
      <sprite scale={[w, h, 1]}>
        <spriteMaterial map={texture} />
      </sprite>
    </group>
  );
}
