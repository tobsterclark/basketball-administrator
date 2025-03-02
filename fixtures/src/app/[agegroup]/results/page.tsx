import { getGamesForAgeGroup } from "@/db/cached";
import { GamesList } from "../_common/GamesList";
import { stripTime } from "@/util";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
	const ageGroupId = (await params).agegroup;

	const allGames = await getGamesForAgeGroup(ageGroupId);
	const games = allGames.filter((time) => stripTime(time.date) <= stripTime(new Date()));

	return GamesList(games, true);
}
