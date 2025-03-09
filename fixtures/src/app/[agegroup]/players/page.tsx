import { Player } from "@/domain/types/Player";
import { Team } from "@/domain/types/Team";
import { getTeamsForAgeGroup } from "@/domain/usecases/getTeamsForAgeGroup";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
	const ageGroupId = (await params).agegroup;
	const teams = await getTeamsForAgeGroup(ageGroupId);

	return PlayersTable(teams);
}

function PlayersTable(teams: Team[]) {
	const allPlayerLengths = teams.map((team) => team.players.length);
	const maxPlayers = allPlayerLengths.length > 0 ? allPlayerLengths.reduce((prev, current) => (prev && prev > current ? prev : current)) : 0;

	return (
		<table className="table-auto">
			<thead className="uppercase bg-gray-50 text-gray-700 text-xs">
				<tr>
					<th scope="col" className="px-6 py-3 border-r">
						Teams
					</th>
					<th scope="col" className="px-6 py-3 text-start" colSpan={10}>
						Players
					</th>
				</tr>
			</thead>
			<tbody>{teams.map((team) => PlayersRow(team, maxPlayers))}</tbody>
		</table>
	);
}

function PlayersRow(team: Team, maxPlayers: number) {
	return (
		<tr key={team.name} className="odd:bg-white text-gray-900 even:bg-gray-50 hover:bg-orange-500">
			<td scope="row" className="px-4 py-4 text-center border-r text-sm">
				{team.name}
			</td>

			{PlayerItems(team.players, maxPlayers)}
		</tr>
	);
}

function PlayerItems(players: Player[], maxPlayers: number) {
	return Array(maxPlayers)
		.fill(0)
		.map((_, index) => {
			const player = players.at(index);
			return (
				<td key={index} className="px-4 py-4 text-xs whitespace-nowrap">
					{player ? `${player.firstName} ${player.lastName}` : ""}
				</td>
			);
		});
}
