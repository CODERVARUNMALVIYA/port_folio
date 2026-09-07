import React from 'react'

const Icon = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    {children}
  </svg>
)

export default function Footer(){
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-accent/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Varun <span className="text-accent">Malviya</span>
            </h3>
            <p className="text-gray-400 text-sm">Full Stack Developer | MERN Specialist</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group" 
              href="https://www.linkedin.com/in/varun-malviya-14a385274" 
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <span className="text-xl">💼</span>
              <span className="group-hover:underline">LinkedIn</span>
            </a>
            <a 
              className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group" 
              href="https://github.com/CODERVARUNMALVIYA" 
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <span className="text-xl">💻</span>
              <span className="group-hover:underline">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Varun Malviya. All rights reserved. 
            <span className="text-accent ml-2">Built with React + Three.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
