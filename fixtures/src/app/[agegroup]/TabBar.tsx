"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabBar({ ageGroupId }: { ageGroupId: string }) {
  const pathname = usePathname();

  const inactiveLinkStyle = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300";
  const activeLinkStyle = "inline-block p-4 text-orange-500 border-b-2 border-orange-500 rounded-t-lg active";

  return (
    <div className="font-medium text-sm md:text-base text-center border-b border-gray-200">
      <div className="flex flex-row w-screen justify-center -mb-px">
        <Link href={`/${ageGroupId}/fixture`} className={pathname.endsWith("fixture") ? activeLinkStyle : inactiveLinkStyle}>
          Fixture
        </Link>
        <Link href={`/${ageGroupId}/results`} className={pathname.endsWith("results") ? activeLinkStyle : inactiveLinkStyle}>
          Results
        </Link>
        <Link href={`/${ageGroupId}/ladder`} className={pathname.endsWith("ladder") ? activeLinkStyle : inactiveLinkStyle}>
          Ladder
        </Link>
        <Link href={`/${ageGroupId}/players`} className={pathname.endsWith("players") ? activeLinkStyle : inactiveLinkStyle}>
          Players
        </Link>
      </div>
    </div>
  );
}
