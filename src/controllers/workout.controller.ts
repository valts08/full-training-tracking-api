import type { Response, Request, NextFunction } from 'express';
import workoutService from '../services/workout.service.ts';
import AppError from '../helpers/appErrorClass.ts';

const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('Unauthorized user', 401)
    const workouts = await workoutService.getWorkout(req.user.id)

    return res.status(200).json({ workouts })
}

const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
    const workoutId = Number(req.params.id)

    const workout = await workoutService.getWorkoutById(workoutId)

    if (workout == null) {
        return res.status(404).json({ message: `Workout with ID ${workoutId} not found` })
    }

    return res.status(200).json({ workout, message: "Workout found successfully" })
}

const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('User not Authorized', 401)
        
    const workoutDataObject = { ...req.body, userId: req.user.id }

    const workout = await workoutService.createWorkout(workoutDataObject)

    return res.status(201).json({ workout, message: "Workout created successfully" })
}

const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("User not authorized", 401)
    const workoutId = Number(req.params.id)
    const workoutDataObject = { ...req.body, userId: req.user.id}
    
    const workout = await workoutService.updateWorkout(workoutDataObject, workoutId)

    return res.status(200).json({ workout, message: "Workout updated successfully" })
}

const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
    const workoutId = Number(req.params.id)

    const deletedWorkout = await workoutService.deleteWorkout(workoutId)

    return res.status(200).json({ deletedWorkout, message: "Workout deleted successfully" })
}

export default {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
}