import React from 'react'

export default function ProjectCard({ project, onClick }) {
  const projectLink = project.title === 'Task Management System' ? '/task-manager' : project.link

  return (
    <article 
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/20 hover:border-accent/50 hover:scale-105 transition-all cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-accent/20" 
      role="button" 
      tabIndex={0} 
      onClick={() => onClick && onClick(project)} 
      onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' ') onClick && onClick(project)}}
    >
      <div className="h-40 bg-slate-700/50 flex items-center justify-center overflow-hidden relative group">
        {project.image ? (
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src={project.image} alt={project.title} />
        ) : (
          <div className="text-5xl font-bold text-white bg-gradient-to-br from-accent to-cyan-500 w-full h-full flex items-center justify-center">
            {project.title.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((t) => (
            <span key={t} className="text-xs px-3 py-1 bg-slate-700/50 rounded-full text-accent border border-accent/30">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {projectLink && (
            <a 
              className="text-accent text-sm hover:text-cyan-400 transition-colors font-medium" 
              href={projectLink} 
              target="_blank" 
              rel="noreferrer" 
              onClick={(e)=>e.stopPropagation()}
            >
              🔗 Live Demo
            </a>
          )}
          <a 
            className="text-accent text-sm hover:text-cyan-400 transition-colors font-medium" 
            href={`https://github.com/yourusername/${project.title.replace(/\s+/g,'-')}`} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e)=>e.stopPropagation()}
          >
            💻 Code
          </a>
        </div>
      </div>
    </article>
  )
}
