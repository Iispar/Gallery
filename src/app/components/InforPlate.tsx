/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Html, Text } from "@react-three/drei";
import { Group } from "three";

export default function InfoPlate(props: any) {
  const {
    author,
    year,
    countryFin,
    countryEng,
    name,
    size,
    date,
    typeFin,
    typeEng,
    x,
    y,
  } = props;
  const { gl } = useThree();
  const [infoPlate, setInfoPlate] = useState<HTMLDivElement | null>(null);
  const groupRef = useRef<Group>(null);
  useEffect(() => {
    if (infoPlate && infoPlate.parentElement) {
      infoPlate.parentElement.style.pointerEvents = "none";
    }
  }, [infoPlate]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.updateMatrixWorld(); // Forces immediate update
    }
  });

  return (
    <group ref={groupRef} position={[x, y, -0.03]}>
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.5, 0.01]}></boxGeometry>
        <meshStandardMaterial color="white" />
        <Text
          letterSpacing={0.1}
          fontSize={0.13}
          anchorX="left"
          position={[-0.59, 0.16, 0.01]}
          color="#333333"
        >
          {name}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          anchorX="left"
          position={[-0.57, 0.02, 0.01]}
          color="#333333"
        >
          {size}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          anchorX="left"
          position={[-0.57, -0.08, 0.01]}
          color="#333333"
        >
          {date}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          anchorX="left"
          position={[-0.57, -0.18, 0.01]}
          color="#333333"
        >
          {typeFin}/{typeEng}
        </Text>
      </mesh>
    </group>
  );
}
