import { Game } from "@/domain/types/Game";
import { Location } from "@/domain/types/Location";
import { groupBy, locationToText } from "@/util";
import { stripTime } from "@/util";
import { TeamName } from "./TeamName";
import { Team } from "@/domain/types/Team";

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
    const groupedGames = groupBy(sortedGames, (game) => game.location).sort(([a], [b]) => (a > b ? -1 : 1));
    const showLocation = groupedGames.length > 1;

    return (
      <div key={key} className="px-5 py-2 flex flex-col space-y-1 md:space-y-4">
        <h3 className="text-base md:text-lg font-bold">{new Date(key).toDateString()}</h3>
        <div className="flex flex-col space-y-1 md:space-y-2">{groupedGames.map(([key, value]) => GameTiles(value, key, showLocation))}</div>
      </div>
    );
  });
}

function GameTiles(games: Game[], location: Location, showLocation: Boolean) {
  return (
    <div key={location} className="flex flex-col space-y-1">
      {showLocation ? <h4 className="text-base md:text-lg">{locationToText(location)}</h4> : null}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">{games.map((game) => Tile(game))}</div>
    </div>
  );
}

function Tile(game: Game) {
  if (game.lightTeam.id === game.darkTeam.id) {
    return ByeGameTile(game);
  }

  return (
    <div
      key={new Date(game.date).getTime() + game.court}
      className="bg-gray-200 rounded-md py-2 px-4 text-xs md:text-sm font-bold flex justify-between items-center"
    >
      <div className="flex flex-col">
        <div className="flex space-x-1">
          {TeamName(game.lightTeam)}
          <p>{game.result ? `(${game.result.lightScore})` : lightTeamIndicator(game.lightTeam, true)}</p>
        </div>
        <p className="text-md font-semibold text-orange-500">vs</p>
        <div className="flex space-x-1">
          {TeamName(game.darkTeam)}
          <p>{game.result ? `(${game.result.darkScore})` : lightTeamIndicator(game.darkTeam, false)}</p>
        </div>
      </div>

      <div className="text-orange-500 font-normal flex-1 text-right">{TimeAndWinner(game)}</div>
    </div>
  );
}

function ByeGameTile(game: Game) {
  return (
    <div
      key={new Date(game.date).getTime() + game.court}
      className="bg-gray-200 rounded-md py-2 px-4 text-xs md:text-sm font-bold flex justify-between items-center"
    >
      <div className="flex space-x-2">
        <p>{game.lightTeam.name} has a friendly</p>
        {game.lightTeam.isAdultTeam ? <div className={"size-5 rounded-full " + game.lightTeam.getColour()} /> : null}
      </div>

      <div className="text-orange-500 font-normal flex-1 text-right">{TimeAndWinner(game)}</div>
    </div>
  );
}

function lightTeamIndicator(team: Team, isLight: boolean) {
  if (team.isAdultTeam) {
    return undefined;
  } else {
    return isLight ? "(W)" : "(B)";
  }
}

function formatDate(date: string) {
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
        <p>
          {locationToText(game.location)} Court {game.court}
        </p>
        <p>{formatDate(new Date(game.date).toLocaleTimeString())}</p>
      </div>
    );
  }
}
