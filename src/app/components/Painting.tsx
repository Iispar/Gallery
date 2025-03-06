/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScroll, Text, DragControls, Center } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Matrix4, TextureLoader, Vector3 } from "three";
import InfoPlate from "./InforPlate";
import { lerp } from "three/src/math/MathUtils";
import * as THREE from "three";

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
  const [drag, setDrag] = useState(false);
  const vec = new THREE.Vector3();
  let speed = 0.1;
  let dragSpeed = 0.1;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const groupRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const zoomZ = window.innerWidth < 800 ? 2.3 : 2.3;
  const zoomX = 0.7;

  const resetImage = () => {
    meshRef.current!.rotation.y = 0;
    meshRef.current!.rotation.x = 0;
    meshRef.current!.position.z = lerp(0, 0, 0);
    meshRef.current!.position.x = lerp(0, 0, 0);
    setClicked(null);
    scroll.el.scrollLeft = scrollLeft;
  };

  useFrame((state) => {
    if (doubleClick && clicked && clicked.hash === id) {
      const zoom = zoomZ - sizeY / 600;
      vec.set(zoomX, 0, zoom);
    } else if (clicked) {
      vec.set(0, 0, 0);
    }

    if (!meshRef.current!.position.equals(vec)) {
      if (isMobile) speed = 0.2;
      else speed = 0.1;
      meshRef.current!.position.lerp(vec, speed);
    }
  });

  const setImage = (props: unknown) => {
    if (clicked && id === clicked.hash && !doubleClick) {
      setDoubleClick(true);
    } else if (!drag) {
      setDoubleClick(false);
      meshRef.current!.rotation.y = 0;
      meshRef.current!.rotation.x = 0;
      meshRef.current.rotation.z = 0;
      setClicked({ position: position, hash: id, ref: groupRef });
    }
    setScrollLeft(scroll.el.scrollLeft);
  };

  const clamp = (value: any, min: any, max: any) =>
    Math.min(Math.max(value, min), max);

  const onDragEnd = () => {
    setDrag(false);
  };

  const onDragStart = () => {
    setDrag(true);
  };

  const [prevPos, setPrevPos] = useState(new Vector3());

  const onDrag = (
    localMatrix: any,
    deltaLocalMatrix: any,
    worldMatrix: any,
    deltaWorldMatrix: any
  ) => {
    if (doubleClick) {
      const currentPosition = new Vector3().setFromMatrixPosition(localMatrix);

      const change = new Vector3().subVectors(currentPosition, prevPos);

      if (isMobile) dragSpeed = 0.4;
      else dragSpeed = 0.2;

      const newRotationX = clamp(
        meshRef.current.rotation.x - change.y * dragSpeed,
        -Math.PI / 10,
        Math.PI / 10
      );
      const newRotationY = clamp(
        meshRef.current.rotation.y + change.x * dragSpeed,
        -Math.PI / 10,
        Math.PI / 10
      );

      let dir = 0;
      if ((change.x < 0 && change.y < 0) || (change.x > 0 && change.y > 0)) {
        dir = Math.min(Math.abs(change.x), Math.abs(change.y));
      } else {
        dir = -Math.min(Math.abs(change.x), Math.abs(change.y));
      }

      const newRotationZ = clamp(
        meshRef.current.rotation.z + (dir / 2) * dragSpeed,
        -Math.PI / 40,
        Math.PI / 40
      );

      meshRef.current.rotation.x = newRotationX;
      meshRef.current.rotation.y = newRotationY;
      meshRef.current.rotation.z = newRotationZ;

      setPrevPos(currentPosition);
    }
  };

  return (
    <group ref={groupRef} position={position}>
      {clicked?.hash == id && !doubleClick ? (
        <mesh onClick={() => resetImage()}>
          <Text
            fontSize={0.3}
            letterSpacing={0.2}
            position={[0.85, 2.4, 0]}
            color="grey"
            fontWeight={400}
          >
            RETURN
          </Text>
        </mesh>
      ) : (
        <></>
      )}

      {clicked?.hash == id && !doubleClick ? (
        <mesh onClick={() => resetImage()}>
          <Text
            fontSize={0.1}
            position={[0, -paintingSizeY / 200 - 0.15, 0]}
            anchorX="center"
            letterSpacing={0.2}
            color="grey"
            fontWeight={400}
          >
            click to inspect
          </Text>
        </mesh>
      ) : (
        <></>
      )}

      <DragControls
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        autoTransform={false}
      >
        <mesh
          castShadow={!doubleClick}
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
