import { getAllAgeGroups } from "@/db/cached";
import Link from "next/link";

export default async function Page() {
  // TODO: Temp for all page links
  const allAgeGroups = await getAllAgeGroups();

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen w-screen ">
      <h1 className="text-xl pb-3">Age Groups</h1>
      {allAgeGroups.map(({ id, displayName }) => {
        return (
          <Link href={`/${id}/fixture`} className="underline" key={id}>
            {displayName}
          </Link>
        );
      })}
    </div>
  );
}
