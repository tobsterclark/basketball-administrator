import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import {
    Box,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
} from '@mui/material';
import { useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps } from '../players/components/Types';
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

const venueCourts = {
    'St Ives': 3,
    Belrose: 2,
};

const checkIfTimeSlotExists = (date: Date, location: string, court: number) => {
    const timeSlotRequest: PrismaCall = {
        model: ModelName.timeslot,
        operation: CrudOperations.findUnique,
        data: {
            where: {
                location_date_court: {
                    location,
                    date,
                    court,
                },
            },
        },
    };

    window.electron.ipcRenderer
        .invoke(IpcChannels.PrismaClient, timeSlotRequest)
        .then((data: unknown) => {
            console.log(data);
        });
};

const getTimeSlotId = (
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
    checkIfTimeSlotExists(finalMoment.toDate(), dbLocation, court);
    // console.log(finalMoment.toDate(), location, court);
    // need to get into a datetime formate YYYY-MM-DDTHH:MM:SS
    //                                e.g. 2024-02-09T09:00:00
    return <p />;
};

const renderDropDown = () => (
    <select name="venue" id="venue">
        <option value="St Ives">St Ives</option>
        <option value="Belrose">Belrose</option>
    </select>
);

const getWeekDate = (term: number, week: number) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7,
    );
    // return 'x;';
    return <Moment format="dddd[,] MMMM Do YYYY">{newDate}</Moment>;
    // return moment(newDate).format('dddd[,] MMMM Do YYYY');
};

const renderWeekTable = (
    term: number,
    week: number,
    venue: keyof typeof venueCourts,
) => (
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
                                {renderDropDown()}
                                {getTimeSlotId(
                                    hour.slot,
                                    Terms2025[term].date,
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

const WeekTabPanel = (props: WeekTabPanelProps) => {
    const { value, index, term } = props;

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
                        {renderWeekTable(term, index, 'St Ives')}
                    </div>
                    <div className="pt-8">
                        <h3 className="text-xl font-bold">Belrose</h3>
                        {renderWeekTable(term, index, 'Belrose')}
                    </div>
                </div>
            )}
        </div>
    );
};

export const TermSetup = (props: PlayerDataProps) => {
    // const { ageGroups } = props;

    const [currentWeekTab, setCurrentWeekTab] = useState(0);
    const [currentTerm, setCurrentTerm] = useState(0);

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
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={1}
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={2}
                        />
                        <WeekTabPanel
                            term={0}
                            value={currentWeekTab}
                            index={3}
                        />
                    </div>
                </Box>
            </div>
        </PageContainer>
    );
};

export default TermSetup;
