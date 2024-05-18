import { AgeGroup, Location, Prisma, PrismaClient } from "@prisma/client";
import sampleData from "./TestTeamData.json";

const prisma = new PrismaClient();

type TimeslotCreateResponse = Prisma.Payload<typeof prisma.timeslot, "create">;

// TODO: This is ugly af, too tired to not write jank
async function main() {
  await seedTeamsPlayers();
  await seedTimeslots();
  await seedGames();
}

async function seedTeamsPlayers() {
  const keys = Object.keys(sampleData);

  for (const key of keys) {
    const players = sampleData[key as keyof typeof sampleData];
    const [teamName, ageGroup] = key.split("-");

    const team = await prisma.team.create({
      data: {
        name: teamName,
        age_group: ageGroup == "adults" ? AgeGroup.ADULTS : AgeGroup.KIDS,
      },
    });

    await Promise.all(
      players.map(async (val) => {
        return await prisma.player.create({
          data: {
            first_name: val[0]?.toString() || "",
            last_name: "",
            number: Number(val[1]),
            team: { connect: team },
          },
        });
      }),
    );

    console.log(`created team ${key}`);
  }
}

// TODO: This is so poorly done
async function seedTimeslots() {
  const dateTime1 = new Date(Date.parse("2024-05-22T19:00:00"));
  const dateTime2 = new Date(Date.parse("2024-05-22T19:45:00"));
  const dateTime3 = new Date(Date.parse("2024-05-22T20:30:00"));
  const timeslot: Prisma.TimeslotCreateInput = {
    location: Location.ST_IVES,
    court: 1,
    age_group: AgeGroup.ADULTS,
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

async function seedGames() {
  const timeslots = await prisma.timeslot.findMany({
    where: { age_group: AgeGroup.ADULTS },
  });
  const teams = await prisma.team.findMany({
    where: { age_group: AgeGroup.ADULTS },
  });

  for (const slot of timeslots) {
    const lightTeam = teams.pop();
    const darkTeam = teams.pop();

    await prisma.game.create({
      data: {
        team_dark: { connect: darkTeam },
        team_light: { connect: lightTeam },
        timeslot: { connect: slot },
        light_score: 40,
        dark_score: 25,
      },
    });
  }
}

// Start seeding data
main();
