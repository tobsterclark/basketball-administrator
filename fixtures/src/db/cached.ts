import { unstable_cache } from "next/cache";
import { prisma } from "./client";
import { getCurrentTerm, getNextTerm } from "./mocked";
import { Game } from "@/domain/Game";
import { Team } from "@/domain/Team";

// Cache response from `ageGroup` db
export const getAllAgeGroups = unstable_cache(async () => await prisma.ageGroup.findMany());

// Helper fun for getting a specific age groups info
export async function getAgeGroup(groupId: string): Promise<{ id: string; displayName: string } | undefined> {
	const all = await getAllAgeGroups();
	return all.find(({ id }) => id == groupId);
}

// Fetch all timeslots along with the associated game
const getTimeslotsForAgeGroup = async (ageGroupId: string) =>
	await prisma.timeslot.findMany({
		where: {
			AND: [
				{ ageGroupId: ageGroupId },
				{ date: { gt: getCurrentTerm().date, lt: getNextTerm().date } },
				{ game: { isNot: null } },
			],
		},
		include: { game: true },
	});

// Fetch all teams with players
const getAllTeamsInAgeGroup = async (ageGroupId: string) =>
	await prisma.team.findMany({ where: { ageGroupId: ageGroupId }, include: { players: true } });

// Cached function for fetching all available players and games
// Singular function for both to allow all games to reference a complete Team class as well as allowing Teams to always
// have calculated stats
const getGamesAndTeams = unstable_cache(async (ageGroupId: string): Promise<[Team[], Game[]]> => {
	const [timeslots, teamsDto] = await Promise.all([
		getTimeslotsForAgeGroup(ageGroupId),
		getAllTeamsInAgeGroup(ageGroupId),
	]);

	const teams = teamsDto.map((team) => new Team(team.id, team.name, team.division, []));
	const games = timeslots.map((game) => new Game(game, teams));

	teams.forEach((team) => team.setGames(games));
	return [teams, games];
});

export const getGamesForAgeGroup = async (ageGroupId: string): Promise<Game[]> =>
	(await getGamesAndTeams(ageGroupId))[1];
export const getTeamsForAgeGroup = async (ageGroupId: string): Promise<Team[]> =>
	(await getGamesAndTeams(ageGroupId))[0];
