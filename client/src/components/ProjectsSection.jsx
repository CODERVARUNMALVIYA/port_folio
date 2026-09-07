import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ProjectCard from './ProjectCard'
import Loading from './Loading'
import ProjectModal from './ProjectModal'
import ProjectsScene from './ProjectsScene'
import { mockProjects } from '../data/mockProjects'

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    
    
    api.get('/api/projects')
      .then(res => { 
        if (mounted) {
          const data = Array.isArray(res.data) ? res.data : []
          setProjects(data.length > 0 ? data : mockProjects)
        }
      })
      .catch(err => { 
        console.log('API not available, using mock data')
        if (mounted) setProjects(mockProjects)
      })
      .finally(() => mounted && setLoading(false))
    
    return () => { mounted = false }
  }, [])

  return (
    <section id="projects" className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white overflow-hidden">
     
      <div className="absolute inset-0 z-0 opacity-30">
        <ProjectsScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          My <span className="text-accent">Projects</span>
        </h2>
        {loading ? <Loading message="Loading projects..." /> : (
          projects.length === 0 ? (
            <p className="text-center text-gray-400">No projects yet — you can seed sample projects.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => <ProjectCard key={p._id} project={p} onClick={setSelected} />)}
            </div>
          )
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
