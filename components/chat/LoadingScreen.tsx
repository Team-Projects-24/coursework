// LoadingScreen.tsx

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Loader } from "@react-three/drei";
import SwirlingSymbol from "./SwirlingSymbol";

const LoadingScreen: React.FC = () => {
  return (
    <Canvas>
      <Html center>
        <Loader />
      </Html>
      <SwirlingSymbol />
    </Canvas>
  );
};

export default LoadingScreen;
