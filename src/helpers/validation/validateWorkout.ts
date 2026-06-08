import z from 'zod';

const validateWorkout = z.object({
    durationMinutes: z.number(),
    difficulty: z.string().max(20),
    exerciseIds: z.array(z.number()).min(1),
    notes: z.string(),
    title: z.string().max(255)
})

const validateWorkoutUpdate = validateWorkout.partial()

export type CreateWorkoutType = z.infer<typeof validateWorkout>
export type UpdateWorkoutType = z.infer<typeof validateWorkoutUpdate>

export default {
    validateWorkout,
    validateWorkoutUpdate
}