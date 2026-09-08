import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import projectsRouter from './routes/projects.js'
import tasksRouter from './routes/tasks.js'
import contactRouter from './routes/contact.js'
import { errorHandler } from './middleware/errorHandler.js'

const PORT = process.env.PORT || 5000

const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(morgan('combined'))

// API routes
app.use('/api/projects', projectsRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/contact', contactRouter)

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use(express.static(clientBuildPath))
  app.get('*', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')))
}

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Error handler middleware
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Unable to start server:', err.message)
    process.exitCode = 1
  }
}

startServer()
