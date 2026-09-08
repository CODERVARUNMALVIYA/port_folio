import express from 'express'
const router = express.Router()
import * as controller from '../controllers/contactController.js'
import { requireAdmin } from '../middleware/adminAuth.js'

router.post('/', controller.send)
router.post('/login', controller.login)
router.post('/logout', requireAdmin, controller.logout)
router.get('/messages', requireAdmin, controller.list)

export default router
