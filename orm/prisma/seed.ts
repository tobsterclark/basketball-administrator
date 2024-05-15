import { AgeGroup, Prisma, PrismaClient } from "@prisma/client";
import sampleData from "./TestTeamData.json";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

// TODO: This is ugly af, too tired to not write jank
async function main() {
	const data = sampleData as unknown as { [key: string]: [string, number][] };
	const createTeams: Prisma.TeamCreateManyInput[] = Object.keys(data).map((val, index) => {
		return { id: uuid(), name: val, age_group: AgeGroup.ADULTS };
	});

	await prisma.team.createMany({ data: createTeams });

	for (const team of createTeams) {
		for (const player of data[team.name]) {
			const teamId: string = team.id || uuid();
			await prisma.player.create({ data: { first_name: player[0], last_name: "", number: player[1], team_id: teamId } });
		}
	}
}

main();
