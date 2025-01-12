import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import React, { useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

export default function InfoPlate(props) {
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

  return (
    <mesh position={[1.8, -1.1, 0]} castShadow>
      <boxGeometry args={[1, 1, 0.05]} />
      <meshStandardMaterial color="white" />

      <Html transform portal={{ current: gl.domElement.parentNode }}>
        <div style={{ pointerEvents: "none" }}>
          <p style={{ fontSize: "5px" }}>{author}</p>
          <p style={{ fontSize: "3px" }}>{year}</p>
          <p style={{ fontSize: "3px" }}>
            {countryFin} | {countryEng}
          </p>
          <p style={{ fontSize: "5px" }}>{name}</p>
          <p style={{ fontSize: "3px" }}>{size}</p>
          <p style={{ fontSize: "3px" }}>{date}</p>
          <p style={{ fontSize: "3px" }}>
            {typeFin} | {typeEng}
          </p>
        </div>
      </Html>
    </mesh>
  );
}
