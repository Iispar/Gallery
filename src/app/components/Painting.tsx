import { useScroll, Text, Html } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MeshBasicMaterial, TextureLoader } from "three";
import * as THREE from "three";
import InfoPlate from "./InforPlate";

export default function Painting(props) {
  const { id, position, w, h, setClicked, clicked } = props;
  const texture = useLoader(TextureLoader, "image.jpeg");
  const { gl } = useThree();

  const groupRef = useRef();

  return (
    <group ref={groupRef} position={position}>
      {clicked?.hash == id ? (
        <Html
          position={[+0.5, 2.5, 0]}
          transform
          portal={{ current: gl.domElement.parentNode }}
        >
          <div onClick={() => setClicked(null)}>
            <p
              style={{
                color: "white",
                fontSize: "24px",
                pointerEvents: "none",
                caretColor: "transparent",
              }}
            >
              RETURN
            </p>
          </div>
        </Html>
      ) : (
        <></>
      )}

      <mesh
        castShadow
        scale={[w, h, 1]}
        onClick={() =>
          setClicked({ position: position, hash: id, ref: groupRef })
        }
      >
        <boxGeometry attach="geometry" args={[1, 1, 0.1]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>

      <InfoPlate
        author={"Iiro Partanen"}
        year={"2001"}
        countryFin={"Suomi"}
        countryEng={"Finland"}
        name={"Cute bird meow"}
        size={"200x200"}
        date={"02/11/2024"}
        typeFin={"Akryyli"}
        typeEng={"Acrtylic"}
      />
    </group>
  );
}
