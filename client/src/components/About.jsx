import React from 'react'
import AboutScene from './AboutScene'

export default function About() {
  return (
    <section id="about" className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <AboutScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          About <span className="text-accent">Me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              I'm a <span className="text-accent font-semibold">MERN stack developer</span> with experience building full-stack applications. I enjoy
              designing user-friendly interfaces and building robust backend services.
            </p>
            <p className="text-lg">
              I love working across the stack — frontend, backend, and improving UX. Outside work I
              enjoy photography, reading, and open-source.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-accent/20 to-cyan-500/20 p-8 rounded-2xl backdrop-blur-sm border border-accent/30">
              <h3 className="text-2xl font-bold mb-6 text-accent">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-accent mr-3">▹</span>
                  <span>1+ year of web development experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">▹</span>
                  <span>Full-stack JavaScript specialist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">▹</span>
                  <span>Passionate about clean code & UX</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">▹</span>
                  <span>Open to remote opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
