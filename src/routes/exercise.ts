import { Router } from 'express'
import exerciseController from '../controllers/exercise.controller.ts'

const router = Router()

router.get('/', exerciseController.getExercises)
router.put('/', )
router.post('/', )
router.delete('/', )

export default router