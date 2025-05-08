import { stripTime } from "@/util";
import { GamesList } from "../_common/GamesList";
import { getGamesForAgeGroup } from "@/domain/usecases/getGamesForAgeGroup";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
  const ageGroupId = (await params).agegroup;

  const allGames = await getGamesForAgeGroup(ageGroupId);
  const games = allGames.filter((time) => stripTime(time.date) >= stripTime(new Date()));

  return GamesList(games, false);
}
