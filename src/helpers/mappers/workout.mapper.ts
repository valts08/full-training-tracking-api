import type { WorkoutUncheckedCreateInput, WorkoutUncheckedUpdateInput } from "../../generated/prisma/models.ts";
import type { CreateWorkoutTyoe, UpdateWorkoutTyoe } from "../validation/validateWorkout.ts";

export const toWorkoutInput = (workout: CreateWorkoutTyoe): WorkoutUncheckedCreateInput => {
    const base = {
        durationsMinute: workout.durationMinutes,
        difficulty: workout.difficulty,
        exerciseType: workout.exerciseTypes,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedCreateInput
}

export const toWorkoutUpdateInput = (workout: UpdateWorkoutTyoe): WorkoutUncheckedUpdateInput => {
    const base = {
        durationsMinute: workout.durationMinutes,
        difficulty: workout.difficulty,
        exerciseType: workout.exerciseTypes,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedUpdateInput
}