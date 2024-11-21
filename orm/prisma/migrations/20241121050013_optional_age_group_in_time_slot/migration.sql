-- DropForeignKey
ALTER TABLE "Timeslot" DROP CONSTRAINT "Timeslot_ageGroupId_fkey";

-- AlterTable
ALTER TABLE "Timeslot" ALTER COLUMN "ageGroupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
