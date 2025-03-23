"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
import * as THREE from "three";
import React from "react";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  };

  const _buildData = () => {
    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor((e) => {
          return defaultProps.polygonColor;
        });
      startAnimation();
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => {
        return (e as { arcAlt: number }).arcAlt * 1;
      })
      .arcStroke((e) => {
        return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime((e) => defaultProps.arcTime);

    globeRef.current
      .pointsData(data)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  };

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    let lastUpdate = 0;
    const updateInterval = 4000;
    let frameSkip = 0;
    const maxFrameSkip = 2;

    const minIndex = 0;
    const maxIndex = data.length;
    const targetRingCount = Math.min(Math.floor((data.length * 2) / 5), 8);

    const updateRings = (timestamp: number) => {
      if (frameSkip < maxFrameSkip) {
        frameSkip++;
        animationFrame = requestAnimationFrame(updateRings);
        return;
      }
      frameSkip = 0;

      if (timestamp - lastUpdate > updateInterval) {
        lastUpdate = timestamp;

        if (!globeRef.current || !globeData) return;

        numbersOfRings = genRandomNumbers(minIndex, maxIndex, targetRingCount);

        try {
          globeRef.current.ringsData(
            globeData.filter((d, i) => numbersOfRings.includes(i))
          );
        } catch (e) {
          console.error(e);
        }
      }

      animationFrame = requestAnimationFrame(updateRings);
    };

    let animationFrame = requestAnimationFrame(updateRings);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [globeRef.current, globeData]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(maxPixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    gl.shadowMap.enabled = false;
    gl.toneMapping = THREE.NoToneMapping;

    const originalCompile = gl.compile;
    gl.compile = function (scene, camera) {
      return originalCompile.call(this, scene, camera);
    };
  }, []);

  return null;
}

const OptimizedOrbitControls = React.memo(function OptimizedOrbitControls() {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      minDistance={cameraZ}
      maxDistance={cameraZ}
      autoRotateSpeed={1}
      autoRotate={true}
      minPolarAngle={Math.PI / 3.5}
      maxPolarAngle={Math.PI - Math.PI / 3}
      enableDamping={true}
      dampingFactor={0.05}
      mouseButtons={{
        LEFT: undefined,
        MIDDLE: undefined,
        RIGHT: undefined,
      }}
      touches={{
        ONE: undefined,
        TWO: undefined,
      }}
      rotateSpeed={0.5}
      domElement={
        typeof document !== "undefined"
          ? document.getElementById("globe-container") || undefined
          : undefined
      }
    />
  );
});

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("globe-container")
    ) {
      const container = document.createElement("div");
      container.id = "globe-container";
      container.style.position = "absolute";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "0";
      container.style.height = "0";
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }

    return () => {
      if (typeof document !== "undefined") {
        const container = document.getElementById("globe-container");
        if (container) {
          document.body.removeChild(container);
        }
      }
    };
  }, []);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      frameloop="demand"
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OptimizedOrbitControls />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const range = max - min;
  count = Math.min(count, range);

  if (range <= 100) {
    const arr: number[] = [];
    while (arr.length < count) {
      const r = Math.floor(Math.random() * range) + min;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  const result: number[] = [];
  const used = new Set<number>();

  while (result.length < count) {
    const r = Math.floor(Math.random() * range) + min;
    if (!used.has(r)) {
      used.add(r);
      result.push(r);
    }
  }

  return result;
}

const ensureValidBufferGeometry = (
  geometry: THREE.BufferGeometry
): THREE.BufferGeometry => {
  if (geometry && geometry.attributes && geometry.attributes.position) {
    const positions = geometry.attributes.position.array;
    let hasNaN = false;

    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        hasNaN = true;
        positions[i] = 0;
      }
    }

    if (hasNaN) {
      geometry.attributes.position.needsUpdate = true;
    }
  }

  return geometry;
};

const originalComputeBoundingSphere =
  THREE.BufferGeometry.prototype.computeBoundingSphere;
THREE.BufferGeometry.prototype.computeBoundingSphere = function () {
  ensureValidBufferGeometry(this);
  return originalComputeBoundingSphere.call(this);
};
