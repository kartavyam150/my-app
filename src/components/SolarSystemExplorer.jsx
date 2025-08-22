import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

// Scaled distances (not to real scale, but for visual clarity)
const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.27;
const MARS_RADIUS = 0.53;
const EARTH_ORBIT_RADIUS = 6;
const MOON_ORBIT_RADIUS = 1.8;
const MARS_ORBIT_RADIUS = 10;

function Earth({ time }) {
  // Earth orbits the Sun
  const x = EARTH_ORBIT_RADIUS * Math.cos(time * 0.2);
  const z = EARTH_ORBIT_RADIUS * Math.sin(time * 0.2);
  return (
    <group position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
        <meshStandardMaterial color="#3fa7d6" />
      </mesh>
      <Html center position={[0, EARTH_RADIUS + 0.5, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: '#222c', color: '#fff', padding: 6, borderRadius: 6, fontSize: 14 }}>🌍 Earth</div>
      </Html>
    </group>
  );
}

function Moon({ time }) {
  // Moon orbits Earth, which orbits Sun
  const earthX = EARTH_ORBIT_RADIUS * Math.cos(time * 0.2);
  const earthZ = EARTH_ORBIT_RADIUS * Math.sin(time * 0.2);
  const x = earthX + MOON_ORBIT_RADIUS * Math.cos(time * 1.2);
  const z = earthZ + MOON_ORBIT_RADIUS * Math.sin(time * 1.2);
  return (
    <group position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[MOON_RADIUS, 32, 32]} />
        <meshStandardMaterial color="#bbb" />
      </mesh>
      <Html center position={[0, MOON_RADIUS + 0.3, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: '#222c', color: '#fff', padding: 4, borderRadius: 6, fontSize: 13 }}>🌙 Moon</div>
      </Html>
    </group>
  );
}

function Mars({ time }) {
  // Mars orbits Sun
  const x = MARS_ORBIT_RADIUS * Math.cos(time * 0.13);
  const z = MARS_ORBIT_RADIUS * Math.sin(time * 0.13);
  return (
    <group position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[MARS_RADIUS, 32, 32]} />
        <meshStandardMaterial color="#c1440e" />
      </mesh>
      <Html center position={[0, MARS_RADIUS + 0.5, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: '#222c', color: '#fff', padding: 6, borderRadius: 6, fontSize: 14 }}>♂ Mars</div>
      </Html>
    </group>
  );
}

function SolarSystemObjects() {
  const [time, setTime] = useState(0);
  useFrame((_, delta) => setTime((t) => t + delta));
  return (
    <>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial emissive="#ffe066" color="#ffe066" />
      </mesh>
      <Html center position={[0, 2.2, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ background: '#222c', color: '#fff', padding: 8, borderRadius: 8, fontSize: 16 }}>☀ Sun</div>
      </Html>
      <Earth time={time} />
      <Moon time={time} />
      <Mars time={time} />
    </>
  );
}

const SolarSystemExplorer = () => (
  <div style={{ width: '100%', height: '80vh', background: '#0a1122', borderRadius: 16, boxShadow: '0 4px 32px #0008', margin: '2rem auto', maxWidth: 1200 }}>
    <Canvas camera={{ position: [0, 8, 22], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={2} />
      <SolarSystemObjects />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
    <div style={{ position: 'absolute', top: 24, left: 24, color: '#fff', background: '#222c', padding: 16, borderRadius: 12, maxWidth: 340, fontSize: 15, zIndex: 2 }}>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Solar System Explorer</h2>
      <ul style={{ margin: 0, padding: 0, listStyle: 'disc inside' }}>
        <li>Drag to rotate, scroll to zoom, right-click to pan.</li>
        <li>Earth, Moon, and Mars shown with orbits (scaled for clarity).</li>
        <li>Hover over objects for names and facts.</li>
        <li>Learn about orbital mechanics and distances!</li>
      </ul>
    </div>
  </div>
);

export default SolarSystemExplorer;
