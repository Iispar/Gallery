/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, Html } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";
import InfoPlate from "./InforPlate";

export default function Painting(props: any) {
  const {
    id,
    position,
    w,
    h,
    setClicked,
    clicked,
    author,
    year,
    countryFin,
    countryEng,
    name,
    sizeX,
    sizeY,
    date,
    typeFin,
    typeEng,
    imageUrl,
  } = props;
  const texture = useLoader(TextureLoader, imageUrl as string);
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
          position={[0.8, 2.2, 0]}
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
        scale={[sizeY / 100, sizeX / 100, 1]}
        onClick={() =>
          setImage({ position: position, hash: id, ref: groupRef })
        }
      >
        <boxGeometry attach="geometry" args={[1, 1, 0.1]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>

      <InfoPlate
        author={author}
        year={year}
        countryFin={countryFin}
        countryEng={countryEng}
        name={name}
        size={sizeX + "x" + sizeY}
        date={date}
        typeFin={typeFin}
        typeEng={typeEng}
        x={sizeX / 350 + 1.1}
        y={-(sizeY / 100) + 0.9}
      />
    </group>
  );
}
