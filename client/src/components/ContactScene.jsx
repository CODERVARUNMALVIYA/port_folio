import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, TorusKnot } from '@react-three/drei'
import ParticleField from './ParticleField'

function AnimatedTorus({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[1, 0.4, 16, 32]}>
      <meshStandardMaterial color="#0ea5a4" metalness={0.8} roughness={0.2} />
    </Torus>
  )
}

function AnimatedKnot({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
    }
  })

  return (
    <TorusKnot ref={meshRef} position={position} args={[0.8, 0.3, 100, 16]}>
      <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} />
    </TorusKnot>
  )
}

export default function ContactScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.7} color="#0ea5a4" />
        
        <AnimatedTorus position={[-1.5, 0, -2]} />
        <AnimatedKnot position={[1.5, 0, -3]} />
        <ParticleField count={400} />
      </Canvas>
    </div>
  )
}
