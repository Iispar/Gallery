import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import React, { useEffect, useRef, useState } from "react";
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
  const [infoPlate, setInfoPlate] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (infoPlate && infoPlate.parentElement) {
      infoPlate.parentElement.style.pointerEvents = "none";
    }
  }, [infoPlate]);

  return (
    <mesh position={[1.9, -1.1, 0]} castShadow>
      <boxGeometry args={[1.3, 1, 0.1]} />
      <meshStandardMaterial color="white" />

      <Html
        style={{ pointerEvents: "none" }}
        transform
        portal={{ current: gl.domElement.parentNode }}
        ref={setInfoPlate}
      >
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
