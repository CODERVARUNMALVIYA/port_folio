import Contact from '../models/Contact.js'

export const send = async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {}
    const contact = await Contact.create({ name, email, message })
    res.status(201).json({ ok: true, message: 'Thanks — message received', contact })
  } catch (err) {
    next(err)
  }
}
