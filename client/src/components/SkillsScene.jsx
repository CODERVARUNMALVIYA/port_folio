import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

function SkillCube({ position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.008 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed + position[0]) * 0.2
    }
  })

  return (
    <RoundedBox ref={meshRef} position={position} args={[0.8, 0.8, 0.8]} radius={0.1} smoothness={4}>
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </RoundedBox>
  )
}

export default function SkillsScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#0ea5a4" />
        
        {/* Grid of floating cubes */}
        <SkillCube position={[-2, 1, 0]} color="#0ea5a4" speed={0.8} />
        <SkillCube position={[0, 0, -1]} color="#06b6d4" speed={1} />
        <SkillCube position={[2, -1, 0]} color="#14b8a6" speed={1.2} />
        <SkillCube position={[-1, -2, -2]} color="#0891b2" speed={0.9} />
        <SkillCube position={[1, 2, -1]} color="#22d3ee" speed={1.1} />
      </Canvas>
    </div>
  )
}
