"use client";

import * as React from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { geoContains } from "d3-geo";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, GraduationCap, Globe2, ExternalLink } from "lucide-react";
import { GlobePlaceholder } from "./GlobePlaceholder";

// ─── Constants ────────────────────────────────────────────────────────────────
const ORANGE = new THREE.Color("#FF8225");
const ARC_COLOR = new THREE.Color(1, 130 / 255, 37 / 255);
const BRAND_LAND = "#EDBD87";
const BRAND_LAND_DARK = "#CF6314";
const OCEAN = "#EEF2F5";
const INITIAL_GLOBE_ROT_Y = THREE.MathUtils.degToRad(159);
const INITIAL_GLOBE_ROT_X = THREE.MathUtils.degToRad(-2);

// ─── Geo cache ────────────────────────────────────────────────────────────────
let _geoCache: CountryFeature[] | null = null;
let _geoPromise: Promise<CountryFeature[]> | null = null;

function loadCountryFeatures(): Promise<CountryFeature[]> {
  if (_geoCache) return Promise.resolve(_geoCache);
  if (!_geoPromise) {
    _geoPromise = fetch("/countries.geo.json")
      .then((r) => r.json())
      .then((raw) => { _geoCache = parseCountryFeatures(raw); return _geoCache; })
      .catch(() => { _geoCache = []; return _geoCache; });
  }
  return _geoPromise;
}

if (typeof window !== "undefined") loadCountryFeatures();

// ─── Types ────────────────────────────────────────────────────────────────────
type City = {
  id: string;
  name: string;
  uniLabel: string;
  lat: number;
  lon: number;
  home?: boolean;
  flag: string;
  uniCount: number;
  description: string;
  topUnis: string[];
  link?: string;
};

type GeoRing = [number, number][];
type CountryFeature = {
  id: string;
  name: string;
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] };
  rings: GeoRing[];
};

// ─── City data ────────────────────────────────────────────────────────────────
const CITIES: City[] = [
  {
    id: "tashkent", name: "Ташкент", uniLabel: "Дом · Studify HQ",
    lat: 41.31, lon: 69.28, home: true, flag: "🇺🇿", uniCount: 0,
    description: "Штаб-квартира Studify. Отсюда мы помогаем студентам со всего Узбекистана поступить в лучшие университеты мира.",
    topUnis: ["Наш офис находится в центре Ташкента", "Консультации бесплатно", "Работаем Пн–Сб 10:00–19:00"],
    link: "/contacts",
  },
  {
    id: "usa", name: "США", uniLabel: "200+ университетов",
    lat: 38.9, lon: -77.03, flag: "🇺🇸", uniCount: 200,
    description: "Дом крупнейших исследовательских университетов мира. Диплом США открывает двери по всему миру.",
    topUnis: ["MIT", "Stanford University", "Harvard University", "UC Berkeley"],
    link: "/countries/usa",
  },
  {
    id: "czech-republic", name: "Чехия", uniLabel: "20+ университетов",
    lat: 50.08, lon: 14.43, flag: "🇨🇿", uniCount: 20,
    description: "Доступное высококачественное образование в сердце Европы. Обучение на чешском — бесплатно.",
    topUnis: ["Charles University", "CTU Prague", "Masaryk University"],
    link: "/countries/czech-republic",
  },
  {
    id: "latvia", name: "Латвия", uniLabel: "8+ университетов",
    lat: 56.95, lon: 24.11, flag: "🇱🇻", uniCount: 8,
    description: "Быстрый путь к европейскому диплому с возможностью получить ВНЖ ЕС во время учёбы.",
    topUnis: ["University of Latvia", "RTU Riga", "RSU"],
    link: "/countries/latvia",
  },
  {
    id: "hungary", name: "Венгрия", uniLabel: "18+ университетов",
    lat: 47.5, lon: 19.04, flag: "🇭🇺", uniCount: 18,
    description: "Государственная стипендия Stipendium Hungaricum покрывает обучение и проживание для иностранных студентов.",
    topUnis: ["Budapest University of Technology", "University of Debrecen", "Semmelweis University"],
    link: "/countries/hungary",
  },
  {
    id: "australia", name: "Австралия", uniLabel: "40+ университетов",
    lat: -35.28, lon: 149.13, flag: "🇦🇺", uniCount: 40,
    description: "8 из 100 лучших университетов мира. Возможность остаться после учёбы по Graduate Visa.",
    topUnis: ["University of Melbourne", "ANU", "University of Sydney", "UNSW"],
    link: "/countries/australia",
  },
  {
    id: "germany", name: "Германия", uniLabel: "35+ университетов",
    lat: 52.52, lon: 13.41, flag: "🇩🇪", uniCount: 35,
    description: "Бесплатное обучение в государственных университетах даже для иностранцев. Сильная инженерная школа.",
    topUnis: ["TU Munich", "LMU Munich", "Heidelberg University", "KIT"],
    link: "/countries/germany",
  },
  {
    id: "italy", name: "Италия", uniLabel: "22+ университетов",
    lat: 41.9, lon: 12.5, flag: "🇮🇹", uniCount: 22,
    description: "Один из старейших университетов мира — Болонский. Стипендии DSU покрывают до 100% расходов.",
    topUnis: ["Sapienza University", "University of Bologna", "Politecnico di Milano"],
    link: "/countries/italy",
  },
  {
    id: "uk", name: "Великобритания", uniLabel: "25+ университетов",
    lat: 51.51, lon: -0.13, flag: "🇬🇧", uniCount: 25,
    description: "Мировые бренды образования. Программа бакалавра — 3 года, магистратуры — 1 год.",
    topUnis: ["Oxford", "Cambridge", "Imperial College", "UCL"],
    link: "/countries/uk",
  },
  {
    id: "netherlands", name: "Нидерланды", uniLabel: "18+ университетов",
    lat: 52.37, lon: 4.9, flag: "🇳🇱", uniCount: 18,
    description: "Более 2000 программ полностью на английском. Высокий уровень жизни и открытая культура.",
    topUnis: ["Delft University", "University of Amsterdam", "Leiden University"],
    link: "/countries/netherlands",
  },
  {
    id: "south-korea", name: "Южная Корея", uniLabel: "45+ университетов",
    lat: 37.57, lon: 126.98, flag: "🇰🇷", uniCount: 45,
    description: "Стремительно растущий центр технологий и инноваций. Стипендия KGSP — полное покрытие расходов.",
    topUnis: ["Seoul National University", "KAIST", "Yonsei University", "POSTECH"],
    link: "/countries/south-korea",
  },
  {
    id: "poland", name: "Польша", uniLabel: "20+ университетов",
    lat: 52.23, lon: 21.01, flag: "🇵🇱", uniCount: 20,
    description: "Доступная стоимость обучения и жизни при высоком качестве программ в центре Европы.",
    topUnis: ["University of Warsaw", "AGH Kraków", "Warsaw University of Technology"],
    link: "/countries/poland",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function latLonToVec3(lat: number, lon: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function vec3ToLatLon(v: THREE.Vector3): { lat: number; lon: number } {
  const n = v.clone().normalize();
  const phi = Math.acos(THREE.MathUtils.clamp(n.y, -1, 1));
  const theta = Math.atan2(n.z, -n.x);
  const lat = 90 - THREE.MathUtils.radToDeg(phi);
  let lon = THREE.MathUtils.radToDeg(theta) - 180;
  if (lon < -180) lon += 360;
  if (lon > 180) lon -= 360;
  return { lat, lon };
}

function parseCountryFeatures(raw: unknown): CountryFeature[] {
  const maybe = raw as { features?: Array<{ id?: string | number; properties?: Record<string, unknown>; geometry?: { type?: string; coordinates?: unknown } }> };
  const features = Array.isArray(maybe?.features) ? maybe.features : [];
  const out: CountryFeature[] = [];
  for (const feature of features) {
    const geometry = feature.geometry;
    if (!geometry?.coordinates) continue;
    if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon") continue;
    const name = (typeof feature.properties?.name === "string" && feature.properties.name) || (typeof feature.properties?.ADMIN === "string" && feature.properties.ADMIN) || "Country";
    const id = `${feature.id ?? name}`.toLowerCase().replace(/\s+/g, "-");
    const rings: GeoRing[] = [];
    if (geometry.type === "Polygon") {
      const poly = geometry.coordinates as number[][][];
      if (Array.isArray(poly[0])) rings.push(poly[0] as GeoRing);
    } else {
      const multi = geometry.coordinates as number[][][][];
      for (const poly of multi) if (Array.isArray(poly?.[0])) rings.push(poly[0] as GeoRing);
    }
    out.push({ id, name, geometry: { type: geometry.type, coordinates: geometry.coordinates as number[][][] | number[][][][] }, rings });
  }
  return out;
}

function fibonacciSpherePoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const y = 1 - t * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * Math.PI * 2 * i;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r;
  }
  return positions;
}

// ─── Shaders ──────────────────────────────────────────────────────────────────
const dotVertexShader = `uniform float uPixelRatio; void main() { vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mvPosition; gl_PointSize = 1.15 * uPixelRatio; }`;
const dotFragmentShader = `void main() { vec2 c = gl_PointCoord - vec2(0.5); if (dot(c, c) > 0.25) discard; gl_FragColor = vec4(0.65, 0.64, 0.62, 0.11); }`;
const atmosphereVertexShader = `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const atmosphereFragmentShader = `uniform vec3 uColor; varying vec3 vNormal; void main() { float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0); gl_FragColor = vec4(uColor, intensity * 0.85); }`;

// ─── Three.js sub-components ──────────────────────────────────────────────────
function EarthSphere({ countryFeatures, onPointerDown, onPointerMove, onPointerOut }: {
  countryFeatures: CountryFeature[];
  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}) {
  const gl = useThree((s) => s.gl);
  const map = React.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048; canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const { width, height } = canvas;
    const toX = (lon: number) => ((lon + 180) / 360) * width;
    const toY = (lat: number) => ((90 - lat) / 180) * height;
    ctx.fillStyle = OCEAN; ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(146, 162, 176, 0.22)"; ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) { ctx.beginPath(); ctx.moveTo(0, toY(lat)); ctx.lineTo(width, toY(lat)); ctx.stroke(); }
    for (let lon = -150; lon <= 180; lon += 30) { ctx.beginPath(); ctx.moveTo(toX(lon), 0); ctx.lineTo(toX(lon), height); ctx.stroke(); }
    ctx.fillStyle = BRAND_LAND; ctx.strokeStyle = "rgba(200, 103, 26, 0.30)"; ctx.lineWidth = 0.65;
    const drawRing = (ring: number[][]) => {
      if (!Array.isArray(ring) || ring.length < 3) return;
      ctx.beginPath(); ctx.moveTo(toX(ring[0][0]), toY(ring[0][1]));
      for (let i = 1; i < ring.length; i++) ctx.lineTo(toX(ring[i][0]), toY(ring[i][1]));
      ctx.closePath(); ctx.fill(); ctx.stroke();
    };
    if (countryFeatures.length > 0) {
      for (const country of countryFeatures) {
        if (country.geometry.type === "Polygon") { for (const ring of country.geometry.coordinates as number[][][]) drawRing(ring); }
        else { for (const poly of country.geometry.coordinates as number[][][][]) for (const ring of poly) drawRing(ring); }
      }
    } else {
      const fallback: number[][][] = [[[-168,72],[-52,72],[-52,15],[-168,15],[-168,72]],[[-82,12],[-35,12],[-35,-56],[-82,-56],[-82,12]],[[-18,72],[52,72],[52,-35],[-18,-35],[-18,72]],[[52,78],[180,78],[180,-12],[52,-12],[52,78]],[[110,-10],[155,-10],[155,-45],[110,-45],[110,-10]]];
      fallback.forEach(drawRing);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace; tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy(); tex.needsUpdate = true;
    return tex;
  }, [countryFeatures, gl]);
  return (
    <mesh onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={map ?? undefined} color={map ? "#ffffff" : OCEAN} />
    </mesh>
  );
}

function CountryBorders({ countryFeatures }: { countryFeatures: CountryFeature[] }) {
  const geometry = React.useMemo(() => {
    const positions: number[] = [];
    const radius = 1.0016;
    for (const country of countryFeatures) {
      for (const ring of country.rings) {
        if (!Array.isArray(ring) || ring.length < 3) continue;
        for (let i = 0; i < ring.length - 1; i++) {
          const [lonA, latA] = ring[i]; const [lonB, latB] = ring[i + 1];
          const a = latLonToVec3(latA, lonA, radius); const b = latLonToVec3(latB, lonB, radius);
          positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    if (positions.length < 6) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [countryFeatures]);
  const material = React.useMemo(() => new THREE.LineBasicMaterial({ color: "#C8671A", transparent: true, opacity: 0.58, depthWrite: false }), []);
  if (!geometry) return null;
  return <lineSegments geometry={geometry} material={material} renderOrder={5} ref={(line) => { if (line) line.raycast = () => {}; }} />;
}

function CountryHoverOverlay({ country }: { country: CountryFeature | null }) {
  const geometry = React.useMemo(() => {
    if (!country) return null;
    const positions: number[] = [];
    const feature = { type: "Feature", geometry: country.geometry, properties: {} } as const;
    for (const ring of country.rings) {
      if (ring.length < 3) continue;
      let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
      for (const [lon, lat] of ring) { minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon); minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat); }
      for (let lat = minLat; lat <= maxLat; lat += 2.2) {
        for (let lon = minLon; lon <= maxLon; lon += 2.2) {
          if (!geoContains(feature as never, [lon, lat])) continue;
          const p = latLonToVec3(lat, lon, 1.0025); positions.push(p.x, p.y, p.z);
        }
      }
    }
    if (positions.length < 9) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [country]);
  const material = React.useMemo(() => new THREE.PointsMaterial({ color: BRAND_LAND_DARK, size: 0.011, transparent: true, opacity: 0.9, depthWrite: false }), []);
  if (!geometry) return null;
  return <points geometry={geometry} material={material} renderOrder={3} ref={(p) => { if (p) p.raycast = () => {}; }} />;
}

function DotMatrix() {
  const { gl } = useThree();
  const geometry = React.useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(fibonacciSpherePoints(2200), 3)); return g; }, []);
  const material = React.useMemo(() => new THREE.ShaderMaterial({ uniforms: { uPixelRatio: { value: gl.getPixelRatio() } }, vertexShader: dotVertexShader, fragmentShader: dotFragmentShader, transparent: true, depthWrite: false }), [gl]);
  React.useEffect(() => { material.uniforms.uPixelRatio.value = gl.getPixelRatio(); }, [gl, material]);
  const pointsRef = React.useRef<THREE.Points>(null);
  React.useLayoutEffect(() => { if (pointsRef.current) pointsRef.current.raycast = () => {}; }, []);
  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function AtmosphereGlow() {
  const material = React.useMemo(() => new THREE.ShaderMaterial({ uniforms: { uColor: { value: new THREE.Vector3(ORANGE.r, ORANGE.g, ORANGE.b) } }, vertexShader: atmosphereVertexShader, fragmentShader: atmosphereFragmentShader, transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false }), []);
  const meshRef = React.useRef<THREE.Mesh>(null);
  React.useLayoutEffect(() => { if (meshRef.current) meshRef.current.raycast = () => {}; }, []);
  return <mesh ref={meshRef} scale={1.15} material={material}><sphereGeometry args={[1, 96, 96]} /></mesh>;
}

function PulseRing({ phase = 0 }: { phase?: number }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const matRef = React.useRef<THREE.MeshBasicMaterial>(null);
  React.useLayoutEffect(() => { if (meshRef.current) meshRef.current.raycast = () => {}; }, []);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.85 + phase) % 1;
    const ease = t * t * (3 - 2 * t);
    if (meshRef.current) meshRef.current.scale.setScalar(1 + ease);
    if (matRef.current) matRef.current.opacity = Math.max(0, 1 - ease);
  });
  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.018, 0.032, 32]} />
      <meshBasicMaterial ref={matRef} color={ORANGE} transparent opacity={1} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CityMarker({ city, hoveredId, setHoveredId, onSelect }: {
  city: City; hoveredId: string | null; setHoveredId: (id: string | null) => void; onSelect: (city: City) => void;
}) {
  const pos = React.useMemo(() => latLonToVec3(city.lat, city.lon, 1.002), [city.lat, city.lon]);
  const hitR = city.home ? 0.05 : 0.04;
  const dotR = city.home ? 0.02 : 0.013;
  const groupRef = React.useRef<THREE.Group>(null);
  const isDragged = React.useRef(false);
  React.useLayoutEffect(() => {
    if (!groupRef.current) return;
    const n = pos.clone().normalize();
    groupRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    groupRef.current.position.copy(pos);
  }, [pos]);
  return (
    <group ref={groupRef}>
      <mesh
        onPointerDown={(e) => { e.stopPropagation(); isDragged.current = false; }}
        onPointerMove={() => { isDragged.current = true; }}
        onPointerUp={(e) => { e.stopPropagation(); if (!isDragged.current) onSelect(city); isDragged.current = false; }}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(city.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredId(null); document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[hitR, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={(m) => { if (m) m.raycast = () => {}; }} renderOrder={2}>
        <sphereGeometry args={[dotR, 16, 16]} />
        <meshBasicMaterial color={ORANGE} depthWrite={false} />
      </mesh>
      <PulseRing phase={city.home ? 0 : city.id.charCodeAt(0) * 0.07} />
      {city.home && <PulseRing phase={0.33} />}
      {hoveredId === city.id && (
        <Html position={[0, 0.06, 0.02]} center style={{ pointerEvents: "none", transform: "translateY(-100%)" }} zIndexRange={[100, 0]}>
          <div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,130,37,0.2)", borderRadius: "8px", padding: "6px 10px", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: "12px", lineHeight: 1.4 }}>
            <div style={{ fontWeight: 700, color: "#1A1108" }}>{city.flag} {city.name}</div>
            <div style={{ color: "#FF8225", fontWeight: 600, fontSize: "11px" }}>{city.uniLabel}</div>
            <div style={{ color: "#9ca3af", fontSize: "10px", marginTop: 2 }}>Нажмите для подробностей</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionArc({ start, end, speed, offset }: { start: THREE.Vector3; end: THREE.Vector3; speed: number; offset: number }) {
  const curve = React.useMemo(() => {
    const s = start.clone().normalize(); const e = end.clone().normalize();
    const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(1.34);
    return new THREE.QuadraticBezierCurve3(s, mid, e);
  }, [start, end]);
  const linePoints = React.useMemo(() => curve.getPoints(48), [curve]);
  const lineGeo = React.useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);
  const particleRef = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { const t = (clock.elapsedTime * speed + offset) % 1; if (particleRef.current) particleRef.current.position.copy(curve.getPointAt(t)); });
  const lineMat = React.useMemo(() => new THREE.LineBasicMaterial({ color: ARC_COLOR, transparent: true, opacity: 0.45, depthWrite: false, depthTest: false }), []);
  const lineObj = React.useMemo(() => { const line = new THREE.Line(lineGeo, lineMat); line.raycast = () => {}; return line; }, [lineGeo, lineMat]);
  React.useLayoutEffect(() => { if (particleRef.current) particleRef.current.raycast = () => {}; }, []);
  return (
    <group>
      <primitive object={lineObj} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial color="#FFE4CC" depthWrite={false} depthTest={false} />
      </mesh>
    </group>
  );
}

function GlobeScene({ reducedMotion = false, onCitySelect }: { reducedMotion?: boolean; onCitySelect: (city: City) => void }) {
  const rootRef = React.useRef<THREE.Group>(null);
  const startTime = React.useRef<number | null>(null);
  const initializedPose = React.useRef(false);
  const isDragging = React.useRef(false);
  const dragStartX = React.useRef(0);
  const dragStartY = React.useRef(0);
  const dragRotationY = React.useRef(0);
  const dragRotationX = React.useRef(0);
  const lastDragTime = React.useRef(0);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = React.useState<string | null>(null);
  const [countryFeatures, setCountryFeatures] = React.useState<CountryFeature[]>(() => _geoCache ?? []);
  React.useEffect(() => {
    if (countryFeatures.length > 0) return;
    let active = true;
    loadCountryFeatures().then((f) => { if (active && f.length > 0) setCountryFeatures(f); });
    return () => { active = false; };
  }, [countryFeatures.length]);
  const tashkent = React.useMemo(() => latLonToVec3(41.31, 69.28, 1), []);
  const destinations = React.useMemo(() => CITIES.filter((c) => !c.home).map((c) => latLonToVec3(c.lat, c.lon, 1)), []);
  const gl = useThree((s) => s.gl);
  const hoveredCountry = React.useMemo(() => countryFeatures.find((c) => c.id === hoveredCountryId) ?? null, [countryFeatures, hoveredCountryId]);
  const handleGlobePointerDown = React.useCallback((e: ThreeEvent<PointerEvent>) => {
    if (reducedMotion || e.button !== 0) return;
    e.stopPropagation(); isDragging.current = true;
    dragStartX.current = e.clientX; dragStartY.current = e.clientY;
    gl.domElement.style.cursor = "grabbing";
    try { gl.domElement.setPointerCapture(e.pointerId); } catch { }
  }, [gl, reducedMotion]);
  const handleGlobePointerMove = React.useCallback((e: ThreeEvent<PointerEvent>) => {
    if (reducedMotion || isDragging.current || countryFeatures.length === 0) return;
    const { lat, lon } = vec3ToLatLon(e.point);
    const hit = countryFeatures.find((c) => geoContains({ type: "Feature", geometry: c.geometry, properties: {} } as never, [lon, lat]));
    setHoveredCountryId((prev) => (prev === (hit?.id ?? null) ? prev : (hit?.id ?? null)));
  }, [countryFeatures, reducedMotion]);
  const handleGlobePointerOut = React.useCallback(() => setHoveredCountryId(null), []);
  React.useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      if (reducedMotion || !isDragging.current) return;
      const dx = (e.clientX - dragStartX.current) * 0.005;
      const dy = (e.clientY - dragStartY.current) * 0.004;
      dragStartX.current = e.clientX; dragStartY.current = e.clientY;
      dragRotationY.current += dx; dragRotationX.current += dy;
      lastDragTime.current = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      isDragging.current = false; el.style.cursor = "grab"; lastDragTime.current = performance.now();
      try { el.releasePointerCapture(e.pointerId); } catch { }
    };
    el.style.cursor = "grab";
    el.addEventListener("pointermove", onMove); el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp); el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp); el.removeEventListener("pointercancel", onUp);
      el.style.cursor = "";
    };
  }, [gl, reducedMotion]);
  useFrame((state) => {
    if (!rootRef.current) return;
    if (!initializedPose.current) { rootRef.current.rotation.y = INITIAL_GLOBE_ROT_Y; rootRef.current.rotation.x = INITIAL_GLOBE_ROT_X; initializedPose.current = true; }
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    rootRef.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 1, Math.min(1, (state.clock.elapsedTime - startTime.current) * 1000 / 2000)));
    rootRef.current.rotation.y += dragRotationY.current;
    rootRef.current.rotation.x = THREE.MathUtils.clamp(rootRef.current.rotation.x + dragRotationX.current, -0.55, 0.55);
    dragRotationY.current = 0; dragRotationX.current = 0;
    if (!reducedMotion && !isDragging.current && performance.now() - lastDragTime.current > 2000) rootRef.current.rotation.y += 0.001;
  });
  return (
    <group ref={rootRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} color="#FFF5EB" />
      <pointLight position={[-3, 2, -3]} intensity={0.3} color="#FF8225" distance={8} decay={2} />
      <AtmosphereGlow />
      <group>
        <EarthSphere countryFeatures={countryFeatures} onPointerDown={handleGlobePointerDown} onPointerMove={handleGlobePointerMove} onPointerOut={handleGlobePointerOut} />
        <CountryBorders countryFeatures={countryFeatures} />
        <CountryHoverOverlay country={hoveredCountry} />
        <DotMatrix />
        {CITIES.map((city) => <CityMarker key={city.id} city={city} hoveredId={hoveredId} setHoveredId={setHoveredId} onSelect={onCitySelect} />)}
        {destinations.map((end, i) => <ConnectionArc key={i} start={tashkent} end={end} speed={0.22 + i * 0.04} offset={i * 0.17} />)}
      </group>
    </group>
  );
}



function MobileWorldMap({ onSelect }: { onSelect: (city: City) => void }) {
  const [countryFeatures, setCountryFeatures] = React.useState<CountryFeature[]>(() => _geoCache ?? []);
  const [activeCityId, setActiveCityId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (countryFeatures.length > 0) return;
    let active = true;
    loadCountryFeatures().then((f) => { if (active && f.length > 0) setCountryFeatures(f); });
    return () => { active = false; };
  }, [countryFeatures.length]);

  const W = 360, H = 180;
  const toX = (lon: number) => lon + 180;
  const toY = (lat: number) => 90 - lat;

  const ringToD = (ring: number[][]): string => {
    if (ring.length < 3) return "";
    return ring.map((pt, i) => `${i === 0 ? "M" : "L"}${toX(pt[0]).toFixed(1)},${toY(pt[1]).toFixed(1)}`).join(" ") + "Z";
  };

  const countryPaths = React.useMemo(() =>
    countryFeatures.map((country) => {
      const segs: string[] = [];
      if (country.geometry.type === "Polygon") {
        for (const ring of country.geometry.coordinates as number[][][]) { const d = ringToD(ring); if (d) segs.push(d); }
      } else {
        for (const poly of country.geometry.coordinates as number[][][][]) {
          for (const ring of poly) { const d = ringToD(ring); if (d) segs.push(d); }
        }
      }
      return { id: country.id, d: segs.join(" ") };
    }),
  [countryFeatures, ringToD]); 

  // Защита: убедись, что home город всегда существует, иначе приложение упадет
  const home = CITIES.find((c) => c.home);
  // Если home не найден, ставим дефолтные координаты (например, центр), чтобы избежать краша
  const hx = home ? toX(home.lon) : 180;
  const hy = home ? toY(home.lat) : 90;

  const handleTap = (city: City) => {
    setActiveCityId(city.id);
    onSelect(city);
  };

  return (
    
    <div className="relative w-full overflow-x-auto overflow-y-hidden rounded-2xl border border-neutral-100 shadow-inner bg-[#EEF2F5] hide-scrollbar">
      <style>{`
        /* Прячем системный скроллбар для эстетики мобильного дизайна */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes mp { 0%{r:3.5;opacity:.85} 70%{r:13;opacity:0} 100%{r:13;opacity:0} }
        @keyframes mp-h { 0%{r:4.5;opacity:.85} 70%{r:17;opacity:0} 100%{r:17;opacity:0} }
      `}</style>

   
      <div className="min-w-[150%] md:min-w-full">
        <svg
          viewBox={`0 15 ${W} 135`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          aria-label="Интерактивная карта мира Studify"
        >
          <rect width={W} height={H} fill="#EEF2F5" />

          {([-60,-30,0,30,60] as number[]).map((lat) => (
            <line key={lat} x1={0} y1={toY(lat)} x2={W} y2={toY(lat)} stroke="rgba(146,162,176,0.25)" strokeWidth={0.35} />
          ))}
          {([-150,-120,-90,-60,-30,0,30,60,90,120,150,180] as number[]).map((lon) => (
            <line key={lon} x1={toX(lon)} y1={0} x2={toX(lon)} y2={H} stroke="rgba(146,162,176,0.25)" strokeWidth={0.35} />
          ))}

          {countryPaths.length > 0
            ? countryPaths.map(({ id, d }) => (
                <path 
                  key={id} 
                  d={d} 
                  fill={BRAND_LAND} 
                  // 4. КОНТУРЫ: Делаем их ярче и толще. 
                  // rgba(200,103,26,0.8) вместо 0.28, и strokeWidth 0.5 вместо 0.25
                  stroke="rgba(200,103,26, 0.7)" 
                  strokeWidth={0.4} 
                  strokeLinejoin="round" // Делает стыки стран мягче и красивее
                />
              ))
            : /* Fallback-квадраты на время загрузки GeoJSON */
              [
                [12, 18, 116, 57], [18, 78, 47, 68], [162, 18, 70, 105],
                [232, 18, 128, 90], [290, 110, 45, 35],
              ].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx={2} fill={BRAND_LAND} opacity={0.85} />)
          }

          {/* Дуги от дома к городам (логика оставлена без изменений) */}
          {CITIES.filter((c) => !c.home).map((city, i) => {
            const cx = toX(city.lon), cy = toY(city.lat);
            const mx = (hx + cx) / 2;
            const my = Math.min(hy, cy) - 14;
            return (
              <path
                key={city.id}
                d={`M${hx},${hy} Q${mx},${my} ${cx},${cy}`}
                fill="none"
                stroke="#FF8225"
                strokeWidth={0.55}
                strokeOpacity={0.38}
                strokeDasharray="600"
                strokeDashoffset="600"
              >
                <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </path>
            );
          })}

          {/* Точки городов */}
          {CITIES.map((city) => {
            const cx = toX(city.lon);
            const cy = toY(city.lat);
            const isHome = !!city.home;
            const isActive = activeCityId === city.id;
            const coreR = isHome ? 3.2 : 2.2;
            const delay = (city.id.charCodeAt(0) % 20) * 0.12;

            return (
              <g key={city.id} style={{ cursor: "pointer" }} onClick={() => handleTap(city)} role="button" aria-label={city.name}>
                <circle cx={cx} cy={cy} r={coreR} fill="none" stroke="#FF8225" strokeWidth={1.4} opacity={0}>
                  <animate attributeName="r" values={`${coreR};${coreR * 3.8}`} dur={isHome ? "1.8s" : "2.1s"} begin={`${delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0" dur={isHome ? "1.8s" : "2.1s"} begin={`${delay}s`} repeatCount="indefinite" />
                </circle>
                {isHome && (
                  <circle cx={cx} cy={cy} r={coreR} fill="none" stroke="#FF8225" strokeWidth={1.4} opacity={0}>
                    <animate attributeName="r" values={`${coreR};${coreR * 3.8}`} dur="1.8s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.75;0" dur="1.8s" begin={`${delay + 0.7}s`} repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={cx} cy={cy} r={coreR}
                  fill="#FF8225"
                  stroke={isActive ? "white" : "rgba(255,255,255,0.85)"}
                  strokeWidth={isActive ? 1.2 : 0.8}
                />
                <circle cx={cx} cy={cy} r={9} fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Текст поверх карты или снизу, делаем его sticky, чтобы не уезжал при горизонтальном скролле */}
      <div className="sticky left-0 right-0 w-full flex justify-center pb-3 pt-1">
        <p className="text-[11px] font-semibold tracking-wide text-[#FF8225] uppercase">
          Нажмите на точку для просмотра информации
        </p>
      </div>
    </div>
  );
}

function CityModal({ city, onClose }: { city: City; onClose: () => void }) {
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
      style={{ background: "rgba(10,8,5,0.55)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
      >
        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 bg-[#FFF6EE] px-6 pt-6 pb-5 border-b border-[#FF8225]/12">
          <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF8225]/15 blur-2xl" />
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none select-none">{city.flag}</span>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 leading-tight">{city.name}</h2>
              <p className="mt-0.5 text-sm font-semibold text-[#FF8225]">{city.home ? "Studify HQ" : city.uniLabel}</p>
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-400 hover:bg-white hover:text-neutral-800 transition-colors shadow-sm" aria-label="Закрыть">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-neutral-600 leading-relaxed">{city.description}</p>
          {!city.home && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 rounded-2xl border border-neutral-100 bg-neutral-50 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FF8225]/10"><GraduationCap size={16} className="text-[#FF8225]" /></div>
                <div><p className="text-base font-bold text-neutral-900 leading-none">{city.uniCount}+</p><p className="mt-0.5 text-[11px] text-neutral-400">университетов</p></div>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-neutral-100 bg-neutral-50 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FF8225]/10"><Globe2 size={16} className="text-[#FF8225]" /></div>
                <div><p className="text-base font-bold text-neutral-900 leading-none">EU</p><p className="mt-0.5 text-[11px] text-neutral-400">признание диплома</p></div>
              </div>
            </div>
          )}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">{city.home ? "Информация" : "Топ университеты"}</p>
            <ul className="space-y-2">
              {city.topUnis.map((uni, i) => (
                <motion.li key={uni} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.06, duration: 0.28 }} className="flex items-center gap-2.5 text-sm text-neutral-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF8225] shrink-0" />{uni}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {city.link && (
          <div className="px-6 pb-6">
            <a href={city.link} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF8225] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,130,37,0.35)] transition-all hover:shadow-[0_6px_24px_rgba(255,130,37,0.45)] hover:-translate-y-0.5 active:translate-y-0">
              {city.home ? <><MapPin size={15} />Перейти на страницу контактов</> : <><ExternalLink size={15} />Посмотреть все университеты</>}
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update(); setReady(true);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return { mobile, ready };
}

function usePrefersReducedMotion() {
  const [rm, setRm] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setRm(mq.matches);
    update(); mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return rm;
}

// ─── Globe (exported) ─────────────────────────────────────────────────────────
export function Globe() {
  const { mobile, ready } = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);

  if (!ready) {
    return (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center">
        <GlobePlaceholder />
      </div>
    );
  }

  return (
    <>
      {mobile ? (
        <div className="w-full px-3 py-2">
          <MobileWorldMap onSelect={setSelectedCity} />
        </div>
      ) : (
        <div className="relative h-full min-h-[320px] w-full">
          <Canvas
            camera={{ position: [0, 0, 4.0], fov: 45 }}
            style={{ background: "transparent" }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <React.Suspense fallback={null}>
              <GlobeScene reducedMotion={reducedMotion} onCitySelect={setSelectedCity} />
            </React.Suspense>
          </Canvas>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-sm font-medium text-[#FF8225] pointer-events-none">
            Кликните по пульсирующему городу для просмотра информации
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedCity && (
          <CityModal key={selectedCity.id} city={selectedCity} onClose={() => setSelectedCity(null)} />
        )}
      </AnimatePresence>
    </>
  );
}