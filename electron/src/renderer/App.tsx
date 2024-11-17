import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inlet from './Inlet';
import Dashboard from './pages/Dashboard';
import Players from './pages/players/Players';
import Teams from './pages/teams/Teams';
import { CrudOperations, ModelName, PrismaCall } from '../general/prismaTypes';
import {
    AgeGroupDataResponse,
    TeamDataResponse,
} from './pages/players/components/Types';
import { IpcChannels } from '../general/IpcChannels';
import Roster from './pages/roster/Roster';
import TermSetup from './pages/termsetup/TermSetup';

const App = () => {
    // TODO: get players here as well
    //       these values should be state objects and so when a page needs to re-fetch something it will
    //       replicate that across the app
    const [ageGroups, setAgeGroups] = useState<AgeGroupDataResponse[]>([]);
    const [teams, setTeams] = useState<TeamDataResponse[]>([]);

    // TODO: Do this in a separate function and use an app wide state instead of passing to components
    // Gets all age groups and team names for dropdowns on mount, ignores duplicates
    useEffect(() => {
        const ageGroupRequest: PrismaCall = {
            model: ModelName.ageGroup,
            operation: CrudOperations.findMany,
        };

        const teamNamesRequest: PrismaCall = {
            model: ModelName.team,
            operation: CrudOperations.findMany,
            data: {
                orderBy: { name: 'asc' },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, ageGroupRequest)
            .then((data) => {
                const ages = data as AgeGroupDataResponse[];
                setAgeGroups(ages);
            });

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, teamNamesRequest)
            .then((data) => {
                const dataAllTeamNames = data as TeamDataResponse[];
                setTeams(dataAllTeamNames);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="roster" element={<Roster />} />
                    <Route
                        path="term-setup"
                        element={<TermSetup ageGroups={ageGroups} />}
                    />
                    <Route
                        path="players"
                        element={
                            <Players teams={teams} ageGroups={ageGroups} />
                        }
                    />
                    <Route path="teams" element={<Teams />} />
                </Route>
            </Routes>
            <ToastContainer autoClose={3500} />
        </Router>
    );
};

export default App;
