import React, { useState, useEffect } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-accent/10' 
        : 'bg-slate-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          Varun <span className="text-accent">Malviya</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group" href="#home">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <a className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group" href="#about">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <a className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group" href="#projects">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <a className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group" href="#skills">
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <a className="text-sm font-medium text-gray-300 hover:text-accent transition-colors relative group" href="#contact">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a className="px-2 py-2 text-xs text-gray-500 hover:text-accent transition-colors" href="/admin/messages">
              Admin
            </a>
            <a className="px-4 py-2 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-gray-700 transition-colors" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
            <a className="btn-accent px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform" href="/resume.pdf" download="Varun-Malviya-Resume.pdf">
              Download
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button 
            className="p-2 text-white hover:text-accent transition-colors" 
            aria-label="Toggle navigation" 
            onClick={() => setOpen(!open)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-accent/20">
          <div className="px-4 py-4 flex flex-col gap-3">
            <a className="text-gray-300 hover:text-accent transition-colors py-2" href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
            <a className="text-gray-300 hover:text-accent transition-colors py-2" href="#about" onClick={() => setOpen(false)}>
              About
            </a>
            <a className="text-gray-300 hover:text-accent transition-colors py-2" href="#projects" onClick={() => setOpen(false)}>
              Projects
            </a>
            <a className="text-gray-300 hover:text-accent transition-colors py-2" href="#skills" onClick={() => setOpen(false)}>
              Skills
            </a>
            <a className="text-gray-300 hover:text-accent transition-colors py-2" href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a className="py-3 rounded-lg font-semibold text-center text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors" href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                View Resume
              </a>
              <a className="btn-accent py-3 rounded-lg font-semibold text-center hover:scale-105 transition-transform" href="/resume.pdf" download="Varun-Malviya-Resume.pdf" onClick={() => setOpen(false)}>
                Download
              </a>
            </div>
            <a className="mt-1 text-center text-xs text-gray-500 hover:text-accent transition-colors" href="/admin/messages" onClick={() => setOpen(false)}>
              Admin
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
