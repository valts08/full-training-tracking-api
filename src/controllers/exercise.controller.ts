import type { Request, Response, NextFunction } from 'express'
import exerciseService from '../services/exercise.service.ts'


const getExercises = async (req: Request, res: Response, next: NextFunction) => {
  const exercises = await exerciseService.getExercises()
  return res.status(200).json({ exercises })
}

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = req.body
  const exercise = await exerciseService.createExercise(exerciseRequestBody)

  return res.status(201).json({ exercise, message: "New exercise added successfully" })
}

const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = req.body
  const passedExerciseId = Number(req.params.id)

  const exercise = await exerciseService.updateExercise(exerciseRequestBody, passedExerciseId)

  return res.status(200).json({ exercise, message: "Exercise successfully updated" })
}

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
  const passedId = Number(req.params.id)

  const deletedExercise = await exerciseService.deleteExercise(passedId)

  return res.status(200).json({ exercise: deletedExercise, message: "Exercise deleted successfully"})
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}