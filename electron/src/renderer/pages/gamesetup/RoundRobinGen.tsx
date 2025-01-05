/* eslint-disable no-restricted-syntax */
import { rrGame, rrSchedule, timeSlotParams } from './types';
import Terms2025 from '../data/Terms';

/**
 * Generates a round-robin tournament schedule.
 * @param teams - List of team names.
 * @param timeSlots - Array of available time slots for games.
 * @param updateGame - Function to update game data in the database.
 * @param getTeamIdByName - Function to get team ID by name.
 * @returns Schedule for each week.
 */
export const generateRoundRobinSchedule = (
    teams: string[],
    timeSlots: timeSlotParams[],
    updateGame: (
        week: number,
        time: number,
        court: number,
        teamId: string,
        isLightTeam: boolean,
        venue?: string,
    ) => void,
    getTeamIdByName: (teamName: string) => string | null,
    currentTerm: number,
): rrSchedule => {
    if (teams.length < 2) {
        throw new Error('At least 2 teams are required to create a schedule.');
    }
    if (timeSlots.length === 0) {
        throw new Error('Time slots must be provided for scheduling.');
    }

    const terms = Terms2025;

    const termStartDate = terms[currentTerm].date;
    const termWeeks = terms[currentTerm].weeks;

    const schedule: rrSchedule = {};
    const adjustedTeams = [...teams];

    // If odd number of teams, add a dummy team for byes
    const hasBye = teams.length % 2 !== 0;
    if (hasBye) adjustedTeams.push('BYE');

    const numTeams = adjustedTeams.length;

    // Group time slots by their calculated week index
    const weeks: Record<number, timeSlotParams[]> = {};
    timeSlots.forEach((slot) => {
        const weekIndex =
            Math.floor(
                (slot.date.getTime() - termStartDate.getTime()) /
                    (7 * 24 * 60 * 60 * 1000),
            ) + 1;

        if (weekIndex >= 1 && weekIndex <= termWeeks) {
            if (!weeks[weekIndex]) weeks[weekIndex] = [];
            weeks[weekIndex].push(slot);
        }
    });

    // Sort weeks by their index
    const sortedWeekIndices = Object.keys(weeks)
        .map(Number)
        .sort((a, b) => a - b);

    // Shuffle teams to randomize initial order
    const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);
    shuffle(adjustedTeams);

    // Generate the schedule week by week
    sortedWeekIndices.forEach((weekIndex) => {
        const weekGames: rrGame[] = [];
        const gamesThisWeek: Set<string> = new Set();

        const availableTimeSlots = weeks[weekIndex] || [];

        for (let i = 0; i < numTeams / 2; i += 1) {
            const home = adjustedTeams[i];
            const away = adjustedTeams[numTeams - 1 - i];

            if (
                home !== 'BYE' &&
                away !== 'BYE' &&
                !gamesThisWeek.has(`${home}-${away}`) &&
                !gamesThisWeek.has(`${away}-${home}`)
            ) {
                if (availableTimeSlots.length === 0) break; // No more slots this week

                const timeSlot = availableTimeSlots.shift();
                if (timeSlot) {
                    weekGames.push([home, away]);
                    gamesThisWeek.add(`${home}-${away}`);

                    // Call updateGame for both teams
                    const homeTeamId = getTeamIdByName(home);
                    const awayTeamId = getTeamIdByName(away);
                    if (homeTeamId && awayTeamId) {
                        updateGame(
                            weekIndex - 1,
                            timeSlot.date.getHours(),
                            timeSlot.court,
                            homeTeamId,
                            true,
                            timeSlot.location,
                        );
                        updateGame(
                            weekIndex - 1,
                            timeSlot.date.getHours(),
                            timeSlot.court,
                            awayTeamId,
                            false,
                            timeSlot.location,
                        );
                    }
                }
            }
        }

        // Rotate teams (except the first) for the next week
        adjustedTeams.splice(1, 0, adjustedTeams.pop()!);

        // Add games for the current week to the schedule
        schedule[`Week ${weekIndex}`] = weekGames;
    });

    // Fill in empty weeks in the term with empty arrays
    for (let i = 1; i <= termWeeks; i += 1) {
        if (!schedule[`Week ${i}`]) {
            schedule[`Week ${i}`] = [];
        }
    }

    return schedule;
};
