/*
  Warnings:

  - A unique constraint covering the columns `[displayName]` on the table `AgeGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AgeGroup_displayName_key" ON "AgeGroup"("displayName");
