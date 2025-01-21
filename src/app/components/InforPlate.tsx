/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { Html } from "@react-three/drei";

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

  useEffect(() => {
    if (infoPlate && infoPlate.parentElement) {
      infoPlate.parentElement.style.pointerEvents = "none";
    }
    console.log(gl);
  }, [infoPlate]);

  return (
    <mesh position={[1.9, -1.3, 0]} castShadow>
      <boxGeometry args={[1.3, 0.5, 0.1]} />
      <meshStandardMaterial color="white" />

      <Html
        transform
        portal={{ current: gl.domElement.parentNode }}
        ref={setInfoPlate}
      >
        <div className="infoPlate">
          {/*         <div>
            <p className="infoPlate__title">{author}</p>
            <div className="infoPlate__year">
              <div className="infoPlate__year__star"></div>
              <p className="infoPlate__year__text">{year}</p>
            </div>
            <p className="infoPlate__body">
              {countryFin}/{countryEng}
            </p>
          </div> */}

          <div className="infoPlate__title">{name}</div>
          <div>
            <p className="infoPlate__body">{size}</p>
            <div className="infoPlate__body">{date}</div>
            <div className="infoPlate__body">
              {typeFin}/{typeEng}
            </div>
          </div>
        </div>
      </Html>
    </mesh>
  );
}
