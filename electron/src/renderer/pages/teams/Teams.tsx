import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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

    const [newPlayerSearchBoxInput, setNewPlayerSearchBoxInput] =
        useState<string>('');
    const [newPlayerAddPlayerDisabled, setNewPlayerAddPlayerDisabled] =
        useState<boolean>(false);

    const [editedPlayersToRemove, setEditedPlayersToRemove] = useState<
        string[]
    >([]);

    const [editingDisabled, setEditingDisabled] = useState<boolean>(true);
    const [unsavedEdits, setUnsavedEdits] = useState<boolean>(false);
    const [pullNewData, setPullNewData] = useState<boolean>(false);
    const [isCreatingNewTeam, setIsCreatingNewTeam] = useState<boolean>(false);

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
        if (
            editedTeamName !== selectedTeamName ||
            editedAgeGroup !== selectedAgeGroup ||
            editedPlayersToRemove.length !== 0
        ) {
            setUnsavedEdits(true);
        } else {
            setUnsavedEdits(false);
        }
    }, [
        editedTeamName,
        editedAgeGroup,
        selectedTeamName,
        selectedAgeGroup,
        editedPlayersToRemove.length,
    ]);

    const handleSave = () => {
        // check if edited variables haven't been initialised
        if (
            editedAgeGroup === undefined ||
            editedTeamName === undefined ||
            editedTeamName === '' ||
            unsavedEdits === false
        ) {
            return;
        }

        if (isCreatingNewTeam) {
            const createTeamPush: PrismaCall = {
                model: ModelName.team,
                operation: CrudOperations.create,
                data: {
                    data: {
                        name: editedTeamName,
                        ageGroupId: editedAgeGroup.id,
                    },
                },
            };

            window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, createTeamPush)
                .then((data) => {
                    const newTeam = data as TeamCache;
                    toast.success(`Created new team: ${newTeam.name}`);
                    console.log('New team created');
                    console.log(newTeam);
                    setCachedTeams((currentCache) => {
                        const newCache = new Map(currentCache);
                        newCache.set(newTeam.id, newTeam);
                        return newCache;
                    });
                    setPullNewData(true);
                    setUnsavedEdits(false);
                    setIsCreatingNewTeam(false);
                    setSelectedTeam(newTeam.id);
                });
            return;
        }

        const updateTeamPush: PrismaCall = {
            model: ModelName.team,
            operation: CrudOperations.update,
            data: {
                where: { id: selectedTeam },
                data: {
                    name: editedTeamName,
                    // ageGroup: editedAgeGroup,
                    ageGroupId: editedAgeGroup?.id,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, updateTeamPush)
            .then((data) => {
                const updatedTeam = data as TeamCache;
                toast.success(`Updated team: ${updatedTeam.name}`);
            });

        // Update local copies of team and players once saved
        // update team name and age group in cachedTeams
        const updatedTeam = cachedTeams.get(selectedTeam);
        updatedTeam!.name = editedTeamName;
        updatedTeam!.ageGroupId = editedAgeGroup?.id;
        setCachedTeams((currentCache) => {
            const newCache = new Map(currentCache);
            newCache.set(selectedTeam, updatedTeam!);
            return newCache;
        });

        setPullNewData(true);
        setUnsavedEdits(false);
    };

    const handleCancel = () => {
        setEditedTeamName(selectedTeamName);
        setEditedAgeGroup(selectedAgeGroup);
        setEditedPlayersToRemove([]);
        setUnsavedEdits(false);
    };

    // Fetches all players from a given team
    useEffect(() => {
        if (selectedTeam === '' && !isCreatingNewTeam) {
            setEditingDisabled(true);
            return;
        }

        handleCancel();

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
                        toBeRemoved: false,
                    }),
                );
                console.log(teamMembers);
                setSelectedTeamPlayers(teamMembers);
                setEditingDisabled(false);
                setEditedTeamName(selectedTeamName);
            });

        // Used to recall the useEffect hook when updating a team
        setPullNewData(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTeam, pullNewData]);

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
                console.log(fetchedTeams);
                setCachedTeams((currentCache) => {
                    const newCache = new Map(currentCache);
                    fetchedTeams.forEach((team) => {
                        newCache.set(team.id, team);
                    });
                    return newCache;
                });
            });
    }, [pullNewData]);

    const handleAddTeamButtonPress = () => {
        setIsCreatingNewTeam(true);
        console.log('Add team button pressed');
        setSelectedTeam('');
        setEditedTeamName('');
        setEditedAgeGroup(undefined);
        setSelectedTeamPlayers(teamMemberRowsTEMP);
        setEditingDisabled(false);
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
                            onCancelClick={handleCancel}
                            onSaveClick={handleSave}
                            editingDisabled={editingDisabled}
                            editedPlayersToRemove={editedPlayersToRemove}
                            setEditedPlayersToRemove={setEditedPlayersToRemove}
                            newPlayerSearchBoxInput
                            newPlayerSetSearchBoxInput
                            newPlayerAddPlayerDisabled
                            newPlayerHandleAddPlayerButtonPress
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
