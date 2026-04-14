import z from 'zod'

const muscleGroupZod = z.object({
  primary: z.array(z.string()),
  secondary: z.array(z.string())
})

const repRangeZod = z.object({
  min: z.number(),
  max: z.number()
})

const strengthExercise = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("strength"),
  movementPattern: z.string(),
  equipment: z.array(z.string()).min(0),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  repRange: repRangeZod,
  restSeconds: z.number(),
  instructions: z.array(z.string()),
  tips: z.string(),
  videoUrl: z.string().nullable()
})

const isoStrengthExercise = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("isometric strength"),
  movementPattern: z.string(),
  equipment: z.array(z.string()).min(0),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  durationRange: z.object({
    minSeconds: z.number(),
    maxSeconds: z.number()
  }),
  restSeconds: z.number(),
  instructions: z.array(z.string()),
  tips: z.string(),
  videoUrl: z.string().nullable()
})

const cardioExercise = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("cardio"),
  movementPattern: z.string(),
  equipment: z.array(z.string()).min(0),
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
  instructions: z.array(z.string()),
  tips: z.string(),
  videoUrl: z.string().nullable()
})

const plyoExercise = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroups: muscleGroupZod,
  category: z.literal("plyometrics"),
  movementPattern: z.string(),
  equipment: z.array(z.string()).min(0),
  mechanics: z.string(),
  laterality: z.string(),
  defaultSets: z.number(),
  repRange: repRangeZod,
  restSeconds: z.number(),
  instructions: z.array(z.string()),
  tips: z.string(),
  videoUrl: z.string().nullable()
})

export default {
    strengthExercise,
    isoStrengthExercise,
    cardioExercise,
    plyoExercise,
    updateStrengthExercise: strengthExercise.partial().required({ category: true }),
    updateIsoStrengthExercise: isoStrengthExercise.partial().required({ category: true }),
    updateCardioExercise: cardioExercise.partial().required({ category: true }),
    updatePlyoExercise: plyoExercise.partial().required({ category: true })
}