import { Result } from "./Results";
import { Location } from "@/../orm/client";
import { Team } from "./Team";

export class Game {
	court: number;
	location: Location;
	date: Date;

	result?: Result;

	lightTeam: Team;
	darkTeam: Team;

	constructor(timeslot: TimeslotDto, teams: Team[]) {
		this.court = timeslot.court;
		this.location = timeslot.location;
		this.date = timeslot.date;

		// set teams[0] as default if team not found... should never happen but this avoids it being nullable
		this.lightTeam = teams.find((team) => team.id === timeslot.game?.lightTeamId) || teams[0];
		this.darkTeam = teams.find((team) => team.id === timeslot.game?.darkTeamId) || teams[0];

		const lightScore = timeslot.game?.lightScore || 0;
		const darkScore = timeslot.game?.darkScore || 0;

		this.getResult(lightScore, darkScore);
	}

	private getResult(lightScore: number, darkScore: number) {
		if (lightScore === 0 && darkScore === 0) return;
		this.result = {
			lightScore: lightScore,
			darkScore: darkScore,
			winner: this.getWinner(lightScore, darkScore),
			isForfeit: lightScore === -1 || darkScore === -1,
		};
	}

	private getWinner(lightScore: number, darkScore: number) {
		if (lightScore > darkScore) {
			return this.lightTeam;
		} else if (darkScore > lightScore) {
			return this.darkTeam;
		} else return undefined;
	}
}

type GameDto = {
	lightScore: number;
	darkScore: number;
	darkTeamId: string;
	lightTeamId: string;
};

type TimeslotDto = {
	game: GameDto | null;
	id: string;
	court: number;
	location: Location;
	date: Date;
};
