import { Router } from 'express'
import exerciseController from '../controllers/exercise.controller.ts'
import { authenticateRequest } from '../middleware/authentication.ts'

const router = Router()

router.get('/', authenticateRequest, exerciseController.getExercises)
router.put('/:id/update', authenticateRequest, exerciseController.updateExercise)
router.post('/create', authenticateRequest, exerciseController.createExercise)
router.delete('/:id/delete', authenticateRequest, exerciseController.deleteExercise)

export default router