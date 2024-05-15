/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team_dark_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team_light_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "team_light_id" SET DATA TYPE TEXT,
ALTER COLUMN "team_dark_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Game_id_seq";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Player_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_team_light_id_fkey" FOREIGN KEY ("team_light_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_team_dark_id_fkey" FOREIGN KEY ("team_dark_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
