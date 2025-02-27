import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
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
import {
    GameDataResponse,
    PlayerDataProps,
    TeamDataResponse,
} from '../players/components/Types';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import Terms2025 from '../data/Terms';
import { IpcChannels } from '../../../general/IpcChannels';
import { Game, timeSlotParams } from './types';
import { generateRoundRobinSchedule } from './RoundRobinGen';
import { toast } from 'react-toastify';
import { env } from 'process';

const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const GameSetup = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [selectedAgeGroupId, setSelectedAgeGroupId] = useState(
        'f022a91a-aadd-47b3-8687-b223f0ea0890', // years 3-4
    );
    const [currentTerm, setCurrentTerm] = useState(0); // 0-3
    const [ageGroupsTimeSlots, setAgeGroupsTimeSlots] =
        useState<timeSlotParams[]>();
    const [ageGroupTeams, setAgeGroupTeams] = useState<TeamDataResponse[]>();
    const [createdGames, setCreatedGames] = useState<Game[]>([]);
    const [dbGames, setDbGames] = useState<Game[]>([]);
    const [belroseGames, setBelroseGames] = useState<boolean>(false);

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

    const getDbGames = () => {
        const req: PrismaCall = {
            model: ModelName.game,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    timeslot: {
                        date: {
                            lte: Terms2025[currentTerm + 1].date,
                            gte: Terms2025[currentTerm].date,
                        },
                        ageGroupId: selectedAgeGroupId,
                    },
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, req)
            .then((data) => {
                const games = (data as GameDataResponse[]).map(
                    ({ lightTeamId, darkTeamId, timeslotId }) => ({
                        lightTeamId,
                        darkTeamId,
                        timeSlotId: timeslotId,
                    }),
                );
                setDbGames(games as Game[]);
            });
    };

    // Ensures that the createdGames are reset when the age group is changed
    useEffect(() => {
        setCreatedGames([]);
        getDbGames();
    }, [selectedAgeGroupId]);

    const formatter = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        hour: 'numeric',
        hour12: false,
    });

    const getTimesFromSlots = (
        timeSlots: timeSlotParams[],
        venue: string = 'ST_IVES',
    ) => {
        const timesCount: { [key: number]: number } = {};
        for (let i = 0; i < timeSlots.length; i += 1) {
            const timeSlot = timeSlots[i];
            if (timeSlot.location === venue) {
                const hour = new Date(timeSlot.date).getHours();
                const minutes = new Date(timeSlot.date).getMinutes();
                const time = hour + minutes / 60;
                if (timesCount[time]) {
                    timesCount[time] += 1;
                } else {
                    timesCount[time] = 1;
                }
            }
        }
        const sortedTimesCount = Object.keys(timesCount)
            .sort((a, b) => parseFloat(a) - parseFloat(b))
            .reduce(
                (acc, key) => {
                    acc[parseFloat(key)] = timesCount[parseFloat(key)];
                    return acc;
                },
                {} as { [key: number]: number },
            );
        return sortedTimesCount;
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
                setAgeGroupsTimeSlots(data as timeSlotParams[]);
                const belrose = data.find(
                    (slot: { location: string }) => slot.location === 'BELROSE',
                );
                setBelroseGames(!!belrose);
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
                setAgeGroupTeams(data as TeamDataResponse[]);
            });
        return null;
    };

    useEffect(() => {
        getTimeSlots();
        getTeamsFromAgeGroup(selectedAgeGroupId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAgeGroupId]);

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
        const floatTime = parseFloat(time);
        const hour = Math.floor(floatTime);
        const minutes = (floatTime - hour) * 60;
        const formattedMinutes =
            minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;

        if (hour > 12 && hour <= 23) {
            return `${hour - 12}${formattedMinutes}pm`;
        }
        if (hour === 12) {
            return `${hour}${formattedMinutes}pm`;
        }
        return `${hour}${formattedMinutes}am`;
    };

    const getTimeSlotFromWeekTimeCourt = (
        week: number,
        time: number,
        court: number,
        venue: string = 'ST_IVES',
        isSunday: boolean = true,
    ) => {
        if (!ageGroupsTimeSlots) return null;

        const dateToFind = new Date(Terms2025[currentTerm].date);
        dateToFind.setDate(dateToFind.getDate() + week * 7);

        // if isSunday is true, go minus 4 days to get to wednesday
        dateToFind.setDate(dateToFind.getDate() + (isSunday ? 0 : -4));

        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        dateToFind.setHours(hours, minutes, 0, 0); // Set the time component
        let found = false;

        for (let i = 0; i < ageGroupsTimeSlots.length; i += 1) {
            const timeSlot = ageGroupsTimeSlots[i];
            const slotDate = new Date(timeSlot.date);

            if (
                slotDate.getTime() === dateToFind.getTime() &&
                timeSlot.court === court &&
                timeSlot.location === venue
            ) {
                return timeSlot;
            } else if (
                week === 0 &&
                time === 19 &&
                court === 1 &&
                !isSunday &&
                dateToFind.toISOString() === '2025-02-05T08:00:00.000Z' &&
                slotDate.toISOString().includes('2025-02-12')
            ) {
                console.log(
                    `slotDate.getTimee: ${slotDate.toISOString()}, dateToFind.getTime: ${dateToFind.toISOString()}, court: ${court}, location: ${venue}`,
                );
                found = true;
            }
        }
        return null;
    };

    const getTeamIdFromName = (teamName: string) => {
        if (!ageGroupTeams) return '';
        const theTeam = ageGroupTeams.find((tean) => tean.name === teamName);
        return theTeam?.id || '';
    };

    const uploadGames = () => {
        let actualUploadCount = 0;
        let actualUpdateCount = 0;

        const promises = createdGames.map((game) => {
            // check if game with matching lightTeamId, darkTeamId and timeslotId already exists in dbGames, and if so, skip it
            if (
                dbGames.find(
                    (dbGame) =>
                        dbGame.lightTeamId === game.lightTeamId &&
                        dbGame.darkTeamId === game.darkTeamId &&
                        dbGame.timeSlotId === game.timeSlotId,
                )
            ) {
                return Promise.resolve();
            }
            actualUploadCount += 1;

            const req: PrismaCall = {
                model: ModelName.game,
                operation: CrudOperations.create,
                data: {
                    data: {
                        lightTeamId: game.lightTeamId,
                        darkTeamId: game.darkTeamId,
                        timeslotId: game.timeSlotId,
                        lightScore: 0,
                        darkScore: 0,
                    },
                },
            };

            return window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, req)
                .catch((error) => {
                    // Game already exists, we have to update it instead.
                    if (error.message.includes('Unique constraint failed')) {
                        actualUpdateCount += 1;
                        actualUploadCount -= 1;
                        const req: PrismaCall = {
                            model: ModelName.game,
                            operation: CrudOperations.update,
                            data: {
                                where: {
                                    timeslotId: game.timeSlotId,
                                },
                                data: {
                                    lightTeamId: game.lightTeamId,
                                    darkTeamId: game.darkTeamId,
                                },
                            },
                        };
                        return window.electron.ipcRenderer.invoke(
                            IpcChannels.PrismaClient,
                            req,
                        );
                    }
                });
        });

        Promise.all(promises).then(() => {
            if (actualUploadCount > 0) {
                toast.success(
                    `${actualUploadCount} Game${
                        actualUploadCount === 1 ? '' : 's'
                    } uploaded`,
                );
            }
            if (actualUpdateCount > 0) {
                toast.info(
                    `${actualUpdateCount} Game${
                        actualUpdateCount === 1 ? '' : 's'
                    } updated`,
                );
            }
            getDbGames();
        });
    };

    const updateGame = (
        week: number,
        time: number,
        court: number,
        teamId: string,
        isLightTeam: boolean,
        venue: string = 'ST_IVES',
    ) => {
        setCreatedGames((prevGames) => {
            const timeSlot = getTimeSlotFromWeekTimeCourt(
                week,
                time,
                court,
                venue,
            );
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

    const doTourney = () => {
        // create a list of strings from the teams
        const teamNames = ageGroupTeams?.map((team) => team.name) || [];
        console.log(
            `Generating tournament for 10 weeks, with 10 games per team. Team names: ${teamNames}`,
        );
        if (ageGroupsTimeSlots) {
            const torney = generateRoundRobinSchedule(
                teamNames,
                ageGroupsTimeSlots,
                updateGame,
                getTeamIdFromName,
                currentTerm,
            );

            console.log(torney);
        }
    };

    const renderVersusDropdowns = (
        week: number,
        time: number,
        court: number,
        venue: string = 'ST_IVES',
        isSunday: boolean = true,
    ) => {
        const timeSlot = getTimeSlotFromWeekTimeCourt(
            week,
            time,
            court,
            venue,
            isSunday,
        );
        if (!timeSlot) {
            if (week === 0 && time === 19 && court === 1) {
                console.log(
                    'no timeslot for',
                    week,
                    time,
                    court,
                    venue,
                    isSunday,
                );
            }
            return <div />;
        }
        // console.log("attempting to find a game in dbGames");
        let game = dbGames.find((gamee) => gamee.timeSlotId === timeSlot?.id);

        const createdGame = createdGames.find(
            (gamee) => gamee.timeSlotId === timeSlot?.id,
        );

        if (createdGame) {
            game = createdGame;
        }

        const lightTeamId = game?.lightTeamId || '';
        const darkTeamId = game?.darkTeamId || '';

        return (
            <div>
                <FormControl variant="outlined" fullWidth sx={{ pb: 2 }}>
                    <InputLabel id="select-label-light">Light</InputLabel>
                    <Select
                        labelId="select-label-light"
                        value={lightTeamId}
                        onChange={(event: { target: { value: string } }) => {
                            const selectedTeamId = event.target.value;
                            updateGame(
                                week,
                                time,
                                court,
                                selectedTeamId,
                                true,
                                venue,
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
                                venue,
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
            <div className="flex pt-16 items-center justify-center gap-8">
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
                            {ageGroups
                                .filter(
                                    (ageGroup) =>
                                        ageGroup.displayName !== 'None',
                                )
                                .map((ageGroup) => (
                                    <MenuItem
                                        key={ageGroup.id}
                                        value={ageGroup.id}
                                    >
                                        {toTitleCase(ageGroup.displayName)}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-1/5">
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={doTourney}
                    >
                        Generate Schedule
                    </Button>
                </div>
                <div className="w-1/5">
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={uploadGames}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className="pt-8">
                {belroseGames ? (
                    <h3 className="text-xl font-bold pb-4">St Ives</h3>
                ) : (
                    <div />
                )}
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <TableContainer
                        component={Paper}
                        sx={{ maxWidth: 1500, margin: 'auto' }}
                    >
                        <Table aria-label="game schedule table">
                            <TableHead>
                                <TableRow>
                                    <NormalTableCell padding="none" />
                                    {Object.entries(
                                        getTimesFromSlots(
                                            ageGroupsTimeSlots || [],
                                            'ST_IVES',
                                        ),
                                    ).map(([time, count]) => (
                                        <TimeTableCell
                                            colSpan={3}
                                            aria-label={`${time} games`}
                                        >
                                            {formatTime(time)}
                                        </TimeTableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <WeekTableCell />
                                    {Object.entries(
                                        getTimesFromSlots(
                                            ageGroupsTimeSlots || [],
                                            'ST_IVES',
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
                                                'ST_IVES',
                                            ),
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        ).map(([time, count]) => (
                                            <>
                                                <BRTableCell>
                                                    {renderVersusDropdowns(
                                                        weekIndex,
                                                        parseFloat(time),
                                                        1,
                                                        'ST_IVES',
                                                        selectedAgeGroupId !==
                                                            'abb0356d-cf46-486b-bfb0-1165693f9f8f',
                                                    )}
                                                </BRTableCell>
                                                <BRTableCell>
                                                    {renderVersusDropdowns(
                                                        weekIndex,
                                                        parseFloat(time),
                                                        2,
                                                        'ST_IVES',
                                                        selectedAgeGroupId !==
                                                            'abb0356d-cf46-486b-bfb0-1165693f9f8f',
                                                    )}
                                                </BRTableCell>
                                                <BRTableCell>
                                                    {renderVersusDropdowns(
                                                        weekIndex,
                                                        parseFloat(time),
                                                        3,
                                                        'ST_IVES',
                                                        selectedAgeGroupId !==
                                                            'abb0356d-cf46-486b-bfb0-1165693f9f8f',
                                                    )}
                                                </BRTableCell>
                                            </>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
            {belroseGames ? (
                <div className="pt-8">
                    <h3 className="text-xl font-bold pt-8 pb-4">Belrose</h3>
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <TableContainer
                            component={Paper}
                            sx={{ maxWidth: 1500, margin: 'auto' }}
                        >
                            <Table aria-label="game schedule table">
                                <TableHead>
                                    <TableRow>
                                        <NormalTableCell padding="none" />
                                        {Object.entries(
                                            getTimesFromSlots(
                                                ageGroupsTimeSlots || [],
                                                'BELROSE',
                                            ),
                                        ).map(([time, count]) => (
                                            <TimeTableCell
                                                colSpan={3}
                                                aria-label={`${time} games`}
                                            >
                                                {formatTime(time)}
                                            </TimeTableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <WeekTableCell />
                                        {Object.entries(
                                            getTimesFromSlots(
                                                ageGroupsTimeSlots || [],
                                                'BELROSE',
                                            ),
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        ).map(([time, count]) => (
                                            <>
                                                <BRTableCell>
                                                    Court 1
                                                </BRTableCell>
                                                <BRTableCell>
                                                    Court 2
                                                </BRTableCell>
                                                <BRTableCell>
                                                    Court 3
                                                </BRTableCell>
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
                                                    'BELROSE',
                                                ),
                                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                            ).map(([time, count]) => (
                                                <>
                                                    <BRTableCell>
                                                        {renderVersusDropdowns(
                                                            weekIndex,
                                                            parseInt(time, 10),
                                                            1,
                                                            'BELROSE',
                                                        )}
                                                    </BRTableCell>
                                                    <BRTableCell>
                                                        {renderVersusDropdowns(
                                                            weekIndex,
                                                            parseInt(time, 10),
                                                            2,
                                                            'BELROSE',
                                                        )}
                                                    </BRTableCell>
                                                    <BRTableCell>
                                                        {renderVersusDropdowns(
                                                            weekIndex,
                                                            parseInt(time, 10),
                                                            3,
                                                            'BELROSE',
                                                        )}
                                                    </BRTableCell>
                                                </>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            ) : (
                <div />
            )}
            {process.env.NODE_ENV === 'development' ? (
                <div className="flex gap-8">
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

                    <button type="button" onClick={doTourney}>
                        Generate Tournament
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            console.log('Teams:');
                            console.log(ageGroupTeams);
                        }}
                    >
                        Print teams
                    </button>
                </div>
            ) : null}
        </PageContainer>
    );
};

export default GameSetup;
