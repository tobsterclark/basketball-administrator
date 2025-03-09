import { Team } from "@/domain/types/Team";
import { getTeamsForAgeGroup } from "@/domain/usecases/getTeamsForAgeGroup";
import { groupBy } from "@/util";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
	const ageGroupId = (await params).agegroup;

	const teams = await getTeamsForAgeGroup(ageGroupId);
	const divisions = groupBy(teams, (team) => team.division);

	return (
		<div className="flex space-x-4">
			{divisions.map(([division, teams]) => (
				<div key={division} className="flex flex-col space-y-2">
					<p>{division ? `Div ${division}` : ``}</p>
					{LadderTable(teams)}
				</div>
			))}
		</div>
	);
}

function LadderTable(teams: Team[]) {
	// TODO: teams need to be ordered by baskets if equal in points (I believe)
	const orderedTeams = teams.sort((a, b) => b.points() - a.points());

	return (
		<table className="table-auto">
			<thead className="uppercase bg-gray-50 text-gray-700 text-xs">
				<tr>
					<th scope="col" className="px-6 py-3">
						position
					</th>
					<th scope="col" className="px-6 py-3">
						team
					</th>
					<th scope="col" className="px-6 py-3">
						points
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						wins
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						losses
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						draws
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						forfeits
					</th>
				</tr>
			</thead>
			<tbody>{orderedTeams.map((team, index) => LadderRow(team, index + 1))}</tbody>
		</table>
	);
}

function LadderRow(team: Team, position: number) {
	return (
		<tr key={team.name} className="odd:bg-white text-sm text-gray-900 even:bg-gray-50">
			<th scope="row" className="px-6 py-3">
				{position}
			</th>
			<td className="px-6 py-3">{team.name}</td>
			<td className="px-6 py-3">{team.points()}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.wins}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.losses}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.draws}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.forfeits}</td>
		</tr>
	);
}
