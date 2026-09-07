import express from 'express'
const router = express.Router()
import * as controller from '../controllers/contactController.js'

router.post('/', controller.send)

export default router
