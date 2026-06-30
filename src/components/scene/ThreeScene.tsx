"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const seed = ((i * 9301 + 49297) % 233280) / 233280;
      const seedY = ((i * 7919 + 104729) % 233280) / 233280;
      const seedZ = ((i * 6151 + 524287) % 233280) / 233280;
      positions[i * 3] = (seed - 0.5) * 20;
      positions[i * 3 + 1] = (seedY - 0.5) * 20;
      positions[i * 3 + 2] = (seedZ - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FogAtmosphere() {
  return <fog attach="fog" args={["#030712", 5, 25]} />;
}

export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <FogAtmosphere />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7C3AED" />
      <ParticleField />
    </Canvas>
  );
}