import {
    ArrowLongRightIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { enAU } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Location } from '../roster/Resources';
import Terms2025 from '../data/Terms';
import { IpcChannels } from '../../../general/IpcChannels';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import { RowData, timeSlotParams } from './util/types';
import { AgeGroupDataResponse } from '../players/components/Types';
import {
    ADULTS_AGE_GROUP_ID,
    getWeekDateFromTerm,
    toTitleCase,
    venueCourts,
    getWeekDate,
} from './util/util';
import { renderWeekTable } from './components/RenderWeekTable';
import { PlaceholderWeek } from './components/PlaceholderWeek';

export type WeekTabPanelProps = {
    index: number;
    value: number;
    term: number;
    ageGroups: AgeGroupDataResponse[];
    dbTimeSlots: timeSlotParams[];
    isSundayComp: boolean;
    setIsSundayComp: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WeekTabPanel = (
    props: WeekTabPanelProps & {
        setModifiedTimeSlots: React.Dispatch<
            React.SetStateAction<timeSlotParams[]>
        >;
        modifiedTimeSlots: timeSlotParams[];
        adultsRows: RowData[];
        setAdultsRows: React.Dispatch<React.SetStateAction<RowData[]>>;
        isLoading: boolean;
    },
) => {
    const {
        value,
        index,
        term,
        ageGroups,
        dbTimeSlots,
        setModifiedTimeSlots,
        modifiedTimeSlots,
        isSundayComp,
        setIsSundayComp,
        adultsRows,
        setAdultsRows,
        isLoading,
    } = props;

    const stIvesTimeSlots = dbTimeSlots.filter(
        (timeSlot) => timeSlot.location === 'ST_IVES',
    );

    const belroseTimeSlots = dbTimeSlots.filter(
        (timeSlot) => timeSlot.location === 'BELROSE',
    );

    const currentDate = getWeekDateFromTerm(term, index, false);

    const [timeToAdd, setTimeToAdd] = useState<Date>(new Date());
    // let timeToAdd: Date = new Date();
    const [courtToAdd, setCourtToAdd] = useState<number>(1);
    const [venueToAdd, setVenueToAdd] = useState<Location>(Location.ST_IVES);

    const handlePushAdult = () => {
        // add a row entry with the timeToAdd, courtToAdd and venueToAdd
        const time = moment(timeToAdd);
        let finalMoment = moment(currentDate);
        finalMoment = finalMoment.set({
            hour: time.hours(),
            minute: time.minutes(),
            second: 0,
        });
        finalMoment = finalMoment.tz('Australia/Sydney');

        const newGameStart = finalMoment;
        const newGameEnd = moment(newGameStart).add(45, 'minutes');

        const isConflict = adultsRows.some((row) => {
            const existingGameStart = moment(currentDate)
                .set({
                    hour: moment(row.time, 'h:mm A').hours(),
                    minute: moment(row.time, 'h:mm A').minutes(),
                    second: 0,
                })
                .tz('Australia/Sydney');
            const existingGameEnd = moment(existingGameStart).add(
                45,
                'minutes',
            );

            return (
                row.court === courtToAdd &&
                row.venue ===
                    (venueToAdd === Location.ST_IVES ? 'St Ives' : 'Belrose') &&
                ((newGameStart.isSameOrAfter(existingGameStart) &&
                    newGameStart.isBefore(existingGameEnd)) ||
                    (newGameEnd.isAfter(existingGameStart) &&
                        newGameEnd.isSameOrBefore(existingGameEnd)))
            );
        });

        if (isConflict) {
            console.error('Cannot add game: Time conflict with existing game.');
            toast.error('Cannot add game: Time conflict with existing game.');
            return;
        }

        const newTimeSlot: timeSlotParams = {
            date: finalMoment.toDate(),
            location: venueToAdd,
            court: courtToAdd,
            ageGroupId: ADULTS_AGE_GROUP_ID, // adults
            placeholder: false,
            placeholderReason: '',
        };

        // upload to prisma
        const timeSlotRequest: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.create,
            data: {
                data: newTimeSlot,
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, timeSlotRequest)
            .then((data: timeSlotParams) => {
                console.log(`Created time slot for ${venueToAdd}`);
                console.log(data);
                toast.success(`Created time slot successfully!`);
                const newRow = {
                    time: time.format('h:mm A'),
                    court: courtToAdd,
                    venue:
                        venueToAdd === Location.ST_IVES ? 'St Ives' : 'Belrose',
                    id: data.id,
                };

                setAdultsRows([...adultsRows, newRow as RowData]);
            })
            .catch((error: Error) => {
                console.error(`Error creating time slot for ${venueToAdd}:`);
                console.error(error);
            });

        // setModifiedTimeSlots([...modifiedTimeSlots, newTimeSlot]);
    };

    const handleDeleteAdultRow = (gameId: string) => {
        // remove time slot from prisma
        const delReq: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.delete,
            data: {
                where: {
                    id: gameId,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, delReq)
            .then(() => {
                console.log(`Deleted time slot for ${gameId}`);
                toast.info(`Deleted time slot successfully!`);
                // remove from adultsRows
                setAdultsRows(adultsRows.filter((row) => row.id !== gameId));
            })
            .catch((error: Error) => {
                console.error(`Error deleting time slot for ${gameId}:`);
                console.error(error);
            });
    };

    const updateAdultsGames = (
        placeholder: boolean,
        placeholderReason?: string,
    ) => {
        const requests: PrismaCall[] = adultsRows.map((timeslot) => {
            return {
                model: ModelName.timeslot,
                operation: CrudOperations.update,
                data: {
                    where: {
                        id: timeslot.id,
                    },
                    data: {
                        placeholder,
                        placeholderReason,
                    },
                },
            };
        });

        requests.forEach((request) => {
            window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, request)
                .then(() => {
                    console.log('successfully set placeholder request');
                })
                .catch((e) => {
                    console.log(`Error setting placeholder request! ${e}`);
                });
        });
    };

    const handleCopyToAllWeeks = () => {
        // create an array of this week's adult games fetching from prisma
        const minDate = getWeekDateFromTerm(term, index, false);
        const maxDate = moment(minDate).add(1, 'day').toDate();

        const req: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {
                where: {
                    ageGroupId: ADULTS_AGE_GROUP_ID,
                    date: {
                        lte: maxDate,
                        gte: minDate,
                    },
                },
            },
        };
        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, req)
            .then((data: timeSlotParams[]) => {
                const adultsTimeSlots = data;
                if (adultsTimeSlots) {
                    const promises = [];

                    for (
                        let weekOffset = 1;
                        weekOffset < Terms2025[term].weeks - index;
                        weekOffset++
                    ) {
                        adultsTimeSlots.forEach((game) => {
                            const newDate = moment(game.date)
                                .add(weekOffset, 'week')
                                .toDate();
                            const newGame: timeSlotParams = {
                                date: newDate,
                                location: game.location,
                                court: game.court,
                                ageGroupId: game.ageGroupId,
                                placeholder: game.placeholder,
                                placeholderReason: game.placeholderReason,
                            };

                            const timeSlotRequest: PrismaCall = {
                                model: ModelName.timeslot,
                                operation: CrudOperations.create,
                                data: {
                                    data: newGame,
                                },
                            };

                            promises.push(
                                window.electron.ipcRenderer
                                    .invoke(
                                        IpcChannels.PrismaClient,
                                        timeSlotRequest,
                                    )
                                    .then(() => {
                                        console.log(
                                            `Created time slot for ${newGame.location}`,
                                        );
                                        toast.success(
                                            `Copied timeslots successfully!`,
                                        );
                                    })
                                    .catch((error: Error) => {
                                        console.error(
                                            `Error creating time slot for ${newGame.location}:`,
                                        );
                                        console.error(error);
                                        console.error(newGame);
                                        toast.error(
                                            `Something went wrong copying some or all timeslots.`,
                                        );
                                    }),
                            );
                        });
                    }
                } else {
                }
            });

        // create a list of promises. For each game, create a new game in the same court and venue and time of day, but add one week to the date
    };

    const loadingDiv = (
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="h-2.5 bg-gray-300 rounded-full w-24" />
            <div className="h-2.5 bg-gray-300 rounded-full w-24" />
        </div>
    );

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`week-tabpanel-${index}`}
            aria-labelledby={`week-tab-${index}`}
        >
            {value === index && (
                <div>
                    <div className="flex flex-row gap-16">
                        <div className="pb-8 w-1/2">
                            <h1 className="font-bold text-xl">
                                Adults Competition
                            </h1>
                            <h2 className="pb-4">
                                {getWeekDate(term, index, false)}
                            </h2>
                            <PlaceholderWeek
                                onChange={updateAdultsGames}
                                timeslots={adultsRows}
                            />
                            <h2 className="font-bold text-lg pb-4">
                                Add a game
                            </h2>
                            <div className="flex items-center gap-4">
                                <div>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={enAU}
                                    >
                                        <TimePicker
                                            label="Time"
                                            value={timeToAdd}
                                            onChange={(date) => {
                                                setTimeToAdd(
                                                    date ?? new Date(),
                                                );
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="court-label">
                                            Court
                                        </InputLabel>
                                        <Select
                                            labelId="court-label"
                                            id="court-select"
                                            label="Court"
                                            name="court"
                                            value={courtToAdd}
                                            onChange={(e) => {
                                                setCourtToAdd(
                                                    e.target.value as number,
                                                );
                                            }}
                                        >
                                            {Array.from(
                                                {
                                                    length: Math.max(
                                                        ...Object.values(
                                                            venueCourts,
                                                        ),
                                                    ),
                                                },
                                                (_, i) => (
                                                    <MenuItem
                                                        key={i + 1}
                                                        value={i + 1}
                                                    >
                                                        {`Court ${i + 1}`}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="venue-label">
                                            Venue
                                        </InputLabel>
                                        <Select
                                            labelId="venue-label"
                                            id="venue-select"
                                            label="Venue"
                                            name="venue"
                                            value={venueToAdd}
                                            onChange={(e) => {
                                                setVenueToAdd(
                                                    e.target.value as Location,
                                                );
                                            }}
                                        >
                                            {Object.values(Location).map(
                                                (location) => (
                                                    <MenuItem
                                                        key={location}
                                                        value={location}
                                                    >
                                                        {toTitleCase(
                                                            location.replace(
                                                                '_',
                                                                ' ',
                                                            ),
                                                        )}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handlePushAdult}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-8 w-full">
                                <TableContainer className="shadow-lg rounded-lg">
                                    <Table>
                                        <TableHead className="bg-gray-200">
                                            <TableRow>
                                                <TableCell className="font-bold">
                                                    Time
                                                </TableCell>
                                                <TableCell className="font-bold">
                                                    Court Number
                                                </TableCell>
                                                <TableCell className="font-bold">
                                                    Venue
                                                </TableCell>
                                                <TableCell className="font-bold" />
                                            </TableRow>
                                        </TableHead>
                                        {isLoading ? (
                                            <TableBody>
                                                <TableRow
                                                    key={index}
                                                    className="hover:bg-gray-100"
                                                >
                                                    <TableCell>
                                                        <div>{loadingDiv}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{loadingDiv}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{loadingDiv}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="w-6" />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ) : (
                                            <TableBody>
                                                {adultsRows
                                                    .slice()
                                                    .sort((a, b) => {
                                                        const timeA = moment(
                                                            a.time,
                                                            'h:mm A',
                                                        );
                                                        const timeB = moment(
                                                            b.time,
                                                            'h:mm A',
                                                        );
                                                        if (
                                                            timeA.isSame(timeB)
                                                        ) {
                                                            return (
                                                                a.court -
                                                                b.court
                                                            );
                                                        }
                                                        return timeA.isBefore(
                                                            timeB,
                                                        )
                                                            ? -1
                                                            : 1;
                                                    })
                                                    .map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            className="hover:bg-gray-100"
                                                        >
                                                            <TableCell>
                                                                {row.time}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.court}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.venue}
                                                            </TableCell>
                                                            <TableCell>
                                                                <TrashIcon
                                                                    className="h-6 w-6 text-red-500 hover:text-gray-800 hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        handleDeleteAdultRow(
                                                                            row.id,
                                                                        )
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            </div>

                            <div className="pt-4">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleCopyToAllWeeks();
                                    }}
                                >
                                    Copy to all weeks
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div className="pt-24">
                                <div className="flex gap-1 text-gray-500">
                                    <ExclamationCircleIcon className="h-6 w-6 inline-block" />
                                    <h3>Quick tip</h3>
                                </div>
                                <div className="flex gap-2 pl-2">
                                    <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                    <p className="text-sm text-gray-600 pt-1">
                                        Adult games are automatically saved as
                                        you create or delete them.
                                    </p>
                                </div>
                                <div className="flex gap-2 pl-2 pt-2">
                                    <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                    <p className="text-sm text-gray-600 pt-1">
                                        Sunday games must be saved manually with
                                        the button below. This <i>includes </i>
                                        setting/updating placeholders
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="pb-4" />
                    {isSundayComp ? (
                        <div>
                            <h1 className="font-bold text-xl pb-4">
                                Sunday Competition
                            </h1>
                            <h2>{getWeekDate(term, index)}</h2>
                            <PlaceholderWeek
                                timeslots={modifiedTimeSlots}
                                onChange={(placeholder, placeholderReason) => {
                                    const newTimeslots = modifiedTimeSlots.map(
                                        (val) => {
                                            return {
                                                ...val,
                                                placeholder,
                                                placeholderReason,
                                            };
                                        },
                                    );

                                    setModifiedTimeSlots(newTimeslots);
                                }}
                            />
                            <div className="pt-4">
                                <h3 className="text-xl font-bold">St Ives</h3>
                                {renderWeekTable(
                                    term,
                                    index,
                                    'St Ives',
                                    ageGroups,
                                    stIvesTimeSlots,
                                    setModifiedTimeSlots,
                                    modifiedTimeSlots,
                                    isSundayComp,
                                    isLoading,
                                )}
                            </div>
                            <div className="pt-8">
                                <h3 className="text-xl font-bold">Belrose</h3>
                                {renderWeekTable(
                                    term,
                                    index,
                                    'Belrose',
                                    ageGroups,
                                    belroseTimeSlots,
                                    setModifiedTimeSlots,
                                    modifiedTimeSlots,
                                    isSundayComp,
                                    isLoading,
                                )}
                            </div>
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            )}
        </div>
    );
};
