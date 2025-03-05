/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, Text, DragControls } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";
import InfoPlate from "./InforPlate";
import { lerp } from "three/src/math/MathUtils";

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
  const [doubleClick, setDoubleClick] = useState(false);

  const groupRef = useRef<any>(null);
  const meshRef = useRef<any>(null);

  const resetImage = () => {
    meshRef.current!.position.z = lerp(0, 0, 0);
    meshRef.current!.position.x = lerp(0, 0, 0);
    setClicked(null);
    scroll.el.scrollLeft = scrollLeft;
  };

  const setImage = (props: unknown) => {
    if (clicked && id === clicked.hash && !doubleClick) {
      setDoubleClick(true);
      meshRef.current!.position.z = lerp(
        meshRef.current!.position.z,
        60,
        0.025
      );
      meshRef.current!.position.x = lerp(
        meshRef.current!.position.x,
        35,
        0.025
      );
    } else {
      setDoubleClick(false);
      meshRef.current!.rotation.y = 0;
      meshRef.current!.rotation.x = 0;
      meshRef.current!.position.z = lerp(0, 0, 0);
      meshRef.current!.position.x = lerp(0, 0, 0);
      setClicked({ position: position, hash: id, ref: groupRef });
    }
    setScrollLeft(scroll.el.scrollLeft);
  };

  const clamp = (value: any, min: any, max: any) =>
    Math.min(Math.max(value, min), max);

  const onDrag = () => {
    if (doubleClick) {
      console.log("call");
    }
  };

  return (
    <group ref={groupRef} position={position}>
      {clicked?.hash == id ? (
        <mesh onClick={() => resetImage()}>
          <Text
            fontSize={0.3}
            letterSpacing={0.2}
            position={[0.85, 2.0, 0.1]}
            color="grey"
            fontWeight={400}
          >
            RETURN
          </Text>
        </mesh>
      ) : (
        <></>
      )}

      <DragControls onDrag={onDrag}>
        <mesh
          castShadow
          ref={meshRef}
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
      </DragControls>

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
