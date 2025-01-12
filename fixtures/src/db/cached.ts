import { unstable_cache } from "next/cache";
import { prisma } from "./client";

// Cache response from `ageGroup` db
export const getAllAgeGroups = unstable_cache(
  async () => await prisma.ageGroup.findMany(),
);

export async function getAgeGroup(
  groupId: string,
): Promise<{ id: string; displayName: string } | undefined> {
  const all = await getAllAgeGroups();
  return all.find(({ id }) => id == groupId);
}
