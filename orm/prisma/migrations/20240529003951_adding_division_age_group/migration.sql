/*
  Warnings:

  - Added the required column `age_group` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "age_group" "AgeGroup" NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "division" INTEGER;
