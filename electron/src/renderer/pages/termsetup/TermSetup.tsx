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

type WeekTabPanelProps = {
    index: number;
    value: number;
    term: number;
    ageGroups: AgeGroupDataResponse[];
};

type timeSlotParams = {
    date: Date;
    location: string;
    court: number;
    id?: string;
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

const uploadTimeSlots = (timeSlotParams: timeSlotParams[]) => {
    // Takes in timeSlotParams, uploads them to the database,
    // appends the id to the timeSlotParams and returns the updated timeSlotParams.
    const timeSlotsWithIds: timeSlotParams[] = [];

    timeSlotParams.forEach((timeSlot) => {
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
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, timeSlotRequest)
            .then((data: unknown) => {
                timeSlotsWithIds.push({
                    ...timeSlot,
                    id: (data as { id: string }).id,
                });
            })
            .catch((error: Error) => {
                console.error(
                    `Error upserting time slot for court ${timeSlot.court}:`,
                    error,
                );
            });
    });

    console.log(timeSlotsWithIds);

    return timeSlotsWithIds;
};

const renderSelectInput = (
    timeSlotId: string,
    ageGroups: AgeGroupDataResponse[],
) => {
    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel id={`select-label-${timeSlotId}`}>Event</InputLabel>
            <Select
                labelId={`select-label-${timeSlotId}`}
                id={`select-${timeSlotId}`}
                value=""
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
) => {
    const tempTimeSlots: timeSlotParams[] = [];

    const handleTimeSlot = (
        timeSlot: number,
        date: Date,
        location: string,
        court: number,
    ) => {
        const time = moment(hourSlots[timeSlot].time, 'hha');
        let finalMoment = moment(date);
        finalMoment = finalMoment.set({
            hour: time.hours(),
            minute: time.minutes(),
            second: 0,
        });

        const dbLocation = location === 'St Ives' ? 'ST_IVES' : 'BELROSE';
        const finalTimeSlot: timeSlotParams = {
            date: finalMoment.toDate(),
            location: dbLocation,
            court,
        };

        tempTimeSlots.push(finalTimeSlot);
        return null;
    };

    const table = (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell>Court</TableCell>
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
                                    {renderSelectInput('e', ageGroups)}
                                    {handleTimeSlot(
                                        hour.slot,
                                        getWeekDateFromTerm(term, week),
                                        venue,
                                        i + 1,
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    uploadTimeSlots(tempTimeSlots);

    return table;
};

const WeekTabPanel = (props: WeekTabPanelProps) => {
    const { value, index, term, ageGroups } = props;

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
                    <div className="">
                        <h3 className="text-xl font-bold">St Ives</h3>
                        {renderWeekTable(term, index, 'St Ives', ageGroups)}
                    </div>
                    <div className="pt-8">
                        <h3 className="text-xl font-bold">Belrose</h3>
                        {renderWeekTable(term, index, 'Belrose', ageGroups)}
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

    const [dbTimeSlots, setDbTimeSlots] = useState<timeSlotParams[]>([]); // For storing fetched time slots

    useEffect(() => {
        // Fetches or creates all time slots for the current week and term.
        // Stores into dbTimeSlots.
        // https://github.com/prisma/docs/issues/640
        // https://www.prisma.io/docs/concepts/components/prisma-client/crud#upsert

        const upsert = () => {
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
            const dataWithIds = uploadTimeSlots(weekRequestData);
            setDbTimeSlots(dataWithIds);
        };

        upsert();
    }, [currentTerm, currentWeekTab]);

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
                            <Tab label="Week 1" />
                            <Tab label="Week 2" />
                            <Tab label="Week 3" />
                            <Tab label="Week 4" />
                        </Tabs>
                    </Box>
                    <div className="pt-4">
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={0}
                            ageGroups={ageGroups}
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={1}
                            ageGroups={ageGroups}
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={2}
                            ageGroups={ageGroups}
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={3}
                            ageGroups={ageGroups}
                        />
                    </div>
                </Box>
            </div>
            <button type="button" onClick={printAllTimeSlots}>
                Print All Time Slots
            </button>
        </PageContainer>
    );
};

export default TermSetup;
