/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('KIDS', 'ADULTS');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('ST_IVES', 'BELROSE');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "location" "Location" NOT NULL,
    "court" INTEGER NOT NULL,
    "team_light_id" INTEGER NOT NULL,
    "team_dark_id" INTEGER NOT NULL,
    "light_score" INTEGER NOT NULL,
    "dark_score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age_group" "AgeGroup" NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_team_light_id_fkey" FOREIGN KEY ("team_light_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_team_dark_id_fkey" FOREIGN KEY ("team_dark_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
