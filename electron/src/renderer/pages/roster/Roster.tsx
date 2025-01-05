import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';

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

type Event = {
    title: string;
    startDate: Date;
    endDate: Date;
    id: string;
    location: string;
};

const Roster = () => {
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);

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
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

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
            };
        });

        setAllEvents(events);
        console.log('events:');
        console.log(events);
    };

    return (
        <PageContainer>
            <PageTitle text="Roster" />
            <Button onClick={() => transformGamesToEvents(allGames)}>
                Transform
            </Button>
            <div className="pt-4">{/* <Scheduler data={allEvents} /> */}</div>
        </PageContainer>
    );
};

export default Roster;
