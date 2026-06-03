import type { CreateWorkoutType, UpdateWorkoutType } from "../helpers/validation/validateWorkout.ts";
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

const createWorkout = async (workoutData: CreateWorkoutType) => {
    const validWorkout = zodValidation.validateWorkout.parse(workoutData)

    const { exerciseIds, ...validWorkoutObject } = validWorkout

    const workout = await prisma.workout.create({
        data: {
            ...toWorkoutInput(validWorkoutObject),
            createdAt: Date.now(),
            modifiedAt: Date.now(),
            workoutExercises: {
                create: exerciseIds.map((exerciseId: number) => ({
                    exercise: { connect: { id: exerciseId } }
                }))
            }
        }
    })

    return workout
}

const updateWorkout = async (workoutData: UpdateWorkoutType, workoutId: number) => {
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