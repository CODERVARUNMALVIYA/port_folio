import Contact from '../models/Contact.js'
import { clearAdminCookie, createAdminCookie, isAdminConfigured, verifyAdminPassword } from '../middleware/adminAuth.js'

export const send = async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {}
    const contact = await Contact.create({ name, email, message })
    res.status(201).json({ ok: true, message: 'Thanks — message received', contact })
  } catch (err) {
    next(err)
  }
}

export const login = (req, res) => {
  if (!isAdminConfigured()) {
    return res.status(503).json({ message: 'Admin access is not configured' })
  }

  if (!verifyAdminPassword(req.body?.password)) {
    return res.status(401).json({ message: 'Incorrect password' })
  }

  res.setHeader('Set-Cookie', createAdminCookie())
  res.json({ ok: true })
}

export const list = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean()
    res.json(contacts)
  } catch (err) {
    next(err)
  }
}

export const logout = (req, res) => {
  res.setHeader('Set-Cookie', clearAdminCookie())
  res.json({ ok: true })
}
