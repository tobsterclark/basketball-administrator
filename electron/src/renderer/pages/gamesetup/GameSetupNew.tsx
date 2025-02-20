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
import { DataGrid, GridColDef, GridColumnGroupingModel, GridRenderCellParams } from '@mui/x-data-grid';

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
        'e20c91d4-06c9-4896-b2ea-0232250067f3',
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

    const getTimeSlotFromWeekTimeCourtNew = (
        week: number,
        time: string,
        court: number,
        venue: string = 'ST_IVES',
    ) => {
        // time will be passed in as "HH:MM"
        if (!ageGroupsTimeSlots) return null;
        const dateToFind = new Date(Terms2025[currentTerm].date);
        dateToFind.setUTCDate(dateToFind.getUTCDate() + week * 7);
        let [hours, minutes] = time.split(':').map(Number);

        // Adjust for AM/PM if necessary
        if (hours > 12 && !time.includes('AM') && !time.includes('PM')) {
            hours += 12; // Convert to 24-hour format if it's PM
        }

        dateToFind.setHours(hours, minutes, 0, 0); // Set the time component in local time

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
        console.error(`Can't find timeslot for ${week}, time ${time}, court ${court}. Probably a daylight savings issue.`);
        return null;
    }

    const getTeamIdFromName = (teamName: string) => {
        if (!ageGroupTeams) return '';
        const theTeam = ageGroupTeams.find((tean) => tean.name === teamName);
        return theTeam?.id || '';
    };

    const getWeekNumberFromDate = (date: Date) => {
        const termStart = new Date(Terms2025[currentTerm].date);
        const diffTime = Math.abs(date.getTime() - termStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7);
    };

    // ############## BEGIN Data Grid Config ##############

    const GetTimesAndCourts = (isStIves: boolean = true) => {
        /**
         * Returns an array of times with an array of court numbers used at that time
         *  [
         *     {
         *        time: new Date(), // Moment -> date, will contain date and time
         *        courts: [1, 2]    // Array of court numbers used at that date and time
         *     },
         *  ]
         * 
         */

        const timeSlots = ageGroupsTimeSlots;
        const timesAndCourts: { time: Date, courts: number[] }[] = [];
        
        // Loop through all time slots, compare the time and date, and add to timesAndCourts if not already added
        timeSlots?.forEach((timeSlot) => {
            const time = timeSlot.date;
            const court = timeSlot.court;
            const venue = timeSlot.location;
            const timeAndCourt = timesAndCourts.find(
                (timeAndCourt) => timeAndCourt.time.getTime() === time.getTime() && venue === (isStIves ? 'ST_IVES' : 'BELROSE')
            );
            if (timeAndCourt) {
                timeAndCourt.courts.push(court);
            } else {
                timesAndCourts.push({ time, courts: [court] });
            }
        });

        // get a list of times in HH:MM format, 
        const times = [...new Set(timesAndCourts.map((timeAndCourt) => {
            const hours = timeAndCourt.time.getHours();
            const minutes = timeAndCourt.time.getMinutes();
            return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        }))];

        /** now given a list ['9:00', '10:00'], we need to figure out which courts are possibly used at each time across all weeks,
         *  in order to figure out how many columns we need in the data grid. Create a new array of objects in the following format:
         *
         * [
         *   {
         *     time: '9:00',
         *     courts: [1, 2]
         *   },
         *   {
         *     time: '10:00',
         *     courts: [1, 3]
         *   },
         * ]
         * 
         * Ensure that the array is sorted by time, and the courts are sorted in ascending order
         */
        const possibleTimesAndCourts: { time: string, courts: number[] }[] = [];
        times.forEach((time) => {
            const timeAndCourt = timesAndCourts.find((timeAndCourt) => {
                const hours = timeAndCourt.time.getHours();
                const minutes = timeAndCourt.time.getMinutes();
                return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}` === time;
            });
            if (timeAndCourt) {
                possibleTimesAndCourts.push({
                    time,
                    courts: timeAndCourt.courts.sort((a, b) => a - b),
                });
            }
        });

        return possibleTimesAndCourts;
    }

    const generateDataGridCols = (timesAndCourts: { time: string, courts: number[] }[]) => {
        /**
         * Returns the following data type based on what courts are used. If courts 1, 2, and 3 are used, the following will be returned:
         *      const DataGrid_cols: GridColDef[] = [
         *          { field: 'week', headerName: 'Week', width: 100 },
         *          { field: 'time', headerName: 'Time', width: 100 },
         *          { field: 'court1', headerName: 'Court 1', width: 100 },
         *          { field: 'court2', headerName: 'Court 2', width: 100 },
         *          { field: 'court3', headerName: 'Court 3', width: 100 },
         *          { field: 'test', headerName: 'dropdowns', width: 200 },
         *      ];
         *  
         * If only courts 1 and 2 are used, the returned cols will not have a court3 field
         */
        const DataGrid_cols: GridColDef[] = [
            { field: 'week', headerName: 'Week', width: 70, renderCell: (
                params: GridRenderCellParams<any, any>) => 
                    (
                        <div className="flex items-center justify-center h-full font-bold">
                            {params.value}
                        </div>
                    )
            },
        ];
    
        const addedCourtTimes = new Set<string>();
        timesAndCourts.forEach((timeAndCourt) => {
            timeAndCourt.courts.forEach((court) => {
                const courtTimeKey = `court${court}-${timeAndCourt.time}`;
                if (!addedCourtTimes.has(courtTimeKey)) {
                    // const tsId = getTimeSlotFromWeekTimeCourtNew(week, time, court)?.id;

                    DataGrid_cols.push({
                        field: courtTimeKey,
                        headerName: `Court ${court}`,
                        
                        width: 200,
                        renderCell: (params: GridRenderCellParams<any, any>) => {
                            console.log(params);
                            return renderVersusDropdownsNew(params.row[courtTimeKey], 'ST_IVES');
                        }
                    });
                    addedCourtTimes.add(courtTimeKey);
                }
            });
        });
        
        // Sort the court columns by time and then by court number
        DataGrid_cols.sort((a, b) => {
            if (a.field === 'week' || a.field === 'test') return 0;
            if (b.field === 'week' || b.field === 'test') return 0;
    
            const [courtA, timeA] = a.field.split('-');
            const [courtB, timeB] = b.field.split('-');
    
            const [hoursA, minutesA] = timeA.split(':').map(Number);
            const [hoursB, minutesB] = timeB.split(':').map(Number);
    
            if (hoursA !== hoursB) return hoursA - hoursB;
            if (minutesA !== minutesB) return minutesA - minutesB;
    
            const courtNumA = parseInt(courtA.replace('court', ''), 10);
            const courtNumB = parseInt(courtB.replace('court', ''), 10);
    
            return courtNumA - courtNumB;
        });
    
        return DataGrid_cols;
    }

    const generateDataGridRows = (isStIves: boolean = true) => {
        const timesAndCourts = GetTimesAndCourts(isStIves);
        const rows: { [key: string]: any; }[] = [];
        let id = 1;

        for (let week = 1; week <= 10; week += 1) {
            const row: { [key: string]: any } = { id, week, time: 9, test: 'z' };
            
            timesAndCourts.forEach((timeAndCourt) => {
                const { time, courts } = timeAndCourt;
                courts.forEach((court) => {
                    const field = `court${court}-${time}`;
                    if (!row.hasOwnProperty(field)) {
                        row[field] = null;
                    }
                    
                    const tsId = getTimeSlotFromWeekTimeCourtNew(week, time, court)?.id;

                    tsId ? row[field] = tsId : row[field] = 'error :(';
                });
            });

            rows.push(row);
            id += 1;
        }

        return rows;
    }

    const generateDataGridGroupingModel = (timesAndCourts: { time: string, courts: number[] }[]) => {
        /**
         * Creates a Column Grouping Model for the Data Grid based on the times and courts used.
         * Based on the times and courts used, the following will be returned:
         *     const DataGrid_colGroupingModel: GridColumnGroupingModel = [
         *        {
         *           groupId: '10:00',
         *          children: [ { field: 'court1-10:00' }, { field: 'court2-10:00' }, { field: 'court3-10:00' } ]
         *       }
         *    ]
         */
        const DataGrid_colGroupingModel: GridColumnGroupingModel = [];
        const addedCourtTimes = new Set<string>();

        timesAndCourts.forEach((timeAndCourt) => {
            const { time, courts } = timeAndCourt;
            const children: GridColDef[] = [];
            courts.forEach((court) => {
                const courtTimeKey = `court${court}-${time}`;
                if (!addedCourtTimes.has(courtTimeKey)) {
                    children.push({ field: courtTimeKey });
                    addedCourtTimes.add(courtTimeKey);
                }
            });

            DataGrid_colGroupingModel.push({
                groupId: time,
                children,
            });
        });

        // Sort the entries by time
        DataGrid_colGroupingModel.sort((a, b) => {
            const timeA = a.groupId.split(':').map(Number);
            const timeB = b.groupId.split(':').map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        });

        return DataGrid_colGroupingModel;
    }

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

    const updateGameNew = (
        timeSlotId: string,
        teamId: string,
        isLightTeam: boolean,
        venue: string = 'ST_IVES',
    ) => {
        setCreatedGames((prevGames) => {
            if (!timeSlotId) return prevGames;

            const gameIndex = prevGames.findIndex(
                (game) => game.timeSlotId === timeSlotId,
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
                timeSlotId: timeSlotId ? timeSlotId : '',
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

    const renderVersusDropdownsNew = (
        timeSlotId: string,
        venue: string = 'ST_IVES',
    ) => {
        if (!timeSlotId) {
            return <div />;
        }
        // console.log("attempting to find a game in dbGames");
        let game = dbGames.find(
            (gamee) => gamee.timeSlotId === timeSlotId,
        );
        
        const createdGame = createdGames.find(
            (gamee) => gamee.timeSlotId === timeSlotId,
        );
        
        if (createdGame) {
            game = createdGame;
        };

        const lightTeamId = game?.lightTeamId || '';
        const darkTeamId = game?.darkTeamId || '';
        

        return (
            <div className='py-4 flex flex-col gap-4'>
                <FormControl variant="outlined" fullWidth >
                    <InputLabel id="select-label-light">Light</InputLabel>
                    <Select
                        labelId="select-label-light"
                        value={lightTeamId}
                        onChange={(event: { target: { value: string } }) => {
                            const selectedTeamId = event.target.value;
                            updateGameNew(
                                timeSlotId,
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
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-label-dark">Dark</InputLabel>
                    <Select
                        labelId="select-label-dark"
                        value={darkTeamId}
                        onChange={(event: { target: { value: string } }) => {
                            const selectedTeamId = event.target.value;
                            updateGameNew(
                                timeSlotId,
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
                <h3 className="text-xl font-bold pb-4">St Ives</h3>
                <div className='flex gap-8'>
                    <Button
                        variant="contained"
                        onClick={() => console.log(getTimeSlotFromWeekTimeCourtNew(1, "10:00", 1))}
                    >
                        get timeslot test
                    </Button>
                </div>
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <DataGrid 
                        rows={generateDataGridRows(true)} 
                        columns={generateDataGridCols(GetTimesAndCourts(true))} 
                        columnGroupingModel={generateDataGridGroupingModel(GetTimesAndCourts(true))}
                        disableRowSelectionOnClick
                        autoHeight
                        getRowHeight={() => 'auto'}
                        sx={{
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                justifyContent: 'center',
                            },
                        }}
                    />
                </Box>
            </div>
            <div className="flex gap-8">
                
            </div>
        </PageContainer>
    );
};

export default GameSetupNew;
