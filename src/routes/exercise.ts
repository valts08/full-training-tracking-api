import { Router } from 'express'
import { authenticateRequest } from '../middleware/authentication.js'
import { writeLimiter, readLimiter } from '../middleware/rateLimiting.js'
import exerciseController from '../controllers/exercise.controller.js'

const router = Router()

router.get('/', readLimiter, authenticateRequest, exerciseController.getExercises)
router.put('/:id/update', writeLimiter, authenticateRequest, exerciseController.updateExercise)
router.post('/create', writeLimiter, authenticateRequest, exerciseController.createExercise)
router.delete('/:id/delete', writeLimiter, authenticateRequest, exerciseController.deleteExercise)

export default router