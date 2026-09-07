import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Dodecahedron, Icosahedron, Octahedron } from '@react-three/drei'

function ProjectGeometry({ position, shape = 'dodecahedron', color = '#0ea5a4', speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.006 * speed
      meshRef.current.rotation.y += 0.009 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed + position[0]) * 0.3
    }
  })

  const renderShape = () => {
    const material = <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} wireframe={false} />
    switch (shape) {
      case 'dodecahedron':
        return <Dodecahedron ref={meshRef} position={position} args={[1]}>{material}</Dodecahedron>
      case 'icosahedron':
        return <Icosahedron ref={meshRef} position={position} args={[1]}>{material}</Icosahedron>
      case 'octahedron':
        return <Octahedron ref={meshRef} position={position} args={[1]}>{material}</Octahedron>
      default:
        return null
    }
  }

  return renderShape()
}

export default function ProjectsScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#0ea5a4" />
        
        <ProjectGeometry position={[-3, 1, -2]} shape="dodecahedron" color="#0ea5a4" speed={0.7} />
        <ProjectGeometry position={[0, -1, -3]} shape="icosahedron" color="#06b6d4" speed={0.9} />
        <ProjectGeometry position={[3, 0, -1]} shape="octahedron" color="#14b8a6" speed={0.8} />
        <ProjectGeometry position={[-2, -2, -4]} shape="dodecahedron" color="#0891b2" speed={1} />
      </Canvas>
    </div>
  )
}
