import type { CreateWorkoutType, UpdateWorkoutType } from "../helpers/validation/validateWorkout.ts";
import zodValidation from "../helpers/validation/validateWorkout.ts";
import AppError from "../helpers/appErrorClass.ts";
import { prisma } from "../../prisma/prismaClient.ts";
import { toWorkoutInput, toWorkoutUpdateInput } from "../helpers/mappers/workout.mapper.ts";

const getWorkout = async (userId: number) => {
    const workouts = await prisma.workout.findMany({
        where: { userId },
        include: {
            workoutExercises: {
                select: { exercise: true }
            }
        }
    })
    return workouts
}

const getWorkoutById = async (id: number, userId: number) => {
    const workouts = await prisma.workout.findUnique({
        where: { id, userId },
        include: {
            workoutExercises: {
                select: { exercise: true }
            }
        }
    })

    return workouts
}

const createWorkout = async (workoutData: CreateWorkoutType) => {
    const { exerciseIds, ...validWorkoutObject } = workoutData

    const workout = await prisma.workout.create({
        data: {
            ...toWorkoutInput(validWorkoutObject),
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
    const { userId, ...workoutUpdateData } = workoutData
    if (userId == undefined) throw new AppError("User not authorized", 401)
        
    const workout = await prisma.workout.findUnique({
        where: { id: workoutId }
    })
    if (!workout) throw new AppError("Workout doesn't exist, check the passed ID", 404)

    if (workout.userId !== userId) throw new AppError("Can't update this workout, unauthorized user", 403)
    
    const { exerciseIds, ...validWorkoutObject } = workoutData

    const updateWorkout = await prisma.workout.update({
        where: { id: workoutId },
        data: {
            ...toWorkoutUpdateInput(validWorkoutObject),
            // if exerciseIds have expected values for related exercises, overwrite the existing ones
            ...(exerciseIds != null && {
                workoutExercises: {
                    deleteMany: {},
                    create: exerciseIds.map((exerciseId: number) => ({
                        exercise: { connect: { id: exerciseId } }
                    }))
                }
            })
        }
    })

    return updateWorkout
}

const deleteWorkout = async (workoutId: number) => {
    const workoutExists = await prisma.workout.findUnique({
        where: { id: workoutId }
    })

    if (!workoutExists) throw new AppError("Workout doesn't exist, check the passed ID", 404)

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