type Game = [string, string];
type Schedule = Record<string, Game[]>;

/**
 * Generates a round-robin tournament schedule.
 * @param teams - List of team names.
 * @param numWeeks - Total number of weeks.
 * @param gamesPerTeam - Total games each team should play.
 * @returns Schedule for each week.
 */
function generateRoundRobinSchedule(
    teams: string[],
    numWeeks: number,
    gamesPerTeam: number,
): Schedule {
    if (teams.length < 2) {
        throw new Error('At least 2 teams are required to create a schedule.');
    }

    const totalGames = (gamesPerTeam * teams.length) / 2;
    const gamesPerWeek = Math.floor(teams.length / 2);
    const totalWeeks = Math.ceil(totalGames / gamesPerWeek);
    const effectiveWeeks = Math.min(numWeeks, totalWeeks);

    const schedule: Schedule = {};
    const adjustedTeams = [...teams];

    // If odd number of teams, add a dummy team for bye
    const hasBye = teams.length % 2 !== 0;
    if (hasBye) adjustedTeams.push('BYE');

    const numTeams = adjustedTeams.length;

    // Generate a round-robin schedule for all weeks
    for (let week = 1; week <= effectiveWeeks; week += 1) {
        const games: Game[] = [];

        for (let i = 0; i < numTeams / 2; i += 1) {
            const home = adjustedTeams[i];
            const away = adjustedTeams[numTeams - 1 - i];
            if (home !== 'BYE' && away !== 'BYE') {
                games.push([home, away]);
            }
        }
        // Rotate the teams for next week's matches (except the first team)
        adjustedTeams.splice(1, 0, adjustedTeams.pop()!);

        schedule[`Week ${week}`] = games;
    }

    return schedule;
}

// Example usage
const teams = [
    'Phoenix',
    'NBA2K',
    'Defenders',
    'Travellers',
    'Bucks',
    'Bulls',
    'Monkeys',
    'Boomers',
    'Kobe',
    'Blazers',
];
const numWeeks = 8;
const gamesPerTeam = 8;

export const GameSetup = () => {
    const tournamentSchedule = generateRoundRobinSchedule(
        teams,
        numWeeks,
        gamesPerTeam,
    );
    console.log(tournamentSchedule);
    return <div>eee</div>;
};

export default GameSetup;
