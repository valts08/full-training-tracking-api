import type { WorkoutUncheckedCreateInput, WorkoutUncheckedUpdateInput, WorkoutCreateManyInput } from "../../generated/prisma/models.ts";
import type { CreateWorkoutType, UpdateWorkoutType, CreateSeedWorkoutType } from "../validation/validateWorkout.ts";

type WorkoutBaseType = Omit<CreateWorkoutType, 'exerciseIds'>
type SeedWorkoutBaseType = Omit<CreateSeedWorkoutType, 'exerciseIds'>

export const toWorkoutInput = (workout: WorkoutBaseType): WorkoutUncheckedCreateInput => {
    const base = {
        durationMinutes: workout.durationMinutes,
        difficulty: workout.difficulty,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedCreateInput
}

export const toWorkoutUpdateInput = (workout: UpdateWorkoutType): WorkoutUncheckedUpdateInput => {
    const base = {
        durationMinutes: workout.durationMinutes,
        difficulty: workout.difficulty,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedUpdateInput
}

export const toWorkoutCreateManyInput = (workout: SeedWorkoutBaseType): WorkoutCreateManyInput => {
    const base = {
        durationMinutes: workout.durationMinutes,
        difficulty: workout.difficulty,
        createdAt: workout.createdAt,
        modifiedAt: workout.modifiedAt,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutCreateManyInput
}