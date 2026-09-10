import React from 'react'
import EducationScene from './EducationScene'

export default function Education() {
  return (
    <section id="education" className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <EducationScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-accent">Education</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-accent pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">Bachelor of Technology (B.Tech)</h4>
            <p className="text-accent font-medium mt-1">Computer Science Engineering</p>
            <p className="text-gray-400 mt-1">Sagar Institute of Research & Technology, Bhopal</p>
            <small className="text-gray-500">2021 — 2025</small>
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-start">
                <span className="text-accent mr-3 mt-1">▹</span>
                <span><strong>CGPA:</strong> 7.83/10</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-cyan-500 pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">Higher Secondary Education</h4>
            <p className="text-cyan-400 font-medium mt-1">Suraj Premiere High Sec School, Bhopal</p>
            <small className="text-gray-500">2020 — 2021</small>
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">▹</span>
                <span><strong>Percentage:</strong> 73.6%</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-purple-500 pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">Secondary Education</h4>
            <p className="text-purple-400 font-medium mt-1">Gyan Uday Memorial High Sec School</p>
            <small className="text-gray-500">2018 — 2019</small>
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">▹</span>
                <span><strong>Percentage:</strong> 73.6%</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border-l-4 border-emerald-500 pl-6 pr-6 py-6 rounded-r-xl hover:scale-105 transition-transform">
            <h4 className="text-2xl font-semibold text-white">Certifications</h4>
            <div className="mt-4 space-y-3">
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3 mt-1">🎓</span>
                <div>
                  <p className="text-white font-medium">Front-End Web Developer Certification</p>
                  <p className="text-gray-400 text-sm">Sheryians Coding School | <a href="https://www.linkedin.com/posts/varun-malviya-14a385274_frontenddevelopment-webdevelopment-certification-activity-7244666703987544065-SNfu?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEL5jooBwaUdRd05xqrd-R-FVQXAhyAop4k" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View ↗</a></p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3 mt-1">🎓</span>
                <div>
                  <p className="text-white font-medium">Back-End Web Developer Certification</p>
                  <p className="text-gray-400 text-sm">Sheryians Coding School | <a href="https://www.linkedin.com/posts/varun-malviya-14a385274_backenddevelopment-webdevelopment-certification-activity-7244667777867763712-dscr?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEL5jooBwaUdRd05xqrd-R-FVQXAhyAop4k" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View ↗</a></p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3 mt-1">🎓</span>
                <div>
                  <p className="text-white font-medium">React JS Certification</p>
                  <p className="text-gray-400 text-sm">Sheryians Coding School | <a href="https://www.linkedin.com/posts/varun-malviya-14a385274_reactjs-webdevelopment-certification-activity-7244668347181649920-8d_y?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEL5jooBwaUdRd05xqrd-R-FVQXAhyAop4k" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View ↗</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
