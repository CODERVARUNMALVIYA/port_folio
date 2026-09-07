import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cylinder, Cone } from '@react-three/drei'
import ParticleField from './ParticleField'

function TimelinePillar({ position, height = 2, color = '#0ea5a4' }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group position={position}>
      <Cylinder ref={meshRef} args={[0.2, 0.2, height, 8]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Cylinder>
      <Cone position={[0, height / 2 + 0.3, 0]} args={[0.3, 0.6, 8]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Cone>
    </group>
  )
}

export default function ExperienceScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 0, 5]} intensity={0.6} color="#0ea5a4" />
        
        <TimelinePillar position={[-2, 0, -2]} height={2.5} color="#0ea5a4" />
        <TimelinePillar position={[2, -0.5, -3]} height={3} color="#06b6d4" />
        <TimelinePillar position={[0, 1, -4]} height={2} color="#14b8a6" />
        
        <ParticleField count={300} />
      </Canvas>
    </div>
  )
}
