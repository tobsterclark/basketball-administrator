import { getTimeslotsForAgeGroup } from "@/db/cached";
import { Timeslot } from "@/db/types";
import { stripTime } from "@/util";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
	const ageGroupId = (await params).agegroup;

	const allGames = await getTimeslotsForAgeGroup(ageGroupId);
	const games = allGames.filter(({ date }) => stripTime(date) >= stripTime(new Date()));

	return Table(games);
}

function FormatDate(date: string) {
	// takes in a string in the format "HH:MM:SS AM/PM" and returns a string in the format "HH:MM am/pm"
	const time = date.split(":");
	return `${time[0]}:${time[1]}${time[2].split(" ")[1].toLowerCase()}`;
}

function Table(timeslots: Timeslot[]) {
	// Group games by day and sort based on time
	const games = [...Map.groupBy(timeslots, (item) => stripTime(item.date).getTime())].sort((a, b) => a[0] - b[0]);

	return games.map(([key, value]) => {
		// Sort subentries by time and then court
		const sortedGames = value.sort((a, b) => {
			const timeA = new Date(a.date).getTime();
			const timeB = new Date(b.date).getTime();
			if (timeA === timeB) {
				return a.court.toString().localeCompare(b.court.toString());
			}
			return timeA - timeB;
		});

		return (
			<div key={key} className="py-4 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">{new Date(key).toDateString()}</h3>
				{GameTiles(sortedGames)}
			</div>
		);
	});
}

function GameTiles(games: Timeslot[]) {
	return <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{games.map((game) => Tile(game))}</div>;
}

function Tile(timeslot: Timeslot) {
	// Convert CONSTANT_CASE to capitalised
	var location = timeslot.location
		.split("_")
		.map((str) => str[0].toUpperCase() + str.substring(1).toLowerCase())
		.join(" ");
	const date = new Date(timeslot.date).toLocaleTimeString();

	return (
		<div key={timeslot.id} className="bg-gray-200 rounded-md py-2 px-4 flex justify-between items-center">
			<div className="flex flex-col">
				<p className="text-lg font-bold">{timeslot.game?.lightTeam.name}</p>
				<p className="text-md font-semibold text-orange-500">vs</p>
				<p className="text-lg font-bold">{timeslot.game?.darkTeam.name}</p>
			</div>

			<div className="text-orange-500 text-sm flex flex-col space-y-1 text-end">
				<p>{location}</p>
				<p>Court {timeslot.court}</p>
				<p>{FormatDate(date)}</p>
			</div>
		</div>
	);
}
