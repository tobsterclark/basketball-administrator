import { Location, Prisma, PrismaClient } from "@prisma/client";
import sampleData from "./TestTeamData.json";

const prisma = new PrismaClient();

// TODO: This is ugly af, too tired to not write jank
async function main() {
    const adultAgeGroupId = await seedTeamsPlayers();
    await seedTimeslots(adultAgeGroupId);
    await seedGames(adultAgeGroupId);
}

// I despise everythign about what im doing but oh well
async function seedTeamsPlayers() {
    const keys = Object.keys(sampleData);
    let adultAgeGroup = ""

    for (const key of keys) {
        const players = sampleData[key as keyof typeof sampleData];
        const [teamName, unformattedAgeGroup] = key.split("-");
        const ageGroup = unformattedAgeGroup === "adults" ? unformattedAgeGroup : `years ${unformattedAgeGroup}`

        const team = await prisma.team.create({
            data: {
                name: teamName,
                ageGroup: { create: { displayName: ageGroup } },
                division: null,
            },
        });

        await Promise.all(
            players.map(async (val) => {
                return await prisma.player.create({
                    data: {
                        firstName: val[0]?.toString() || "",
                        lastName: "",
                        number: Number(val[1]),
                        team: { connect: team },
                        ageGroup: { connect: { id: team.ageGroupId } },
                    },
                });
            }),
        );

        if (ageGroup === "adults") { adultAgeGroup = team.ageGroupId }

        console.log(`created team ${key}`);
    }

    return adultAgeGroup
}

// TODO: This is so poorly done
async function seedTimeslots(adultAgeGroupId: string) {
    const dateTime1 = new Date(Date.parse("2024-05-22T19:00:00"));
    const dateTime2 = new Date(Date.parse("2024-05-22T19:45:00"));
    const dateTime3 = new Date(Date.parse("2024-05-22T20:30:00"));
    const timeslot: Prisma.TimeslotCreateInput = {
        location: Location.ST_IVES,
        court: 1,
        ageGroup: { connect: { id: adultAgeGroupId } },
        date: dateTime1,
    };
    let allTimeslots: Prisma.TimeslotCreateInput[] = [timeslot];

    // Wednesday game timeslots
    allTimeslots.push({ ...timeslot, court: 2 });
    allTimeslots.push({ ...timeslot, date: dateTime2 });
    allTimeslots.push({ ...timeslot, date: dateTime2, court: 2 });
    allTimeslots.push({ ...timeslot, date: dateTime3, court: 2 });

    for (const slot of allTimeslots) {
        await prisma.timeslot.create({ data: slot });
    }
}

async function seedGames(adultAgeGroupId: string) {
    const timeslots = await prisma.timeslot.findMany({ where: { ageGroupId: adultAgeGroupId } });
    const teams = await prisma.team.findMany({ where: { ageGroupId: adultAgeGroupId } });

    for (const slot of timeslots) {
        const lightTeam = teams.pop();
        const darkTeam = teams.pop();

        if (lightTeam === undefined || darkTeam === undefined) {
            console.warn("One of the two teams was undefined!!")
            break
        }

        await prisma.game.create({
            data: {
                darkTeam: { connect: darkTeam },
                lightTeam: { connect: lightTeam },
                timeslot: { connect: slot },
                lightScore: 40,
                darkScore: 25,
            },
        });
    }
}

// Start seeding data
main();
