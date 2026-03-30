import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 1200, mousePosition }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;
      
      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    
    return [positions, velocities];
  }, [count]);

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color('#3B82F6'); // Blue
    const color2 = new THREE.Color('#EC4899'); // Pink
    const color3 = new THREE.Color('#06B6D4'); // Cyan
    const color4 = new THREE.Color('#A855F7'); // Purple
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const rand = Math.random();
      let color;
      if (rand < 0.35) color = color1;
      else if (rand < 0.6) color = color2;
      else if (rand < 0.8) color = color3;
      else color = color4;
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return colors;
  }, [count]);

  const sizes = useMemo(() => {
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * 2.5 + 0.5;
    }
    return sizes;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Base movement with wave pattern
      positionArray[i3] += velocities[i3] + Math.sin(time * 0.4 + i * 0.1) * 0.0015;
      positionArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.0015;
      positionArray[i3 + 2] += velocities[i3 + 2];
      
      // Mouse repulsion
      const mouseX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;
      
      const dx = positionArray[i3] - mouseX * viewport.width * 0.5;
      const dy = positionArray[i3 + 1] - mouseY * viewport.height * 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3.5) {
        const force = (3.5 - dist) / 3.5;
        positionArray[i3] += dx * force * 0.04;
        positionArray[i3 + 1] += dy * force * 0.04;
      }
      
      // Boundary wrap
      if (positionArray[i3] > 12) positionArray[i3] = -12;
      if (positionArray[i3] < -12) positionArray[i3] = 12;
      if (positionArray[i3 + 1] > 12) positionArray[i3 + 1] = -12;
      if (positionArray[i3 + 1] < -12) positionArray[i3 + 1] = 12;
      if (positionArray[i3 + 2] > 12) positionArray[i3 + 2] = -12;
      if (positionArray[i3 + 2] < -12) positionArray[i3 + 2] = 12;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.015;
    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  const colorAttribute = useMemo(() => {
    return new THREE.BufferAttribute(colors, 3);
  }, [colors]);

  const sizeAttribute = useMemo(() => {
    return new THREE.BufferAttribute(sizes, 1);
  }, [sizes]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
        <primitive attach="attributes-color" object={colorAttribute} />
        <primitive attach="attributes-size" object={sizeAttribute} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines({ count = 80, mousePosition }: ParticlesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const originalPositions: number[][] = [];
    
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 20;
      const z1 = (Math.random() - 0.5) * 20;
      const x2 = x1 + (Math.random() - 0.5) * 4;
      const y2 = y1 + (Math.random() - 0.5) * 4;
      const z2 = z1 + (Math.random() - 0.5) * 4;
      
      positions[i6] = x1;
      positions[i6 + 1] = y1;
      positions[i6 + 2] = z1;
      positions[i6 + 3] = x2;
      positions[i6 + 4] = y2;
      positions[i6 + 5] = z2;
      
      originalPositions.push([x1, y1, z1, x2, y2, z2]);
    }
    
    return [positions, originalPositions];
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    const positionArray = linesRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    const mouseX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;
    
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const orig = originalPositions[i];
      
      // Wave motion
      const waveX = Math.sin(time * 0.4 + i * 0.15) * 0.25;
      const waveY = Math.cos(time * 0.35 + i * 0.15) * 0.25;
      
      positionArray[i6] = orig[0] + waveX;
      positionArray[i6 + 1] = orig[1] + waveY;
      positionArray[i6 + 3] = orig[3] + waveX;
      positionArray[i6 + 4] = orig[4] + waveY;
      
      // Mouse interaction
      const dx1 = positionArray[i6] - mouseX * viewport.width * 0.3;
      const dy1 = positionArray[i6 + 1] - mouseY * viewport.height * 0.3;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      if (dist1 < 4.5) {
        const force = (4.5 - dist1) / 4.5;
        positionArray[i6] += dx1 * force * 0.025;
        positionArray[i6 + 1] += dy1 * force * 0.025;
      }
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#3B82F6"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function FloatingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (!gridRef.current) return;
    const time = state.clock.elapsedTime;
    gridRef.current.position.z = (time * 0.3) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[35, 35, '#3B82F6', '#1a1a3e']}
      position={[0, -6, 0]}
    />
  );
}

function GradientOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(time * 0.2) * 8;
      orb1Ref.current.position.y = Math.cos(time * 0.15) * 5;
      orb1Ref.current.position.z = Math.sin(time * 0.1) * 3 - 5;
    }
    
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(time * 0.25) * 7;
      orb2Ref.current.position.y = Math.sin(time * 0.2) * 6;
      orb2Ref.current.position.z = Math.cos(time * 0.12) * 4 - 8;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent 
          opacity={0.08}
        />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial 
          color="#EC4899" 
          transparent 
          opacity={0.08}
        />
      </mesh>
    </>
  );
}

function CameraController({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const targetX = (mousePosition.current.x / window.innerWidth - 0.5) * 0.4;
    const targetY = -(mousePosition.current.y / window.innerHeight - 0.5) * 0.4;
    
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function ParticleBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="particle-canvas">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 70 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.4} />
        <CameraController mousePosition={mousePosition} />
        <Particles count={1200} mousePosition={mousePosition} />
        <ConnectionLines count={80} mousePosition={mousePosition} />
        <FloatingGrid />
        <GradientOrbs />
      </Canvas>
    </div>
  );
}
