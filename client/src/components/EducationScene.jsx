import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'

function GraduationCap({ position }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Cap base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#0ea5a4" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Cap top */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[1.2, 1, 4]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Tassel sphere */}
      <Sphere position={[0.8, 0.05, 0.8]} args={[0.15, 16, 16]}>
        <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
      </Sphere>
    </group>
  )
}

function BookStack({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.2, 1]} />
        <meshStandardMaterial color="#0891b2" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.9]} />
        <meshStandardMaterial color="#14b8a6" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.8]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

export default function EducationScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#0ea5a4" />
        
        <GraduationCap position={[-2, 0, -2]} />
        <BookStack position={[2, 0, -3]} />
        <GraduationCap position={[0, 1, -5]} />
      </Canvas>
    </div>
  )
}
