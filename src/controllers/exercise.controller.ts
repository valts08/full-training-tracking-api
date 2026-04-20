import type { Request, Response, NextFunction } from 'express'
import exerciseService from '../services/exercise.service.ts'
import exercises from '../data/exerciseMock.ts'


const getExercises = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ exercises })
}

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = req.body
  const exercise = await exerciseService.createExercise(exercises, exerciseRequestBody)

  exercises.push(exercise)

  return res.status(201).send({ exercise, message: "New exercise added successfully" })
}

const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return res.status(409).json({ message: "Error: Request body not included" })

  const exerciseRequestBody = req.body
  const passedExerciseId = req.params.id as string

  const { exerciseId, zoddedUpdate } = await exerciseService.updateExercise(exercises, exerciseRequestBody, passedExerciseId)

  exercises[exerciseId] = zoddedUpdate

  return res.status(200).send({ exercise: zoddedUpdate, message: "Exercise successfully updated" })
}

const deleteExercise = (req: Request, res: Response, next: NextFunction) => {
  const passedId = req.params.id

  const exerciseId = exercises.findIndex(exercise => exercise.id === passedId)

  if (exerciseId === -1) return res.status(404).json({ message: `Didn't find exercise with ID ${passedId}`})

  const deletedExercise = exercises.splice(exerciseId, 1)

  return res.status(200).send({ exercise: deletedExercise, message: "Exercise deleted successfully"})
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}