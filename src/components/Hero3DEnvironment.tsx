import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const BackgroundScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Gentle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Floating abstract objects */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-4, 2, -5]}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial color="#4f46e5" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.4} speed={2} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[5, -2, -8]}>
        <mesh>
          <torusGeometry args={[1.5, 0.4, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={3} position={[-2, -3, -4]}>
        <mesh>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} wireframe />
        </mesh>
      </Float>
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#4f46e5" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
};

export const Hero3DEnvironment = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 20]} />
        <BackgroundScene />
      </Canvas>
      {/* Gradient overlay to blend with rest of the site */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
};
