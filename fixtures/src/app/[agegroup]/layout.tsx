import { getAgeGroup, getAllAgeGroups } from "@/db/cached";
import Link from "next/link";
import { ReactNode } from "react";

// Revalidate static pages once a day, this should very rarely change so cache reduces db calls
export const dynamicParams = false;
export const revalidate = 86400;

// Generate fixture/ladder/results pages for each age group
export async function generateStaticParams() {
	const ageGroups = await getAllAgeGroups();

	console.log(`Available pages: ${ageGroups.map(({ id }) => id)}`);

	return ageGroups.map(({ id }) => {
		return { agegroup: id };
	});
}

export default async function MainLayout({ children, params }: { children: ReactNode; params: Promise<{ agegroup: string }> }) {
	// Use the cached age group to get the current display name from the age group ID
	const ageGroupId = (await params).agegroup;
	const ageGroup = (await getAgeGroup(ageGroupId))?.displayName;

	return (
		<div className="flex flex-col gap-8 bg-white text-black p-5 min-h-screen w-screen">
			<h1 className="text-xl font-bold">Age group {ageGroup}</h1>

			<div className="flex flex-row gap-6">
				<Link href={`/${ageGroupId}/fixture`} className="bg-orange-500 p-2 rounded">
					Fixture
				</Link>
				<Link href={`/${ageGroupId}/results`} className="bg-orange-500 p-2 rounded">
					Results
				</Link>
				<Link href={`/${ageGroupId}/ladder`} className="bg-orange-500 p-2 rounded">
					Ladder
				</Link>
				<Link href={`/${ageGroupId}/teams`} className="bg-orange-500 p-2 rounded">
					Teams
				</Link>
			</div>

			<section>{children}</section>
		</div>
	);
}
