import type { Response, Request, NextFunction } from 'express';
import workoutService from '../services/workout.service.ts';
import zodValidation from '../helpers/validation/validateWorkout.ts'
import AppError from '../helpers/appErrorClass.ts';

const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('Unauthorized user', 401)
    const workouts = await workoutService.getWorkout(req.user.id)

    return res.status(200).json({ workouts })
}

const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('Unauthorized user', 401)
    const workoutId = Number(req.params.id)

    const workout = await workoutService.getWorkoutById(workoutId, req.user.id)

    if (workout == null) {
        return res.status(404).json({ message: `Workout with ID ${workoutId} not found for your user` })
    }

    return res.status(200).json({ workout, message: "Workout found successfully" })
}

const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('User not Authorized', 401)
        
    const workoutDataObject = { ...req.body, userId: req.user.id }
    const validWorkout = zodValidation.validateWorkout.parse(workoutDataObject)

    const workout = await workoutService.createWorkout(validWorkout)

    return res.status(201).json({ workout, message: "Workout created successfully" })
}

const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("User not authorized", 401)
    const workoutId = Number(req.params.id)
    const workoutDataObject = { ...req.body, userId: req.user.id}
    
    const validWorkout = zodValidation.validateWorkoutUpdate.parse(workoutDataObject)
    const workout = await workoutService.updateWorkout(validWorkout, workoutId)

    return res.status(200).json({ workout, message: "Workout updated successfully" })
}

const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("User not authorized", 401)
    const userId = req.user.id
    const workoutId = Number(req.params.id)

    const deletedWorkout = await workoutService.deleteWorkout(workoutId, userId)

    return res.status(200).json({ deletedWorkout, message: "Workout deleted successfully" })
}

export default {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
}