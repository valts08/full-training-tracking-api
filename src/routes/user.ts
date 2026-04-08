import { Router } from 'express'
import userController from '../controllers/user.controller.ts'

const router = Router()

router.get('/', userController.getUsers)
router.put('/:id/update', userController.updateUser)
router.post('/create', userController.createUser)
router.delete('/:id/delete', userController.deleteUser)

export default router