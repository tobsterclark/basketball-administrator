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
	// Teams are sorted by the number of points they have
	// Teams with equal points are sorted by 'pointsFor'
	const orderedTeams = teams.sort((a, b) => {
		const comparison = b.points() - a.points();
		return comparison !== 0 ? comparison : b.pointsFor - a.pointsFor;
	});

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
						wins (3)
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						draws (2)
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						losses (1)
					</th>
					<th scope="col" className="px-6 py-3 hidden md:table-cell">
						forfeits (0)
					</th>
					<th scope="col" className="px-6 py-3 hidden lg:table-cell">
						points for
					</th>
					<th scope="col" className="px-6 py-3 hidden lg:table-cell">
						points against
					</th>
					<th scope="col" className="px-6 py-3">
						points %
					</th>
				</tr>
			</thead>
			<tbody>{orderedTeams.map((team, index) => LadderRow(team, index + 1))}</tbody>
			<caption className="text-gray-500 text-xs caption-bottom py-2">
				<p>Team positions are calculated by number of wins, draws, losses and forfeits,</p>
				<p>if teams have equal points, they are then compared by points percentage (points for / points against) * 100</p>
			</caption>
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
			<td className="px-6 py-3 hidden md:table-cell">{team.draws}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.losses}</td>
			<td className="px-6 py-3 hidden md:table-cell">{team.forfeits}</td>
			<td className="px-6 py-3 hidden lg:table-cell">{team.pointsFor}</td>
			<td className="px-6 py-3 hidden lg:table-cell">{team.pointsAgainst}</td>
			<td className="px-6 py-3">{team.pointsPercentage() || 0}</td>
		</tr>
	);
}
