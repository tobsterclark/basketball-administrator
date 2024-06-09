/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dark_score` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `light_score` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `team_dark_id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `team_light_id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `timeslot_id` on the `Game` table. All the data in the column will be lost.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age_group` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `Player` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age_group` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Team` table. All the data in the column will be lost.
  - The primary key for the `Timeslot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age_group` on the `Timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Timeslot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timeslotId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location,date,court]` on the table `Timeslot` will be added. If there are existing duplicate values, this will fail.
  - The required column `_id` was added to the `Game` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `darkScore` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `darkTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightScore` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeslotId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Player` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ageGroupId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Team` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ageGroupId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Timeslot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ageGroupId` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team_dark_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team_light_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_timeslot_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- DropIndex
DROP INDEX "Game_timeslot_id_key";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "dark_score",
DROP COLUMN "id",
DROP COLUMN "light_score",
DROP COLUMN "team_dark_id",
DROP COLUMN "team_light_id",
DROP COLUMN "timeslot_id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "darkScore" INTEGER NOT NULL,
ADD COLUMN     "darkTeamId" TEXT NOT NULL,
ADD COLUMN     "lightScore" INTEGER NOT NULL,
ADD COLUMN     "lightTeamId" TEXT NOT NULL,
ADD COLUMN     "timeslotId" TEXT NOT NULL,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "age_group",
DROP COLUMN "first_name",
DROP COLUMN "id",
DROP COLUMN "last_name",
DROP COLUMN "team_id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "ageGroupId" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "age_group",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "ageGroupId" TEXT NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Timeslot" DROP CONSTRAINT "Timeslot_pkey",
DROP COLUMN "age_group",
DROP COLUMN "id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "ageGroupId" TEXT NOT NULL,
ADD CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("_id");

-- DropEnum
DROP TYPE "AgeGroup";

-- CreateTable
CREATE TABLE "AgeGroup" (
    "_id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "startAge" INTEGER NOT NULL,
    "endAge" INTEGER NOT NULL,

    CONSTRAINT "AgeGroup_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_timeslotId_key" ON "Game"("timeslotId");

-- CreateIndex
CREATE UNIQUE INDEX "Timeslot_location_date_court_key" ON "Timeslot"("location", "date", "court");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_lightTeamId_fkey" FOREIGN KEY ("lightTeamId") REFERENCES "Team"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_darkTeamId_fkey" FOREIGN KEY ("darkTeamId") REFERENCES "Team"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "Timeslot"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
