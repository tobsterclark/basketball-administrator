/* eslint-disable import/no-named-as-default */
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
    AppointmentEvent,
    TeamDataResponse,
    Game
} from './pages/players/components/Types';
import { IpcChannels } from '../general/IpcChannels';
import Roster from './pages/roster/Roster';
import TermSetup from './pages/termsetup/TermSetup';
import GameSetup from './pages/gamesetup/GameSetup';
import GameResults from './pages/gameresults/GameResults';
import AgeGroups from './pages/agegroups/AgeGroups';
import Runsheets from './pages/roster/Runsheets';

const App = () => {
    // TODO: get players here as well
    //       these values should be state objects and so when a page needs to re-fetch something it will
    //       replicate that across the app
    const [ageGroups, setAgeGroups] = useState<AgeGroupDataResponse[]>([]);
    const [teams, setTeams] = useState<TeamDataResponse[]>([]);
    const [allEvents, setAllEvents] = useState<AppointmentEvent[]>([]);
    const [allGames, setAllGames] = useState<Game[]>([]);

    // TODO: Do this in a separate function and use an app wide state instead of passing to components
    // Gets all age groups and team names for dropdowns on mount, ignores duplicates

    const getAgeGroups = () => {
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
                try {
                    const sorted = ages.sort((a, b) => {
                        const parseYear = (displayName: string) => {
                            const parts = displayName.split(' ');
                            if (parts.length > 1) {
                                const yearPart = parts[1].split('/')[0];
                                return parseInt(yearPart, 10);
                            }
                            return 0; // Default value for non-matching displayNames
                        };
                    
                        const aYear = a.displayName ? parseYear(a.displayName) : 0;
                        const bYear = b.displayName ? parseYear(b.displayName) : 0;
                        return aYear - bYear;
                    });
                    setAgeGroups(sorted);
                } catch (e) {
                    console.error('Error sorting age groups', e);
                    console.error(ages);
                    setAgeGroups(ages);
                }
            });

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, teamNamesRequest)
            .then((data) => {
                const dataAllTeamNames = data as TeamDataResponse[];
                setTeams(dataAllTeamNames);
            });

    }
    useEffect(() => {
        getAgeGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inlet />}>
                    <Route index element={<Dashboard />} />
                    <Route path="results" element={<GameResults ageGroups={ageGroups} teams={teams} />} />
                    <Route path="roster" element={<Roster {...{ ageGroups, allEvents, setAllEvents, allGames, setAllGames }} />} />
                    <Route path="runsheets" element={<Runsheets {...{ ageGroups, allEvents, setAllEvents, allGames, setAllGames }} />} />
                    <Route
                        path="term-setup"
                        element={<TermSetup ageGroups={ageGroups} />}
                    />
                    <Route
                        path="game-setup"
                        element={<GameSetup ageGroups={ageGroups} />}
                    />
                    <Route
                        path="players"
                        element={
                            <Players teams={teams} ageGroups={ageGroups} />
                        }
                    />
                    <Route path="teams" element={<Teams />} />
                    <Route
                        path="agegroups"
                        element={
                            <AgeGroups ageGroups={ageGroups} getAgeGroups={getAgeGroups} />
                        }
                    />
                </Route>
            </Routes>
            <ToastContainer autoClose={3500} />
        </Router>
    );
};

export default App;
