import { onCall, onRequest } from "firebase-functions/v2/https";
import { WixApi } from "../WixApi";
import * as data from "../resources/template.json";
import { promises as fs } from "fs";
import { join } from "path";
import { PDFDocument } from "pdf-lib";

export default onRequest({ region: "australia-southeast1", labels: { test: "test" } }, async (req, res) => {
	console.log("function running");
	const client = WixApi.getDefaultInstance().wixClient;
	const test = await client.items.queryDataItems({ dataCollectionId: "Games", includeReferencedItems: ["blackTeam"] }).find();

	for (let val of test.items) {
		console.log(val.data);
		if (!val.data) {
			console.warn("no data");
			continue;
		}

		const gameData = {
			black_team: val.data["whiteTeam"]["title"],
			white_team: val.data["whiteTeam"]["title"],
			court: val.data["court"] + " ",
			location: val.data["location"],
		};

		// const pdf = await generate({ template: data, inputs: input });
		// writeFileSync(join(__dirname, val.data["tmpName"] + ".pdf"), pdf);
		// console.log(join(__dirname, val.data["tmpName"] + ".pdf"));

		// Load PDF
		const pdfTemplate = await fs.readFile("../resources/scoresheet_template.pdf");

		const pdfDoc = await PDFDocument.load(pdfTemplate);

		const form = pdfDoc.getForm();

		form.getTextField("Team A#0").setText(gameData.white_team);
		form.getTextField("Team B#0").setText(gameData.black_team);

		form.flatten();

		const bytes = await pdfDoc.save();
		await fs.writeFile("../resources/out/test.pdf", bytes);
	}

	res.status(200).send();
});
