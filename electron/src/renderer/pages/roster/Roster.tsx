import { Scheduler } from '@aldabil/react-scheduler';
import { useEffect, useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';

const Roster = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const gamesRequest: PrismaCall = {
            model: ModelName.timeslot,
            operation: CrudOperations.findMany,
            data: {
                // include: {
                //     lightTeam: true,
                //     darkTeam: true,
                //     timeslot: true,
                // },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, gamesRequest)
            .then((data) => {
                console.log(data);
            });
    }, []);

    return (
        <PageContainer>
            <PageTitle text="Roster" />
            <div className="pt-4">
                <Scheduler
                    view="week"
                    events={[
                        {
                            event_id: 1,
                            title: 'AND1 v Sharks',
                            subtitle: 'Court 1',
                            start: new Date('2024/10/2 09:30'),
                            end: new Date('2024/10/2 10:30'),
                        },
                        {
                            event_id: 2,
                            title: 'Ballerz v Boomers',
                            subtitle: 'Court 4',
                            start: new Date('2024/10/4 10:00'),
                            end: new Date('2024/10/4 11:00'),
                        },
                    ]}
                />
            </div>
        </PageContainer>
    );
};

export default Roster;
