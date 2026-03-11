import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BRAND_COLOR = '#9f81b9';

function Candlestick({ position, height, delay }: { position: [number, number, number], height: number, delay: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + delay;
    const pulse = 1 + Math.sin(time * 0.8) * 0.1;
    meshRef.current.scale.y = pulse;
  });

  return (
    <group position={position} ref={meshRef}>
      {/* The Wick */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.02, height * 1.5, 0.02]} />
        <meshStandardMaterial color={BRAND_COLOR} transparent opacity={0.3} />
      </mesh>
      {/* The Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, height, 0.15]} />
        <meshStandardMaterial 
          color={BRAND_COLOR} 
          transparent 
          opacity={0.6} 
          emissive={BRAND_COLOR}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function TrendLine({ points, color, opacity, delay }: { points: [number, number, number][], color: string, opacity: number, delay: number }) {
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime() + delay;
    lineRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={opacity}
    />
  );
}

function Grid() {
  const size = 120;
  const divisions = 60;
  return (
    <gridHelper 
      args={[size, divisions, BRAND_COLOR, '#cbd5e1']} 
      position={[0, -4, 0]} 
      transparent
      opacity={0.15}
    />
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollPos = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const candlesticks = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        -4 + (Math.random() * 2), // Slightly staggered height
        (Math.random() - 0.5) * 40 - 10,
      ] as [number, number, number],
      height: 0.5 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  const lines = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const startX = (Math.random() - 0.5) * 40;
      const startZ = (Math.random() - 0.5) * 20 - 5;
      const pts: [number, number, number][] = [];
      for (let j = 0; j < 15; j++) {
        pts.push([
          startX + j * 3,
          -2 + Math.random() * 6,
          startZ + (Math.random() - 0.5) * 5
        ]);
      }
      return { 
        points: pts, 
        color: i % 2 === 0 ? BRAND_COLOR : '#A78BFA',
        opacity: 0.2 + Math.random() * 0.3,
        delay: Math.random() * 10 
      };
    });
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
    const targetY = scrollPos.current * 8;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    
    // Mouse Tilt 
    const targetRotationX = 0.3 + mouse.current.y * 0.08;
    const targetRotationY = mouse.current.x * 0.1;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);

    // Subtle drift
    const time = state.clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(time * 0.1) * 0.5;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <pointLight position={[20, 20, 20]} intensity={2} color={BRAND_COLOR} />
      <spotLight position={[-20, 40, 20]} angle={0.2} penumbra={1} intensity={5} color="#ffffff" />
      
      <Grid />
      
      {candlesticks.map((c, i) => (
        <Candlestick key={i} {...c} />
      ))}

      {lines.map((l, i) => (
        <TrendLine key={i} {...l} />
      ))}

      {/* Floating Sparkles to replicate those data points in the image */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random()} floatIntensity={1} rotationIntensity={0}>
          <mesh position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 30 - 10
          ]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={BRAND_COLOR} emissive={BRAND_COLOR} emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}

      <fog attach="fog" args={['#ffffff', 15, 50]} />
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
        <PerspectiveCamera makeDefault position={[0, 3, 25]} fov={40} />
        <Scene />
      </Canvas>
    </div>
  );
}
