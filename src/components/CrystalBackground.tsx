import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function EnergySphere({ position, color, size, speed, distort }: { position: [number, number, number], color: string, size: number, speed: number, distort: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          transparent
          opacity={0.3}
          roughness={0}
          metalness={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollPos = useRef(0);

  const spheres = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30, // Tall spread
        (Math.random() - 0.5) * 5 - 10,
      ] as [number, number, number],
      color: i % 3 === 0 ? '#9f81b9' : i % 3 === 1 ? '#C084FC' : '#E879F9',
      size: 0.8 + Math.random() * 2,
      speed: 1 + Math.random() * 2,
      distort: 0.3 + Math.random() * 0.4,
    }));
  }, []);

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
    const targetY = scrollPos.current * 20;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#9f81b9" intensity={1} />
      
      {spheres.map((s, i) => (
        <EnergySphere key={i} {...s} />
      ))}
      
      <fog attach="fog" args={['#ffffff', 5, 20]} />
    </group>
  );
}

export function CrystalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
