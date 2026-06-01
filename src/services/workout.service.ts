import type { CreateWorkoutTyoe, UpdateWorkoutTyoe } from "../helpers/validation/validateWorkout.ts";
import zodValidation from "../helpers/validation/validateWorkout.ts";
import { prisma } from "../../prisma/prismaClient.ts";
import { toWorkoutInput, toWorkoutUpdateInput } from "../helpers/mappers/workout.mapper.ts";

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

const createWorkout = async (workoutData: CreateWorkoutTyoe) => {
    const validWorkout = toWorkoutInput(zodValidation.validateWorkout.parse(workoutData))

    const workout = await prisma.workout.create({
        data: {
            ...validWorkout,
            createdAt: Date.now(),
            modifiedAt: Date.now()
        }
    })

    return workout
}

const updateWorkout = async (workoutData: UpdateWorkoutTyoe, workoutId: number) => {
    const validWorkout = toWorkoutUpdateInput(zodValidation.validateWorkoutUpdate.parse(workoutData))

    const workoutExists = await prisma.workout.findUnique({
        where: { id: workoutId }
    })

    if (!workoutExists) throw new Error(`Workout doesn't exist, check the passed ID`)

    const updateWorkout = await prisma.workout.update({
        where: { id: workoutId },
        data: {
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