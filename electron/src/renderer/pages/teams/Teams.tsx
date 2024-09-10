import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import SectionTitle from '../../ui_components/SectionTitle';
import TeamMembers from './components/TeamMembers';
import {
    teamMemberRowsTEMP,
    teamEditorColumns,
    standingsRowsTEMP,
    standingsColumns,
    recentGamesRowsTEMP,
    recentGamesColumns,
} from './components/FakeData';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';
import { AgeGroupDataResponse, TeamCache } from './components/Types';
import { TeamSearch } from './components/TeamSearch';

const Teams = () => {
    const [cachedTeams, setCachedTeams] = useState<Map<string, TeamCache>>(
        new Map(),
    );

    const [ageGroups, setAgeGroups] = useState<AgeGroupDataResponse[]>([]);

    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [addTeamDisabled, setAddTeamDisabled] = useState<boolean>(false);
    const [editingDisabled, setEditingDisabled] = useState<boolean>(true);

    // Fetches all ageGroups from DB and stores into the ageGroups state
    useEffect(() => {
        const allAgeGroupsRequest: PrismaCall = {
            model: ModelName.ageGroup,
            operation: CrudOperations.findMany,
            data: {
                orderBy: { displayName: 'asc' },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, allAgeGroupsRequest)
            .then((data) => {
                const fetchedAgeGroups = data as AgeGroupDataResponse[];
                setAgeGroups(fetchedAgeGroups);
            });
    }, []);

    // Fetches all teams from DB and stores into the cachedTeams map
    useEffect(() => {
        const allTeamsRequest: PrismaCall = {
            model: ModelName.team,
            operation: CrudOperations.findMany,
            data: {
                orderBy: { name: 'asc' },
                include: { ageGroup: true },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, allTeamsRequest)
            .then((data) => {
                const fetchedTeams = data as TeamCache[];
                setCachedTeams((currentCache) => {
                    const newCache = new Map(currentCache);
                    fetchedTeams.forEach((team) => {
                        newCache.set(team.id, team);
                    });
                    return newCache;
                });
            });
    }, []);

    const handleAddTeamButtonPress = () => {
        console.log('Add team button pressed');
    };

    useEffect(() => {
        console.log(selectedTeam);
    }, [selectedTeam]);

    const selectedTeamName = cachedTeams.get(selectedTeam)?.name || 'teamName';
    const selectedTeamAgeGroupId = cachedTeams.get(selectedTeam)?.ageGroupId;
    const selectedTeamAgeGroup = ageGroups.find(
        (ageGroup) => ageGroup.id === selectedTeamAgeGroupId,
    )?.displayName;
    console.log(
        `selectedTeamName: ${selectedTeamName}; selectedTeamAgeGroup: ${selectedTeamAgeGroup}`,
    );

    return (
        <PageContainer>
            <PageTitle text="Team Management" />
            <TeamSearch // TODO: ADD VARIABLES IMPLEMENT SEARCH BOX
                setSelectedTeam={setSelectedTeam}
                selectedTeam={selectedTeam}
                addTeamDisabled={addTeamDisabled}
                handleAddTeamButtonPress={handleAddTeamButtonPress}
                cachedTeams={cachedTeams}
            />

            <div className="flex flex-row gap-12 justify-between pt-2">
                {/* Team editor */}
                <div className="w-1/4">
                    <button
                        type="button"
                        disabled={editingDisabled}
                        className="flex flex-row gap-4 hover:bg-gray-100"
                    >
                        <SectionTitle text={selectedTeamName} />
                        <PencilSquareIcon className="h-6 w-6 inline-block mt-1" />
                    </button>

                    {/* Age and Division drop-down */}
                    <div className="flex flex-row gap-4 pt-6">
                        <div className="w-full">
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    disabled={editingDisabled}
                                >
                                    Age Group
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={editingDisabled}
                                    value={
                                        selectedTeamAgeGroup === undefined
                                            ? ''
                                            : selectedTeamAgeGroupId
                                    }
                                    label="Age Group"
                                >
                                    {ageGroups.map((ageGroup) => (
                                        <MenuItem
                                            key={ageGroup.id}
                                            value={ageGroup.id}
                                        >
                                            {ageGroup.displayName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Removing for now; unneeded */}
                        {/* <div className="w-1/2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Division
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value="N/A"
                                    label="Division"
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="N/A">N/A</MenuItem>
                                </Select>
                            </FormControl>
                        </div> */}
                    </div>

                    {/* Table for members */}
                    <div className="w-full">
                        <TeamMembers
                            teamMemberRows={teamMemberRowsTEMP}
                            teamMemberColumns={teamEditorColumns}
                            saveButtonDisabled
                            cancelButtonDisabled
                        />
                    </div>
                </div>

                <div className="w-1/4">
                    <h3 className="text-lg font-medium pt-6 pb-2">Standings</h3>
                    <div className="w-full">
                        <DataGrid
                            rows={standingsRowsTEMP}
                            columns={standingsColumns}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            disableColumnResize
                            disableColumnFilter
                            disableColumnSelector
                            disableColumnSorting
                            disableDensitySelector
                            disableColumnMenu
                            sx={{
                                [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                    {
                                        outline: 'none',
                                    },
                                [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                    {
                                        outline: 'none',
                                    },
                                [`& .${gridClasses.columnSeparator}`]: {
                                    [`&:not(.${gridClasses['columnSeparator--resizable']})`]:
                                        {
                                            display: 'none',
                                        },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="w-2/5">
                    <h3 className="text-lg font-medium pt-6 pb-2">
                        Recent Games
                        <div className="">
                            <DataGrid
                                rows={recentGamesRowsTEMP}
                                columns={recentGamesColumns}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                                disableColumnResize
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnSorting
                                disableDensitySelector
                                disableColumnMenu
                                sx={{
                                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                        {
                                            outline: 'none',
                                        },
                                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                        {
                                            outline: 'none',
                                        },
                                    [`& .${gridClasses.columnSeparator}`]: {
                                        [`&:not(.${gridClasses['columnSeparator--resizable']})`]:
                                            {
                                                display: 'none',
                                            },
                                    },
                                }}
                            />
                        </div>
                    </h3>
                </div>
            </div>
        </PageContainer>
    );
};

export default Teams;
