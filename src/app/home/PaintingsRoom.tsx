/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text } from "@react-three/drei";
import Floor from "../components/Floor";
import Wall from "../components/Wall";
import Painting from "../components/Painting";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { painting } from "../data/paintings";

export default function PaintingsRoom(props: any) {
  const { clicked, setClicked } = props;
  const { width } = useThree((state: any) => state.viewport);

  const scroll = useScroll();

  const w = 2.2;
  const h = 1.4;
  const gap = 2;
  const paintings = painting;
  const xW = w + gap;
  const vec = new THREE.Vector3();
  let current = "";
  const isDraggingRef = useRef(false);
  let lastX: any = null;
  let lastTime = 0;
  const cameraPos = window.innerWidth < 800 ? 6 : 5;
  const zoomZ = window.innerWidth < 800 ? 4.5 : 4.2;
  const zoomX = window.innerWidth < 800 ? 0.68 : 0.75;
  let speed = 0.03;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useFrame((state) => {
    // TODO: When scrolling in clicked state scrolling is allowed. Scroll > leave > scroll
    // results in the scrolling to jump
    if (clicked && current !== clicked.hash) {
      const clickedPosition = new THREE.Vector3();

      clicked.ref.current.getWorldPosition(clickedPosition);

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

    if (!state.camera.position.equals(vec)) {
      if (isMobile) speed = 0.1;
      else speed = 0.03;
      state.camera.position.lerp(vec, speed);
      state.camera.updateMatrixWorld();
    }
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
      const speedFactor = Math.min(velocity * 2, 1);

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
    window.addEventListener("pointermove", (e) => handleDrag(e));
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", (e) => handleDrag(e));
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
          scroll, drag, and click to view the art pieces.
        </Text>
      </mesh>
      <mesh position={[-width / 2 + 1.8, 0.4, -0.22]} castShadow>
        <boxGeometry args={[3, 5, 0.03]} />
        <meshStandardMaterial color="white" />

        <Text
          letterSpacing={0.2}
          fontSize={0.3}
          fontWeight={500}
          position={[-0, 2.2, 0.02]}
          color="#333333"
        >
          Iiro Partanen
        </Text>
        <Text
          letterSpacing={0.2}
          textAlign="justify"
          maxWidth={2.6}
          fontSize={0.16}
          position={[0, 0.5, 0.02]}
          color="#333333"
        >
          This is my personal gallery of art works that I have created and will
          create in the future. Art is something I enjoy doing in my free time,
          but by profession I am a software engineer. If there is some need to
          contact me you can reach me by email. Please also check out my github
          :)
        </Text>
        <mesh
          onClick={() =>
            (window.location.href = "mailto:iiro.s.partanen@gmail.com")
          }
        >
          <Text
            letterSpacing={0.2}
            fontSize={0.13}
            position={[0.28, -2.1, 0.02]}
            color="#0000EE"
          >
            iiro.s.partanen@gmail.com
          </Text>
        </mesh>
        <mesh
          onClick={() => (window.location.href = "https://github.com/iispar")}
        >
          <Text
            letterSpacing={0.2}
            fontSize={0.13}
            position={[0.66, -2.3, 0.02]}
            color="#0000EE"
          >
            github.com/iispar
          </Text>
        </mesh>
      </mesh>

      {paintings.map((painting, idx) => (
        <Painting
          setClicked={(e: any) => setClicked(e)}
          clicked={clicked}
          key={idx}
          id={idx}
          position={[1 + (1 + idx) * xW - width / 2, 1, -0.2]}
          w={w}
          h={h}
          author={painting.author}
          year={painting.year}
          countryFin={painting.countryFin}
          countryEng={painting.countryEng}
          name={painting.name}
          sizeX={painting.sizeX}
          sizeY={painting.sizeY}
          date={painting.date}
          typeFin={painting.typeFin}
          typeEng={painting.typeEng}
          imageUrl={painting.imageUrl}
          paintingSizeX={painting.paintingSizeX}
          paintingSizeY={painting.paintingSizeY}
        />
      ))}

      <Wall screenWidth={width} w={(paintings.length + 2) * xW} />
      <Floor screenWidth={width} w={(paintings.length + 2) * xW} />
    </>
  );
}
