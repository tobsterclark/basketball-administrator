import { getAllTeamsInAgeGroup, getTimeslotsForAgeGroup } from "@/db/cached";
import { Game } from "../types/Game";
import { Team } from "../types/Team";

// Singular function for both to allow all games to reference a complete Team class as well as allowing Teams to always
// have calculated stats
export async function getGamesAndTeams(ageGroupId: string): Promise<[Team[], Game[]]> {
  const [timeslots, dbTeams] = await Promise.all([
    getTimeslotsForAgeGroup(ageGroupId),
    getAllTeamsInAgeGroup(ageGroupId),
  ]);

  // Use adult age group id to check if is adult team, this is used to decide whether or not to show coloured
  // dots next to team names
  const isAdultTeam = ageGroupId === "48b2bdf3-3acb-4f5a-b7e7-19ffca0f3c64"

  const teams = dbTeams.map((team) => new Team(team.id, team.name, team.division, team.players, isAdultTeam));
  const games = timeslots.map((game) => new Game(game, teams));

  teams.forEach((team) => team.setGames(games));
  return [teams, games];
}
