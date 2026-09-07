import express from 'express'
const router = express.Router()
import * as controller from '../controllers/projectsController.js'

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router
