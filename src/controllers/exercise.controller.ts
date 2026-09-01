import type { Request, Response, NextFunction } from 'express'
import queryValidation from '../helpers/validation/queryParamValidation.ts'
import exerciseService from '../services/exercise.service.ts'
import AppError from '../helpers/appErrorClass.ts'

const getExercises = async (req: Request, res: Response, next: NextFunction) => {
  
  const queryValues = queryValidation.query.parse(req.query)

  const exercises = await exerciseService.getExercises(queryValues)
  return res.status(200).json({ exercises })
}

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError('User not Authorized', 401)
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = { ...req.body, userId: req.user.id }
  const exercise = await exerciseService.createExercise(exerciseRequestBody)

  return res.status(201).json({ exercise, message: "New exercise added successfully" })
}

const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError('User not Authorized', 401)
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = { ...req.body, userId: req.user.id}
  const passedExerciseId = Number(req.params.id)

  const exercise = await exerciseService.updateExercise(exerciseRequestBody, passedExerciseId)

  return res.status(200).json({ exercise, message: "Exercise successfully updated" })
}

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError('User not Authorized', 401)

  const exerciseToDeleteID = Number(req.params.id)
  const userId = req.user.id

  const deletedExercise = await exerciseService.deleteExercise(exerciseToDeleteID, userId)

  return res.status(200).json({ exercise: deletedExercise, message: "Exercise deleted successfully"})
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}