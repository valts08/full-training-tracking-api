import type { Request, Response, NextFunction } from 'express'
import zodValidation from '../validation/validateExercise.ts'
import type { CreateExercise, UpdateExercise } from '../validation/validateExercise.ts'
import exerciseService from '../services/exercise.service.ts'

const exercises: CreateExercise[] | UpdateExercise[] = [
  {
    id: "ex_001",
    name: "Barbell Back Squat",
    muscleGroups: {
      primary: ["quads", "glutes"],
      secondary: ["hamstrings", "core", "lower back"],
    },
    category: "strength",
    movementPattern: "squat",
    equipment: ["barbell", "squat rack"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 4,
    repRange: { min: 4, max: 8 },
    restSeconds: 180,
    instructions: [
      "Position bar on upper traps, grip just outside shoulder width",
      "Brace core and unrack the bar",
      "Descend until hips are at or below knee level",
      "Drive through the floor and lock out at the top",
    ],
    tips: "Keep chest tall and knees tracking over toes throughout",
    videoUrl: null,
  },
  {
    id: "ex_002",
    name: "Romanian Deadlift",
    muscleGroups: {
      primary: ["hamstrings", "glutes"],
      secondary: ["lower back", "core", "traps"],
    },
    category: "strength",
    movementPattern: "hinge",
    equipment: ["barbell"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 3,
    repRange: { min: 8, max: 12 },
    restSeconds: 120,
    instructions: [
      "Stand with feet hip-width apart, bar in an overhand grip",
      "Hinge at the hips, pushing them back while keeping a neutral spine",
      "Lower bar along the legs until a deep hamstring stretch is felt",
      "Drive hips forward to return to standing",
    ],
    tips: "Soften the knees slightly — this is a hip hinge, not a squat",
    videoUrl: null,
  },
  {
    id: "ex_003",
    name: "Overhead Press",
    muscleGroups: {
      primary: ["anterior deltoid", "lateral deltoid"],
      secondary: ["triceps", "upper traps", "core"],
    },
    category: "strength",
    movementPattern: "vertical push",
    equipment: ["barbell"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 4,
    repRange: { min: 5, max: 8 },
    restSeconds: 150,
    instructions: [
      "Grip bar just outside shoulder width, elbows slightly in front of bar",
      "Brace core and glutes hard before pressing",
      "Press bar overhead, moving head back slightly to clear the path",
      "Lock out overhead, shrug traps at the top",
    ],
    tips: "Squeeze glutes to prevent lower back arching under heavy load",
    videoUrl: null,
  },
  {
    id: "ex_004",
    name: "Pull-up",
    muscleGroups: {
      primary: ["lats", "biceps"],
      secondary: ["rear deltoid", "rhomboids", "core"],
    },
    category: "strength",
    movementPattern: "vertical pull",
    equipment: ["pull-up bar"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 3,
    repRange: { min: 6, max: 12 },
    restSeconds: 90,
    instructions: [
      "Hang from bar with an overhand grip, slightly wider than shoulder width",
      "Depress and retract scapulae before pulling",
      "Pull until chin clears the bar",
      "Lower under control to full hang",
    ],
    tips: "Initiate with the lats, not the arms — think elbows to hips",
    videoUrl: null,
  },
  {
    id: "ex_005",
    name: "Bulgarian Split Squat",
    muscleGroups: {
      primary: ["quads", "glutes"],
      secondary: ["hamstrings", "hip flexors", "core"],
    },
    category: "strength",
    movementPattern: "squat",
    equipment: ["dumbbells", "bench"],
    mechanics: "compound",
    laterality: "unilateral",
    defaultSets: 3,
    repRange: { min: 8, max: 12 },
    restSeconds: 90,
    instructions: [
      "Elevate rear foot on a bench, stand about 2 feet in front of it",
      "Hold a dumbbell in each hand",
      "Descend until front thigh is roughly parallel to the floor",
      "Press through the front heel to return to the top",
    ],
    tips: "Keep torso upright — forward lean shifts load to the hip flexor",
    videoUrl: null,
  },
  {
    id: "ex_006",
    name: "Box Jump",
    muscleGroups: {
      primary: ["quads", "glutes", "calves"],
      secondary: ["hamstrings", "core"],
    },
    category: "plyometrics",
    movementPattern: "jump",
    equipment: ["plyo box"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 4,
    repRange: { min: 5, max: 8 },
    restSeconds: 90,
    instructions: [
      "Stand facing the box at arm's length",
      "Dip into a quarter squat, swing arms back",
      "Explode up, swinging arms forward and pulling knees up",
      "Land softly with knees bent, stand tall, then step down",
    ],
    tips: "Always step down — never jump down; it defeats the recovery purpose",
    videoUrl: null,
  },
  {
    id: "ex_007",
    name: "Tempo Run",
    muscleGroups: {
      primary: ["quads", "hamstrings", "calves", "glutes"],
      secondary: ["core", "hip flexors"],
    },
    category: "cardio",
    movementPattern: "run",
    equipment: [],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 1,
    durationRange: { minMinutes: 20, maxMinutes: 50 },
    targetPaceMinPerKm: { min: 4.5, max: 5.2 },
    restSeconds: 300,
    instructions: [
      "Warm up with 10 minutes of easy jogging",
      "Build to a comfortably hard pace — around a 7/10 effort",
      "Maintain that pace for the target duration without drifting",
      "Cool down with 5-10 minutes of easy jogging",
    ],
    tips: "You should be able to speak in short phrases, not full sentences",
    videoUrl: null,
  },
  {
    id: "ex_008",
    name: "Plank",
    muscleGroups: {
      primary: ["core", "transverse abdominis"],
      secondary: ["shoulders", "glutes", "hip flexors"],
    },
    category: "isometric strength",
    movementPattern: "isometric",
    equipment: [],
    mechanics: "isolation",
    laterality: "bilateral",
    defaultSets: 3,
    durationRange: { minSeconds: 30, maxSeconds: 90 },
    restSeconds: 60,
    instructions: [
      "Place forearms on the floor, elbows under shoulders",
      "Form a straight line from head to heel",
      "Brace the entire core — posterior pelvic tilt slightly",
      "Hold for the target duration without letting hips sag or pike",
    ],
    tips: "Push the floor away with your forearms to engage the serratus",
    videoUrl: null,
  },
  {
    id: "ex_009",
    name: "Cable Row",
    muscleGroups: {
      primary: ["rhomboids", "mid traps", "lats"],
      secondary: ["biceps", "rear deltoid", "forearms"],
    },
    category: "strength",
    movementPattern: "horizontal pull",
    equipment: ["cable machine"],
    mechanics: "compound",
    laterality: "bilateral",
    defaultSets: 3,
    repRange: { min: 10, max: 15 },
    restSeconds: 90,
    instructions: [
      "Sit at the cable station, feet braced, slight bend in knees",
      "Grip the handle with arms extended and a tall spine",
      "Retract the scapulae first, then pull elbows back past your torso",
      "Pause briefly at full contraction, return under control",
    ],
    tips: "Avoid rocking the torso — the row is a back exercise, not a swing",
    videoUrl: null,
  },
  {
    id: "ex_010",
    name: "Dumbbell Lateral Raise",
    muscleGroups: {
      primary: ["lateral deltoid"],
      secondary: ["anterior deltoid", "traps"],
    },
    category: "strength",
    movementPattern: "lateral raise",
    equipment: ["dumbbells"],
    mechanics: "isolation",
    laterality: "bilateral",
    defaultSets: 3,
    repRange: { min: 12, max: 20 },
    restSeconds: 60,
    instructions: [
      "Stand with a dumbbell in each hand, slight bend in the elbows",
      "Raise arms out to the sides until parallel to the floor",
      "Lead with the pinkies to keep the lateral head engaged",
      "Lower slowly over 2-3 seconds",
    ],
    tips: "Go lighter than you think — momentum kills the stimulus here",
    videoUrl: null,
  },
];

const getExercises = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ exercises })
}

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) res.status(409).json({ message: "Error: Request body not included" })

  const requestData = req.body
  const exercise = await exerciseService.createExercise(exercises, requestData)

  exercises.push(exercise)

  res.status(200).send({ exercise, message: "New exercise added successfully" })
}

const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) res.status(409).json({ message: "Error: Request body not included" })

  const { exerciseId, zoddedUpdate } = await exerciseService.updateExercise(exercises, req)

  exercises[exerciseId] = zoddedUpdate

  res.status(200).send({ exercise: zoddedUpdate, message: "Exercise successfully updated" })
}

const deleteExercise = (req: Request, res: Response, next: NextFunction) => {
  const passedId = req.params.id

  const exerciseId = exercises.findIndex(exercise => exercise.id === passedId)

  if (exerciseId === -1) res.status(404).json({ message: `Didn't find exercise with ID ${passedId}`})

  const deletedExercise = exercises.splice(exerciseId, 1)

  res.status(200).send({ exercise: deletedExercise, message: "Exercise deleted successfully"})
}

export default {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
}