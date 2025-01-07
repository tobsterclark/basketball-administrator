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

const courtData = [
    {
        text: "Court 1",
        id: 1,
        color: "#cb6bb2"
    },
    {
        text: "Court 2",
        id: 2,
        color: "#56ca85"
    },
    {
        text: "Court 3",
        id: 3,
        color: "#1e90ff"
    }
];

const testResources = [
    {
        fieldName: "court",
        title: "court",
        instances: courtData
    }
];

const ageGroupColours = {
    "Years 3-4": "#cb6bb2",
    "Years 5-6": "#56ca85",
    "Years 7-8": "#1e90ff",
    "Years 9-12": "#ffaa66",
    "": "#ff6666"
}

const CustomAppointment = ({ children, data, ...restProps }: { children: React.ReactNode, data: any }) => (
    <Appointments.Appointment {...restProps} className="!bg-transparent !cursor-default" data={data} onClick={() => {}} draggable={false} resources={[]}>
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

const Roster = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = React.useState(new Date());

    console.log('ageGroups":');
    console.log(ageGroups);

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
                // where: {
                //     OR: [
                //         {
                //             lightTeam: {
                //                 ageGroupId:
                //                     '2e67d5b8-ee1f-499c-bab6-f59ccd9f877c',
                //             },
                //         },
                //         {
                //             darkTeam: {
                //                 ageGroupId:
                //                     '2e67d5b8-ee1f-499c-bab6-f59ccd9f877c',
                //             },
                //         },
                //     ],
                // },
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
                console.log(data);
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
            <Scheduler data={allEvents}>                
                <ViewState defaultCurrentDate={new Date()} currentDate={currentDate} onCurrentDateChange={setCurrentDate}  />
                <WeekView excludedDays={[1, 2, 4, 5, 6]} startDayHour={8} endDayHour={16} />
                <Toolbar rootComponent={(props) => (
                    <CustomToolbar currentDate={currentDate} {...props} />
                )} />
                <DateNavigator />
                <Appointments appointmentComponent={CustomAppointment}/>
                <AppointmentTooltip />
                <Resources data={testResources} mainResourceName='court' />
            </Scheduler>
        </PageContainer>
    );
};

export default Roster;
