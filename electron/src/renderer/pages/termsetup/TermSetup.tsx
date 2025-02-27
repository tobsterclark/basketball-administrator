import {
    ArrowLeftCircleIcon,
    ArrowLongRightIcon,
    ArrowRightCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import {
    AgeGroupDataResponse,
    PlayerDataProps,
} from '../players/components/Types';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';
import FormCancelSave from '../../ui_components/FormCancelSave';
import Terms2025 from '../data/Terms';
import { toast } from 'react-toastify';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    LocalizationProvider,
    TimePicker,
} from '@mui/x-date-pickers';
import { enAU, is } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Location } from '../roster/Resources';
import { TrashIcon } from '@heroicons/react/24/outline';

type RowData = {
    time: string;
    court: number;
    venue: string;
    id: string;
};

type timeSlotParams = {
    id?: string;
    date: Date;
    location: string;
    court: number;
    ageGroupId?: string;
};

type WeekTabPanelProps = {
    index: number;
    value: number;
    term: number;
    ageGroups: AgeGroupDataResponse[];
    dbTimeSlots: timeSlotParams[];
    isSundayComp: boolean;
    setIsSundayComp: React.Dispatch<React.SetStateAction<boolean>>;
};

const hourSlots = [
    { slot: 0, time: '9am' },
    { slot: 1, time: '10am' },
    { slot: 2, time: '11am' },
    { slot: 3, time: '12pm' },
    { slot: 4, time: '1pm' },
    { slot: 5, time: '2pm' },
    { slot: 6, time: '3pm' },
    { slot: 7, time: '4pm' },
    { slot: 8, time: '5pm' },
    { slot: 9, time: '6pm' },
];

const getWeekDateFromTerm = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7 + (!isSundayComp ? -4 : 0), // If wednesday, minus 3 days
    );
    return newDate;
};

const venueCourts = {
    'St Ives': 3,
    Belrose: 2,
};

const ADULTS_AGE_GROUP_ID = '48b2bdf3-3acb-4f5a-b7e7-19ffca0f3c64';

const printAllTimeSlots = () => {
    const req: PrismaCall = {
        model: ModelName.timeslot,
        operation: CrudOperations.findMany,
        data: {},
    };
    window.electron.ipcRenderer
        .invoke(IpcChannels.PrismaClient, req)
        .then((data: unknown) => {
            console.log(data);
        });
};

const uploadTimeSlots = async (timeSlotParams: timeSlotParams[]) => {
    const timeSlotsWithIds: timeSlotParams[] = [];

    const promises = timeSlotParams.map((timeSlot) => {
        const timeSlotRequest: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.upsert,
            data: {
                where: {
                    location_date_court: {
                        location: timeSlot.location,
                        date: timeSlot.date,
                        court: timeSlot.court,
                    },
                },
                update: {},
                create: {
                    location: timeSlot.location,
                    date: timeSlot.date,
                    court: timeSlot.court,
                    ageGroupId: 'b3ad7e4e-acbe-4dfd-90e1-5d7d6bd2ad41', // TODO: Fetch this dynamically
                },
                select: {
                    id: true,
                    location: true,
                    date: true,
                    court: true,
                    ageGroupId: true,
                },
            },
        };

        return window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, timeSlotRequest)
            .then((data: { id: string; ageGroupId?: string | null }) => {
                timeSlotsWithIds.push({
                    ...timeSlot,
                    id: data.id,
                    ageGroupId: data.ageGroupId ?? 'noEvent', // Include ageGroupId if present
                });
            })
            .catch((error: Error) => {
                console.error(
                    `Error upserting time slot for court ${timeSlot.court}:`,
                    error,
                );
            });
    });

    await Promise.all(promises);
    return timeSlotsWithIds;
};

const handleSelectInput = (
    e: SelectChangeEvent<string>,
    timeSlotId: string,
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
) => {
    const selectedValue = e.target.value;

    setModifiedTimeSlots((prev) =>
        prev.map((timeSlot) =>
            timeSlot.id === timeSlotId
                ? { ...timeSlot, ageGroupId: selectedValue }
                : timeSlot,
        ),
    );
};

const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const renderSelectInput = (
    timeSlotId: string,
    ageGroups: AgeGroupDataResponse[],
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
    modifiedTimeSlots: timeSlotParams[],
) => {
    return (
        <FormControl
            variant="standard"
            fullWidth
            sx={{
                width: {
                    xs: '50%',
                    sm: '60%',
                    md: '80%',
                    lg: '100%',
                    xl: '100%',
                },
            }}
        >
            <InputLabel id={`select-label-${timeSlotId}`}>Event</InputLabel>
            <Select
                labelId={`select-label-${timeSlotId}`}
                id={`select-${timeSlotId}`}
                value={
                    modifiedTimeSlots.find(
                        (timeSlot) => timeSlot.id === timeSlotId,
                    )?.ageGroupId || ''
                }
                onChange={(e) =>
                    handleSelectInput(e, timeSlotId, setModifiedTimeSlots)
                }
                sx={{ fontSize: '1em' }}
            >
                {ageGroups.map((ageGroup) => (
                    <MenuItem key={ageGroup.id} value={ageGroup.id}>
                        {toTitleCase(ageGroup.displayName)}
                    </MenuItem>
                ))}
                <MenuItem value="noEvent">No Event</MenuItem>
            </Select>
        </FormControl>
    );
};

const getWeekDate = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7 + (!isSundayComp ? -4 : 0), // If wednesday, minus 3 days
    );
    return <Moment format="dddd[,] MMMM Do YYYY">{newDate}</Moment>;
};

const renderWeekTable = (
    term: number,
    week: number,
    venue: keyof typeof venueCourts,
    ageGroups: AgeGroupDataResponse[],
    venueTimeSlots: timeSlotParams[],
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
    modifiedTimeSlots: timeSlotParams[],
    isSundayComp: boolean,
    isLoading: boolean,
) => {
    const currentDate = getWeekDateFromTerm(term, week, isSundayComp);

    const findEntryByDateTime = (courtIndex: number, timeSlot: number) => {
        const time = moment(hourSlots[timeSlot].time, 'hha');
        let finalMoment = moment(currentDate);
        finalMoment = finalMoment.set({
            hour: time.hours(),
            minute: time.minutes(),
            second: 0,
        });

        const dbLocation = venue === 'St Ives' ? 'ST_IVES' : 'BELROSE';

        const entry = venueTimeSlots.find(
            (timeSlotEntry) =>
                timeSlotEntry.date.getTime() ===
                    finalMoment.toDate().getTime() &&
                timeSlotEntry.location === dbLocation &&
                timeSlotEntry.court === courtIndex,
        );

        return entry;
    };

    const table = (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Court</TableCell>
                        {hourSlots.map((hour) => (
                            <TableCell key={hour.slot}>{hour.time}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: venueCourts[venue] }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            {hourSlots.map((hour) => (
                                <TableCell key={hour.slot}>
                                    {renderSelectInput(
                                        findEntryByDateTime(i + 1, hour.slot)
                                            ?.id || '',
                                        ageGroups,
                                        setModifiedTimeSlots,
                                        modifiedTimeSlots,
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const loadingTable = (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Court</TableCell>
                        {hourSlots.map((hour) => (
                            <TableCell key={hour.slot}>{hour.time}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: venueCourts[venue] }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            {hourSlots.map((hour) => (
                                <TableCell key={hour.slot}>
                                    <div
                                        role="status"
                                        className="space-y-2.5 animate-pulse max-w-lg"
                                    >
                                        <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    // return loadingTable;
    return isLoading ? loadingTable : table;
};

const WeekTabPanel = (
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
                    return;
                }
            });

        // create a list of promises. For each game, create a new game in the same court and venue and time of day, but add one week to the date
    };

    const checkSlots = () => {
        console.log('adultrows');
        console.log(adultsRows);
        console.log(dbTimeSlots);
        const timeSlotsToUpdate = modifiedTimeSlots.filter(
            (timeSlot) =>
                !dbTimeSlots.find(
                    (dbTimeSlot) => dbTimeSlot.id === timeSlot.id,
                ) ||
                dbTimeSlots.find(
                    (dbTimeSlot) =>
                        dbTimeSlot.id === timeSlot.id &&
                        dbTimeSlot.ageGroupId !== timeSlot.ageGroupId,
                ),
        );
        console.log(timeSlotsToUpdate);
        console.log(
            `${modifiedTimeSlots.length} modified time slots - ${dbTimeSlots.length} db time slots `,
        );
    };

    const loadingDiv = (
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
            <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
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
                    {
                        <div className="flex flex-row gap-16">
                            <div className="pb-8 w-1/2">
                                <h1 className="font-bold text-xl">
                                    Adults Competition
                                </h1>
                                <h2 className="pb-4">
                                    {getWeekDate(term, index, false)}
                                </h2>
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
                                                        e.target
                                                            .value as number,
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
                                                        e.target
                                                            .value as Location,
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
                                                            <div>
                                                                {loadingDiv}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                {loadingDiv}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                {loadingDiv}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="w-6"></div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                    {adultsRows
                                                        .slice()
                                                        .sort((a, b) => {
                                                            const timeA =
                                                                moment(
                                                                    a.time,
                                                                    'h:mm A',
                                                                );
                                                            const timeB =
                                                                moment(
                                                                    b.time,
                                                                    'h:mm A',
                                                                );
                                                            if (
                                                                timeA.isSame(
                                                                    timeB,
                                                                )
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
                                            Adult games are automatically saved
                                            as you create or delete them.
                                        </p>
                                    </div>
                                    <div className="flex gap-2 pl-2 pt-2">
                                        <ArrowLongRightIcon className="h-4 w-4 inline-block mt-1.5" />
                                        <p className="text-sm text-gray-600 pt-1">
                                            Sunday games must be saved manually
                                            with the button below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <hr className="pb-4" />
                    {isSundayComp ? (
                        <div>
                            <h1 className="font-bold text-xl pb-4">
                                Sunday Competition
                            </h1>
                            <h2>{getWeekDate(term, index)}</h2>
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
                        <div></div>
                    )}
                    {/* <div>
                        <h2>{getWeekDate(term, index, isSundayComp)}</h2>
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
                            )}
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export const TermSetup = (props: PlayerDataProps) => {
    const { ageGroups } = props;

    const [currentWeekTab, setCurrentWeekTab] = useState(0); // 0-indexed
    const [currentTerm, setCurrentTerm] = useState(0); // 0-3
    const [isSundayComp, setIsSundayComp] = useState(true);
    const [loading, setLoading] = useState(true);

    const [dbTimeSlots, setDbTimeSlots] = useState<timeSlotParams[]>([]); // For storing fetched time slots
    const [modifiedTimeSlots, setModifiedTimeSlots] = useState<
        timeSlotParams[]
    >([]);

    const [copyToAllWeeksConfirmation, setCopyToAllWeeksConfirmation] =
        useState(false);

    const [adultsRows, setAdultsRows] = useState<RowData[]>(
        dbTimeSlots
            .filter(
                (timeSlot) => timeSlot.ageGroupId === ADULTS_AGE_GROUP_ID, // adults
            )
            .map((timeSlot) => ({
                time: moment(timeSlot.date).format('h:mm A'),
                court: timeSlot.court,
                venue: timeSlot.location === 'ST_IVES' ? 'St Ives' : 'Belrose',
                id: timeSlot.id ?? '',
            })),
    );

    const copyToAllWeeks = () => {
        // Copy the current week's time slots to all other weeks.
        setCopyToAllWeeksConfirmation(false);
        console.log(modifiedTimeSlots);
        const currentWeekDate = getWeekDateFromTerm(
            currentTerm,
            currentWeekTab,
        );
        console.log(`Attempting to copy games from week ${currentWeekDate}`);

        for (let i = 1; i < Terms2025[currentTerm].weeks; i += 1) {
            upsert(currentTerm, i);
        }

        const allPrismaTimeSlotsReq: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {},
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, allPrismaTimeSlotsReq)
            .then((data: timeSlotParams[]) => {
                const allTimeSlots = data;

                // filter the time slots to only include timeslots that occur within +/- 24 hours of the currentWeekDate
                const currentWeekTimeSlots = allTimeSlots.filter(
                    (timeSlot) =>
                        Math.abs(
                            timeSlot.date.getTime() - currentWeekDate.getTime(),
                        ) <=
                        24 * 60 * 60 * 1000,
                );

                console.log('Current week time slots:');
                console.log(currentWeekTimeSlots);

                const promises = allTimeSlots
                    .filter(
                        (timeSlot) =>
                            !(
                                Math.abs(
                                    timeSlot.date.getTime() -
                                        currentWeekDate.getTime(),
                                ) <=
                                24 * 60 * 60 * 1000
                            ),
                    )
                    .map((timeSlot) => {
                        const currentWeekTimeSlot = currentWeekTimeSlots.find(
                            (currentWeekTimeSlot) =>
                                currentWeekTimeSlot.location ===
                                    timeSlot.location &&
                                currentWeekTimeSlot.court === timeSlot.court &&
                                currentWeekTimeSlot.date.getHours() ===
                                    timeSlot.date.getHours(),
                        );

                        if (currentWeekTimeSlot) {
                            const timeSlotRequest: PrismaCall = {
                                model: ModelName.timeslot,
                                operation: CrudOperations.update,
                                data: {
                                    where: {
                                        id: timeSlot.id,
                                    },
                                    data: {
                                        ageGroupId:
                                            currentWeekTimeSlot.ageGroupId ===
                                            'noEvent'
                                                ? null
                                                : currentWeekTimeSlot.ageGroupId,
                                    },
                                },
                            };

                            return window.electron.ipcRenderer
                                .invoke(
                                    IpcChannels.PrismaClient,
                                    timeSlotRequest,
                                )
                                .then(() => {
                                    console.log(
                                        `Updated time slot for ${timeSlot.location} court ${timeSlot.court}`,
                                    );
                                })
                                .catch((error: Error) => {
                                    console.error(
                                        `Error updating time slot for ${timeSlot.location} court ${timeSlot.court}:`,
                                        error,
                                    );
                                });
                        }
                        return Promise.resolve();
                    });

                Promise.all(promises).then(() => {
                    console.log('Finished copying time slots');
                    toast.success(
                        `${promises.length} time slot${
                            promises.length === 1 ? '' : 's'
                        } created across ${
                            promises.length / dbTimeSlots.length
                        } weeks successfully!`,
                    );
                });
            });
    };

    const uploadChanges = () => {
        const sundayTimeSlotsToUpdate = modifiedTimeSlots.filter(
            (timeSlot) =>
                timeSlot.ageGroupId !== ADULTS_AGE_GROUP_ID && // Exclude adults age group
                (!dbTimeSlots.find(
                    (dbTimeSlot) => dbTimeSlot.id === timeSlot.id,
                ) ||
                    dbTimeSlots.find(
                        (dbTimeSlot) =>
                            dbTimeSlot.id === timeSlot.id &&
                            dbTimeSlot.ageGroupId !== timeSlot.ageGroupId,
                    )),
        );

        const adultsToCreate = modifiedTimeSlots.filter(
            (timeSlot) =>
                timeSlot.ageGroupId === ADULTS_AGE_GROUP_ID && // Only include adults age group
                !dbTimeSlots.find(
                    (dbTimeSlot) => dbTimeSlot.id === timeSlot.id,
                ),
        );

        // ### begin creating adult games ###
        // const adultPromises = adultsToCreate.map((timeSlot) => {
        //     const timeSlotRequest: PrismaCall = {
        //         model: ModelName.timeslot,
        //         operation: CrudOperations.create,
        //         data: {
        //             data: {
        //                 location: timeSlot.location,
        //                 date: timeSlot.date,
        //                 court: timeSlot.court,
        //                 ageGroupId: timeSlot.ageGroupId,
        //             },
        //         },
        //     };

        //     return window.electron.ipcRenderer
        //         .invoke(IpcChannels.PrismaClient, timeSlotRequest)
        //         .then((data) => {
        //             console.log(`Created time slot for ${timeSlot.location}`);
        //             console.log(data);
        //         })
        //         .catch((error: Error) => {
        //             console.error(
        //                 `Error creating time slot for ${timeSlot.location}:`,
        //                 error,
        //             );
        //         });
        // });

        // ### end creating adult games ###

        // ### begin handling sunday games ###

        const promises = sundayTimeSlotsToUpdate.map((timeSlot) => {
            const timeSlotRequest: PrismaCall = {
                model: ModelName.timeslot,
                operation: CrudOperations.update,
                data: {
                    where: {
                        id: timeSlot.id,
                    },
                    data: {
                        ageGroupId:
                            timeSlot.ageGroupId === 'noEvent'
                                ? null
                                : timeSlot.ageGroupId,
                    },
                },
            };

            return window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, timeSlotRequest)
                .then(() => {
                    console.log(`Updated time slot for `);
                    console.log(timeSlot);
                })
                .catch((error: Error) => {
                    console.error(
                        `Error updating time slot for ${timeSlot}:`,
                        error,
                    );
                    console.error(timeSlot);
                });
        });

        Promise.all(promises).then(() => {
            setDbTimeSlots(modifiedTimeSlots);
        });

        // Promise.all([...promises, ...adultPromises]).then(() => {
        //     setDbTimeSlots(modifiedTimeSlots);
        // });

        toast.success(
            `${promises.length} time slot${
                promises.length === 1 ? '' : 's'
            } updated successfully`,
        );
    };

    const checkIfTimeSlotsEqual = () => {
        if (dbTimeSlots.length !== modifiedTimeSlots.length) {
            return false;
        }

        for (let i = 0; i < dbTimeSlots.length; i += 1) {
            if (dbTimeSlots[i].ageGroupId !== modifiedTimeSlots[i].ageGroupId) {
                console.log('DB time slots:');
                console.log(dbTimeSlots[i]);
                console.log('Modified time slots:');
                console.log(modifiedTimeSlots[i]);
                return false;
            }
        }
        return true;
    };

    const upsert = async (
        term: number = currentTerm,
        weekTab: number = currentWeekTab,
    ) => {
        setLoading(true);
        if (!isSundayComp) return;

        // Fetches or creates all time slots for the current week and term.
        // Stores into dbTimeSlots.
        // https://github.com/prisma/docs/issues/640
        // https://www.prisma.io/docs/concepts/components/prisma-client/crud#upsert

        const dateForRequest = getWeekDateFromTerm(term, weekTab);
        const weekRequestData: timeSlotParams[] = [];
        // loop through each venue, and then iterate through each court
        Object.keys(venueCourts).forEach((venue) => {
            for (
                let i = 1;
                i <= venueCourts[venue as keyof typeof venueCourts];
                i += 1
            ) {
                // Loop through each hour slot and append the hour to the dateForRequest,
                // create a new timeSlot and append to requestData.
                hourSlots.forEach((hour) => {
                    const time = moment(hour.time, 'hha');
                    let finalMoment = moment(dateForRequest);
                    finalMoment = finalMoment.set({
                        hour: time.hours(),
                        minute: time.minutes(),
                        second: 0,
                    });
                    finalMoment = finalMoment.tz('Australia/Sydney');

                    const dbLocation =
                        venue === 'St Ives' ? 'ST_IVES' : 'BELROSE';
                    const finalTimeSlot: timeSlotParams = {
                        date: finalMoment.toDate(),
                        location: dbLocation,
                        court: i,
                    };

                    weekRequestData.push(finalTimeSlot);
                });
            }
        });

        const dataWithIds = await uploadTimeSlots(weekRequestData);
        setDbTimeSlots(dataWithIds);
        setModifiedTimeSlots(dataWithIds);
        if (dataWithIds.length > 0) {
            setLoading(false);
        }
        getAdultGames();
    };

    const getAdultGames = () => {
        const minDate = getWeekDateFromTerm(currentTerm, currentWeekTab, false);
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
                    setAdultsRows(
                        adultsTimeSlots.map((timeSlot) => ({
                            time: moment(timeSlot.date).format('h:mm A'),
                            court: timeSlot.court,
                            venue:
                                timeSlot.location === 'ST_IVES'
                                    ? 'St Ives'
                                    : 'Belrose',
                            id: timeSlot.id ? timeSlot.id : '',
                        })),
                    );
                }
            });
    };

    useEffect(() => {
        upsert();
    }, [currentTerm, currentWeekTab]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const { weeks } = Terms2025[currentTerm];

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

    return (
        <PageContainer>
            <PageTitle text="Term Setup" />
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
            <div className="pt-2">
                {/* <div className="pt-4 flex items-center font-bold w-1/3">
                    <p>Adults Competition</p>
                    <Switch
                        checked={isSundayComp}
                        onChange={(e) =>
                            setIsSundayComp(e.target.checked)
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
                    <p>Sunday Competition</p>
                </div>
                <hr className="h-[0.5px] w-full my-4 bg-gray-300 border-0" /> */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={currentWeekTab}
                            onChange={(_, newValue) =>
                                setCurrentWeekTab(newValue)
                            }
                            aria-label="Week Tabs"
                        >
                            {Array.from({ length: weeks }, (_, i) => (
                                <Tab key={i} label={`Week ${i + 1}`} />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="pt-4">
                        {Array.from({ length: weeks }, (_, i) => (
                            <WeekTabPanel
                                key={i}
                                term={currentTerm}
                                value={currentWeekTab}
                                index={i}
                                ageGroups={ageGroups}
                                dbTimeSlots={dbTimeSlots}
                                setModifiedTimeSlots={setModifiedTimeSlots}
                                modifiedTimeSlots={modifiedTimeSlots}
                                isSundayComp={isSundayComp}
                                setIsSundayComp={setIsSundayComp}
                                adultsRows={adultsRows}
                                setAdultsRows={setAdultsRows}
                                isLoading={loading}
                            />
                        ))}
                    </div>
                </Box>
            </div>
            <div className="w-1/3 pt-4 pb-16">
                <div className="w-1/2 flex flex-col pb-8">
                    <Button
                        variant="contained"
                        onClick={() => setCopyToAllWeeksConfirmation(true)}
                    >
                        Copy to all weeks
                    </Button>
                </div>
                <FormCancelSave
                    cancelButtonDisabled={checkIfTimeSlotsEqual()}
                    saveButtonDisabled={checkIfTimeSlotsEqual()}
                    onCancelClick={() => {
                        setModifiedTimeSlots(dbTimeSlots);
                    }}
                    onSaveClick={uploadChanges}
                />
            </div>
            {copyToAllWeeksConfirmation ? (
                <div className="pt-4">
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                            <h2 className="text-xl font-semibold mb-4">
                                Copy to all weeks?
                            </h2>
                            <div>
                                <p className="text-gray-600 pt-4 mb-4">
                                    This will override all future events for
                                    this term. This action cannot be undone.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() =>
                                            setCopyToAllWeeksConfirmation(false)
                                        }
                                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        onClick={() => {
                                            copyToAllWeeks();
                                        }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </PageContainer>
    );
};

export default TermSetup;
