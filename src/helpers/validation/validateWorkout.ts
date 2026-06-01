import z from 'zod';

const validateWorkout = z.object({
    durationMinutes: z.number(),
    difficulty: z.string().max(20),
    exerciseTypes: z.object(),
    notes: z.string(),
    title: z.string().max(255)
})

const validateWorkoutUpdate = validateWorkout.partial()

export type CreateWorkoutTyoe = z.infer<typeof validateWorkout>
export type UpdateWorkoutTyoe = z.infer<typeof validateWorkoutUpdate>

export default {
    validateWorkout,
    validateWorkoutUpdate
}