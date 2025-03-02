import { Team } from "./Team";

export type Result = {
	lightScore: number;
	darkScore: number;
	winner?: Team;
	isForfeit: boolean;
};
