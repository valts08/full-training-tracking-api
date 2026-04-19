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

const updateExercise = (exerciseArr: UpdateExercise[] | UpdateExercise[], data: any) => {
    const passedId = data.params.id
    const exerciseId = exerciseArr.findIndex(exercise => exercise.id === passedId)

    if (exerciseId === -1) throw new Error(`Didn't find exercise with ID ${passedId}`)

    const objectToValidate = {
        id: exerciseArr[exerciseId]?.id,
        category: exerciseArr[exerciseId]?.category,
        ...data.body
    }

    const zoddedUpdate = zodValidation.updateExerciseValidation.parse(objectToValidate)
    
    return { exerciseId, zoddedUpdate }
}

export default {
    createExercise,
    updateExercise
}