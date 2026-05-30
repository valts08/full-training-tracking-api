-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "modifiedAt" TIMESTAMPTZ NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "difficulty" VARCHAR(20) NOT NULL,
    "exerciseTypes" JSONB NOT NULL,
    "notes" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "muscleGroup" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "movementPattern" TEXT NOT NULL,
    "equipment" JSONB NOT NULL,
    "mechanics" VARCHAR(20) NOT NULL,
    "laterality" VARCHAR(20) NOT NULL,
    "defaultSets" INTEGER NOT NULL,
    "repRange" JSONB,
    "durationRange" INTEGER,
    "targetPaceMinKm" JSONB,
    "restSeconds" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "tips" VARCHAR(255) NOT NULL,
    "videoUrl" VARCHAR(255),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("workoutId","exerciseId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
