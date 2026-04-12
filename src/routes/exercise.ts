import { Router } from 'express'
import exerciseController from '../controllers/exercise.controller.ts'

const router = Router()

router.get('/', exerciseController.getExercises)
router.put('/:id/update', exerciseController.updateExercise)
router.post('/create', exerciseController.createExercise)
router.delete('/:id/delete', exerciseController.deleteExercise)

export default router