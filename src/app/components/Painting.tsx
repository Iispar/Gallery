/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, Text } from "@react-three/drei";
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
    paintingSizeX,
    paintingSizeY,
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
        <mesh onClick={() => resetImage()}>
          <Text
            fontSize={0.3}
            letterSpacing={0.2}
            position={[1, 2.0, 0.1]}
            color="grey"
            fontWeight={400}
          >
            RETURN
          </Text>
        </mesh>
      ) : (
        <></>
      )}

      <mesh
        castShadow
        scale={[paintingSizeX / 100, paintingSizeY / 100, 1]}
        onClick={() =>
          setImage({ position: position, hash: id, ref: groupRef })
        }
      >
        <boxGeometry attach="geometry" args={[1, 1, 0.08]} />
        <meshBasicMaterial attach="material-0" color="white" />
        <meshBasicMaterial attach="material-1" color="white" />
        <meshBasicMaterial attach="material-2" color="white" />
        <meshBasicMaterial attach="material-3" color="white" />
        <meshBasicMaterial attach="material-4" map={texture} />
        <meshBasicMaterial attach="material-5" color="white" />
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
        x={paintingSizeX / 200 + 0.8}
        y={-(paintingSizeY / 200) + 0.3}
      />
    </group>
  );
}
