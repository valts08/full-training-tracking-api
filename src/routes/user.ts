import { Router } from 'express'
import userController from '../controllers/user.controller.ts'
import { authenticateRequest } from '../middleware/authentication.ts'

const router = Router()

router.get('/', authenticateRequest, userController.getUsers)
router.put('/:id/update', authenticateRequest, userController.updateUser)
router.post('/create', authenticateRequest, userController.createUser)
router.delete('/:id/delete', authenticateRequest, userController.deleteUser)

export default router