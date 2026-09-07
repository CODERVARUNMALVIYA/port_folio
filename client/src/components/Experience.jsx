import React from 'react'
import ExperienceScene from './ExperienceScene'

export default function Experience() {
  return (
    <section id="experience" className="relative bg-gradient-to-br from-slate-800 to-slate-900 py-16 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ExperienceScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Work <span className="text-accent">Experience</span>
        </h2>
        <div className="space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-accent pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">MERN Stack Developer</h4>
            <p className="text-accent font-medium mt-1">Optico Solution Pvt Ltd</p>
            <small className="text-gray-400">Oct 2025 — Present</small>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">▹</span>
                <span>Working on Android development and building clean, user-friendly mobile interfaces.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">▹</span>
                <span>Designed and improved UI for clients in the USA, focusing on modern and responsive layouts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">▹</span>
                <span>Manage and update client websites, ensuring smooth performance and timely content changes.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-cyan-500 pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">MERN Stack Developer</h4>
            <p className="text-cyan-400 font-medium mt-1">Eulogik Info Pvt Ltd</p>
            <small className="text-gray-400">Jan 2025 — Apr 2025</small>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">▹</span>
                <span>Built a responsive MERN website with authentication, CRUD, filtering, and search.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">▹</span>
                <span>Created interactive charts and improved UI/UX using React.js & Tailwind CSS.</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">▹</span>
                <span>Completed a 3-month internship with project deployment and Git/GitHub collaboration.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
