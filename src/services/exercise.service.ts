import zodValidation from '../validation/validateExercise.ts'
import type { CreateExercise, UpdateExercise } from '../validation/validateExercise.ts'
import validateExercise from '../validation/validateExercise.ts'
import { toCreateExerciseInput, toUpdateExerciseInput } from '../validation/mappers/exercise.mapper.ts'
import { prisma } from '../../prisma/prismaClient.ts'

const getExercises = async () => {
    const exercises = await prisma.exercise.findMany()
    return exercises
}

const createExercise = async (data: CreateExercise) => {
    const { id } = data
    
    const existingExercise = await prisma.exercise.findUnique({
        where: { id }
    })

    if (existingExercise?.id || existingExercise?.name) throw new Error("ID or name of exercise already exists")

    const newExercise = zodValidation.exerciseValidation.parse(data)

    const exercise = await prisma.exercise.create({
        data: toCreateExerciseInput(newExercise), // make a mapper function
    })

    return exercise
}

const updateExercise = async (dataBody: UpdateExercise, passedExerciseId: number) => {

    const validExercise = validateExercise.updateExerciseValidation.parse(dataBody)
    
    const exerciseToUpdate = await prisma.exercise.update({
        where: {
            id: Number(passedExerciseId)
        },
        data: toUpdateExerciseInput(validExercise)
        
    })
    
    return exerciseToUpdate
}

export default {
    getExercises,
    createExercise,
    updateExercise
}