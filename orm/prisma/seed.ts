import { Location, Prisma, PrismaClient } from "./generated/client";
import sampleData from "./team-data.json";

const prisma = new PrismaClient();

// TODO: This is ugly af, too tired to not write jank
async function main() {
	await seedTeamsPlayers();
}

// I despise everythign about what im doing but oh well
async function seedTeamsPlayers() {
	const keys = Object.keys(sampleData);

	for (const key of keys) {
		const players = sampleData[key as keyof typeof sampleData];
		const [teamName, unformattedAgeGroup] = key.split("-");
		const ageGroup = unformattedAgeGroup === "adults" ? unformattedAgeGroup : `years ${unformattedAgeGroup}`;

		console.log(ageGroup);

		const team = await prisma.team.create({
			data: {
				name: teamName,
				ageGroup: { connectOrCreate: { where: { displayName: ageGroup }, create: { displayName: ageGroup } } },
				division: null,
			},
		});

		await Promise.all(
			players.map(async (val) => {
				const name: String | undefined = val[0]?.toString();
				const [first, last] = name?.split(" ") || [];

				return await prisma.player.create({
					data: {
						firstName: first || "",
						lastName: last || "",
						number: Number(val[1]),
						team: { connect: team },
						ageGroup: { connect: { id: team.ageGroupId } },
					},
				});
			}),
		);

		console.log(`created team ${key}`);
	}
}

// Start seeding data
main();
