import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    Toolbar,
    Resources,
    WeekView,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { TodayButton, ViewState } from '@devexpress/dx-react-scheduler';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';
import Terms2025 from '../data/Terms';
import React from 'react';
import { PlayerDataProps } from '../players/components/Types';
import { toast } from 'react-toastify';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/24/solid';

enum Location {
    ST_IVES = 'ST_IVES',
    BELROSE = 'BELROSE',
}

const toTitleCase = (str: any) => {
    return str.toLowerCase().split(' ').map((word: any) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

const locationToText = (location: Location) => {
    switch (location) {
        case Location.ST_IVES:
            return 'St Ives';
        case Location.BELROSE:
            return 'Belrose';
    }
}

const formatTime = (date: Date) => {
    // format time in <HH:mm> AM/PM format
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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

type Event = {
    title: string;
    startDate: Date;
    endDate: Date;
    id: string;
    location: string;
    court: number;
    ageGroup: string;
};

const courtResources = [
    {
        text: "Court 1",
        id: 1,
        color: "#DBB1BC"
    },
    {
        text: "Court 2",
        id: 2,
        color: "#6B0F1A"
    },
    {
        text: "Court 3",
        id: 3,
        color: "#212D40"
    }
];

const venueResources = [
    {
        text: "St Ives",
        id: Location.ST_IVES,
        color: "#64b5f6"
    },
    {
        text: "Belrose",
        id: Location.BELROSE,
        color: "#22c55e"
    }
];

const ageGroupResources = [
    {
        text: "Years 3/4",
        id: "Years 3/4",
        color: "#F7EBEC"
    },
    {
        text: "Years 5/6",
        id: "Years 5/6",
        color: "#DDBDD5"
    },
    {
        text: "Years 7/8",
        id: "Years 7/8",
        color: "#AC9FBB"
    },
    {
        text: "Years 9/12",
        id: "Years 9/12",
        color: "#59656F"
    }
]

const appointmentResources = [
    {
        fieldName: "location",
        title: "location",
        instances: venueResources
    },
    {
        fieldName: "court",
        title: "court",
        instances: courtResources
    },
    {
        fieldName: "ageGroup",
        title: "ageGroup",
        instances: ageGroupResources
    }
];

const downloadRunsheet = async (gameId: string) => {
    const url = `http://127.0.0.1:5001/runsheetcontrol/australia-southeast1/generaterunsheets?gameIds=${gameId}`;
    const defaultFileName = `scoresheet-${gameId}.pdf`;

    try {
        const result = await window.electron.ipcRenderer.invoke('SavePDF', { url, defaultFileName });
        if (result.success) {
            toast.success(`PDF saved successfully at ${result.filePath}`);
        } else {
            toast.error(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error saving PDF:', error);
        toast.error('An error occurred while saving the PDF.');
    }
};

const downloadMultipleRunsheets = async (gameIds: string[]) => {
    const url = `http://127.0.0.1:5001/runsheetcontrol/australia-southeast1/generaterunsheets?gameIds=[${gameIds.join(',')}]`;
    const defaultFileName = `scoresheets.zip`;

    try {
        const result = await window.electron.ipcRenderer.invoke('SaveZIP', { url, defaultFileName });
        if (result.success) {
            toast.success(`ZIP saved successfully at ${result.filePath}`);
        } else {
            toast.error(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error saving ZIP:');
        console.error(error);
        toast.error('An error occurred while saving the ZIP.');
    }
};

const CustomAppointment = ({ children, data, ...restProps }: { children: React.ReactNode, data: any }) => (
    <Appointments.Appointment {...restProps} className="!bg-transparent !cursor-default" data={data}  draggable={false} resources={[]}>
        <div className={`text-white px-1 py-1 ${data.location === Location.ST_IVES ? 'bg-blue-500' : 'bg-green-500'}`}>
            <div className='font-bold'>{data.title}</div>
            <div>{formatTime(data.startDate)} - {formatTime(data.endDate)}</div>
            <div>{locationToText(data.location)} - Court {data.court}</div>
            <div>{data.ageGroup}</div>
        </div>
    </Appointments.Appointment>
);

const getCurrentTermAndWeek = (currentDate: Date) => {
    for (let i = 0; i < Terms2025.length; i++) {
        const term = Terms2025[i];
        const nextTerm = Terms2025[i + 1];

        if (currentDate >= term.date && (!nextTerm || currentDate < nextTerm.date)) {
            const weekNumber = Math.floor(
                (currentDate.getTime() - term.date.getTime()) / (7 * 24 * 60 * 60 * 1000)
            ) + 1;
            
            if (weekNumber <= term.weeks) {
                return { term: i + 1, week: weekNumber };
            }
        }
    }
    return null; // Outside of term dates
};

const CustomToolbar = ({ currentDate, ...restProps }: { currentDate: Date, children?: React.ReactNode }) => {
    const termAndWeek = useMemo(() => getCurrentTermAndWeek(currentDate), [currentDate]);

    return (
        <Toolbar.Root {...restProps}>
            <div className="flex items-center justify-between px-4 py-2">
                {/* Original Toolbar Functionality */}
                {restProps.children}

                {/* Custom Text */}
                {termAndWeek ? (
                    <div className="text-sm font-bold text-gray-700">
                        Term {termAndWeek.term}, Week {termAndWeek.week}
                    </div>
                ) : (
                    <div className="text-sm font-bold text-gray-700">
                        Outside of term dates
                    </div>
                )}
            </div>
        </Toolbar.Root>
    );
};

const CustomTooltipHeader = ({ appointmentData, ...restProps }: { appointmentData?: any, [key: string]: any }) => (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData} showOpenButton showCloseButton showDeleteButton commandButtonIds={['a']} commandButtonComponent={() => null}>
        <Button
            variant="contained"
            color="primary"
            onClick={async () => await downloadRunsheet(appointmentData.id)}
        >
            Download Runsheet
        </Button>
        <p>{appointmentData.id}</p>
    </AppointmentTooltip.Header>
);

const Roster = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = React.useState(new Date(2025, 1, 9));

    const getGameCountForDate = (date: Date) => {
        return allGames.filter((game) => {
            const gameDate = new Date(game.timeslot.date);
            return gameDate.toDateString() === date.toDateString();
        }).length;
    };

    const getGameIdsForDate = (date: Date): string[] => {
        return allGames.filter((game) => {
            const gameDate = new Date(game.timeslot.date);
            return gameDate.toDateString() === date.toDateString();
        }).map((game) => game.id);
    }

    const transformGamesToEvents = (games: Game[]) => {
        const events: Event[] = games.map((game: Game) => {
            const startDate = new Date(game.timeslot.date);
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);
            const ageGroupIdStr: string = game.lightTeam.ageGroupId;
            const ageGroupName = ageGroups.find((ageGroup) => ageGroup.id === ageGroupIdStr)?.displayName;
            return {
                title: `${game.lightTeam.name} vs ${game.darkTeam.name}`,
                startDate,
                endDate,
                id: game.id,
                location: game.timeslot.location,
                court: game.timeslot.court,
                ageGroup: toTitleCase(ageGroupName),
            };
        });
    
        // Sort events by location first (so st ives is first, belrose is second), then sort by court number
        events.sort((a, b) => {
            if (a.location < b.location) return 1;
            if (a.location > b.location) return -1;
            if (a.court < b.court) return -1;
            if (a.court > b.court) return 1;
            return 0;
        });
    
        setAllEvents(events);
    };

    useEffect(() => {
        const gamesRequest: PrismaCall = {
            model: ModelName.game,
            operation: CrudOperations.findMany,
            data: {
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
                setAllGames(data);
                transformGamesToEvents(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <PageContainer>
            <PageTitle text="Roster" />
            <div className='flex gap-6 h-full'>
                <div className='w-3/5'>
                    <Scheduler data={allEvents}>                
                        <ViewState defaultCurrentDate={new Date(2025, 1, 9)} currentDate={currentDate} onCurrentDateChange={setCurrentDate}  />
                        <WeekView excludedDays={[1, 2, 3, 4, 5, 6]} startDayHour={8} endDayHour={16} />
                        <Toolbar rootComponent={(props) => (
                            <CustomToolbar currentDate={currentDate} {...props} />
                        )} />
                        <DateNavigator />
                        <Appointments appointmentComponent={CustomAppointment}/>
                        <AppointmentTooltip showOpenButton headerComponent={CustomTooltipHeader} />
                        <AppointmentForm />
                        <Resources data={appointmentResources} mainResourceName='location' />
                    </Scheduler>
                </div>
                <div className='inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 '></div>
                <div className='flex-col pl-8 justify-center w-2/5 pt-16'>
                    <h2 className='text-lg text-slate-800 font-bold underline underline-offset-4 decoration-4 decoration-dustyBlue'>
                        {getCurrentTermAndWeek(currentDate)?.term !== undefined ? 
                            (`Manage Games for Term ${getCurrentTermAndWeek(currentDate)?.term}, Week ${getCurrentTermAndWeek(currentDate)?.week}`) : 
                            ('Manage Games')}
                    </h2>
                    <p className='pt-4 pb-8'>{getGameCountForDate(currentDate)} games across all venues and courts.</p>
                    <Button variant="contained" size="medium" className='flex items-center' onClick={async () => await downloadMultipleRunsheets(getGameIdsForDate(currentDate))}>
                        Download Scoresheets 
                        <ArrowDownOnSquareStackIcon className='h-6 ml-2' />
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
};

export default Roster;
