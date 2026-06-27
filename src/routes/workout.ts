import { Router } from 'express'
import workoutController from '../controllers/workout.controller.ts'
import { authenticateRequest } from '../middleware/authentication.ts'

const router = Router()

router.get('/', authenticateRequest, workoutController.getWorkouts)
router.get('/:id', authenticateRequest, workoutController.getWorkoutById)
router.post('/', authenticateRequest, workoutController.createWorkout)
router.put('/:id/update', authenticateRequest, workoutController.updateWorkout)
router.delete('/:id/delete', authenticateRequest, workoutController.deleteWorkout)

export default router