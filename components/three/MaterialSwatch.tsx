"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Service } from "@/lib/content";
import { createGridTexture } from "./proceduralTextures";

function GlassSwatch() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <mesh ref={ref} rotation={[0.3, 0.4, 0]}>
      <planeGeometry args={[1.3, 1.6]} />
      <meshPhysicalMaterial
        color="#eef3f2"
        transmission={1}
        thickness={0.4}
        roughness={0.08}
        ior={1.4}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SteelSwatch() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ref} rotation={[0.2, 0.3, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 0.5, 0.06]} />
        <meshStandardMaterial color="#c9c4b8" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.1, 0.5, 0.06]} />
        <meshStandardMaterial color="#a8a296" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function AirflowSwatch() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 64;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const radius = 0.55;
      arr[i * 3] = Math.cos(t) * radius;
      arr[i * 3 + 1] = (i / count - 0.5) * 1.6;
      arr[i * 3 + 2] = Math.sin(t) * radius;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c7a06b" size={0.05} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function ConduitSwatch() {
  const ref = useRef<THREE.Group>(null);
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, -0.3, 0),
      new THREE.Vector3(-0.2, 0.35, 0.15),
      new THREE.Vector3(0.2, -0.25, -0.1),
      new THREE.Vector3(0.6, 0.3, 0),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.05, 8, false);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={ref}>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#7a5c37"
          metalness={0.5}
          roughness={0.35}
          emissive="#9c7a4e"
          emissiveIntensity={0.4}
        />
      </mesh>
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={x} position={[x, i % 2 === 0 ? -0.28 : 0.3, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#c7a06b" emissive="#c7a06b" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function BeaconSwatch() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const pulse = 0.85 + Math.sin(state.clock.elapsedTime * 2.4) * 0.15;
    meshRef.current?.scale.setScalar(pulse);
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.6;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#9c7a4e"
          emissive="#c7864a"
          emissiveIntensity={1.1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.02, 8, 48]} />
        <meshStandardMaterial color="#c7a06b" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function LatticeSwatch() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref} rotation={[0.3, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshBasicMaterial color="#4a4033" wireframe />
      </mesh>
    </group>
  );
}

function BlueprintSwatch() {
  const ref = useRef<THREE.Mesh>(null);
  const gridTexture = useMemo(() => createGridTexture(), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.15;
  });

  return (
    <mesh ref={ref} rotation={[0.4, 0.2, 0]}>
      <planeGeometry args={[1.6, 1.6]} />
      <meshBasicMaterial
        map={gridTexture ?? undefined}
        color="#c7a06b"
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SwatchScene({ material }: { material: Service["material"] }) {
  switch (material) {
    case "glass":
      return <GlassSwatch />;
    case "steel":
      return <SteelSwatch />;
    case "airflow":
      return <AirflowSwatch />;
    case "conduit":
      return <ConduitSwatch />;
    case "beacon":
      return <BeaconSwatch />;
    case "lattice":
      return <LatticeSwatch />;
    case "blueprint":
      return <BlueprintSwatch />;
    default:
      return null;
  }
}

/** A small, cheap per-service 3D swatch — mount only while visible (see useInView in the caller). */
export default function MaterialSwatch({ material }: { material: Service["material"] }) {
  return (
    <Canvas dpr={1} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 3], fov: 32 }}>
      <ambientLight intensity={0.5} color="#4a4033" />
      <directionalLight position={[2, 3, 2]} intensity={1} color="#fff4e0" />
      <pointLight position={[-1.5, 0.5, -1]} intensity={6} color="#c7864a" distance={5} />
      <SwatchScene material={material} />
    </Canvas>
  );
}
