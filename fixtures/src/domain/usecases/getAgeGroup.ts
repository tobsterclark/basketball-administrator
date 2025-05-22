import { getAllAgeGroups } from "@/db/cached";

// Helper fun for getting a specific age groups info
export async function getAgeGroup(groupId: string): Promise<{ id: string; displayName: string } | undefined> {
  process.env.TZ = "Australia/Sydney"
  const all = await getAllAgeGroups();
  return all.find(({ id }) => id == groupId);
}
