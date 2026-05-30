import { Router } from 'express'
import workoutController from '../controllers/workout.controller.ts'

const router = Router()

router.get('/', workoutController.getWorkouts)
router.get('/:id', workoutController.getWorkoutById)
router.post('/', workoutController.createWorkout)
router.put('/:id/update', workoutController.updateWorkout)
router.delete('/:id/delete', workoutController.deleteWorkout)

export default router