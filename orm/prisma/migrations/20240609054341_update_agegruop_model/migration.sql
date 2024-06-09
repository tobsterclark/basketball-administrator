/*
  Warnings:

  - You are about to drop the column `endAge` on the `AgeGroup` table. All the data in the column will be lost.
  - You are about to drop the column `startAge` on the `AgeGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AgeGroup" DROP COLUMN "endAge",
DROP COLUMN "startAge";
