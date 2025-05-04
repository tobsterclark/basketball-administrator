import { Team } from "../types/Team";
import { getGamesAndTeams } from "./getGamesAndTeams";

export async function getTeamsForAgeGroup(ageGroupId: string): Promise<Team[]> {
  const [teams, _] = await getGamesAndTeams(ageGroupId);
  return teams.filter((team) => team.name !== "Extra")
}
