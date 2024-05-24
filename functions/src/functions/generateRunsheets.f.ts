import { onCall, onRequest } from "firebase-functions/v2/https";
import { promises as fs } from "fs";
import { PDFDocument, TextAlignment } from "pdf-lib";
import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();
type ScoresheetResult = Prisma.GameGetPayload<{
  include: {
    team_dark: { include: { players: true } };
    team_light: { include: { players: true } };
    timeslot: true;
  };
}>;

export default onRequest(
  { region: "australia-southeast1", labels: { test: "test" } },
  async (req, res) => {
    // Get Data
    const games: ScoresheetResult[] = await db.game.findMany({
      take: 5,
      include: {
        team_dark: { include: { players: true } },
        team_light: { include: { players: true } },
        timeslot: true,
      },
    });

    for (const game of games) {
      await createPdf(game);
    }

    res.status(200).send();
  },
);

const createPdf = async (game: ScoresheetResult) => {
  // Load PDF
  const pdfTemplateFs = await fs.readFile(
    __dirname + "/../resources/scoresheet_template.pdf",
  );

  const pdfTemplate = await PDFDocument.load(pdfTemplateFs);
  const form = pdfTemplate.getForm();

  const gameTime = game.timeslot.date.toLocaleTimeString("en-au", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  // Fill in general info
  form.getTextField("Team A").setText(game.team_light.name);
  form.getTextField("Team B").setText(game.team_dark.name);
  form.getTextField("Venue").setText(game.timeslot.location);
  form.getTextField("Court").setText(game.timeslot.court.toString());
  form.getTextField("Date").setText("14th March");
  form.getTextField("Time").setText(gameTime);

  // Fill in light players
  game.team_light.players.forEach((player, index) => {
    form.getTextField(`white_player_${index + 1}`).setText(player.first_name);
    form
      .getTextField(`white_num_${index + 1}`)
      .setText(player.number?.toString());
  });

  // Fill in dark players
  game.team_dark.players.forEach((player, index) => {
    form.getTextField(`black_player_${index + 1}`).setText(player.first_name);
    form
      .getTextField(`black_num_${index + 1}`)
      .setText(player.number?.toString());
  });

  form.flatten();

  const bytes = await pdfTemplate.save();
  await fs.writeFile(
    __dirname + `/../resources/out/test+${game.id}.pdf`,
    bytes,
  );
};
