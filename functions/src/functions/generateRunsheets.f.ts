import { onCall, onRequest } from "firebase-functions/v2/https";
import { promises as fs } from "fs";
import { PDFDocument, TextAlignment } from "pdf-lib";
import { Prisma, PrismaClient } from "../../orm/client";
import path from "path";
import { Readable } from "stream";
import moment from "moment-timezone";
const archiver = require("archiver");

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
};

type Team = Prisma.TeamGetPayload<{
	include: { players: true };
}>;

type AgeGroup = Prisma.AgeGroupGetPayload<{}>;

const formatString = (str: string) => {
	return str
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export default onRequest({ region: "australia-southeast1", labels: { test: "test" } }, async (req, res) => {
	const gameIdParam = req.query.gameId as string;
	const gameIdsParam = req.query.gameIds as string;

	if (gameIdParam && gameIdsParam) {
		res.status(400).send("Malformed request: Cannot provide both gameId and gameIds");
		return;
	}

	let gameIds: string[] = [];

	if (!gameIdsParam && gameIdParam) {
		gameIds = [gameIdParam];
	} else if (!gameIdParam && gameIdsParam) {
		gameIds = gameIdsParam.replace("[", "").replace("]", "").split(",");
	}

	console.log(`\n\n ${gameIds.length} games requested \n\n`);

	if (!gameIds || gameIds.length === 0) {
		res.status(400).send("No game IDs provided");
		return;
	}

	// Get all teams, ageGroups and 5 games.
	const teams: Team[] = await db.team.findMany({
		include: { players: true },
	});

	const ageGroups: AgeGroup[] = await db.ageGroup.findMany();
	const scoreSheetResults: ScoresheetResult[] = [];

	// Get Data for each gameId
	for (const gameId of gameIds) {
		console.log(`Getting data for game ${gameId}`);
		const game: Game | null = await db.game.findUnique({
			where: { id: gameId },
			include: {
				timeslot: true,
			},
		});

		if (game) {
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
		}
	}

	if (scoreSheetResults.length === 1) {
		try {
			const pdfBuffer = await createPdf(scoreSheetResults[0]);
			if (!pdfBuffer) {
				res.status(500).send("Error generating PDF file");
				return;
			}
			res.setHeader("Content-Type", "application/pdf");
			res.setHeader("Content-Disposition", `attachment; filename=scoresheet-${scoreSheetResults[0].id}.pdf`);
			res.send(pdfBuffer);
		} catch (e) {
			console.error(e);
			res.status(500).send("Error generating PDF file");
		}
	} else if (scoreSheetResults.length > 0) {
		try {
			// Create a new PDF document
			const mergedPdf = await PDFDocument.create();

			// Sort scoreSheetResults by timeslot.date, then timeslot.court
			scoreSheetResults.sort((a, b) => {
				if (a.timeslot.date < b.timeslot.date) return -1;
				if (a.timeslot.date > b.timeslot.date) return 1;
				if (a.timeslot.court < b.timeslot.court) return -1;
				if (a.timeslot.court > b.timeslot.court) return 1;
				return 0;
			});

			for (const result of scoreSheetResults) {
				const pdfBuffer = await createPdf(result);
				if (!pdfBuffer) {
					res.status(500).send("Error generating PDF file");
					return;
				}

				console.log(`Merging scoresheet-${result.id}.pdf`);

				// Load the generated PDF
				const pdfToMerge = await PDFDocument.load(pdfBuffer);
				const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());

				// Append pages to the merged document
				copiedPages.forEach((page) => mergedPdf.addPage(page));
			}

			// Convert the merged PDF to a buffer
			const mergedPdfBytes = await mergedPdf.save();

			// Set response headers for a single PDF file
			res.setHeader("Content-Type", "application/pdf");
			res.setHeader("Content-Disposition", `attachment; filename=scoresheets.pdf`);

			// Send the merged PDF
			res.send(Buffer.from(mergedPdfBytes));
			console.log("Merged PDF sent");
		} catch (e) {
			console.error(e);
			res.status(500).send("Error generating merged PDF file");
		}
	} else {
		res.status(404).send("Game not found");
	}
});

const createPdf = async (game: ScoresheetResult): Promise<Buffer | null> => {
	// Load PDF
	const pdfTemplateFs = await fs.readFile(__dirname + "/../resources/scoresheet_template.pdf");

	const pdfTemplate = await PDFDocument.load(pdfTemplateFs);
	const form = pdfTemplate.getForm();

	const date = new Date(game.timeslot.date); // in UTC time

	// Using moment, set newFormattedTime to the time in Australia/Sydney in h:mm A format
	const newFormattedTime = moment(date).tz("Australia/Sydney").format("h:mm A");

	// Using moment, set newFormattedDate to the date in Australia/Sydney in `Feb 2` format
	const newFormattedDate = moment(date).tz("Australia/Sydney").format("MMM D");

	// Fill in general info
	form.getTextField("Team A").setText(game.lightTeam.name);
	form.getTextField("Team A 2").setText(game.lightTeam.name);
	form.getTextField("Team B").setText(game.darkTeam.name);
	form.getTextField("Team B 2").setText(game.darkTeam.name);
	form.getTextField("Venue").setText(formatString(game.timeslot.location));
	form.getTextField("Court").setText(game.timeslot.court.toString());
	form.getTextField("Date").setText(newFormattedDate);
	form.getTextField("Time").setText(newFormattedTime);
	form.getTextField("AgeGroup").setText(formatString(game.ageGroup.displayName));

	// Fill in light players
	try {
		const sortedLightPlayers = game.lightTeam.players.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
		sortedLightPlayers.forEach((player, index) => {
			form.getTextField(`white_player_${index + 1}`).setText(player.firstName);
			form.getTextField(`white_num_${index + 1}`).setText(player.number?.toString());
		});
	} catch (e) {
		console.error("Error filling in light players:");
		console.error(game.lightTeam.players);
		console.error(e);
	}

	// Fill in dark players
	try {
		const sortedDarkPlayers = game.darkTeam.players.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
		sortedDarkPlayers.forEach((player, index) => {
			form.getTextField(`black_player_${index + 1}`).setText(player.firstName);
			form.getTextField(`black_num_${index + 1}`).setText(player.number?.toString());
		});
	} catch (e) {
		console.error("Error filling in dark players:");
		console.error(game.darkTeam.players);
		console.error(e);
	}
	form.flatten();

	const bytes = await pdfTemplate.save();
	// Saving PDF to filepath - not needed rn
	// const outputDir = path.join(__dirname, "/../resources/out");
	// await fs.mkdir(outputDir, { recursive: true });

	// await fs.writeFile(
	//   path.join(outputDir, `sheet-${game.id}.pdf`),
	//   bytes,
	// );

	console.log("Saved PDF");
	return Buffer.from(bytes);
};
