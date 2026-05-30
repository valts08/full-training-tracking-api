import type { Response, Request, NextFunction } from 'express';
import workoutService from '../services/workout.service.ts';

const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    const workouts = await workoutService.getWorkout()
    return res.status(200).send({ workouts })
}

const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
    const workoutId = req.params.id as unknown as number // should probably think of something better for this 

    const workout = await workoutService.getWorkoutById(workoutId)

    return res.status(200).send({ workout, message: "Workout found successfully" })
}

const createWorkout = async (req: Request, res: Response, next: NextFunction) => {

}

const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {

}

const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {

}

export default {
    getWorkouts,
    getWorkoutById
}