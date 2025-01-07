import { useEffect, useState } from 'react';
import { Button, styled } from '@mui/material';
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    Toolbar,
    Resources,
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

enum Location {
    ST_IVES = 'ST_IVES',
    BELROSE = 'BELROSE',
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

const CustomAppointment = ({ children, data, ...restProps }: { children: React.ReactNode, data: any }) => (
    <Appointments.Appointment {...restProps} className="!bg-transparent !cursor-default" data={data} onClick={() => {}} draggable={false} resources={[]}>
        <div className={`text-white px-1 py-1 ${data.location === Location.ST_IVES ? 'bg-blue-500' : 'bg-green-500'}`}>
            <div className='font-bold'>{data.title}</div>
            <div>{formatTime(data.startDate)} - {formatTime(data.endDate)}</div>
            <div>{locationToText(data.location)}</div>
            <div>Court {data.court}</div>
        </div>
    </Appointments.Appointment>
);


const Roster = () => {
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);

    const transformGamesToEvents = (games: Game[]) => {
        const events: Event[] = games.map((game: Game) => {
            const startDate = new Date(game.timeslot.date);
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);
    
            return {
                title: `${game.lightTeam.name} vs ${game.darkTeam.name}`,
                startDate,
                endDate,
                id: game.id,
                location: game.timeslot.location,
                court: game.timeslot.court,
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
                where: {
                    OR: [
                        {
                            lightTeam: {
                                ageGroupId:
                                    '2e67d5b8-ee1f-499c-bab6-f59ccd9f877c',
                            },
                        },
                        {
                            darkTeam: {
                                ageGroupId:
                                    '2e67d5b8-ee1f-499c-bab6-f59ccd9f877c',
                            },
                        },
                    ],
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
            <Button onClick={() => transformGamesToEvents(allGames)}>
                Transform
            </Button>
            <div className="pt-4">{/* <Scheduler data={allEvents} /> */}</div>
            <Scheduler data={allEvents}>
                
                <ViewState defaultCurrentDate={new Date()} />
                <DayView startDayHour={8} endDayHour={16} />
                <Toolbar />
                <DateNavigator />
                <Appointments appointmentComponent={CustomAppointment}/>
                <AppointmentTooltip />
                <Resources data={testResources} mainResourceName='court' />
            </Scheduler>
        </PageContainer>
    );
};

export default Roster;
