import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectsSection from '../components/ProjectsSection'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Home() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <main>
          <Hero />
          <About />
          <Skills />
          <ProjectsSection />
          <Experience />
          <Education />
          <Contact />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
