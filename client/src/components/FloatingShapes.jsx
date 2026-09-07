import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Torus, Cone } from '@react-three/drei'

function FloatingGeometry({ position, shape = 'box', color = '#0ea5a4', speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.3
    }
  })

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} position={position} args={[1, 1, 1]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </Box>
      case 'torus':
        return <Torus ref={meshRef} position={position} args={[0.6, 0.25, 16, 32]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </Torus>
      case 'cone':
        return <Cone ref={meshRef} position={position} args={[0.5, 1, 8]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </Cone>
      default:
        return null
    }
  }

  return renderShape()
}

export default function FloatingShapes() {
  return (
    <>
      <FloatingGeometry position={[-3, 2, -2]} shape="box" color="#0ea5a4" speed={0.8} />
      <FloatingGeometry position={[3, -1, -3]} shape="torus" color="#06b6d4" speed={1.2} />
      <FloatingGeometry position={[-2, -2, -1]} shape="cone" color="#14b8a6" speed={1} />
      <FloatingGeometry position={[2, 1, -4]} shape="box" color="#0891b2" speed={0.9} />
    </>
  )
}
