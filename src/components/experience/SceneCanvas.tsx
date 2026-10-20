"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { projects } from "@/content/projects";

export interface SceneShared {
  progress: number;
  pointer: { x: number; y: number };
  active: boolean;
  hovered: number;
  links: HTMLAnchorElement[];
  handoff: HTMLImageElement | null;
  sticky: HTMLElement | null;
}

function ribbonGeometry() {
  const segments = 180,
    positions: number[] = [],
    indices: number[] = [];
  const start = 0.12,
    end = Math.PI * 2 - 0.2;
  for (let i = 0; i <= segments; i++) {
    const t = start + ((end - start) * i) / segments;
    const twist = 0.3 + Math.sin(t * 1.15 + 0.3) * 0.85;
    const radius = 1.53 + Math.sin(t * 2 + 0.5) * 0.09;
    const center = new THREE.Vector3(
      Math.cos(t) * radius,
      Math.sin(t) * radius * 1.13,
      Math.sin(t * 2 - 0.6) * 0.22,
    );
    const outward = new THREE.Vector3(
      Math.cos(t) * Math.cos(twist),
      Math.sin(t) * Math.cos(twist),
      Math.sin(twist),
    );
    const normal = new THREE.Vector3(
      -Math.cos(t) * Math.sin(twist),
      -Math.sin(t) * Math.sin(twist),
      Math.cos(twist),
    );
    for (const [w, d] of [
      [-0.46, -0.045],
      [0.46, -0.045],
      [0.46, 0.045],
      [-0.46, 0.045],
    ]) {
      const point = center
        .clone()
        .addScaledVector(outward, w)
        .addScaledVector(normal, d);
      positions.push(point.x, point.y, point.z);
    }
  }
  const geometry = new THREE.BufferGeometry();
  for (let face = 0; face < 4; face++) {
    const first = indices.length;
    for (let i = 0; i < segments; i++) {
      const a = i * 4 + face,
        b = i * 4 + ((face + 1) % 4),
        c = (i + 1) * 4 + face,
        d = (i + 1) * 4 + ((face + 1) % 4);
      indices.push(a, c, b, b, c, d);
    }
    geometry.addGroup(first, indices.length - first, face === 0 ? 1 : 0);
  }
  const cap = indices.length;
  indices.push(
    0,
    1,
    2,
    0,
    2,
    3,
    segments * 4,
    segments * 4 + 2,
    segments * 4 + 1,
    segments * 4,
    segments * 4 + 3,
    segments * 4 + 2,
  );
  geometry.addGroup(cap, 12, 1);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function Scene({
  shared,
  onReady,
  onError,
}: {
  shared: MutableRefObject<SceneShared>;
  onReady: () => void;
  onError: () => void;
}) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const ribbon = useRef<THREE.Mesh>(null);
  const planes = useRef<(THREE.Mesh | null)[]>([]);
  const geometry = useMemo(ribbonGeometry, []);
  const ribbonMaterials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({
        color: "#b9bbbf",
        metalness: 1,
        roughness: 0.22,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshStandardMaterial({
        color: "#ff5433",
        metalness: 0.55,
        roughness: 0.27,
        side: THREE.DoubleSide,
      }),
    ],
    [],
  );
  const planeMaterials = useMemo(
    () =>
      projects.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: "white",
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
          }),
      ),
    [],
  );
  const smooth = useRef({ p: 0, x: 0, y: 0 });
  const temp = useMemo(
    () => ({
      left: new THREE.Vector3(),
      right: new THREE.Vector3(),
    }),
    [],
  );

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    let disposed = false;
    const loader = new THREE.TextureLoader();
    const textures = projects.map((project, index) =>
      loader.load(
        project.poster.src,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          planeMaterials[index].map = texture;
          planeMaterials[index].needsUpdate = true;
          invalidate();
        },
        undefined,
        onError,
      ),
    );
    const lost = (e: Event) => {
      e.preventDefault();
      onError();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    onReady();
    invalidate();
    return () => {
      disposed = true;
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.environment = null;
      environment.dispose();
      textures.forEach((t) => t.dispose());
      geometry.dispose();
      ribbonMaterials.forEach((m) => m.dispose());
      planeMaterials.forEach((m) => m.dispose());
    };
  }, [
    geometry,
    gl,
    invalidate,
    onError,
    onReady,
    planeMaterials,
    ribbonMaterials,
    scene,
  ]);

  useEffect(() => {
    let frame = 0;
    let settling = 60;
    let lastP = -1,
      lastX = -1,
      lastY = -1,
      lastHover = -2,
      lastActive = false;
    const tick = () => {
      const input = shared.current;
      if (
        input.progress !== lastP ||
        input.pointer.x !== lastX ||
        input.pointer.y !== lastY ||
        input.hovered !== lastHover ||
        input.active !== lastActive
      ) {
        settling = 50;
        lastP = input.progress;
        lastX = input.pointer.x;
        lastY = input.pointer.y;
        lastHover = input.hovered;
        lastActive = input.active;
      }
      if (input.active && settling > 0) {
        invalidate();
        settling--;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [invalidate, shared]);

  useFrame((_state, delta) => {
    if (!shared.current.active) return;
    const input = shared.current,
      s = smooth.current;
    const damp = 1 - Math.exp(-delta * 7);
    s.p = THREE.MathUtils.lerp(s.p, input.progress, damp);
    s.x = THREE.MathUtils.lerp(s.x, input.pointer.x, damp);
    s.y = THREE.MathUtils.lerp(s.y, input.pointer.y, damp);
    const p = s.p,
      reveal = THREE.MathUtils.smoothstep(p, 0.17, 0.44),
      handoff = THREE.MathUtils.smoothstep(p, 0.72, 1);
    camera.position.set(0, 0, 9);
    camera.lookAt(0, 0, 0);
    const aspect = size.width / size.height;
    if (ribbon.current) {
      ribbon.current.position.set(
        THREE.MathUtils.lerp(aspect * 1.8, 0, reveal) + s.x * 0.07,
        THREE.MathUtils.lerp(0.05, 0.15, reveal) - s.y * 0.05,
        THREE.MathUtils.lerp(0, -3, reveal),
      );
      ribbon.current.rotation.set(
        0.18 + s.y * 0.06,
        -0.38 + s.x * 0.12 + reveal * 1.5,
        -0.32 + reveal * 1.2,
      );
      ribbon.current.scale.setScalar(THREE.MathUtils.lerp(1.18, 2.7, reveal));
      ribbonMaterials.forEach((m) => {
        m.transparent = true;
        m.opacity = 1 - reveal;
      });
      ribbon.current.visible = reveal < 0.999;
    }
    const planeOpacity =
      THREE.MathUtils.smoothstep(p, 0.23, 0.4) *
      (1 - THREE.MathUtils.smoothstep(p, 0.94, 1));
    const width = aspect > 1.6 ? 3.45 : 2.95,
      spacing = width * 1.12;
    for (let i = 0; i < 3; i++) {
      const mesh = planes.current[i];
      if (!mesh) continue;
      const side = i === 0 ? 0 : i === 1 ? -1 : 1;
      const hovered = input.hovered === i;
      mesh.position.set(
        side * spacing * (1 + handoff * 0.6),
        -0.3 + (hovered ? 0.08 : 0),
        side === 0 ? 0 : -0.65 - handoff * 2,
      );
      mesh.rotation.set(0, side * -0.16 * (1 - handoff), side * 0.025);
      const scale = width * (hovered ? 1.035 : 1);
      mesh.scale.set(scale, scale * 0.625, 1);
      if (i === 0 && input.handoff && input.sticky && handoff > 0) {
        const bounds = input.handoff.getBoundingClientRect();
        const origin = input.sticky.getBoundingClientRect();
        const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(43 / 2)) * 9;
        const worldWidth = worldHeight * aspect;
        const x =
          ((bounds.left - origin.left + bounds.width / 2) / size.width - 0.5) *
          worldWidth;
        const y =
          (0.5 - (bounds.top - origin.top + bounds.height / 2) / size.height) *
          worldHeight;
        const targetWidth = (bounds.width / size.width) * worldWidth;
        mesh.position.x = THREE.MathUtils.lerp(0, x, handoff);
        mesh.position.y = THREE.MathUtils.lerp(-0.3, y, handoff);
        mesh.scale.set(
          THREE.MathUtils.lerp(scale, targetWidth, handoff),
          THREE.MathUtils.lerp(scale * 0.625, targetWidth * 0.625, handoff),
          1,
        );
      }
      planeMaterials[i].opacity =
        planeOpacity *
        (i === 0 ? 1 - THREE.MathUtils.smoothstep(p, 0.86, 0.96) : 1);
      mesh.visible = planeOpacity > 0.001;
      const link = input.links[i];
      if (link && p > 0.2 && p < 0.94) {
        mesh.updateMatrixWorld();
        temp.left
          .set(-0.5, -0.5, 0)
          .applyMatrix4(mesh.matrixWorld)
          .project(camera);
        temp.right
          .set(0.5, 0.5, 0)
          .applyMatrix4(mesh.matrixWorld)
          .project(camera);
        const x = (temp.left.x * 0.5 + 0.5) * size.width,
          y = (-temp.right.y * 0.5 + 0.5) * size.height;
        const w = (temp.right.x - temp.left.x) * 0.5 * size.width,
          h = (temp.right.y - temp.left.y) * 0.5 * size.height;
        link.style.transform = `translate3d(${x}px,${y}px,0)`;
        link.style.width = `${w}px`;
        link.style.height = `${h}px`;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 6]} intensity={4} />
      <pointLight position={[-4, -2, 3]} color="#ff6546" intensity={10} />
      <mesh ref={ribbon} geometry={geometry} material={ribbonMaterials} />
      {projects.map((project, index) => (
        <mesh
          key={project.slug}
          ref={(node) => {
            planes.current[index] = node;
          }}
          material={planeMaterials[index]}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  );
}

export default function SceneCanvas(props: {
  shared: MutableRefObject<SceneShared>;
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[
        1,
        typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4
          ? 1
          : 1.5,
      ]}
      camera={{ position: [0, 0, 9], fov: 43, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: true,
      }}
      fallback={null}
    >
      <Scene {...props} />
    </Canvas>
  );
}
