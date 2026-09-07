import express from 'express'
import * as controller from '../controllers/tasksController.js'

const router = express.Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router