"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const TestTeamData_json_1 = __importDefault(require("./TestTeamData.json"));
const prisma = new client_1.PrismaClient();
// TODO: This is ugly af, too tired to not write jank
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield seedTeamsPlayers();
        yield seedTimeslots();
        yield seedGames();
    });
}
function seedTeamsPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = Object.keys(TestTeamData_json_1.default);
        for (const key of keys) {
            const players = TestTeamData_json_1.default[key];
            const [teamName, ageGroup] = key.split("-");
            const team = yield prisma.team.create({
                data: {
                    name: teamName,
                    age_group: ageGroup == "adults" ? client_1.AgeGroup.ADULTS : client_1.AgeGroup.KIDS,
                },
            });
            yield Promise.all(players.map((val) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                return yield prisma.player.create({
                    data: {
                        first_name: ((_a = val[0]) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        last_name: "",
                        number: Number(val[1]),
                        team: { connect: team },
                    },
                });
            })));
            console.log(`created team ${key}`);
        }
    });
}
// TODO: This is so poorly done
function seedTimeslots() {
    return __awaiter(this, void 0, void 0, function* () {
        const dateTime1 = new Date(Date.parse("2024-05-22T19:00:00"));
        const dateTime2 = new Date(Date.parse("2024-05-22T19:45:00"));
        const dateTime3 = new Date(Date.parse("2024-05-22T20:30:00"));
        const timeslot = {
            location: client_1.Location.ST_IVES,
            court: 1,
            age_group: client_1.AgeGroup.ADULTS,
            date: dateTime1,
        };
        let allTimeslots = [timeslot];
        // Wednesday game timeslots
        allTimeslots.push(Object.assign(Object.assign({}, timeslot), { court: 2 }));
        allTimeslots.push(Object.assign(Object.assign({}, timeslot), { date: dateTime2 }));
        allTimeslots.push(Object.assign(Object.assign({}, timeslot), { date: dateTime2, court: 2 }));
        allTimeslots.push(Object.assign(Object.assign({}, timeslot), { date: dateTime3, court: 2 }));
        for (const slot of allTimeslots) {
            yield prisma.timeslot.create({ data: slot });
        }
    });
}
function seedGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const timeslots = yield prisma.timeslot.findMany({
            where: { age_group: client_1.AgeGroup.ADULTS },
        });
        const teams = yield prisma.team.findMany({
            where: { age_group: client_1.AgeGroup.ADULTS },
        });
        for (const slot of timeslots) {
            const lightTeam = teams.pop();
            const darkTeam = teams.pop();
            yield prisma.game.create({
                data: {
                    team_dark: { connect: darkTeam },
                    team_light: { connect: lightTeam },
                    timeslot: { connect: slot },
                    light_score: 40,
                    dark_score: 25,
                },
            });
        }
    });
}
// Start seeding data
main();
