import { onCall, onRequest } from "firebase-functions/v2/https";
import { promises as fs } from "fs";
import { PDFDocument, TextAlignment } from "pdf-lib";
import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";

const db = new PrismaClient();
type Game = Prisma.GameGetPayload<{
  include: {
    // team_dark: { include: { players: true } };
    // team_light: { include: { players: true } };
    timeslot: true;
  };
}>;

type ScoresheetResult = {
  id: string;
  lightTeam: Team;
  darkTeam: Team;
  ageGroup: AgeGroup;
  timeslot: {
    date: Date;
    location: string;
    court: number;
  };
}

type Team = Prisma.TeamGetPayload<{
  include: { players: true };
}>;

type AgeGroup = Prisma.AgeGroupGetPayload<{}>;

const formatString = (str: string) => {
  return str
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default onRequest(
  { region: "australia-southeast1", labels: { test: "test" } },
  async (req, res) => {
    const gameId = req.query.gameId as string;

    // Get all teams, ageGroups and 5 games.
    const teams: Team[] = await db.team.findMany({
      include: { players: true },
    });

    const ageGroups: AgeGroup[] = await db.ageGroup.findMany();

    // Get Data
    const games: Game[] = await db.game.findMany({
      where: { id: gameId },
      take: 1,
      include: {
        // team_dark: { include: { players: true } },
        // team_light: { include: { players: true } },
        timeslot: true,
      },
    });

    const scoreSheetResults: ScoresheetResult[] = [];
    for (const game of games) {
      const lightTeam = teams.find((team) => team.id === game.lightTeamId);
      const darkTeam = teams.find((team) => team.id === game.darkTeamId);
      const result: ScoresheetResult = {
        id: game.id,
        lightTeam: lightTeam!,
        darkTeam: darkTeam!,
        ageGroup: ageGroups.find((ageGroup) => ageGroup.id === lightTeam?.ageGroupId)!,
        timeslot: {
          date: game.timeslot.date,
          location: game.timeslot.location,
          court: game.timeslot.court,
        },
      };
      scoreSheetResults.push(result);
    };

    if (scoreSheetResults.length > 0) {
      try {
        const pdfBuffer = await createPdf(scoreSheetResults[0]);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=scoresheet-${gameId}.pdf`);

        res.status(200).send(pdfBuffer);
      } catch (e) {
        console.error(e);
        res.status(500).send("Error generating PDF");
      }
    } else {
      res.status(404).send("Game not found");
    }

    // const data = {
    //   teams,
    //   ageGroups,
    // }
    // res.status(200).send(data);
  },
);

const grabPdf = async (gameId: string): Promise<Buffer> => {
  const pdfBuffer = await fs.readFile(
    path.join(__dirname, `/../resources/out/sheet-${gameId}.pdf`),
  );
  return pdfBuffer;
};

const createPdf = async (game: ScoresheetResult): Promise<Buffer> => {
  // Load PDF
  const pdfTemplateFs = await fs.readFile(
    __dirname + "/../resources/scoresheet_template_test.pdf",
  );

  const pdfTemplate = await PDFDocument.load(pdfTemplateFs);
  const form = pdfTemplate.getForm();

  const gameTime = game.timeslot.date.toLocaleTimeString(['en-AU'], {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Sydney",
  });

  // Fill in general info
  form.getTextField("Team A").setText(game.lightTeam.name);
  form.getTextField("Team A 2").setText(game.lightTeam.name);
  form.getTextField("Team B").setText(game.darkTeam.name);
  form.getTextField("Team B 2").setText(game.darkTeam.name);
  form.getTextField("Venue").setText(formatString(game.timeslot.location));
  form.getTextField("Court").setText(game.timeslot.court.toString());
  form.getTextField("Date").setText("14th March");
  form.getTextField("Time").setText(gameTime);
  form.getTextField("AgeGroup").setText(formatString(game.ageGroup.displayName));

  // Fill in light players
  game.lightTeam.players.forEach((player, index) => {
    form.getTextField(`white_player_${index + 1}`).setText(player.firstName);
    form
      .getTextField(`white_num_${index + 1}`)
      .setText(player.number?.toString());
  });

  // Fill in dark players
  game.darkTeam.players.forEach((player, index) => {
    form.getTextField(`black_player_${index + 1}`).setText(player.firstName);
    form
      .getTextField(`black_num_${index + 1}`)
      .setText(player.number?.toString());
  });

  form.flatten();

  const bytes = await pdfTemplate.save();
  const outputDir = path.join(__dirname, "/../resources/out");
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(
    path.join(outputDir, `sheet-${game.id}.pdf`),
    bytes,
  );

  console.log("Saved PDF");
  return Buffer.from(bytes);
};
