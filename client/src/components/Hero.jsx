import React from 'react'
import ThreeScene from './ThreeScene'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ThreeScene showParticles={true} showShapes={false} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Hi, I'm <span className="text-accent">Varun Malviya</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">MERN Stack Developer</h2>
          <p className="mt-4 text-lg text-gray-300">
            Passionate about creating dynamic web apps that solve real problems with cutting-edge technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="btn-accent px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
              View My Work
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              View Resume
            </a>
            <a href="/resume.pdf" download className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Resume
            </a>
            <a href="#contact" className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Hire Me
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-72 h-96 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl"></div>
            <img src="/profile.jpg" alt="Varun Malviya" className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-accent/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
