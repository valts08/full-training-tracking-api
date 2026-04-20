import type { Response, Request, NextFunction } from 'express';
import workouts from '../data/workoutMock.ts';

const getWorkouts = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({ workouts })
}

const getWorkoutById = (req: Request, res: Response, next: NextFunction) => {
    const workoutId = req.params.id

    const foundWorkout = workouts.find(workout => workout.id === workoutId)

    if (foundWorkout == undefined) return res.status(409).json({ message: `No workouts found with id ${workoutId}` })

    return res.status(200).send({ workout: foundWorkout, message: "Workout found successfully" })
}

export default {
    getWorkouts,
    getWorkoutById
}