import { Router } from 'express'
import { authenticateRequest } from '../middleware/authentication.ts'
import { verifyAdmin } from '../middleware/verifyAdmin.ts'
import { writeLimiter, readLimiter } from '../middleware/rateLimiting.ts'
import userController from '../controllers/user.controller.ts'

const router = Router()

router.get('/', readLimiter, authenticateRequest, userController.getUser)
router.get('/admin/users', authenticateRequest, verifyAdmin, userController.getAdminUsers)
router.put('/:id/update', writeLimiter, authenticateRequest, userController.updateUser)
router.post('/create', writeLimiter, authenticateRequest, userController.createUser)
router.delete('/:id/delete', writeLimiter, authenticateRequest, userController.deleteUser)

export default router