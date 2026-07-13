"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { createNoiseTexture } from "./proceduralTextures";
import { prefersReducedMotion } from "@/lib/motion";

/** How far the user has scrolled past the hero, 0 (top) to 1 (one viewport down). Cheap enough to read per-frame. */
function getScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  return THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1);
}

type FragmentType = "beam" | "panelGlass" | "panelSteel" | "slabConcrete" | "rodBronze";

type FragmentSpec = {
  id: string;
  type: FragmentType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  delay: number;
};

/** Deterministic pseudo-random jitter derived from a fragment's id, so the render stays pure (no Math.random in render). */
function seededJitter(seed: string, salt: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i) + salt * 17) % 2147483647;
  }
  return h / 2147483647 - 0.5;
}

const FRAGMENTS: FragmentSpec[] = [
  { id: "beam-1", type: "beam", position: [-1.6, 0.9, 0.2], rotation: [0, 0, 0], scale: [2.4, 1, 1], delay: 0.1 },
  { id: "beam-2", type: "beam", position: [1.5, -0.8, -0.3], rotation: [0, Math.PI / 2, 0], scale: [2.0, 1, 1], delay: 0.25 },
  { id: "beam-3", type: "beam", position: [0.2, 1.6, -0.6], rotation: [0, 0, Math.PI / 2], scale: [1.8, 1, 1], delay: 0.4 },
  { id: "panel-glass-1", type: "panelGlass", position: [-0.6, 0.2, 0.6], rotation: [0, 0.3, 0], scale: [1, 1, 1], delay: 0.5 },
  { id: "panel-glass-2", type: "panelGlass", position: [1.0, 0.6, 0.1], rotation: [0, -0.4, 0.1], scale: [0.8, 0.9, 1], delay: 0.65 },
  { id: "panel-steel-1", type: "panelSteel", position: [-1.2, -0.6, -0.2], rotation: [0.1, 0.2, 0], scale: [1, 1, 1], delay: 0.3 },
  { id: "panel-steel-2", type: "panelSteel", position: [0.8, -1.3, 0.4], rotation: [-0.15, 0, 0.05], scale: [0.9, 0.9, 1], delay: 0.55 },
  { id: "slab-concrete-1", type: "slabConcrete", position: [0.4, -0.2, -0.8], rotation: [0, 0.1, 0], scale: [1, 1, 1], delay: 0.15 },
  { id: "slab-concrete-2", type: "slabConcrete", position: [-1.9, -1.1, 0.3], rotation: [0, -0.2, 0], scale: [0.8, 0.8, 1], delay: 0.45 },
  { id: "rod-bronze-1", type: "rodBronze", position: [1.8, 1.2, 0.5], rotation: [0.3, 0, 0.2], scale: [1, 1, 1], delay: 0.6 },
  { id: "rod-bronze-2", type: "rodBronze", position: [-0.3, -1.6, 0.7], rotation: [-0.2, 0.4, 0], scale: [0.7, 1, 1], delay: 0.75 },
];

function Fragment({
  spec,
  concreteTexture,
  static: isStatic,
}: {
  spec: FragmentSpec;
  concreteTexture: THREE.CanvasTexture | null;
  static: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const startTransform = useMemo(() => {
    const dir = new THREE.Vector3(...spec.position);
    if (dir.lengthSq() === 0) dir.set(0, 1, 0);
    dir.normalize().multiplyScalar(3.2);
    const position: [number, number, number] = [
      spec.position[0] + dir.x,
      spec.position[1] + dir.y,
      spec.position[2] + dir.z,
    ];
    const rotation: [number, number, number] = [
      spec.rotation[0] + seededJitter(spec.id, 0) * 2.4,
      spec.rotation[1] + seededJitter(spec.id, 1) * 2.4,
      spec.rotation[2] + seededJitter(spec.id, 2) * 2.4,
    ];
    return { position, rotation };
  }, [spec.id, spec.position, spec.rotation]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh || isStatic) return;
    if (state.clock.elapsedTime < spec.delay) return;

    mesh.position.x = THREE.MathUtils.damp(mesh.position.x, spec.position[0], 3.2, delta);
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, spec.position[1], 3.2, delta);
    mesh.position.z = THREE.MathUtils.damp(mesh.position.z, spec.position[2], 3.2, delta);
    mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, spec.rotation[0], 3.2, delta);
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, spec.rotation[1], 3.2, delta);
    mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, spec.rotation[2], 3.2, delta);
  });

  const initialPosition = isStatic ? spec.position : startTransform.position;
  const initialRotation = isStatic ? spec.rotation : startTransform.rotation;

  let geometry: React.ReactNode;
  let material: React.ReactNode;

  switch (spec.type) {
    case "beam":
      geometry = <boxGeometry args={[1, 0.12, 0.12]} />;
      material = <meshStandardMaterial color="#2b2a26" metalness={0.7} roughness={0.35} />;
      break;
    case "panelGlass":
      geometry = <planeGeometry args={[1, 1.4]} />;
      material = (
        <meshPhysicalMaterial
          color="#eef3f2"
          transmission={1}
          thickness={0.4}
          roughness={0.06}
          ior={1.4}
          metalness={0}
          side={THREE.DoubleSide}
        />
      );
      break;
    case "panelSteel":
      geometry = <boxGeometry args={[1, 1.3, 0.05]} />;
      material = <meshStandardMaterial color="#c9c4b8" metalness={0.85} roughness={0.28} />;
      break;
    case "slabConcrete":
      geometry = <boxGeometry args={[1.4, 1, 0.15]} />;
      material = (
        <meshStandardMaterial
          color="#a89f8f"
          roughness={0.9}
          metalness={0.05}
          map={concreteTexture ?? undefined}
        />
      );
      break;
    case "rodBronze":
      geometry = <cylinderGeometry args={[0.03, 0.03, 1.6, 12]} />;
      material = (
        <meshStandardMaterial
          color="#9c7a4e"
          metalness={0.6}
          roughness={0.3}
          emissive="#7a5c37"
          emissiveIntensity={0.15}
        />
      );
      break;
  }

  return (
    <mesh ref={ref} position={initialPosition} rotation={initialRotation} scale={spec.scale}>
      {geometry}
      {material}
    </mesh>
  );
}

function Structure({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const concreteTexture = useMemo(
    () => createNoiseTexture({ base: "#a89f8f", variance: 14 }),
    []
  );
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reduced) {
      const progress = getScrollProgress();
      group.rotation.y += delta * (0.045 + progress * 0.05);

      const targetScale = THREE.MathUtils.lerp(1, 0.82, progress);
      const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 2.2, delta);
      group.scale.setScalar(scale);
    }

    const targetTiltX = reduced ? 0 : pointer.y * 0.12;
    const targetTiltY = reduced ? 0 : -pointer.x * 0.16;
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetTiltX, 2.5, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetTiltY * 0.3, 2.5, delta);
  });

  return (
    <group ref={groupRef} position={[2.1, -0.2, 0]}>
      {FRAGMENTS.map((spec) => (
        <Fragment key={spec.id} spec={spec} concreteTexture={concreteTexture} static={reduced} />
      ))}
    </group>
  );
}

/** Dollies the camera back and swallows the scene into fog as the user scrolls past the hero — the "cinematic exit". */
function ScrollRig({ reduced }: { reduced: boolean }) {
  const { camera, scene } = useThree();

  useFrame((_, delta) => {
    if (reduced) return;
    const progress = getScrollProgress();

    // react-hooks/immutability doesn't know R3F's useThree() intentionally hands back
    // the live, mutable Three.js camera/scene — mutating them per-frame in useFrame
    // (outside React's render phase) is the standard, documented R3F pattern.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      8.5 + progress * 4.5,
      2.2,
      delta
    );

    const fog = scene.fog as THREE.Fog | null;
    if (fog) {
      // eslint-disable-next-line react-hooks/immutability
      fog.near = THREE.MathUtils.damp(fog.near, THREE.MathUtils.lerp(6, 0.6, progress), 2.2, delta);
      fog.far = THREE.MathUtils.damp(fog.far, THREE.MathUtils.lerp(13, 5, progress), 2.2, delta);
    }
  });

  return null;
}

export default function HeroScene() {
  const reduced = useMemo(() => prefersReducedMotion(), []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} color="#4a4033" />
      <directionalLight position={[4, 6, 5]} intensity={1.15} color="#fff4e0" />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#8fa3ad" />
      <pointLight position={[-2.5, 1, -4]} intensity={22} color="#c7864a" distance={9} />
      <fog attach="fog" args={["#100f0c", 6, 13]} />
      <Structure reduced={reduced} />
      <ScrollRig reduced={reduced} />
      {!reduced && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.25}
            intensity={0.55}
            mipmapBlur
            radius={0.7}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
