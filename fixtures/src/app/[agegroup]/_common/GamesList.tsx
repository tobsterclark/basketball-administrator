import { Location } from "@/../orm/client";
import { Game } from "@/domain/Game";
import { groupBy, locationToText } from "@/util";
import { stripTime } from "@/util";

export function GamesList(timeslots: Game[], sortByDescending: boolean) {
	// Group games by day and sort based on time
	const games = groupBy(timeslots, (item) => stripTime(item.date).getTime()).sort((a, b) => (sortByDescending ? b[0] - a[0] : a[0] - b[0]));

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

		// Group games by location
		const groupedGames = groupBy(sortedGames, (game) => game.location);

		return (
			<div key={key} className="py-4 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">{new Date(key).toDateString()}</h3>
				<div className="flex flex-col">{groupedGames.map(([key, value]) => GameTiles(value, key))}</div>
			</div>
		);
	});
}

function GameTiles(games: Game[], location: Location) {
	return (
		<div key={location} className="flex flex-col space-y-1 py-2">
			<h4 className="text-lg">{locationToText(location)}</h4>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{games.map((game) => Tile(game))}</div>
		</div>
	);
}

function Tile(game: Game) {
	return (
		<div key={new Date(game.date).getTime() + game.court} className="bg-gray-200 rounded-md py-2 px-4 flex justify-between items-center">
			<div className="flex flex-col">
				<p className="text-sm font-bold">
					{game.lightTeam.name} {game.result ? "- " + game.result.lightScore : undefined}
				</p>
				<p className="text-md font-semibold text-orange-500">vs</p>
				<p className="text-sm font-bold">
					{game.darkTeam.name} {game.result ? "- " + game.result.darkScore : undefined}
				</p>
			</div>

			<div className="text-orange-500 text-sm">{TimeAndWinner(game)}</div>
		</div>
	);
}

function FormatDate(date: string) {
	// takes in a string in the format "HH:MM:SS AM/PM" and returns a string in the format "HH:MM am/pm"
	const time = date.split(":");
	return `${time[0]}:${time[1]}${time[2].split(" ")[1].toLowerCase()}`;
}

function TimeAndWinner(game: Game) {
	if (game.result && game.result.winner) {
		return <p>{game.result.winner.name} win!</p>;
	} else if (game.result) {
		return <p>Draw</p>;
	} else {
		return (
			<div className="flex flex-col space-y-1 text-end">
				<p>Court {game.court}</p>
				<p>{FormatDate(new Date(game.date).toLocaleTimeString())}</p>
			</div>
		);
	}
}
