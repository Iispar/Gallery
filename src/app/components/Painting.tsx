import { useScroll, Text, Html } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
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
          position={[0, 2.5, 0]}
          transform
          portal={{ current: gl.domElement.parentNode }}
        >
          <p
            style={{
              color: "white",
              fontSize: "24px",
            }}
            onClick={() => setClicked(null)}
          >
            RETURN
          </p>
        </Html>
      ) : (
        <></>
      )}

      <sprite
        scale={[w, h, 1]}
        onClick={() =>
          setClicked({ position: position, hash: id, ref: groupRef })
        }
      >
        <spriteMaterial map={texture} />
      </sprite>

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
