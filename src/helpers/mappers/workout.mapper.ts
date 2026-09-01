import type { WorkoutUncheckedCreateInput, WorkoutUncheckedUpdateInput } from "../../generated/prisma/models.ts";
import type { CreateWorkoutType, UpdateWorkoutType } from "../validation/validateWorkout.ts";

type WorkoutBaseType = Omit<CreateWorkoutType, 'exerciseIds'>

export const toWorkoutInput = (workout: WorkoutBaseType): WorkoutUncheckedCreateInput => {
    const base = {
        userId: workout.userId,
        durationMinutes: workout.durationMinutes,
        difficulty: workout.difficulty,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedCreateInput
}

export const toWorkoutUpdateInput = (workout: UpdateWorkoutType): WorkoutUncheckedUpdateInput => {
    const base = {
        userId: workout.userId,
        durationMinutes: workout.durationMinutes,
        difficulty: workout.difficulty,
        notes: workout.notes,
        title: workout.title
    }

    return { ...base } as unknown as WorkoutUncheckedUpdateInput
}