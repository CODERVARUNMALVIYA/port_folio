import React, { useEffect, useMemo, useState } from 'react'
import api from '../api/api'
import './task-manager.css'

const columns = [
  { id: 'todo', label: 'To do', color: 'blue', hint: 'Ideas and incoming work' },
  { id: 'in-progress', label: 'In progress', color: 'amber', hint: 'Work happening now' },
  { id: 'done', label: 'Completed', color: 'green', hint: 'Shipped and wrapped up' }
]

const starterTasks = [
  { id: 'local-1', title: 'Polish landing page', description: 'Tighten spacing and make the hero feel more focused.', status: 'in-progress', priority: 'high', dueDate: '2026-09-12' },
  { id: 'local-2', title: 'Add empty states', description: 'Give every board column a useful first-step message.', status: 'todo', priority: 'medium', dueDate: '2026-09-15' },
  { id: 'local-3', title: 'Ship v1 dashboard', description: 'Review the workflow and publish the first usable version.', status: 'done', priority: 'low', dueDate: '2026-09-06' }
]

const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' }

function normalizeTask(task) {
  return { ...task, id: task.id || task._id }
}

function formatDate(value) {
  if (!value) return 'No due date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value))
}

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingLocalStorage, setUsingLocalStorage] = useState(false)
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('all')
  const [activeColumn, setActiveColumn] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get('/api/tasks')
        setTasks(response.data.map(normalizeTask))
      } catch (error) {
        const saved = localStorage.getItem('portfolio-task-manager')
        setTasks(saved ? JSON.parse(saved) : starterTasks)
        setUsingLocalStorage(true)
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [])

  useEffect(() => {
    if (usingLocalStorage) localStorage.setItem('portfolio-task-manager', JSON.stringify(tasks))
  }, [tasks, usingLocalStorage])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesQuery = `${task.title} ${task.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesPriority = priority === 'all' || task.priority === priority
    const matchesColumn = activeColumn === 'all' || task.status === activeColumn
    return matchesQuery && matchesPriority && matchesColumn
  }), [tasks, query, priority, activeColumn])

  const completedCount = tasks.filter((task) => task.status === 'done').length
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const openCreateModal = (status = 'todo') => {
    setEditingTask(null)
    setForm({ ...emptyForm, status })
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setForm({ title: task.title, description: task.description || '', status: task.status, priority: task.priority, dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '' })
    setIsModalOpen(true)
  }

  const saveTasksLocally = (nextTasks) => {
    setTasks(nextTasks)
    setUsingLocalStorage(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = { ...form, dueDate: form.dueDate || null }
    try {
      if (editingTask && !usingLocalStorage) {
        const response = await api.patch(`/api/tasks/${editingTask.id}`, payload)
        setTasks((current) => current.map((task) => task.id === editingTask.id ? normalizeTask(response.data) : task))
      } else if (!editingTask && !usingLocalStorage) {
        const response = await api.post('/api/tasks', payload)
        setTasks((current) => [normalizeTask(response.data), ...current])
      } else {
        const nextTask = normalizeTask({ ...payload, id: editingTask?.id || `local-${Date.now()}` })
        saveTasksLocally(editingTask ? tasks.map((task) => task.id === editingTask.id ? nextTask : task) : [nextTask, ...tasks])
      }
      setIsModalOpen(false)
      setForm(emptyForm)
    } catch (error) {
      const nextTask = normalizeTask({ ...payload, id: editingTask?.id || `local-${Date.now()}` })
      saveTasksLocally(editingTask ? tasks.map((task) => task.id === editingTask.id ? nextTask : task) : [nextTask, ...tasks])
      setIsModalOpen(false)
    }
  }

  const updateStatus = async (task, status) => {
    if (usingLocalStorage) {
      saveTasksLocally(tasks.map((item) => item.id === task.id ? { ...item, status } : item))
      return
    }
    try {
      const response = await api.patch(`/api/tasks/${task.id}`, { status })
      setTasks((current) => current.map((item) => item.id === task.id ? normalizeTask(response.data) : item))
    } catch (error) {
      saveTasksLocally(tasks.map((item) => item.id === task.id ? { ...item, status } : item))
    }
  }

  const deleteTask = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return
    if (!usingLocalStorage) {
      try {
        await api.delete(`/api/tasks/${task.id}`)
      } catch (error) {
        setUsingLocalStorage(true)
      }
    }
    setTasks((current) => current.filter((item) => item.id !== task.id))
  }

  return (
    <div className="task-app">
      <aside className="task-sidebar">
        <a className="task-brand" href="/">
          <span className="task-brand-mark">V</span>
          <span>Varun<span className="task-brand-dot">.</span></span>
        </a>
        <div className="task-workspace-label">Workspace</div>
        <div className="task-workspace"><span className="workspace-avatar">P</span><span>Personal space</span><span className="workspace-chevron">⌄</span></div>
        <nav className="task-nav" aria-label="Task manager navigation">
          <button className="task-nav-item active"><span>▦</span> Overview</button>
          <button className="task-nav-item" onClick={() => setActiveColumn('todo')}><span>○</span> My tasks <strong>{tasks.filter((task) => task.status !== 'done').length}</strong></button>
          <button className="task-nav-item" onClick={() => setActiveColumn('done')}><span>✓</span> Completed</button>
        </nav>
        <div className="task-sidebar-bottom">
          <a className="back-link" href="/">← Back to portfolio</a>
        </div>
      </aside>

      <main className="task-main">
        <header className="task-topbar">
          <div><p className="task-eyebrow">Monday, September 7, 2026</p><h1>Good morning, Varun <span>👋</span></h1><p className="task-subtitle">Here is your work at a glance.</p></div>
          <button className="task-primary-button" onClick={() => openCreateModal()}><span>＋</span> New task</button>
        </header>

        <section className="task-stats" aria-label="Task summary">
          <div className="stat-card"><div className="stat-icon violet">▦</div><div><span>Total tasks</span><strong>{tasks.length}</strong></div><small>Across your workspace</small></div>
          <div className="stat-card"><div className="stat-icon orange">◷</div><div><span>In progress</span><strong>{tasks.filter((task) => task.status === 'in-progress').length}</strong></div><small>Keep the momentum</small></div>
          <div className="stat-card"><div className="stat-icon green">✓</div><div><span>Completed</span><strong>{completedCount}</strong></div><small>{progress}% of all tasks</small></div>
          <div className="stat-card progress-stat"><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}><span>{progress}%</span></div><div><span>Weekly progress</span><strong>{completedCount ? 'On track' : 'Get started'}</strong></div></div>
        </section>

        <section className="task-toolbar"><div className="task-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." /></div><div className="task-filters"><select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filter by priority"><option value="all">All priorities</option><option value="high">High priority</option><option value="medium">Medium priority</option><option value="low">Low priority</option></select><button className="filter-button" onClick={() => { setQuery(''); setPriority('all'); setActiveColumn('all') }}>Reset</button></div></section>

        <div className="mobile-tabs">{columns.map((column) => <button key={column.id} className={activeColumn === column.id ? 'selected' : ''} onClick={() => setActiveColumn(activeColumn === column.id ? 'all' : column.id)}>{column.label}</button>)}</div>

        {loading ? <div className="task-loading"><span></span>Loading your workspace...</div> : <section className={`task-board ${activeColumn}`}>{columns.map((column) => {
          const columnTasks = visibleTasks.filter((task) => task.status === column.id)
          return <div className={`task-column ${column.color}`} key={column.id}><div className="column-heading"><div><h2>{column.label} <span>{columnTasks.length}</span></h2><p>{column.hint}</p></div><button onClick={() => openCreateModal(column.id)} aria-label={`Add task to ${column.label}`}>＋</button></div><div className="task-list">{columnTasks.map((task) => <article className="task-card" key={task.id}><div className="task-card-top"><span className={`priority-pill ${task.priority}`}>{task.priority}</span><button className="task-menu" onClick={() => openEditModal(task)} aria-label={`Edit ${task.title}`}>•••</button></div><h3>{task.title}</h3>{task.description && <p>{task.description}</p>}<div className="task-card-footer"><span className={task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done' ? 'overdue' : ''}>◷ {formatDate(task.dueDate)}</span><div className="task-actions"><button onClick={() => openEditModal(task)}>Edit</button>{column.id !== 'done' && <button onClick={() => updateStatus(task, column.id === 'todo' ? 'in-progress' : 'done')}>{column.id === 'todo' ? 'Start' : 'Complete'}</button>}<button className="delete-action" onClick={() => deleteTask(task)}>Delete</button></div></div></article>)}{!columnTasks.length && <button className="empty-column" onClick={() => openCreateModal(column.id)}><span>＋</span><b>Nothing here yet</b><small>Add the next task</small></button>}</div></div>
        })}</section>}
        {usingLocalStorage && <p className="storage-note">Offline demo mode: tasks are saved in this browser. Connect the API to sync them with MongoDB.</p>}
      </main>

      {isModalOpen && <div className="task-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsModalOpen(false)}><form className="task-modal" onSubmit={handleSubmit}><div className="modal-heading"><div><p className="task-eyebrow">Task details</p><h2>{editingTask ? 'Edit task' : 'Create a new task'}</h2></div><button type="button" className="modal-close" onClick={() => setIsModalOpen(false)}>×</button></div><label>Task title<input autoFocus required maxLength="120" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Plan next sprint" /></label><label>Description<span className="optional">Optional</span><textarea maxLength="500" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What does done look like?" /></label><div className="form-grid"><label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{columns.map((column) => <option key={column.id} value={column.id}>{column.label}</option>)}</select></label><label>Priority<select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label></div><label>Due date<span className="optional">Optional</span><input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setIsModalOpen(false)}>Cancel</button><button type="submit" className="task-primary-button">{editingTask ? 'Save changes' : 'Create task'}</button></div></form></div>}
    </div>
  )
}
