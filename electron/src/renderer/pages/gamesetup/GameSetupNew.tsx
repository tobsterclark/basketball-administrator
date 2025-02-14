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
import { GameDataResponse, PlayerDataProps, TeamDataResponse } from '../players/components/Types';
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
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const GameSetupNew = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [selectedAgeGroupId, setSelectedAgeGroupId] = useState(
        '40bed308-a36e-4e20-8f5e-2c3e1aa02e9f',
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
                const games = (data as GameDataResponse[]).map(({ lightTeamId, darkTeamId, timeslotId }) => ({
                    lightTeamId,
                    darkTeamId,
                    timeSlotId: timeslotId,
                }));
                setDbGames(games as Game[]);
            });
    }

    const printCreatedGames = () => {
        console.log('Created games:');
        console.log(createdGames);
    }

    // Ensures that the createdGames are reset when the age group is changed
    useEffect(() => {
        setCreatedGames([]);
        getDbGames();
    }, [selectedAgeGroupId]);

    const getTimesFromSlots = (
        timeSlots: timeSlotParams[],
        venue: string = 'ST_IVES',
    ) => {
        const timesCount: { [key: number]: number } = {};
        for (let i = 0; i < timeSlots.length; i += 1) {
            const timeSlot = timeSlots[i];
            if (timeSlot.location === venue) {
                const hour = timeSlot.date.getHours();
                if (timesCount[hour]) {
                    timesCount[hour] += 1;
                } else {
                    timesCount[hour] = 1;
                }
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


    const getTimeSlotFromWeekTimeCourt = (
        week: number,
        time: number,
        court: number,
        venue: string = 'ST_IVES',
    ) => {
        if (!ageGroupsTimeSlots) return null;
        const dateToFind = new Date(Terms2025[currentTerm].date);
        dateToFind.setUTCDate(dateToFind.getUTCDate() + week * 7);
        dateToFind.setUTCHours(time, 0, 0, 0); // Set the time component in UTC

        for (let i = 0; i < ageGroupsTimeSlots.length; i += 1) {
            const timeSlot = ageGroupsTimeSlots[i];
            const slotDate = new Date(timeSlot.date);

            if (
                slotDate.getTime() === dateToFind.getTime() &&
                timeSlot.court === court &&
                timeSlot.location === venue
            ) {
                return timeSlot;
            }
        }
        return null;
    };

    const getTeamIdFromName = (teamName: string) => {
        if (!ageGroupTeams) return '';
        const theTeam = ageGroupTeams.find((tean) => tean.name === teamName);
        return theTeam?.id || '';
    };

    // ############## BEGIN Data Grid Config ##############

    const GetTimesAndCourts = () => {
        /**
         * Returns a dict of times with an array of court numbers used at that time
         *  {
         *      10: [2],     --> 10:00am, court 2
         *      11: [1, 2],  --> 11:00am, courts 1 and 2
         *      12: [1, 2],  --> 12:00pm, courts 1 and 2
         *  }
         * 
         */

        // Formats the hour of day to ALWAYS be in Sydney Time regardless of daylight savings or user locale
        const formatter = new Intl.DateTimeFormat("en-AU", {
            timeZone: "Australia/Sydney",
            hour: "numeric",
            hour12: false,
        });

        if (!ageGroupsTimeSlots) return {};
        const timesAndCourts: { [key: number]: number[] } = {};
        for (let i = 0; i < ageGroupsTimeSlots.length; i += 1) {
            const timeSlot = ageGroupsTimeSlots[i];
            const sydneyHourOfDay = parseInt(formatter.format(timeSlot.date), 10);

            if (timesAndCourts[sydneyHourOfDay]) {
                if (!timesAndCourts[sydneyHourOfDay].includes(timeSlot.court)) {
                    timesAndCourts[sydneyHourOfDay].push(timeSlot.court);
                    console.log(`sydneyHourOfDay: ${sydneyHourOfDay}, court: ${timeSlot.court}`);
                }
            } else {
                timesAndCourts[sydneyHourOfDay] = [timeSlot.court];
            }
        }
        
        // Sort the value array for each key in ascending numerical order
        Object.keys(timesAndCourts).forEach((hour) => {
            timesAndCourts[parseInt(hour)].sort((a, b) => a - b);
        });
        return timesAndCourts;
    }

    const logAllGames = () => {
        // filter out games not matching selected age group id
        const filteredGames = dbGames.filter((game) => game.timeSlotId);
        console.log(filteredGames);
    
    };

    const DataGrid_cols: GridColDef[] = [
        { field: 'week', headerName: 'Week', width: 100 },
        { field: 'time', headerName: 'Time', width: 100 },
        { field: 'court1', headerName: 'Court 1', width: 100 },
        { field: 'court2', headerName: 'Court 2', width: 100 },
        { field: 'court3', headerName: 'Court 3', width: 100 },
        { field: 'test', headerName: 'dropdowns', width: 200 },
    ];

    const DataGrid_rows = [
        { id: 1, week: 1, time: 10, court1: 1, court2: null, court3: null, test: 'x' },
        { id: 2, week: 1, time: 10, court1: null, court2: 2, court3: null, test: 'x' },
        { id: 3, week: 1, time: 11, court1: 1, court2: null, court3: null, test: 'x' },
        { id: 4, week: 1, time: 11, court1: null, court2: 2, court3: null, test: 'x' },
        { id: 5, week: 1, time: 12, court1: 1, court2: null, court3: null, test: 'x' },
        { id: 6, week: 1, time: 12, court1: null, court2: 2, court3: null, test: 'x' },
        { id: 7, week: 2, time: 10, court1: 1, court2: null, court3: null, test: 'x' },
        { id: 8, week: 2, time: 10, court1: null, court2: 2, court3: null, test: 'x' },
        { id: 9, week: 2, time: 11, court1: 1, court2: null, court3: null, test: 'x' },
    ];

    const DataGrid_colGroupingModel: GridColumnGroupingModel = [
        {
            groupId: '10am',
            children: [
                {field: 'court1'}, {field: 'court2'}, {field: 'court3'}
            ]
        }
    ]

    // ############## END Data Grid Config ##############


    const uploadGames = () => {
        let actualUploadCount = 0;
        let actualUpdateCount = 0;

        const promises = createdGames.map((game) => {
            // check if game with matching lightTeamId, darkTeamId and timeslotId already exists in dbGames, and if so, skip it
            if (dbGames.find(
                (dbGame) => dbGame.lightTeamId === game.lightTeamId && dbGame.darkTeamId === game.darkTeamId && dbGame.timeSlotId === game.timeSlotId
            )) {
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
                        return window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, req);
                    }
                });
        });

        Promise.all(promises).then(() => {
            if (actualUploadCount > 0) {
                toast.success(`${actualUploadCount} Game${actualUploadCount === 1 ? '' : 's'} uploaded`);
            }
            if (actualUpdateCount > 0) {
                toast.info(`${actualUpdateCount} Game${actualUpdateCount === 1 ? '' : 's'} updated`);
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
    ) => {
        const timeSlot = getTimeSlotFromWeekTimeCourt(week, time, court, venue);
        if (!timeSlot) {
            return <div />;
        }
        // console.log("attempting to find a game in dbGames");
        let game = dbGames.find(
            (gamee) => gamee.timeSlotId === timeSlot?.id,
        );
        
        const createdGame = createdGames.find(
            (gamee) => gamee.timeSlotId === timeSlot?.id,
        );
        
        if (createdGame) {
            game = createdGame;
        };

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
                                .filter((ageGroup) => ageGroup.displayName !== "None")
                                .map((ageGroup) => (
                                    <MenuItem key={ageGroup.id} value={ageGroup.id}>
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
                    <DataGrid 
                        rows={DataGrid_rows} 
                        columns={DataGrid_cols} 
                        columnGroupingModel={DataGrid_colGroupingModel}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
            {belroseGames ? (
                <div className="pt-8">
                    <h3 className="text-xl font-bold pt-8 pb-4">Belrose</h3>
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        
                    </Box>
                </div>
            ) : (
                <div />
            )}
            <div className="flex gap-8">
                <button type="button" onClick={() => console.log(GetTimesAndCourts())}>
                    Get new things
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
                        console.log(' games:');
                        console.log(logAllGames());
                    }}
                >
                    Log  games
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
        </PageContainer>
    );
};

export default GameSetupNew;
