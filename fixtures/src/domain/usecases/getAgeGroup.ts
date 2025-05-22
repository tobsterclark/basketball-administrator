import { getAllAgeGroups } from "@/db/cached";

// Helper fun for getting a specific age groups info
export async function getAgeGroup(groupId: string): Promise<{ id: string; displayName: string } | undefined> {
  console.log(`Database url environment variable: ${process.env.DATABASE_URL}`)
  process.env.DATABASE_URL = "postgresql://developer:%2Ch6VKM7gX.m%5BL%24B%2C@35.201.1.63:5432/postgres?host=/cloudsql/runsheetcontrol:australia-southeast1:player-management"
  process.env.TZ = "Australia/Sydney"
  const all = await getAllAgeGroups();
  return all.find(({ id }) => id == groupId);
}
