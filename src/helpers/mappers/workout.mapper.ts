import type { WorkoutUncheckedCreateInput, WorkoutUncheckedUpdateInput } from "../../generated/prisma/models.ts";
import type { CreateWorkoutType, UpdateWorkoutType } from "../validation/validateWorkout.ts";

type WorkoutBaseType = Omit<CreateWorkoutType, 'exerciseIds'>

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