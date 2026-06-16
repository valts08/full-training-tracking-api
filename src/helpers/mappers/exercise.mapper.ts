import type { ExerciseUncheckedCreateInput, ExerciseUncheckedUpdateInput } from "../../generated/prisma/models.ts";
import AppError from "../appErrorClass.ts";
import type { CreateExercise, UpdateExercise } from "../validation/validateExercise.ts";

export const toCreateExerciseInput = (exercise: CreateExercise) : ExerciseUncheckedCreateInput => {
    const exercises = {
        name: exercise.name,
        muscleGroups: exercise.muscleGroups,
        category: exercise.category,
        movementPattern: exercise.movementPattern,
        equipment: exercise.equipment,
        mechanics: exercise.mechanics,
        laterality: exercise.laterality,
        defaultSets: exercise.defaultSets,
        restSeconds: exercise.restSeconds,
        instructions: exercise.instructions,
        tips: exercise.tips,
        userId: exercise.userId,
        videoUrl: exercise.videoUrl
    }

    switch (exercise.category) {
        case "strength": 
            return { ...exercises, repRange: exercise.repRange } as ExerciseUncheckedCreateInput

        case "isometric strength": 
            return { ...exercises, durationRange: exercise.durationRange } as ExerciseUncheckedCreateInput

        case "cardio": 
            return { 
                ...exercises, 
                durationRange: exercise.durationRange, 
                targetPaceMinPerKm: exercise.targetPaceMinPerKm 
            } as ExerciseUncheckedCreateInput

        case "plyometrics": 
            return { ...exercises, repRange: exercise.repRange } as ExerciseUncheckedCreateInput

        default:
            throw new AppError(`Unknown exercise category: ${exercise.category}`, 400)
    }
}

export const toUpdateExerciseInput = (exercise: UpdateExercise) : ExerciseUncheckedUpdateInput => {
    const exercises = {
        name: exercise.name,
        muscleGroups: exercise.muscleGroups,
        category: exercise.category,
        movementPattern: exercise.movementPattern,
        equipment: exercise.equipment,
        mechanics: exercise.mechanics,
        laterality: exercise.laterality,
        defaultSets: exercise.defaultSets,
        restSeconds: exercise.restSeconds,
        instructions: exercise.instructions,
        tips: exercise.tips,
        userId: exercise.userId,
        videoUrl: exercise.videoUrl
    }

    switch (exercise.category) {
        case "strength": 
            return { ...exercises, repRange: exercise.repRange } as ExerciseUncheckedUpdateInput

        case "isometric strength": 
            return { ...exercises, durationRange: exercise.durationRange } as ExerciseUncheckedUpdateInput

        case "cardio": 
            return { 
                ...exercises, 
                durationRange: exercise.durationRange, 
                targetPaceMinPerKm: exercise.targetPaceMinPerKm 
            } as ExerciseUncheckedUpdateInput

        case "plyometrics": 
            return { ...exercises, repRange: exercise.repRange } as ExerciseUncheckedUpdateInput

        default:
            throw new AppError(`Unknown exercise category: ${exercise.category}`, 400)
    }
}