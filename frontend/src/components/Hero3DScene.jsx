import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere, Icosahedron, Stars } from '@react-three/drei';

function CoreShield() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.15;
      outerRef.current.rotation.x += delta * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Deep inner glowing core */}
      <Sphere ref={innerRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial 
          color="#10b981" 
          emissive="#06b6d4"
          emissiveIntensity={1.5}
          distort={0.4} 
          speed={2} 
          roughness={0.2}
        />
      </Sphere>

      {/* Outer Glass/Obsidian Shell */}
      <Icosahedron ref={outerRef} args={[2.4, 2]}>
        <meshPhysicalMaterial 
          color="#0c1324"
          transmission={0.9} // Glass effect
          opacity={1}
          metalness={0.1}
          roughness={0.05}
          ior={1.5}
          thickness={2.5}
          specularColor="#4edea3"
          specularIntensity={1}
          envMapIntensity={2}
          wireframe={false}
        />
      </Icosahedron>

      {/* Kinetic wireframe cage */}
      <Icosahedron args={[2.7, 1]} rotation={[Math.PI / 4, 0, 0]}>
        <meshBasicMaterial 
          color="#4cd7f6" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </Icosahedron>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['transparent']} />
        
        {/* Cinematic lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4edea3" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#4cd7f6" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#c0c1ff" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <CoreShield />
        </Float>

        {/* Ambient starfield / mesh background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />

        {/* HDRI Environment for realistic glass reflections */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
