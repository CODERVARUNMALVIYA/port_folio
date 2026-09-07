import React, { useState } from 'react'
import api from '../api/api'
import ContactScene from './ContactScene'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/api/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ContactScene />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Get In <span className="text-accent">Touch</span>
        </h2>
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
              <input 
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-400" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input 
                type="email" 
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-400" 
                name="email" 
                value={form.email} 
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea 
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-400" 
                name="message" 
                value={form.message} 
                onChange={handleChange}
                placeholder="Your message here..."
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full btn-accent py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {status === 'sent' && <p className="mt-4 text-green-400 text-center">✓ Message sent — I will reply soon!</p>}
          {status === 'error' && <p className="mt-4 text-red-400 text-center">✗ Failed to send message. Try again later.</p>}
        </div>
      </div>
    </section>
  )
}
