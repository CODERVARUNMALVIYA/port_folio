import React from 'react'

export default function ProjectModal({ project, onClose }){
  if(!project) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl" onClick={(e)=>e.stopPropagation()}>
        <div className="p-6">
          {project.image && <img className="w-full h-64 object-cover rounded-lg mb-4" src={project.image} alt={project.title} />}
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-slate-700 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech?.map((t) => <span key={t} className="text-xs px-3 py-1 bg-slate-100 rounded-full">{t}</span>)}
          </div>
          <div className="flex gap-3">
            {project.link && <a className="btn-accent" href={project.link} target="_blank" rel="noreferrer">View Live</a>}
            <button className="border border-slate-300 px-4 py-2 rounded-md text-slate-700" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
