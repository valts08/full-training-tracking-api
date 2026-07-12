import { Router } from 'express'
import { authenticateRequest } from '../middleware/authentication.ts'
import { writeLimiter, readLimiter } from '../middleware/rateLimiting.ts'
import workoutController from '../controllers/workout.controller.ts'

const router = Router()

router.get('/', writeLimiter, authenticateRequest, workoutController.getWorkouts)
router.get('/:id', writeLimiter, authenticateRequest, workoutController.getWorkoutById)
router.post('/', readLimiter, authenticateRequest, workoutController.createWorkout)
router.put('/:id/update', readLimiter, authenticateRequest, workoutController.updateWorkout)
router.delete('/:id/delete', readLimiter, authenticateRequest, workoutController.deleteWorkout)

export default router