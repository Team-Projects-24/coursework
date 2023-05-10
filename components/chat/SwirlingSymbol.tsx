// SwirlingSymbol.tsx

import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Mesh } from "three";

//This is the texture of the globe
const textureUrl =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg";

//This is the spinning globe

const SwirlingSymbol: React.FC = () => {
  // This reference will give us direct access to the mesh
  //   const mesh = React.useRef<THREE.Mesh>(null!);
  const mesh = useRef<Mesh>(null!);

  const speed = 0.01;
  let angle = 0;

  const texture = useLoader(TextureLoader, textureUrl);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
    angle += speed;
    // mesh.current.position.x = Math.cos(angle);
    // mesh.current.position.y = Math.sin(angle);
    // mesh.current.position.z = angle * 0.1;
  });

  useEffect(() => {
    // Set the initial tilt of the globe
    mesh.current.rotation.x = 20 * (Math.PI / 180); // convert degrees to radians
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={mesh}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
};

//This is a spinning doughnut/torus

// const SwirlingSymbol: React.FC = () => {
//   // This reference will give us direct access to the mesh
//   const mesh = React.useRef<THREE.Mesh>(null!);

//   const speed = 0.01;
//   let angle = 0;

//   // Rotate mesh every frame, this is outside of React without overhead
//   useFrame((state, delta) => {
//     mesh.current.rotation.x += 0.01;
//     mesh.current.rotation.y += 0.01;
//     angle += speed;
//     mesh.current.position.x = Math.cos(angle);
//     mesh.current.position.y = Math.sin(angle);
//     // mesh.current.position.z = angle * 0.1;
//   });

//   return (
//     <>
//       <ambientLight intensity={0.8} />
//       <pointLight position={[10, 10, 10]} />
//       <mesh ref={mesh}>
//         <torusGeometry args={[1, 0.4, 16, 100]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </>
//   );
// };

//This is a spinning sphere
// const SwirlingSymbol: React.FC = () => {
//   // This reference will give us direct access to the mesh
//   const mesh = React.useRef<THREE.Mesh>(null!);

//   // Spiral movement parameters
//   const speed = 0.01;
//   let angle = 0;

//   // Move mesh in a spiral pattern
//   useFrame(() => {
//     angle += speed;
//     mesh.current.position.x = Math.cos(angle);
//     mesh.current.position.y = Math.sin(angle);
//     mesh.current.position.z = angle * 0.1;
//   });

//   return (
//    <>
//     <ambientLight intensity={0.8} />
//     <pointLight position={[10, 10, 10]} />
//     <mesh ref={mesh}>
//       <sphereGeometry args={[0.5, 32, 32]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   </>
//   );
// };

export default SwirlingSymbol;
