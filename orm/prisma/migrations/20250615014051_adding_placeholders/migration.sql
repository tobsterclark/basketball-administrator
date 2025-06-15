-- AlterTable
ALTER TABLE "Timeslot" ADD COLUMN     "placeholder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "placeholderReason" TEXT;
