import { unstable_cache } from "next/cache";
import { prisma } from "./client";
import { getCurrentTerm, getNextTerm } from "./mocked";

// Cache response from `ageGroup` db
export const getAllAgeGroups = unstable_cache(async () => await prisma.ageGroup.findMany());

// Fetch and cache all timeslots along with the associated game
export const getTimeslotsForAgeGroup = unstable_cache(
  async (ageGroupId: string) =>
    await prisma.timeslot.findMany({
      where: {
        AND: [
          { ageGroupId: ageGroupId },
          { date: { gt: getCurrentTerm().date, lt: getNextTerm().date } },
          { game: { isNot: null } },
        ],
      },
      include: { game: true },
    }),
);

// Fetch and cache all teams with players
export const getAllTeamsInAgeGroup = unstable_cache(
  async (ageGroupId: string) =>
    await prisma.team.findMany({ where: { ageGroupId: ageGroupId }, include: { players: true } }),
);
