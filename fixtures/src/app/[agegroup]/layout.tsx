import { getAllAgeGroups } from "@/db/cached";
import { ReactNode } from "react";
import { TabBar } from "./TabBar";

// Revalidate static pages once a day, this should very rarely change so cache reduces db calls
export const dynamicParams = false;
export const revalidate = 86400;

// Generate fixture/ladder/results pages for each age group
export async function generateStaticParams() {
  console.log(`Database url environment variable: ${process.env.DATABASE_URL}`);
  process.env.DATABASE_URL =
    "postgresql://developer:%2Ch6VKM7gX.m%5BL%24B%2C@35.201.1.63:5432/postgres?host=/cloudsql/runsheetcontrol:australia-southeast1:player-management";
  const ageGroups = (await getAllAgeGroups()).filter(({ displayName }) => displayName.toLowerCase() !== "none");

  console.log(`Available pages: ${ageGroups.map(({ id }) => id)}`);

  return ageGroups.map(({ id }) => {
    return { agegroup: id };
  });
}

export default async function MainLayout({ children, params }: { children: ReactNode; params: Promise<{ agegroup: string }> }) {
  // Use the cached age group to get the current display name from the age group ID
  const ageGroupId = (await params).agegroup;

  return (
    <div className="flex flex-col gap-8 bg-white text-black py-5 min-h-screen w-screen overflow-hidden font-sans">
      <TabBar ageGroupId={ageGroupId} />

      <section>{children}</section>
    </div>
  );
}
