/*
  Warnings:

  - Changed the type of `createdAt` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modifiedAt` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" BIGINT NOT NULL,
DROP COLUMN "modifiedAt",
ADD COLUMN     "modifiedAt" BIGINT NOT NULL;
