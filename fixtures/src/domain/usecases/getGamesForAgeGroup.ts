import { Game } from "../types/Game";
import { getGamesAndTeams } from "./getGamesAndTeams";

export async function getGamesForAgeGroup(ageGroupId: string): Promise<Game[]> {
	const [_, games] = await getGamesAndTeams(ageGroupId);
	return games;
}
