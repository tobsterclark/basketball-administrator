import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import {
    Box,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps, TeamDataResponse } from '../players/components/Types';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import Terms2025 from '../data/Terms';
import { IpcChannels } from '../../../general/IpcChannels';

type RR_Game = [string, string];
type RR_Schedule = Record<string, RR_Game[]>;
type timeSlotParams = {
    id?: string;
    date: Date;
    location: string;
    court: number;
    ageGroupId?: string;
};
type Game = {
    lightTeamId: string | null;
    darkTeamId: string | null;
    timeSlotId: string;
};
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
): RR_Schedule {
    if (teams.length < 2) {
        throw new Error('At least 2 teams are required to create a schedule.');
    }

    const totalGames = (gamesPerTeam * teams.length) / 2;
    const gamesPerWeek = Math.floor(teams.length / 2);
    const totalWeeks = Math.ceil(totalGames / gamesPerWeek);
    const effectiveWeeks = Math.min(numWeeks, totalWeeks);

    const schedule: RR_Schedule = {};
    const adjustedTeams = [...teams];

    // If odd number of teams, add a dummy team for bye
    const hasBye = teams.length % 2 !== 0;
    if (hasBye) adjustedTeams.push('BYE');

    const numTeams = adjustedTeams.length;

    // Generate a round-robin schedule for all weeks
    for (let week = 1; week <= effectiveWeeks; week += 1) {
        const games: RR_Game[] = [];

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

export const GameSetup = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [selectedAgeGroupId, setSelectedAgeGroupId] = useState(
        '40bed308-a36e-4e20-8f5e-2c3e1aa02e9f',
    );
    const [currentTerm, setCurrentTerm] = useState(0); // 0-3
    const [ageGroupsTimeSlots, setAgeGroupsTimeSlots] =
        useState<timeSlotParams[]>();
    const [ageGroupTeams, setAgeGroupTeams] = useState<TeamDataResponse[]>();
    const [createdGames, setCreatedGames] = useState<Game[]>([]);

    const navigateTerm = (fowards: boolean) => {
        if (currentTerm === 0 && !fowards) {
            setCurrentTerm(3);
        } else if (currentTerm === 3 && fowards) {
            setCurrentTerm(0);
        } else if (fowards) {
            setCurrentTerm(currentTerm + 1);
        } else {
            setCurrentTerm(currentTerm - 1);
        }
    };

    const getTimesFromSlots = (timeSlots: timeSlotParams[]) => {
        const timesCount: { [key: number]: number } = {};
        for (let i = 0; i < timeSlots.length; i += 1) {
            const timeSlot = timeSlots[i];
            const hour = timeSlot.date.getHours();
            if (timesCount[hour]) {
                timesCount[hour] += 1;
            } else {
                timesCount[hour] = 1;
            }
        }
        return timesCount;
    };

    const getTimeSlots = () => {
        const req: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    ageGroupId: selectedAgeGroupId,
                    date: {
                        lte: Terms2025[currentTerm + 1].date,
                        gte: Terms2025[currentTerm].date,
                    },
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, req)
            .then((data) => {
                console.log(
                    `Getting timeslots between ${
                        Terms2025[currentTerm].date
                    } and ${Terms2025[currentTerm + 1].date}`,
                );
                console.log(data);
                console.log('times from slots:');
                console.log(getTimesFromSlots(data as timeSlotParams[]));
                setAgeGroupsTimeSlots(data as timeSlotParams[]);
            });
    };

    const getTeamsFromAgeGroup = (ageGroupId: string) => {
        const req: PrismaCall = {
            model: ModelName.team,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    ageGroupId,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, req)
            .then((data) => {
                console.log(`All teams for age group ${ageGroupId}`);
                console.log(data);
                setAgeGroupTeams(data as TeamDataResponse[]);
            });
        return null;
    };

    const tournamentSchedule = generateRoundRobinSchedule(
        teams,
        numWeeks,
        gamesPerTeam,
    );

    // console.log(tournamentSchedule);

    const TimeTableCell = styled(TableCell)({
        textAlign: 'center',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        borderLeft: '1px solid rgba(224, 224, 224, 1)',
        borderTop: '1px solid rgba(224, 224, 224, 1)',
    });

    const WeekTableCell = styled(TableCell)({
        fontWeight: 'bold',
        textAlign: 'center',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
    });

    const NormalTableCell = styled(TableCell)({
        textAlign: 'center',
    });

    const BRTableCell = styled(TableCell)({
        textAlign: 'center',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
    });

    const formatTime = (time: string) => {
        const hour = parseInt(time, 10);
        if (hour > 12 && hour <= 23) {
            return `${hour - 12}pm`;
        }
        if (hour === 12) {
            return `${hour}pm`;
        }
        return `${hour}am`;
    };

    const getTimeSlotFromWeekTimeCourt = (
        week: number,
        time: number,
        court: number,
    ) => {
        if (!ageGroupsTimeSlots) return null;
        const dateToFind = new Date(Terms2025[currentTerm].date);
        dateToFind.setDate(dateToFind.getDate() + week * 7);
        dateToFind.setHours(time, 0, 0, 0); // Set the time component

        for (let i = 0; i < ageGroupsTimeSlots.length; i += 1) {
            const timeSlot = ageGroupsTimeSlots[i];
            const slotDate = new Date(timeSlot.date);

            if (
                slotDate.getTime() === dateToFind.getTime() &&
                timeSlot.court === court
            ) {
                if (week === 4 && time === 11 && court === 1) {
                    console.log('Timeslot FOUND for week 4, time 11, court 1');
                    console.log(timeSlot);
                    console.log('dateToFind for WEEK 4 TIME 11 COURT 1:');
                    console.log(dateToFind);
                }
                return timeSlot;
            }
        }
        // console.log(
        //     `no timeslot found for week ${week}, time ${time}, court ${court}`,
        // );
        return null;
    };

    const updateGame = (
        week: number,
        time: number,
        court: number,
        teamId: string,
        isLightTeam: boolean,
    ) => {
        setCreatedGames((prevGames) => {
            const timeSlot = getTimeSlotFromWeekTimeCourt(week, time, court);
            if (!timeSlot) return prevGames;

            const gameIndex = prevGames.findIndex(
                (game) => game.timeSlotId === timeSlot.id,
            );

            if (gameIndex !== -1) {
                const updatedGames = [...prevGames];
                if (isLightTeam) {
                    updatedGames[gameIndex].lightTeamId = teamId;
                } else {
                    updatedGames[gameIndex].darkTeamId = teamId;
                }
                return updatedGames;
            }
            const newGame: Game = {
                lightTeamId: isLightTeam ? teamId : null,
                darkTeamId: isLightTeam ? null : teamId,
                timeSlotId: timeSlot.id ? timeSlot.id : '',
            };
            return [...prevGames, newGame];
        });
    };

    const renderVersusDropdowns = (
        week: number,
        time: number,
        court: number,
    ) => {
        const timeSlot = getTimeSlotFromWeekTimeCourt(week, time, court);
        if (!timeSlot) {
            return <div />;
        }
        const game = createdGames.find(
            (gamee) => gamee.timeSlotId === timeSlot?.id,
        );

        if (week === 4 && court === 1 && time === 11) {
            console.log('week 4 court 1 timeslot:');
            console.log(timeSlot);
            console.log('week 4 court 1 game:');
            console.log(game);
        }

        const lightTeamId = game?.lightTeamId || '';
        const darkTeamId = game?.darkTeamId || '';

        return (
            <div>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-label-light">Light</InputLabel>
                    <Select
                        labelId="select-label-light"
                        value={lightTeamId}
                        onChange={(event: { target: { value: string } }) => {
                            const selectedTeamId = event.target.value;
                            updateGame(week, time, court, selectedTeamId, true);
                        }}
                    >
                        {ageGroupTeams?.map((team) => (
                            <MenuItem key={team.id} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-label-dark">Dark</InputLabel>
                    <Select
                        labelId="select-label-dark"
                        value={darkTeamId}
                        onChange={(event: { target: { value: string } }) => {
                            const selectedTeamId = event.target.value;
                            updateGame(
                                week,
                                time,
                                court,
                                selectedTeamId,
                                false,
                            );
                        }}
                    >
                        {ageGroupTeams?.map((team) => (
                            <MenuItem key={team.id} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    };

    return (
        <PageContainer>
            <PageTitle text="Game Setup" />
            <div className="text-xl font-bold float-right flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        navigateTerm(false);
                    }}
                >
                    <ArrowLeftCircleIcon className="h-8 w-8 hover:text-red-400" />
                </button>
                <p>Term {currentTerm + 1} 2025</p>
                <button
                    type="button"
                    onClick={() => {
                        navigateTerm(true);
                    }}
                >
                    <ArrowRightCircleIcon className="h-8 w-8 hover:text-red-400" />
                </button>
            </div>
            <div className="flex pt-16 items-center justify-center">
                <div className="w-1/3">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id={`select-label-${selectedAgeGroupId}`}>
                            Age Group
                        </InputLabel>
                        <Select
                            labelId={`select-label-${selectedAgeGroupId}`}
                            value={selectedAgeGroupId}
                            onChange={(event: {
                                target: { value: string };
                            }) => {
                                setSelectedAgeGroupId(
                                    event.target.value as string,
                                );
                            }}
                        >
                            {ageGroups.map((ageGroup) => (
                                <MenuItem key={ageGroup.id} value={ageGroup.id}>
                                    {ageGroup.displayName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="pt-8">
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <TableContainer
                        component={Paper}
                        sx={{ maxWidth: 1200, margin: 'auto' }}
                    >
                        <Table aria-label="game schedule table">
                            <TableHead>
                                <TableRow>
                                    <NormalTableCell padding="none" />
                                    {Object.entries(
                                        getTimesFromSlots(
                                            ageGroupsTimeSlots || [],
                                        ),
                                    ).map(([time, count]) => (
                                        <TimeTableCell
                                            colSpan={3}
                                            aria-label={`${time} games`}
                                        >
                                            {formatTime(time)} ({count})
                                        </TimeTableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <WeekTableCell />
                                    {Object.entries(
                                        getTimesFromSlots(
                                            ageGroupsTimeSlots || [],
                                        ),
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    ).map(([time, count]) => (
                                        <>
                                            <BRTableCell>Court 1</BRTableCell>
                                            <BRTableCell>Court 2</BRTableCell>
                                            <BRTableCell>Court 3</BRTableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from({
                                    length: Terms2025[currentTerm].weeks,
                                }).map((_, weekIndex) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <TableRow key={weekIndex}>
                                        <WeekTableCell
                                            component="th"
                                            scope="row"
                                            sx={{ fontWeight: 'bold' }}
                                            padding="none"
                                        >
                                            Week {weekIndex + 1}
                                        </WeekTableCell>
                                        {Object.entries(
                                            getTimesFromSlots(
                                                ageGroupsTimeSlots || [],
                                            ),
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        ).map(([time, count]) => (
                                            <>
                                                <BRTableCell>
                                                    {renderVersusDropdowns(
                                                        weekIndex,
                                                        parseInt(time, 10),
                                                        1,
                                                    )}
                                                </BRTableCell>
                                                <BRTableCell>
                                                    {weekIndex} {time}
                                                </BRTableCell>
                                                <BRTableCell>blah</BRTableCell>
                                            </>
                                        ))}
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <WeekTableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontWeight: 'bold' }}
                                        padding="none"
                                    >
                                        Week 1
                                    </WeekTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                </TableRow>
                                <TableRow>
                                    <WeekTableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontWeight: 'bold' }}
                                        padding="none"
                                    >
                                        Week 2
                                    </WeekTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                    <BRTableCell>blah</BRTableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
            <button type="button" onClick={getTimeSlots}>
                Get Timeslots
            </button>
            <button
                type="button"
                onClick={() => getTeamsFromAgeGroup(selectedAgeGroupId)}
            >
                getTeamsFromAgeGroup
            </button>

            <button
                type="button"
                onClick={() => {
                    console.log('created games:');
                    console.log(createdGames);
                }}
            >
                Log created games
            </button>
        </PageContainer>
    );
};

export default GameSetup;
