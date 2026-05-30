import { prisma } from "../../prisma/prismaClient.ts";

const getWorkout = async () => {
    const workouts = await prisma.workout.findMany()
    return workouts
}

const getWorkoutById = async (id: number) => {
    const workouts = await prisma.workout.findFirst({
        where: { id }
    })

    return workouts
}


export default {
    getWorkout,
    getWorkoutById
}