/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, Html } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";
import InfoPlate from "./InforPlate";

export default function Painting(props: any) {
  const { id, position, w, h, setClicked, clicked } = props;
  const texture = useLoader(TextureLoader, "image.jpeg");
  const { gl } = useThree();
  const scroll = useScroll();
  const [scrollLeft, setScrollLeft] = useState(0);

  const groupRef = useRef(null);

  const resetImage = () => {
    setClicked(null);
    scroll.el.scrollLeft = scrollLeft;
  };

  const setImage = (props: unknown) => {
    setClicked({ position: position, hash: id, ref: groupRef });
    setScrollLeft(scroll.el.scrollLeft);
  };

  return (
    <group ref={groupRef} position={position}>
      {clicked?.hash == id ? (
        <Html
          position={[+0.5, 2.2, 0]}
          transform
          portal={{ current: gl.domElement.parentNode }}
        >
          <div onClick={() => resetImage()}>
            <p className="returnBtn">RETURN</p>
          </div>
        </Html>
      ) : (
        <></>
      )}

      <mesh
        castShadow
        scale={[w, h, 1]}
        onClick={() =>
          setImage({ position: position, hash: id, ref: groupRef })
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
