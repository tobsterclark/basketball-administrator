import { onCall, onRequest } from "firebase-functions/v2/https";
import { WixApi } from "../WixApi";
import type { Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import * as data from "../resources/template.json";
import { writeFileSync } from "fs";
import { join } from "path";

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

		const input: Record<string, string>[] = [
			{
				black_team_title: val.data["whiteTeam"]["title"],
				white_team_title: val.data["whiteTeam"]["title"],
				black_team_a: val.data["whiteTeam"]["title"],
				white_team_a: val.data["whiteTeam"]["title"],
				court: val.data["court"] + " ",
				location: val.data["location"],
			},
		];

		console.log(input);
		const pdf = await generate({ template: data, inputs: input });
		writeFileSync(join(__dirname, val.data["tmpName"] + ".pdf"), pdf);
		console.log(join(__dirname, val.data["tmpName"] + ".pdf"));
	}

	res.status(200).send();
});
