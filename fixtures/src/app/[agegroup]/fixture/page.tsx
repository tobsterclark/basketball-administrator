import { getTimeslotsForAgeGroup } from "@/db/cached";
import { Timeslot } from "@/db/types";
import { stripTime } from "@/util";

export default async function Page({
  params,
}: {
  params: Promise<{ agegroup: string }>;
}) {
  const ageGroupId = (await params).agegroup;

  const allGames = await getTimeslotsForAgeGroup(ageGroupId);
  const games = allGames.filter(
    ({ date }) => stripTime(date) >= stripTime(new Date()),
  );

  return Table(games);
}

function Table(timeslots: Timeslot[]) {
  // Group games by day and sort based on time
  const games = [
    ...Map.groupBy(timeslots, (item) => stripTime(item.date).getTime()),
  ].sort((a, b) => a[0] - b[0]);

  return games.map(([key, value]) => (
    <div key={key} className="py-4 flex flex-col space-y-4">
      <h3 className="text-lg font-bold">{new Date(key).toDateString()}</h3>
      {GameTiles(value)}
    </div>
  ));
}

function GameTiles(games: Timeslot[]) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {games.map((game) => Tile(game))}
    </div>
  );
}

function Tile(timeslot: Timeslot) {
  // Convert CONSTANT_CASE to capitalised
  var location = timeslot.location
    .split("_")
    .map((str) => str[0].toUpperCase() + str.substring(1).toLowerCase())
    .join(" ");
  const date = new Date(timeslot.date).toLocaleTimeString();

  return (
    <div
      key={timeslot.id}
      className="bg-gray-200 rounded-md py-2 px-4 flex justify-between items-center"
    >
      <div className="flex flex-col">
        <p className="text-lg font-bold">{timeslot.game?.darkTeam.name}</p>
        <p className="text-md font-semibold text-orange-500">vs</p>
        <p className="text-lg font-bold">{timeslot.game?.lightTeam.name}</p>
      </div>

      <div className="text-orange-500 text-sm flex flex-col space-y-1 text-end">
        <p>
          {location} court {timeslot.court}
        </p>
        <p>{date}</p>
      </div>
    </div>
  );
}
