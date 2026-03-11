import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cylinder, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Coin({ position, rotationSpeed, floatSpeed }: { position: [number, number, number], rotationSpeed: number, floatSpeed: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.z += rotationSpeed * 0.5;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <Cylinder args={[0.4, 0.4, 0.08, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={1} 
            roughness={0.1} 
            emissive="#9f81b9"
            emissiveIntensity={0.5}
          />
          <Text
            position={[0, 0.041, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.25}
            color="#9f81b9"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            $
          </Text>
        </Cylinder>
      </group>
    </Float>
  );
}

function CoinsGroup() {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const scrollPos = useRef(0);

  const coins = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * viewport.width * 6, // Wider spread
        (Math.random() - 0.5) * 120 - 50, // Much taller spread
        (Math.random() - 0.5) * 40 - 25,  // Pushed further back
      ] as [number, number, number],
      rotationSpeed: 0.001 + Math.random() * 0.008,
      floatSpeed: 0.1 + Math.random() * 0.8,
      sizeScale: 1.2 + Math.random() * 2.8, // Massive coins
    }));
  }, [viewport]);
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollPos.current = self.progress;
      }
    });
    return () => trigger.kill();
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Parallax movement based on scroll
    const targetY = scrollPos.current * 40;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
  });

  return (
    <group ref={groupRef}>
      {coins.map((c) => (
        <group key={c.id} scale={c.sizeScale}>
          <Coin position={c.position} rotationSpeed={c.rotationSpeed} floatSpeed={c.floatSpeed} />
        </group>
      ))}
    </group>
  );
}

export function ThreeDCoinsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
        <pointLight position={[-15, -10, 5]} intensity={1.5} color="#A78BFA" />
        <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={4} color="#9f81b9" />
        <CoinsGroup />
      </Canvas>
    </div>
  );
}
