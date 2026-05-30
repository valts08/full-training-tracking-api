/*
  Warnings:

  - You are about to drop the column `muscleGroup` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `targetPaceMinKm` on the `Exercise` table. All the data in the column will be lost.
  - The `durationRange` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `muscleGroups` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "muscleGroup",
DROP COLUMN "targetPaceMinKm",
ADD COLUMN     "muscleGroups" JSONB NOT NULL,
ADD COLUMN     "targetPaceMinPerKm" JSONB,
DROP COLUMN "durationRange",
ADD COLUMN     "durationRange" JSONB;
