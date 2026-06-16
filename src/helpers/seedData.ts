const users = [
    {
      username: "valts"
    },
    {
      username: "john_doe"
    },
    {
      username: "jane_smith"
    }
]
  
const workouts = [
    {
      title: "Morning Push Day",
      durationMinutes: 60,
      difficulty: "medium",
      exerciseIds: [1, 2],
      notes: "Felt strong, increased weight on squats.",
    },
    {
      title: "Leg Day",
      durationMinutes: 75,
      difficulty: "hard",
      exerciseIds: [1, 4],
      notes: "Box jumps after squats was brutal.",
    },
    {
      title: "Active Recovery",
      durationMinutes: 30,
      difficulty: "easy",
      exerciseIds: [3],
      notes: "Easy tempo run, kept HR below 150.",
    },
    {
      title: "Full Body Strength",
      durationMinutes: 90,
      difficulty: "hard",
      exerciseIds: [1, 2, 4],
      notes: "",
    }
  ]

const exercises = [
    {
        name: "Barbell Back Squat",
        category: "strength",
        muscleGroups: { primary: ["quads", "glutes"], secondary: ["hamstrings", "core"] },
        movementPattern: "squat",
        equipment: ["barbell", "squat rack"],
        mechanics: "compound",
        laterality: "bilateral",
        defaultSets: 4,
        repRange: { min: 5, max: 8 },
        restSeconds: 180,
        instructions: "Brace core, descend until thighs are parallel, drive through heels.",
        tips: "Keep chest up and knees tracking over toes.",
        userId: 1,
        videoUrl: null
    },
    {
        name: "Dead Hang",
        category: "isometric strength",
        muscleGroups: { primary: ["lats", "forearms"], secondary: null },
        movementPattern: "carry",
        equipment: ["pull-up bar"],
        mechanics: "compound",
        laterality: "bilateral",
        defaultSets: 3,
        durationRange: { minSeconds: 20, maxSeconds: 60 },
        restSeconds: 90,
        instructions: "Hang from bar with arms fully extended and shoulders packed.",
        tips: "Avoid shrugging — actively depress the scapulae.",
        userId: 1,
        videoUrl: null
    },
    {
        name: "Tempo Run",
        category: "cardio",
        muscleGroups: { primary: ["quads", "calves"], secondary: ["glutes", "hamstrings"] },
        movementPattern: "locomotion",
        equipment: [],
        mechanics: "compound",
        laterality: "bilateral",
        defaultSets: 1,
        durationRange: { minMinutes: 20, maxMinutes: 40 },
        targetPaceMinPerKm: { min: 4.5, max: 5.2 },
        restSeconds: 0,
        instructions: "Run at a comfortably hard effort — roughly 7/10 perceived exertion.",
        tips: "Aim for a cadence around 170-180 spm and keep breathing controlled.",
        userId: 1,
        videoUrl: "https://example.com/tempo-run"
    },
    {
        name: "Box Jump",
        category: "plyometrics",
        muscleGroups: { primary: ["quads", "glutes"], secondary: ["calves", "core"] },
        movementPattern: "jump",
        equipment: ["plyo box"],
        mechanics: "compound",
        laterality: "bilateral",
        defaultSets: 4,
        repRange: { min: 5, max: 8 },
        restSeconds: 120,
        instructions: "Hinge into a quarter squat, explode upward, land softly with bent knees.",
        tips: "Reset fully between reps — this is a power exercise, not a cardio one.",
        userId: 1,
        videoUrl: null
    }
]

export default {
    users,
    workouts,
    exercises
}