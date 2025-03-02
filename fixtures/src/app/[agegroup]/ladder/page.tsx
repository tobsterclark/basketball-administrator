import { getTeamsForAgeGroup } from "@/db/cached";
import { Team } from "@/domain/Team";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
	const ageGroupId = (await params).agegroup;

	const teams = await getTeamsForAgeGroup(ageGroupId);

	console.log(teams.map((team) => `team: ${team.name} has ${Team.fromJSON(team).points()} points`));

	return <div />;
}
