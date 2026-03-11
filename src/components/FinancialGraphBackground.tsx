import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function DataBeam({ position, height, delay }: { position: [number, number, number], height: number, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + delay;
    meshRef.current.scale.y = 1 + Math.sin(time * 0.5) * 0.2;
    meshRef.current.position.y = (height * meshRef.current.scale.y) / 2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.05, height, 0.05]} />
      <meshStandardMaterial 
        color="#9f81b9" 
        transparent 
        opacity={0.6} 
        emissive="#9f81b9"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Grid() {
  const size = 100;
  const divisions = 50;
  return (
    <gridHelper 
      args={[size, divisions, '#9f81b9', '#cbd5e1']} 
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]}
    />
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollPos = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const beams = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        -2,
        (Math.random() - 0.5) * 30 - 10,
      ] as [number, number, number],
      height: 2 + Math.random() * 8,
      delay: Math.random() * 10,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollPos.current = self.progress;
      }
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      trigger.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth vertical scroll movement
    const targetY = scrollPos.current * 10;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    
    // Subtle Mouse Tilt (Focused on the ground plane)
    const targetRotationX = 0.5 + mouse.current.y * 0.1;
    const targetRotationY = mouse.current.x * 0.1;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);

    // Subtle drift
    const time = state.clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(time * 0.1) * 0.5;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <pointLight position={[20, 20, 20]} intensity={2.5} color="#9f81b9" />
      <spotLight position={[-15, 30, 15]} angle={0.25} penumbra={1} intensity={4} color="#ffffff" />
      
      <Grid />
      
      {beams.map((b, i) => (
        <DataBeam key={i} {...b} />
      ))}

      {/* Adding more grounded chart lines */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Line
          points={[[-15, -1, -10], [-5, 2, -5], [5, 0, 0], [15, 4, 5]]}
          color="#9f81b9"
          lineWidth={2}
          transparent
          opacity={0.3}
        />
      </Float>

      <fog attach="fog" args={['#ffffff', 10, 40]} />
    </group>
  );
}

export function FinancialGraphBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={45} />
        <Scene />
      </Canvas>
    </div>
  );
}
