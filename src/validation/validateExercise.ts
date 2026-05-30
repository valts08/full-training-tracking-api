import z from 'zod'

const muscleGroupZod = z.object({
  primary: z.array(z.string()),
  secondary: z.array(z.string()).nullable()
})

const repRangeZod = z.object({
  min: z.number(),
  max: z.number()
})

const strengthExercise = z.object({
  id: z.number(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("strength"),
  movementPattern: z.string(),
  equipment: z.array(z.string()),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  repRange: repRangeZod,
  restSeconds: z.number(),
  instructions: z.string(),
  tips: z.string(),
  userId: z.number(),
  videoUrl: z.string().nullable()
})

const isoStrengthExercise = z.object({
  id: z.number(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("isometric strength"),
  movementPattern: z.string(),
  equipment: z.array(z.string()),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  durationRange: z.object({
    minSeconds: z.number(),
    maxSeconds: z.number()
  }),
  restSeconds: z.number(),
  instructions: z.string(),
  tips: z.string(),
  userId: z.number(),
  videoUrl: z.string().nullable()
})

const cardioExercise = z.object({
  id: z.number(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("cardio"),
  movementPattern: z.string(),
  equipment: z.array(z.string()),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  durationRange: z.object({
    minMinutes: z.number(),
    maxMinutes: z.number()
  }),
  targetPaceMinPerKm: z.object({
    min: z.number(),
    max: z.number()
  }),
  restSeconds: z.number(),
  instructions: z.string(),
  tips: z.string(),
  userId: z.number(),
  videoUrl: z.string().nullable()
})

const plyoExercise = z.object({
  id: z.number(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("plyometrics"),
  movementPattern: z.string(),
  equipment: z.array(z.string()),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  repRange: repRangeZod,
  restSeconds: z.number(),
  instructions: z.string(),
  tips: z.string(),
  userId: z.number(),
  videoUrl: z.string().nullable()
})

const exerciseValidation = z.discriminatedUnion("category", [
  strengthExercise,
  isoStrengthExercise,
  cardioExercise,
  plyoExercise
])

// for the update zod validation schema, find a way to exclude being able to update the ID, currently it's possible
const updateExerciseValidation = z.discriminatedUnion("category", [
  strengthExercise.omit({ id: true }).partial().required({ category: true }),
  isoStrengthExercise.omit({ id: true }).partial().required({ category: true }),
  cardioExercise.omit({ id: true }).partial().required({ category: true }),
  plyoExercise.omit({ id: true }).partial().required({ category: true })
])

export type CreateExercise = z.infer<typeof exerciseValidation>
export type UpdateExercise = z.infer<typeof updateExerciseValidation>

export default {
  exerciseValidation,
  updateExerciseValidation
}