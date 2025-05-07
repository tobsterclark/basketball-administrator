import { Game } from "./Game";
import { Player } from "./Player";

export class Team {
  wins: number = 0;
  losses: number = 0;
  draws: number = 0;
  forfeits: number = 0;

  pointsFor: number = 0;
  pointsAgainst: number = 0;

  constructor(
    public id: string,
    public name: string,
    public division: number | null,
    public players: Player[],
  ) { }

  setGames(allGames: Game[]) {
    const games = allGames.filter((game) => game.darkTeam === this || game.lightTeam === this);
    this.calculateStats(games);
  }

  private calculateStats(games: Game[]) {
    for (var game of games) {
      if (game.result === undefined) continue;
      const result = game.result;

      this.pointsFor += game.darkTeam === this ? result.darkScore : result.lightScore;
      this.pointsAgainst += game.darkTeam === this ? result.lightScore : result.darkScore;

      if (result.winner) {
        if (this === result.winner) this.wins += 1;
        else if (!result.isForfeit) this.losses += 1;
        else this.forfeits += 1;
      } else {
        this.draws += 1;
      }
    }
  }

  // Lets assume the points are the following
  // win = 3
  // draw = 2
  // loss = 1
  // forfeit = 0
  points() {
    var points = 0;

    points += this.wins * 3;
    points += this.draws * 2;
    points += this.losses;

    return points;
  }

  pointsPercentage() {
    const against = this.pointsAgainst <= 0 ? 1 : this.pointsAgainst
    const percentage = (this.pointsFor / against) * 100;
    return Math.round(percentage);
  }
}
