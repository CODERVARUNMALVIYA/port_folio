import React from 'react'
import SkillsScene from './SkillsScene'

const SkillGroup = ({ title, items }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/50 transition-all hover:scale-105">
    <h4 className="font-semibold text-xl mb-4 text-accent">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="px-4 py-2 bg-slate-700/50 rounded-full text-sm text-gray-300 hover:bg-accent hover:text-white transition-colors">{t}</span>
      ))}
    </div>
  </div>
)

export default function Skills() {
  return (
    <section id="skills" className="relative bg-gradient-to-br from-slate-800 to-slate-900 py-16 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <SkillsScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Skills & <span className="text-accent">Tech Stack</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillGroup title="Frontend" items={["React.js","HTML","CSS","JavaScript","Tailwind","Bootstrap"]} />
          <SkillGroup title="Backend" items={["Node.js","Express.js"]} />
          <SkillGroup title="Database" items={["MongoDB"]} />
          <SkillGroup title="Tools" items={["Git","GitHub","VS Code","Postman"]} />
        </div>
      </div>
    </section>
  )
}
