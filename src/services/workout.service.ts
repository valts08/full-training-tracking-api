import type { Workout } from "../validation/validateWorkout.ts";
import zodValidation from "../validation/validateWorkout.ts";
import { prisma } from "../../prisma/prismaClient.ts";
import { worker } from "node:cluster";

const getWorkout = async () => {
    const workouts = await prisma.workout.findMany()
    return workouts
}

const getWorkoutById = async (id: number) => {
    const workouts = await prisma.workout.findFirst({
        where: { id }
    })

    return workouts
}

const createWorkout = async (workoutData: Workout) => {
    const validWorkout = zodValidation.validateWorkout.parse(workoutData)

    const workout = await prisma.workout.create({
        data: {
            ...validWorkout,
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        }
    })
}

const updateWorkout = async (workoutData: Workout, workoutId: number) => {
    const validWorkout = zodValidation.validateWorkoutUpdate.parse(workoutData)

    const workoutExists = await prisma.workout.findUnique({
        where: { id: workoutId }
    })

    if (!workoutExists) throw new Error(`Workout doesn't exist, check the passed ID`)

    const updateWorkout = await prisma.workout.update({
        where: { id: workoutId },
        update: {
            ...validWorkout,
            modifiedAt: Date.now()
        }
    })

    return updateWorkout
}

const deleteWorkout = async (workoutId: number) => {
    const workoutExists = await prisma.workout.findUnique({
        where: { id: workoutId }
    })

    if (!workoutExists) throw new Error(`Workout doesn't exist, check the passed ID`)

    const deletedWorkout = await prisma.workout.delete({
        where: { id: workoutId }
    })

    return deletedWorkout
}

export default {
    getWorkout,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
}