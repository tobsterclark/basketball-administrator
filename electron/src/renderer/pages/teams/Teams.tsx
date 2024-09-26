import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import TeamMembers from './components/TeamMembers';
import {
    teamMemberRowsTEMP,
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
import {
    AgeGroupDataResponse,
    PlayerDataResponse,
    TeamCache,
    TeamMemberRow,
} from './components/Types';
import { TeamSearch } from './components/TeamSearch';

const Teams = () => {
    const [cachedTeams, setCachedTeams] = useState<Map<string, TeamCache>>(
        new Map(),
    );

    const [ageGroups, setAgeGroups] = useState<AgeGroupDataResponse[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedTeamPlayers, setSelectedTeamPlayers] =
        useState<TeamMemberRow[]>();
    const [editedPlayersToRemove, setEditedPlayersToRemove] = useState<
        string[]
    >([]);

    const [editingDisabled, setEditingDisabled] = useState<boolean>(true);
    const [unsavedEdits, setUnsavedEdits] = useState<boolean>(false);

    const selectedTeamName = cachedTeams.get(selectedTeam)?.name || '';
    const [editedTeamName, setEditedTeamName] =
        useState<string>(selectedTeamName);

    const selectedAgeGroup: AgeGroupDataResponse | undefined = ageGroups.find(
        (ageGroup) => ageGroup.id === cachedTeams.get(selectedTeam)?.ageGroupId,
    );
    const [editedAgeGroup, setEditedAgeGroup] = useState<
        AgeGroupDataResponse | undefined
    >(selectedAgeGroup);

    // i fucking hate react!!!
    useEffect(() => {
        if (selectedTeam !== '') {
            setEditedAgeGroup(selectedAgeGroup);
        }
    }, [selectedTeam, selectedAgeGroup]);

    useEffect(() => {
        console.log(editedTeamName, selectedTeamName);
        console.log(editedAgeGroup, selectedAgeGroup);
        if (
            editedTeamName !== selectedTeamName ||
            editedAgeGroup !== selectedAgeGroup
        ) {
            setUnsavedEdits(true);
        } else {
            setUnsavedEdits(false);
        }
    }, [editedTeamName, editedAgeGroup, selectedTeamName, selectedAgeGroup]);

    // Fetches all players from a given team
    useEffect(() => {
        if (selectedTeam === '') {
            setEditingDisabled(true);
            return;
        }

        const teamMembersRequest: PrismaCall = {
            model: ModelName.player,
            operation: CrudOperations.findMany,
            data: {
                include: { team: false, ageGroup: false },
                where: {
                    teamId: selectedTeam,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, teamMembersRequest)
            .then((data) => {
                console.warn('teamMembersRequest invoked');
                const fetchedPlayers = data as PlayerDataResponse[];
                const teamMembers: TeamMemberRow[] = fetchedPlayers.map(
                    (player, index) => ({
                        id: index,
                        playerId: player.id,
                        name: player.firstName + player.lastName,
                        number: player.number ?? 0,
                    }),
                );
                setSelectedTeamPlayers(teamMembers);
                setEditingDisabled(false);
                setEditedTeamName(selectedTeamName);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTeam]);

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
                console.warn('allAgeGroupsRequest invoked');
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
                console.warn('allTeamsRequest invoked');
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
        // console.log('Add team button pressed');
    };

    // console.log(`selectedTeam: ${selectedTeam}`);
    // console.log(`selectedAgeGroup: ${selectedAgeGroup}`);

    return (
        <PageContainer>
            <PageTitle text="Team Management" />
            <TeamSearch
                setSelectedTeam={setSelectedTeam}
                handleAddTeamButtonPress={handleAddTeamButtonPress}
                cachedTeams={cachedTeams}
            />

            <hr className="w-full pb-2" />

            <div className="flex flex-row gap-12 justify-between pt-4">
                {/* Team editor */}
                <div className="w-1/3">
                    {/* <div className="flex flex-row hover:bg-gray-100">
                        <SectionTitle text={selectedTeamName} />
                        <PencilSquareIcon className="h-6 w-6 inline-block mt-1" />
                    </div> */}
                    <TextField
                        fullWidth
                        id="teamNameTextField"
                        label="Team Name"
                        variant="filled"
                        disabled={editingDisabled}
                        value={editedTeamName}
                        onChange={(e) => setEditedTeamName(e.target.value)}
                    />

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
                                    value={editedAgeGroup?.id ?? ''}
                                    label="Age Group"
                                    sx={{
                                        background: `${
                                            editingDisabled ? '#e2e8f0' : ''
                                        }`,
                                    }}
                                    onChange={(e) => {
                                        const newAgeGroup = ageGroups.find(
                                            (ageGroup) =>
                                                ageGroup.id === e.target.value,
                                        );
                                        setEditedAgeGroup(newAgeGroup);
                                    }}
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
                            teamMemberRows={
                                selectedTeamPlayers ?? teamMemberRowsTEMP
                            }
                            saveButtonDisabled={!unsavedEdits}
                            cancelButtonDisabled={!unsavedEdits}
                            editingDisabled={editingDisabled}
                            editedPlayersToRemove={editedPlayersToRemove}
                        />
                    </div>
                </div>

                <div className="w-2/3 flex flex-col">
                    <div className="">
                        <h3 className="text-lg font-medium pt-6 pb-2">
                            Standings
                        </h3>
                        <div className="w-full">
                            <DataGrid
                                rows={standingsRowsTEMP}
                                columns={standingsColumns}
                                pageSizeOptions={[100]}
                                disableRowSelectionOnClick
                                disableColumnResize
                                disableColumnFilter
                                disableColumnSelector
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 },
                                    },
                                }}
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
                    <div className="">
                        <h3 className="text-lg font-medium pt-6 pb-2">
                            Recent Games
                            <div className="">
                                <DataGrid
                                    rows={recentGamesRowsTEMP}
                                    columns={recentGamesColumns}
                                    pageSizeOptions={[100]}
                                    disableRowSelectionOnClick
                                    disableColumnResize
                                    initialState={{
                                        pagination: {
                                            paginationModel: { pageSize: 5 },
                                        },
                                    }}
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
            </div>
        </PageContainer>
    );
};

export default Teams;
