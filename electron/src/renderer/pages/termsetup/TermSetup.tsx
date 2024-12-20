import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
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
import moment from 'moment';
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
];

const Terms2025 = [
    {
        date: new Date(2025, 1, 9), // Sunday Week 1, Term 1, 2025
        weeks: 10,
    },
    {
        date: new Date(2025, 4, 4), // Sunday Week 1, Term 2, 2025
        weeks: 10,
    },
    {
        date: new Date(2025, 6, 27), // Sunday Week 1, Term 3, 2025
        weeks: 10,
    },
    {
        date: new Date(2025, 9, 19), // Sunday Week 1, Term 4, 2025
        weeks: 10,
    },
];

const getWeekDateFromTerm = (term: number, week: number) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7,
    );
    return newDate;
};

const venueCourts = {
    'St Ives': 3,
    Belrose: 2,
};

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
                        {ageGroup.displayName}
                    </MenuItem>
                ))}
                <MenuItem value="noEvent">No Event</MenuItem>
            </Select>
        </FormControl>
    );
};

const getWeekDate = (term: number, week: number) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7,
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
) => {
    const currentDate = getWeekDateFromTerm(term, week);

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
    return table;
};

const WeekTabPanel = (
    props: WeekTabPanelProps & {
        setModifiedTimeSlots: React.Dispatch<
            React.SetStateAction<timeSlotParams[]>
        >;
        modifiedTimeSlots: timeSlotParams[];
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
    } = props;

    const stIvesTimeSlots = dbTimeSlots.filter(
        (timeSlot) => timeSlot.location === 'ST_IVES',
    );

    const belroseTimeSlots = dbTimeSlots.filter(
        (timeSlot) => timeSlot.location === 'BELROSE',
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
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const TermSetup = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [currentWeekTab, setCurrentWeekTab] = useState(0); // 0-indexed
    const [currentTerm, setCurrentTerm] = useState(0); // 0-3
    const [loading, setLoading] = useState(true);

    const [dbTimeSlots, setDbTimeSlots] = useState<timeSlotParams[]>([]); // For storing fetched time slots
    const [modifiedTimeSlots, setModifiedTimeSlots] = useState<
        timeSlotParams[]
    >([]);

    const printDbTimeSlots = () => {
        console.log('DB Time Slots:');
        console.log(dbTimeSlots);
    };

    const uploadChanges = () => {
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

        const promises = timeSlotsToUpdate.map((timeSlot) => {
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

    useEffect(() => {
        // Fetches or creates all time slots for the current week and term.
        // Stores into dbTimeSlots.
        // https://github.com/prisma/docs/issues/640
        // https://www.prisma.io/docs/concepts/components/prisma-client/crud#upsert

        const upsert = async () => {
            const dateForRequest = getWeekDateFromTerm(
                currentTerm,
                currentWeekTab,
            );
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
            console.log('Week Request Data:');
            console.log(weekRequestData);

            const dataWithIds = await uploadTimeSlots(weekRequestData);
            setDbTimeSlots(dataWithIds);
            setModifiedTimeSlots(dataWithIds);
            if (dataWithIds.length > 0) {
                setLoading(false);
            }
        };

        upsert();
    }, [currentTerm, currentWeekTab]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { weeks } = Terms2025[currentTerm];

    return (
        <PageContainer>
            <PageTitle text="Term Setup" />
            <div className="text-xl font-bold float-right flex gap-2">
                <ArrowLeftCircleIcon className="h-8 w-8" />
                <p>Term 1 2025</p>
                <ArrowRightCircleIcon className="h-8 w-8" />
            </div>
            <div className="pt-6">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={currentWeekTab}
                            onChange={(_, newValue) =>
                                setCurrentWeekTab(newValue)
                            }
                            aria-label="Week Tabs"
                        >
                            {/* <Tab label="Week 1" />
                            <Tab label="Week 2" />
                            <Tab label="Week 3" />
                            <Tab label="Week 4" /> */}
                            {Array.from({ length: weeks }, (_, i) => (
                                <Tab key={i} label={`Week ${i + 1}`} />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="pt-4">
                        {/* <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={0}
                            ageGroups={ageGroups}
                            dbTimeSlots={dbTimeSlots}
                            setModifiedTimeSlots={setModifiedTimeSlots}
                            modifiedTimeSlots={modifiedTimeSlots}
                        /> */}
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
                            />
                        ))}
                    </div>
                </Box>
            </div>
            <div className="w-1/3 pt-4">
                <div className="w-1/2 flex flex-col pb-8">
                    {/* <button
                        type="button"
                        className="bg-red-400 hover:bg-red-500 text-slate-600 font-semibold py-2 px-4 rounded disabled:text-slate-400 disabled:hover:bg-slate-200 disabled:cursor-not-allowed"
                    >
                        Copy to all weeks
                    </button> */}
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
            {/* <button type="button" onClick={printAllTimeSlots}>
                Print All Time Slots
            </button>
            <button type="button" onClick={printDbTimeSlots}>
                Print DB Time Slots
            </button>
            <button type="button" onClick={checkIfTimeSlotsEqual}>
                check if time slots equal
            </button> */}
        </PageContainer>
    );
};

export default TermSetup;
