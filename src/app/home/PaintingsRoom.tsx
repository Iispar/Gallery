/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useThree } from "@react-three/fiber";
import { Html, useScroll } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export default function PaintingsRoom(props: any) {
  const { clicked, setClicked } = props;
  const { width } = useThree((state: any) => state.viewport);

  const scroll = useScroll();
  const [descriptionElement, setDescriptionElement] =
    useState<HTMLDivElement | null>(null);
  const [instructionsElement, setInsturctionsElement] =
    useState<HTMLDivElement | null>(null);

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";
  const { gl } = useThree();
  const isDraggingRef = useRef(false);
  let lastX: any = null;
  let lastTime = 0;
  const cameraPos = window.innerWidth < 800 ? 7 : 5;
  const zoomZ = window.innerWidth < 800 ? 5.5 : 3.3;
  const zoomX = window.innerWidth < 800 ? 0.68 : 0.75;

  useFrame((state) => {
    // TODO: When scrolling in clicked state scrolling is allowed. Scroll > leave > scroll
    // results in the scrolling to jump
    if (clicked && current !== clicked.hash) {
      const clickedPosition = new THREE.Vector3();

      clicked.ref.current.getWorldPosition(clickedPosition); // Get the world position

      vec.set(
        clickedPosition.x + zoomX,
        clickedPosition.y,
        clickedPosition.z + zoomZ
      );

      current = clicked.hash;
    } else if (clicked === null) {
      vec.set(0, 0, cameraPos);
      current = "";
    }

    state.camera.position.lerp(vec, 0.03);
    state.camera.updateMatrixWorld();
  });

  const handleDrag = (e: any) => {
    if (!isDraggingRef.current) return;

    const currentTime = Date.now();

    if (lastX === null) {
      lastX = e.clientX;
      lastTime = currentTime;
      return;
    }

    const deltaX = e.clientX - lastX;
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
      const velocity = Math.abs(deltaX / deltaTime);
      const speedFactor = Math.min(velocity * 2, 4);

      scroll.el.scrollLeft += deltaX * speedFactor * -1;
    }

    lastX = e.clientX;
    lastTime = currentTime;
  };

  const handlePointerDown = () => {
    isDraggingRef.current = true;
    lastX = null;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    lastX = null;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleDrag);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handleDrag);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    if (instructionsElement && instructionsElement.parentElement) {
      instructionsElement.parentElement.style.pointerEvents = "none";
    }
  }, [instructionsElement]);

  useEffect(() => {
    if (descriptionElement && descriptionElement.parentElement) {
      descriptionElement.parentElement.style.pointerEvents = "none";
    }
  }, [descriptionElement]);

  return (
    <>
      <mesh position={[0, 3.7, -0.23]}>
        <Html
          transform
          portal={{ current: gl.domElement.parentNode }}
          ref={setInsturctionsElement}
        >
          <p className="instructions">scroll or drag to view the art pieces.</p>
        </Html>
      </mesh>
      <mesh position={[-width / 2 + 1.8, 0.4, -0.23]} castShadow>
        <boxGeometry args={[3.2, 5, 0.1]} />
        <meshStandardMaterial color="white" />

        <Html
          position={[0, 0, -0.01]}
          transform
          portal={{ current: gl.domElement.parentNode }}
          ref={setDescriptionElement}
        >
          <div className="infoWrapper">
            <h1 className="infoWrapper__title">Iiro Partanen</h1>
            <p className="infoWrapper__body">
              This is my personal gallery of art works that I have created and
              will create in the future. Art is something I enjoy doing in my
              free time, but by profession I am a software engineer. If there is
              some need to contact me you can reach me by email. Please also
              check out my github :).
            </p>
            <div className="infoWrapper__contact">
              <p>iiro.s.partanen@gmail.com</p>
              <p> github.com/iispar</p>
            </div>
          </div>
        </Html>
      </mesh>
      {paintings.map((illu, idx) => (
        <Painting
          setClicked={(e: any) => setClicked(e)}
          clicked={clicked}
          key={idx}
          id={idx}
          position={[(1 + idx) * xW - width / 2, 1, -0.23]}
          w={w}
          h={h}
        />
      ))}

      <Wall screenWidth={width} w={(paintings.length + 2) * xW} />
      <Floor screenWidth={width} w={(paintings.length + 2) * xW} />
    </>
  );
}
