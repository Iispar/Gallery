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
    <group ref={groupRef} position={[1.9, -1.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.5, 0.1]}></boxGeometry>
        <meshStandardMaterial color="white" />
        <Text
          letterSpacing={0.1}
          fontSize={0.13}
          position={[-0.04, 0.16, 0.06]}
          color="black"
        >
          {name}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          position={[-0.42, 0.01, 0.05]}
          color="black"
        >
          {size}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          position={[-0.36, -0.09, 0.05]}
          color="black"
        >
          {date}
        </Text>
        <Text
          letterSpacing={0.1}
          fontSize={0.07}
          position={[-0.29, -0.19, 0.05]}
          color="black"
        >
          {typeFin}/{typeEng}
        </Text>
      </mesh>
    </group>
  );
}
