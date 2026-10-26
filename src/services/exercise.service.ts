import type { CreateExercise, UpdateExercise } from '../helpers/validation/validateExercise.js'
import type { queryParamType } from '../helpers/validation/queryParamValidation.js'
import AppError from '../helpers/appErrorClass.js'
import { toCreateExerciseInput, toUpdateExerciseInput } from '../helpers/mappers/exercise.mapper.js'
import { prisma } from '../../prisma/prismaClient.js'

const getExercises = async (queryValues: queryParamType) => {
    const { page, limit, sortBy, order } = queryValues
    const exercises = await prisma.exercise.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            [sortBy]: order
        },
    })
    return exercises
}

// explore the idea of creating a "dynamic" route, meaning that you can query exercises based on a custom attribute that the object has

const createExercise = async (data: CreateExercise) => {

    const exercise = await prisma.exercise.create({
        data: toCreateExerciseInput(data)
    })

    return exercise
}

// get user ID from based on logged in users email. check to match current user's id with user.id of the resource they try to update

const updateExercise = async (dataBody: UpdateExercise, passedExerciseId: number) => {

    const exerciseToUpdate = await prisma.exercise.findUnique({
        where: { 
            id: passedExerciseId,
        }
    })

    if (!exerciseToUpdate) throw new AppError(`Couldn't find exercise to update, make sure you're using a valid ID`, 404)
    if (exerciseToUpdate.userId !== dataBody.userId) throw new AppError(`Can't update this exercise, unauthorized user`, 403)

    const exercise = await prisma.exercise.update({
        where: {
            id: passedExerciseId
        },
        data: toUpdateExerciseInput(dataBody)
        
    })
    
    return exercise
}

const deleteExercise = async (exerciseId: number, userId: number) => {
    
    const exerciseToDelete = await prisma.exercise.findUnique({
        where: { 
            id: exerciseId,
            userId 
        }
    })

    if (!exerciseToDelete) throw new AppError(`Didn't find exercise with ID ${exerciseId}`, 404)
    
    const deletedExercise = await prisma.exercise.delete({
        where: { 
            id: exerciseId, 
            userId 
        }
    })

    return deletedExercise
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}