import React, { useEffect, useState } from 'react'
import api from '../api/api'
import './admin-messages.css'

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export default function AdminMessages() {
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadMessages = async () => {
    try {
      const response = await api.get('/api/contact/messages')
      setMessages(response.data)
      setAuthenticated(true)
    } catch (requestError) {
      setAuthenticated(false)
      if (requestError.response?.status !== 401) setError(requestError.response?.data?.message || 'Could not load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    try {
      await api.post('/api/contact/login', { password })
      setPassword('')
      await loadMessages()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed')
    }
  }

  const handleLogout = async () => {
    await api.post('/api/contact/logout')
    setAuthenticated(false)
    setMessages([])
  }

  if (loading) return <main className="admin-page"><div className="admin-panel admin-loading">Checking private access...</div></main>

  if (!authenticated) {
    return (
      <main className="admin-page">
        <form className="admin-panel admin-login" onSubmit={handleLogin}>
          <a className="admin-back" href="/">← Portfolio</a>
          <p className="admin-kicker">PRIVATE AREA</p>
          <h1>Hire messages</h1>
          <p className="admin-muted">Sign in to view messages sent through your portfolio.</p>
          <label htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-button" type="submit">Open messages</button>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div><a className="admin-back" href="/">← Portfolio</a><p className="admin-kicker">PRIVATE INBOX</p><h1>Hire messages</h1></div>
          <div className="admin-header-actions"><span>{messages.length} total</span><button className="admin-quiet-button" onClick={handleLogout}>Sign out</button></div>
        </header>
        {error && <p className="admin-error">{error}</p>}
        {!messages.length ? <div className="admin-empty">No hire messages yet.</div> : <div className="admin-message-list">{messages.map((message) => <article className="admin-message" key={message._id}><div className="admin-message-heading"><div><h2>{message.name}</h2><a href={`mailto:${message.email}`}>{message.email}</a></div><time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time></div><p>{message.message}</p><a className="admin-reply" href={`mailto:${message.email}?subject=Re: Your portfolio enquiry`}>Reply by email ↗</a></article>)}</div>}
      </section>
    </main>
  )
}
