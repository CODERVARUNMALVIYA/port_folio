import crypto from 'crypto'

const COOKIE_NAME = 'portfolio_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || ''
}

function createSignature(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

function safeEqual(left, right) {
  const leftHash = crypto.createHash('sha256').update(left).digest()
  const rightHash = crypto.createHash('sha256').update(right).digest()
  return crypto.timingSafeEqual(leftHash, rightHash)
}

function getCookie(req, name) {
  const cookies = (req.headers.cookie || '').split(';')
  const entry = cookies.find((item) => item.trim().startsWith(`${name}=`))
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : ''
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret())
}

export function verifyAdminPassword(password) {
  if (!isAdminConfigured() || typeof password !== 'string') return false
  return safeEqual(password, process.env.ADMIN_PASSWORD)
}

export function createAdminCookie() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = `admin.${expiresAt}`
  const token = `${payload}.${createSignature(payload)}`
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${SESSION_TTL_SECONDS}; SameSite=Lax${secure}`
}

export function clearAdminCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}

export function requireAdmin(req, res, next) {
  if (!isAdminConfigured()) {
    return res.status(503).json({ message: 'Admin access is not configured' })
  }

  const token = getCookie(req, COOKIE_NAME)
  const [role, expiresAt, signature] = token.split('.')
  const payload = `${role}.${expiresAt}`
  const valid = role === 'admin' && Number(expiresAt) > Math.floor(Date.now() / 1000) && Boolean(signature) && safeEqual(signature, createSignature(payload))

  if (!valid) return res.status(401).json({ message: 'Admin authentication required' })
  next()
}
