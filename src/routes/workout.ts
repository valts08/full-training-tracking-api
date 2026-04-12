import { Router } from 'express'
import workoutController from '../controllers/workout.controller.ts'

const router = Router()

router.get('/', workoutController.getWorkouts)
router.get('/:id', workoutController.getWorkoutById)

export default router