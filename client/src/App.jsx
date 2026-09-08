import React from 'react'
import Home from './pages/Home'
import TaskManager from './components/TaskManager'
import CommercePlatform from './components/CommercePlatform'
import AdminMessages from './components/AdminMessages'

export default function App() {
  if (window.location.pathname === '/admin/messages') return <AdminMessages />
  if (window.location.pathname === '/task-manager') return <TaskManager />
  if (window.location.pathname === '/commerce-platform') return <CommercePlatform />

  return (
    <div>
      <Home />
    </div>
  )
}
