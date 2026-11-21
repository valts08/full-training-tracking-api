import '../src/config/index.js'
import seedData from '../src/helpers/seedData.js'
import { prisma } from "./prismaClient.js";

const seedDatabase = async () => {
    await prisma.workoutExercise.deleteMany()
    await prisma.workout.deleteMany()
    await prisma.exercise.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "WorkoutExercise", "Workout", "Exercise", "User" RESTART IDENTITY CASCADE;`
    )

    await prisma.$transaction([
        prisma.user.createMany({ data: seedData.users }),
        prisma.exercise.createMany({ data: seedData.exercises }),
        
    ])
    for (const seedWorkout of seedData.workouts) {      
        const { exerciseIds, ...workoutData } = seedWorkout
        await prisma.workout.create({ 
            data: {
                ...workoutData,
                workoutExercises: {
                    create: exerciseIds.map((exerciseId: number) => ({
                        exercise: { connect: { id: exerciseId } }
                    }))
                }
            }
        })
    }
}

seedDatabase()
    .then(() => console.log('done'))
    .catch((e) => console.log("Seeding error: ", e))
    .finally(() => prisma.$disconnect())