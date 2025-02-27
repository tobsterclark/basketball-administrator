import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import {
    ArrowLeftIcon,
    ArrowLongRightIcon,
    ArrowRightIcon,
    ExclamationCircleIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps } from '../players/components/Types';
import Terms2025 from '../data/Terms';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { green, red } from 'chalk';
import CourtTable from './components/CourtTable';
import { IpcChannels } from '../../../general/IpcChannels';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import FormCancelSave from '../../ui_components/FormCancelSave';
import { toast } from 'react-toastify';
import moment from 'moment';

enum Location {
    ST_IVES = 'ST_IVES',
    BELROSE = 'BELROSE',
}

type Team = {
    id: string;
    name: string;
    ageGroupId: string;
    division: number | null;
};

type Timeslot = {
    id: string;
    location: Location;
    court: number;
    ageGroupId: string;
    date: string; // ISO date string
};

type Game = {
    id: string;
    lightTeamId: string;
    darkTeamId: string;
    lightScore: number;
    darkScore: number;
    timeslotId: string;
    lightTeam: Team;
    darkTeam: Team;
    timeslot: Timeslot;
};

type TableEntry = {
    time: string;
    gameId: string;
    ageGroup: string;
    lightTeam: string;
    lightTeamScore: number;
    darkTeamScore: number;
    darkTeam: string;
    winningTeam: string;
};

const toTitleCase = (str: any) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: any) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

const GameResults = (props: PlayerDataProps) => {
    const { ageGroups, teams } = props;
    const [currentGames, setCurrentGames] = React.useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = React.useState<string>('');
    const [selectedGameForfeited, setSelectedGameForfeited] =
        React.useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(
        moment
            .tz(new Date(), 'Australia/Sydney')
            .startOf('week')
            .add(7, 'days')
            .toDate(),
    );
    const [venue, setVenue] = React.useState<Location>(Location.ST_IVES);
    const [isSundayGames, setIsSundayGames] = React.useState<boolean>(true);

    const getCurrentTermAndWeek = (
        currentDate: Date,
    ): { term: number; week: number } => {
        for (let i = 0; i < Terms2025.length; i++) {
            const term = Terms2025[i];
            const nextTerm = Terms2025[i + 1];

            if (
                currentDate >= term.date &&
                (!nextTerm || currentDate < nextTerm.date)
            ) {
                const weekNumber =
                    Math.floor(
                        (currentDate.getTime() - term.date.getTime()) /
                            (7 * 24 * 60 * 60 * 1000),
                    ) + 1;

                if (weekNumber <= term.weeks) {
                    return { term: i + 1, week: weekNumber };
                }
            }
        }
        return { term: -1, week: -1 }; // Outside of term dates
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date) => {
        // format time in <HH:mm> AM/PM format
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    const getCurrentGames = (currentDate: Date, venue: Location): Game[] => {
        const gamesRequest: PrismaCall = {
            model: ModelName.game,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    timeslot: {
                        date: {
                            lte: new Date(
                                currentDate.getTime() + 24 * 60 * 60 * 1000,
                            ), // +/- 1 day
                            gte: new Date(
                                currentDate.getTime() - 24 * 60 * 60 * 1000,
                            ),
                        },
                        location: venue,
                    },
                },
                include: {
                    lightTeam: true,
                    darkTeam: true,
                    timeslot: true,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, gamesRequest)
            .then((data) => {
                setCurrentGames(data as Game[]);
            })
            .catch((err) => {
                console.error(err);
            });
        return [];
    };

    useEffect(() => {
        getCurrentGames(currentDate, venue);
    }, [currentDate, venue]);

    const getTableEntries = (games: Game[], court: number): TableEntry[] => {
        return games
            .filter((game) => game.timeslot.court === court)
            .map((game) => {
                let winningTeam = '';
                if (game.lightScore === 0 && game.darkScore === 0) {
                    winningTeam = '';
                } else if (game.lightScore === game.darkScore) {
                    winningTeam = 'TIE!';
                } else {
                    winningTeam =
                        game.lightScore > game.darkScore
                            ? game.lightTeam.name
                            : game.darkTeam.name;
                }
                return {
                    time: formatTime(new Date(game.timeslot.date)),
                    gameId: game.id,
                    ageGroup: toTitleCase(
                        ageGroups.find(
                            (ageGroup) =>
                                ageGroup.id === game.timeslot.ageGroupId,
                        )?.displayName || '',
                    ),
                    lightTeam: game.lightTeam.name,
                    lightTeamScore: game.lightScore,
                    darkTeam: game.darkTeam.name,
                    darkTeamScore: game.darkScore,
                    winningTeam: winningTeam,
                };
            })
            .sort(
                (a, b) =>
                    new Date(`1970/01/01 ${a.time}`).getTime() -
                    new Date(`1970/01/01 ${b.time}`).getTime(),
            );
    };

    const getNumCourts = (games: Game[]): number => {
        return Math.max(...games.map((game) => game.timeslot.court));
    };

    const getNumGamesUpdated = (games: Game[]): number => {
        return games.filter(
            (game) => game.lightScore !== 0 || game.darkScore !== 0,
        ).length;
    };

    const uploadGameResults = (game: Game) => {
        const gameRequest: PrismaCall = {
            model: ModelName.game,
            operation: CrudOperations.update,
            data: {
                where: {
                    id: game.id,
                },
                data: {
                    lightScore: game.lightScore,
                    darkScore: game.darkScore,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, gameRequest)
            .then((data) => {
                console.log(data);
                toast.success('Game results updated successfully');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            const currentCourt =
                currentGames.find((game) => game.id === selectedGame)?.timeslot
                    .court || 1;
            const entries = getTableEntries(currentGames, currentCourt);
            const currentIndex = entries.findIndex(
                (game) => game.gameId === selectedGame,
            );
            const nextIndex = currentIndex + 1;
            const prevIndex = currentIndex - 1;
            const currentGame = currentGames[currentIndex];

            if (e.ctrlKey && e.key === 's') {
                uploadGameResults(currentGame);
            } else if (e.ctrlKey && e.key === 'c') {
                setSelectedGame('');
                getCurrentGames(currentDate, venue);
            } else if (e.key === 'ArrowRight') {
                if (selectedGame === '') {
                    setSelectedGame(entries[0]?.gameId || '');
                } else if (nextIndex < entries.length) {
                    setSelectedGame(entries[nextIndex]?.gameId || '');
                } else {
                    const nextCourt = currentCourt + 1;
                    const nextCourtEntries = getTableEntries(
                        currentGames,
                        nextCourt,
                    );
                    if (nextCourtEntries.length > 0) {
                        setSelectedGame(nextCourtEntries[0]?.gameId || '');
                    }
                }
            } else if (e.key === 'ArrowLeft') {
                if (prevIndex >= 0) {
                    setSelectedGame(entries[prevIndex]?.gameId || '');
                } else {
                    const prevCourt = currentCourt - 1;
                    const prevCourtEntries = getTableEntries(
                        currentGames,
                        prevCourt,
                    );
                    if (prevCourtEntries.length > 0) {
                        setSelectedGame(
                            prevCourtEntries[prevCourtEntries.length - 1]
                                ?.gameId || '',
                        );
                    }
                }
            }
        },
        [currentGames, selectedGame, currentDate, venue],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        const focusableElements = document.querySelectorAll(
            'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        focusableElements.forEach((el) => {
            // Allow focus only on the text input fields
            if (el.id !== 'lightTeamScore' && el.id !== 'darkTeamScore') {
                el.setAttribute('tabindex', '-1');
            }
        });

        // Cleanup on unmount to restore original tabindex values
        return () => {
            focusableElements.forEach((el) => {
                el.removeAttribute('tabindex');
            });
        };
    }, []);

    const forfeit = (lightTeam: boolean) => {
        setSelectedGameForfeited(true);
        // set the score to -1 for the forfeited team, and set the other team's score to 20
        setCurrentGames(
            currentGames.map((game) =>
                game.id === selectedGame
                    ? {
                          ...game,
                          lightScore: lightTeam ? -1 : 20,
                          darkScore: lightTeam ? 20 : -1,
                      }
                    : game,
            ),
        );
    };

    const handleSwitchDays = () => {
        setIsSundayGames(!isSundayGames);
        const newDate = new Date(currentDate);
        // add 3 days
        if (isSundayGames) newDate.setDate(newDate.getDate() + 3);
        else {
            newDate.setDate(newDate.getDate() - 3);
        }
        setCurrentDate(newDate);
    }

    return (
        <PageContainer>
            <PageTitle text="Game Results" />
            <div className="flex flex-row gap-4 w-full h-5/6">
                <div className="w-2/5 pt-4">
                    <h1 className="font-bold text-xl">
                        {formatDate(currentDate)}
                    </h1>
                    <h2 className="text-lg pt-2">
                        {getNumGamesUpdated(currentGames)}/{currentGames.length}{' '}
                        {venue === Location.BELROSE ? 'Belrose' : 'St Ives'}{' '}
                        games recorded
                    </h2>
                    <div className="pt-8">
                        <div>
                            <h2>Light Team</h2>
                            <div className="pt-2 pb-6">
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <FormControl
                                            fullWidth
                                            disabled={selectedGame === ''}
                                        >
                                            <InputLabel id="light-team-label">
                                                Light Team
                                            </InputLabel>
                                            <Select
                                                labelId="light-team-label"
                                                id="light-team-select"
                                                value={
                                                    currentGames.find(
                                                        (game) =>
                                                            game.id ===
                                                            selectedGame,
                                                    )?.lightTeamId || ''
                                                }
                                                label="Team"
                                                name="teamId"
                                                inputProps={{
                                                    readOnly: true,
                                                    tabIndex: -1,
                                                }}
                                            >
                                                {teams?.map((team) => (
                                                    <MenuItem
                                                        key={team.id}
                                                        value={team.id}
                                                    >
                                                        {team.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="w-36">
                                        <TextField
                                            id="lightTeamScore"
                                            label="Score"
                                            variant="outlined"
                                            name="number"
                                            disabled={
                                                selectedGame === '' ||
                                                selectedGameForfeited
                                            }
                                            value={
                                                currentGames.find(
                                                    (game) =>
                                                        game.id ===
                                                        selectedGame,
                                                )?.lightScore === -1
                                                    ? 'FFT'
                                                    : currentGames.find(
                                                          (game) =>
                                                              game.id ===
                                                              selectedGame,
                                                      )?.lightScore || 0
                                            }
                                            onChange={(e) => {
                                                const value = parseInt(
                                                    e.target.value,
                                                );
                                                setCurrentGames(
                                                    currentGames.map((game) =>
                                                        game.id === selectedGame
                                                            ? {
                                                                  ...game,
                                                                  lightScore:
                                                                      isNaN(
                                                                          value,
                                                                      )
                                                                          ? 0
                                                                          : value,
                                                              }
                                                            : game,
                                                    ),
                                                );
                                            }}
                                            tabIndex={1}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button
                                        variant="outlined"
                                        disabled={selectedGame === ''}
                                        onClick={() => forfeit(true)}
                                    >
                                        Forfeit
                                    </Button>
                                </div>
                            </div>
                            <h2>Dark Team</h2>
                            <div className="pt-2 pb-6">
                                <div className="flex gap-4 pt-2">
                                    <div className="w-1/2">
                                        <FormControl
                                            fullWidth
                                            disabled={selectedGame === ''}
                                            tabIndex={-1}
                                        >
                                            <InputLabel id="dark-team-label">
                                                Dark Team
                                            </InputLabel>
                                            <Select
                                                labelId="dark-team-label"
                                                id="dark-team-select"
                                                value={
                                                    currentGames.find(
                                                        (game) =>
                                                            game.id ===
                                                            selectedGame,
                                                    )?.darkTeamId || ''
                                                }
                                                label="Team"
                                                name="teamId"
                                                inputProps={{
                                                    readOnly: true,
                                                    tabIndex: -1,
                                                }}
                                            >
                                                {teams?.map((team) => (
                                                    <MenuItem
                                                        key={team.id}
                                                        value={team.id}
                                                    >
                                                        {team.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="w-36">
                                        <TextField
                                            id="darkTeamScore"
                                            label="Score"
                                            variant="outlined"
                                            name="number"
                                            disabled={
                                                selectedGame === '' ||
                                                selectedGameForfeited
                                            }
                                            value={
                                                currentGames.find(
                                                    (game) =>
                                                        game.id ===
                                                        selectedGame,
                                                )?.darkScore === -1
                                                    ? 'FFT'
                                                    : currentGames.find(
                                                          (game) =>
                                                              game.id ===
                                                              selectedGame,
                                                      )?.darkScore || 0
                                            }
                                            onChange={(e) => {
                                                const value = parseInt(
                                                    e.target.value,
                                                );
                                                setCurrentGames(
                                                    currentGames.map((game) =>
                                                        game.id === selectedGame
                                                            ? {
                                                                  ...game,
                                                                  darkScore:
                                                                      isNaN(
                                                                          value,
                                                                      )
                                                                          ? 0
                                                                          : value,
                                                              }
                                                            : game,
                                                    ),
                                                );
                                            }}
                                            tabIndex={2}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 pb-4">
                                    <Button
                                        variant="outlined"
                                        disabled={selectedGame === ''}
                                        onClick={() => forfeit(false)}
                                    >
                                        Forfeit
                                    </Button>
                                </div>
                            </div>
                            <div className="pr-8">
                                <FormCancelSave
                                    cancelButtonDisabled={selectedGame === ''}
                                    saveButtonDisabled={selectedGame === ''}
                                    onCancelClick={() => {
                                        setSelectedGame('');
                                        getCurrentGames(currentDate, venue);
                                    }}
                                    onSaveClick={() => {
                                        uploadGameResults(
                                            currentGames.find(
                                                (game) =>
                                                    game.id === selectedGame,
                                            ) as Game,
                                        );
                                    }}
                                />
                            </div>
                            <div className="pt-24">
                                <div className="flex gap-1 text-gray-500">
                                    <ExclamationCircleIcon className="h-6 w-6 inline-block" />
                                    <h3>Quick tip</h3>
                                </div>
                                <div className="flex gap-2 pl-2">
                                    <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                    <p className="text-sm text-gray-600 pt-1">
                                        <span>Use </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            tab
                                        </span>
                                        <span>
                                            {' '}
                                            to cycle between the score text
                                            fields.
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2 pl-2 pt-2">
                                    <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                    <p className="text-sm text-gray-600 pt-1">
                                        <span>Use </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            ctrl
                                        </span>
                                        <span> + </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            s
                                        </span>
                                        <span>
                                            {' '}
                                            to save the entered score, or{' '}
                                        </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            ctrl
                                        </span>
                                        <span> + </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            c
                                        </span>
                                        <span> to cancel.</span>
                                    </p>
                                </div>
                                <div className="flex gap-2 pl-2 pt-2">
                                    <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                    <p className="text-sm text-gray-600 pt-1">
                                        <span>Use arrow keys </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            <ArrowLeftIcon className="h-4 w-4 inline-block mb-0.5 mr-0.5 ml-0.5" />
                                        </span>
                                        <span> or </span>
                                        <span className="bg-gray-200 px-0.5 py-0.5 rounded-sm">
                                            <ArrowRightIcon className="h-4 w-4 inline-block mb-0.5 mr-0.5 ml-0.5" />
                                        </span>
                                        <span> to navigate between games.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 "></div>
                <div className="w-3/4 pt-4 pl-4">
                    <div className="flex gap-8">
                        <div className="text-xl h-[70px] font-bold float-left flex items-center gap-2">
                            <Button
                                onClick={() =>
                                    setCurrentDate(
                                        new Date(
                                            currentDate.getTime() -
                                                7 * 24 * 60 * 60 * 1000,
                                        ),
                                    )
                                }
                            >
                                <ArrowLeftCircleIcon />
                            </Button>
                            {getCurrentTermAndWeek(currentDate).term === -1 ? (
                                <p>Outside of term dates</p>
                            ) : (
                                <p>
                                    Term{' '}
                                    {getCurrentTermAndWeek(currentDate).term},
                                    Week{' '}
                                    {getCurrentTermAndWeek(currentDate)?.week}
                                </p>
                            )}
                            <Button
                                onClick={() =>
                                    setCurrentDate(
                                        new Date(
                                            currentDate.getTime() +
                                                7 * 24 * 60 * 60 * 1000,
                                        ),
                                    )
                                }
                            >
                                <ArrowRightCircleIcon />
                            </Button>
                        </div>
                        <div className="inline-block mt-2 h-[50px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 "></div>
                        <div className="h-[70px] flex items-center font-bold w-[180px]">
                            <p>St Ives</p>
                            <Switch
                                checked={venue !== Location.ST_IVES}
                                onChange={() =>
                                    setVenue(
                                        venue === Location.ST_IVES
                                            ? Location.BELROSE
                                            : Location.ST_IVES,
                                    )
                                }
                                size="medium"
                                sx={{
                                    '& .MuiSwitch-track': {
                                        backgroundColor: '#8cbae8',
                                    },
                                    '& .MuiSwitch-thumb': {
                                        color: '#1976d2',
                                    },
                                    '&.Mui-checked .MuiSwitch-track': {
                                        backgroundColor: '#8cbae8',
                                    },
                                    '&.Mui-checked .MuiSwitch-thumb': {
                                        color: '#1976d2',
                                    },
                                }}
                            />
                            <p>Belrose</p>
                        </div>
                        <div className="inline-block mt-2 h-[50px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 "></div>
                        <div className="h-[70px] w-[220px] flex items-center font-bold">
                            <p>Sunday Games</p>
                            <Switch
                                checked={!isSundayGames}
                                onChange={() =>
                                    handleSwitchDays()
                                }
                                size="medium"
                                sx={{
                                    '& .MuiSwitch-track': {
                                        backgroundColor: '#8cbae8',
                                    },
                                    '& .MuiSwitch-thumb': {
                                        color: '#1976d2',
                                    },
                                    '&.Mui-checked .MuiSwitch-track': {
                                        backgroundColor: '#8cbae8',
                                    },
                                    '&.Mui-checked .MuiSwitch-thumb': {
                                        color: '#1976d2',
                                    },
                                }}
                            />
                            <p>Adult Games</p>
                        </div>
                    </div>
                    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        {Array.from(
                            { length: getNumCourts(currentGames) },
                            (_, i) => (
                                <CourtTable
                                    key={i + 1}
                                    courtNumber={i + 1}
                                    tableData={getTableEntries(
                                        currentGames,
                                        i + 1,
                                    )}
                                    selectedGame={selectedGame}
                                    setSelectedGame={setSelectedGame}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default GameResults;
