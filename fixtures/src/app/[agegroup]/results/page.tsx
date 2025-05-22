import { getGamesForAgeGroup } from "@/domain/usecases/getGamesForAgeGroup";
import { GamesList } from "../_common/GamesList";
import { stripTime } from "@/util";

export default async function Page({ params }: { params: Promise<{ agegroup: string }> }) {
  const ageGroupId = (await params).agegroup;

  const allGames = await getGamesForAgeGroup(ageGroupId);
  const games = allGames
    .filter(({ date }) => stripTime(date) <= stripTime(new Date()))
    .filter(({ darkTeam, lightTeam }) => darkTeam.id !== lightTeam.id);

  return GamesList(games, true);
}
