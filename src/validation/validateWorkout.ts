import z from 'zod';

const Workout = z.object({
    id: z.number(),
    createdAt: z.date(),
    modifiedAt: z.date(),
    durationMinutes: z.number(),
    difficulty: z.string().max(20),
    exerciseTypes: z.object(),
    notes: z.string(),
    title: z.string().max(255),
}).omit({ id: true })

export type WorkoutType = z.infer<typeof Workout>

export default {
    Workout
}