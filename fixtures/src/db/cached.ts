import { unstable_cache } from "next/cache";
import { prisma } from "./client";

// Cache response from `ageGroup` db
export const getAllAgeGroups = unstable_cache(
  async () => await prisma.ageGroup.findMany(),
);

// Helper fun for getting a specific age groups info
export async function getAgeGroup(
  groupId: string,
): Promise<{ id: string; displayName: string } | undefined> {
  const all = await getAllAgeGroups();
  return all.find(({ id }) => id == groupId);
}

export const getTimeslotsForAgeGroup = unstable_cache(
  async (ageGroupId: string) =>
    await prisma.timeslot.findMany({
      where: { ageGroupId: ageGroupId },
      include: { game: { include: { lightTeam: true, darkTeam: true } } },
    }),
);

export const getAllTeamsInAgeGroup = unstable_cache(
  async (ageGroupId: string) =>
    await prisma.team.findMany({ where: { ageGroupId: ageGroupId } }),
);
