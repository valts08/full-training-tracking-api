import { Router } from 'express'
import userController from '../controllers/user.controller.ts'
import { authenticateRequest } from '../middleware/authentication.ts'
import { verifyAdmin } from '../middleware/verifyAdmin.ts'

const router = Router()

router.get('/', authenticateRequest, userController.getUser)
router.get('/admin/users', authenticateRequest, verifyAdmin, userController.getAdminUsers)
router.put('/:id/update', authenticateRequest, userController.updateUser)
router.post('/create', authenticateRequest, userController.createUser)
router.delete('/:id/delete', authenticateRequest, userController.deleteUser)

export default router