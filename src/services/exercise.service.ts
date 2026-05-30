import zodValidation from '../validation/validateExercise.ts'
import type { CreateExercise, UpdateExercise } from '../validation/validateExercise.ts'
import validateExercise from '../validation/validateExercise.ts'
import { toCreateExerciseInput, toUpdateExerciseInput } from '../validation/mappers/exercise.mapper.ts'
import { prisma } from '../../prisma/prismaClient.ts'

const getExercises = async () => {
    const exercises = await prisma.exercise.findMany()
    return exercises
}

// explore the idea of creating a "dynamic" route, meaning that you can query exercises based on a custom attribute that the object has

const createExercise = async (data: CreateExercise) => {

    const newExercise = zodValidation.exerciseValidation.parse(data)

    const exercise = await prisma.exercise.create({
        data: toCreateExerciseInput(newExercise)
    })

    return exercise
}

const updateExercise = async (dataBody: UpdateExercise, passedExerciseId: number) => {

    const exerciseToUpdate = await prisma.exercise.findUnique({
        where: { id: passedExerciseId }
    })

    if (!exerciseToUpdate) throw new Error(`Couldn't find exercise to update, make sure you have the right ID`)

    const validExercise = validateExercise.updateExerciseValidation.parse(dataBody)
    const exercise = await prisma.exercise.update({
        where: {
            id: passedExerciseId
        },
        data: toUpdateExerciseInput(validExercise)
        
    })
    
    return exercise
}

const deleteExercise = async (userId: number) => {
    
    const exerciseToDelete = await prisma.exercise.findUnique({
        where: { id: userId }
    })

    if (!exerciseToDelete) throw new Error(`Didn't find exercise with ID ${userId}`)
    
    const deletedExercise = await prisma.exercise.delete({
        where: { id: userId }
    })

    return deletedExercise
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}