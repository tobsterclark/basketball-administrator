/*
  Warnings:

  - You are about to drop the column `court` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timeslot_id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeslot_id` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "court",
DROP COLUMN "date",
DROP COLUMN "location",
ADD COLUMN     "timeslot_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "court" INTEGER NOT NULL,
    "age_group" "AgeGroup" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_timeslot_id_key" ON "Game"("timeslot_id");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_timeslot_id_fkey" FOREIGN KEY ("timeslot_id") REFERENCES "Timeslot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
