import zodValidation from '../validation/validateExercise.ts'
import type { CreateExercise, UpdateExercise } from '../validation/validateExercise.ts'

const createExercise = (exerciseArr: CreateExercise[] | UpdateExercise[], data: any) => {
    const { id, name } = data
    
    const idExists = exerciseArr.some(exercise => exercise.id === id)
    const nameExists = exerciseArr.some(exercise => exercise.name === name)

    if (idExists || nameExists) throw new Error("ID or name of exercise already exists")

    const newExercise = zodValidation.exerciseValidation.parse(data)
    
    return newExercise
}

const updateExercise = (exerciseArr: UpdateExercise[] | UpdateExercise[], dataBody: object, passedExerciseId: string) => {
    const exerciseId = exerciseArr.findIndex(exercise => exercise.id === passedExerciseId)

    if (exerciseId === -1) throw new Error(`Didn't find exercise with ID ${passedExerciseId}`)

    const objectToValidate = {
        id: exerciseArr[exerciseId]?.id,
        category: exerciseArr[exerciseId]?.category,
        ...dataBody
    }

    const zoddedUpdate = zodValidation.updateExerciseValidation.parse(objectToValidate)
    
    return { exerciseId, zoddedUpdate }
}

export default {
    createExercise,
    updateExercise
}