import { onCall, onRequest } from "firebase-functions/v2/https";
import { promises as fs } from "fs";
import { PDFDocument, TextAlignment } from "pdf-lib";
import prismaClient from "@tobsterclark/prisma-orm";

export default onRequest(
  { region: "australia-southeast1", labels: { test: "test" } },
  async (req, res) => {
    console.log("function running");

    const client = new prismaClient();

    // Get Data
    // prismaClient.game

    // Load PDF
    // const pdfTemplateFs = await fs.readFile("src/resources/scoresheet_template.pdf");
    // const pdfTemplate = await PDFDocument.load(pdfTemplateFs);

    // for (let val of test.items) {
    // 	console.log(val.data);
    // 	if (!val.data) {
    // 		console.warn("no data");
    // 		continue;
    // 	}o

    // 	const gameData = {
    // 		black_team: val.data["whiteTeam"]["title"],
    // 		white_team: val.data["opponentTeam"]["title"],
    // 		court: val.data["court"] + " ",
    // 		location: val.data["location"],
    // 	};

    // 	const pdfDoc = await pdfTemplate.copy();

    // 	const form = pdfDoc.getForm();
    // 	const fields = form.getFields();

    // 	form.getTextField("Team A").setText("the team");
    // 	form.getTextField("Team B").setText("random team");
    // 	form.getTextField("Venue").setText("test venue");
    // 	form.getTextField("Court").setText("2");
    // 	form.getTextField("Date").setText("14th March");
    // 	form.getTextField("Time").setText("4:00pm");
    // 	form.getTextField("white_num_1").setText("23");
    // 	form.getTextField("white_player_1").setText("john");

    // 	form.flatten();

    // 	const bytes = await pdfDoc.save();
    // 	await fs.writeFile("src/resources/out/test.pdf", bytes);
    // }

    // .res
    //   .status(200)
    //   .send();
  },
);
