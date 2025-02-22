/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function PaintingsRoom(props: any) {
  const { clicked, setClicked } = props;
  const { width } = useThree((state: any) => state.viewport);

  const scroll = useScroll();

  const w = 2.2;
  const h = 3.4;
  const gap = 3;
  const paintings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";
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

  return (
    <>
      <mesh position={[0, 3.7, -0.23]}>
        <Text
          fontSize={0.16}
          letterSpacing={0.3}
          position={[0, 0, 0]}
          color="grey"
          fontWeight={600}
        >
          scroll or drag to view the art pieces.
        </Text>
      </mesh>
      <mesh position={[-width / 2 + 1.8, 0.4, -0.23]} castShadow>
        <boxGeometry args={[3.2, 5, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <Text
        letterSpacing={0.2}
        fontSize={0.32}
        fontWeight={500}
        position={[-2.26, 2.6, -0.18]}
        color="black"
      >
        Iiro Partanen
      </Text>
      <Text
        letterSpacing={0.2}
        textAlign="justify"
        maxWidth={2.8}
        fontSize={0.16}
        position={[-2.25, 0.9, -0.18]}
        color="black"
      >
        This is my personal gallery of art works that I have created and will
        create in the future. Art is something I enjoy doing in my free time,
        but by profession I am a software engineer. If there is some need to
        contact me you can reach me by email. Please also check out my github
        :).
      </Text>
      <Text
        letterSpacing={0.2}
        fontSize={0.13}
        position={[-1.9, -1.7, -0.18]}
        color="black"
      >
        iiro.s.partanen@gmail.com
      </Text>
      <Text
        letterSpacing={0.2}
        fontSize={0.13}
        position={[-1.53, -1.9, -0.18]}
        color="black"
      >
        github.com/iispar
      </Text>

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
