import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
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
    PlayerCache,
    PlayerDataResponse,
    TeamCache,
    TeamMemberRow,
} from './components/Types';
import { TeamSearch } from './components/TeamSearch';
import { PlayerSearch } from './components/PlayerSearch';
import { useRef } from 'react';

const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const Teams = () => {
    const [cachedTeams, setCachedTeams] = useState<Map<string, TeamCache>>(
        new Map(),
    );
    const [cachedPlayers, setCachedPlayers] = useState<Map<string, PlayerCache>>(
        new Map(),
    );
    const [ageGroups, setAgeGroups] = useState<AgeGroupDataResponse[]>([]);

    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedPlayer, setSelectedPlayer] = useState<string>('');

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
    
    const selectedTeamDiv = cachedTeams.get(selectedTeam)?.division || -1;
    const [editedTeamDiv, setEditedTeamDiv] = useState<number>(selectedTeamDiv);

    const selectedAgeGroup: AgeGroupDataResponse | undefined = ageGroups.find(
        (ageGroup) => ageGroup.id === cachedTeams.get(selectedTeam)?.ageGroupId,
    );
    const [editedAgeGroup, setEditedAgeGroup] = useState<
        AgeGroupDataResponse | undefined
    >(selectedAgeGroup);

    const rowClick: React.Dispatch<React.SetStateAction<string>> = (value) => {
        setSelectedPlayer(typeof value === 'string' ? value : value(''));
    };

    const deleteTeam = () => {
        const deleteTeamPush: PrismaCall = {
            model: ModelName.team,
            operation: CrudOperations.delete,
            data: {
                where: { id: selectedTeam },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, deleteTeamPush)
            .then(() => {
                toast.success(`Deleted team: ${selectedTeamName}`);
                console.log('Team deleted');
                setCachedTeams((currentCache) => {
                    const newCache = new Map(currentCache);
                    newCache.delete(selectedTeam);
                    return newCache;
                });
                setPullNewData(true);
                setSelectedTeam('');
                setEditedTeamName('');
                setEditedAgeGroup(undefined);
                setSelectedTeamPlayers(teamMemberRowsTEMP);
            });
    };

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
            editedPlayersToRemove.length !== 0 || 
            editedTeamDiv !== selectedTeamDiv
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
        editedTeamDiv,
        selectedTeamDiv
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
                        division: editedTeamDiv,
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
                    division: editedTeamDiv
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
        updatedTeam!.division = editedTeamDiv;
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
        setEditedTeamDiv(selectedTeamDiv);
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
                // console.warn('teamMembersRequest invoked');
                const fetchedPlayers = data as PlayerDataResponse[];
                const teamMembers: TeamMemberRow[] = fetchedPlayers.map(
                    (player, index) => ({
                        id: index,
                        playerId: player.id,
                        name: `${player.firstName} ${player.lastName}`,
                        number: player.number ?? 0,
                        toBeRemoved: false,
                    }),
                );
                // console.log(teamMembers);
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
                // console.warn('allAgeGroupsRequest invoked');
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
                // console.warn('allTeamsRequest invoked');
                const fetchedTeams = data as TeamCache[];
                // console.log(fetchedTeams);
                setCachedTeams((currentCache) => {
                    const newCache = new Map(currentCache);
                    fetchedTeams.forEach((team) => {
                        newCache.set(team.id, team);
                    });
                    return newCache;
                });
            });
    }, [pullNewData]);

    // Fetches all players from DB and stores into the cachedPlayers map
    useEffect(() => {
        const allPlayersRequest: PrismaCall = {
            model: ModelName.player,
            operation: CrudOperations.findMany,
            data: {
                orderBy: { firstName: 'asc' },
                include: { ageGroup: true },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, allPlayersRequest)
            .then((data) => {
                // console.warn('allPlayersRequest invoked');
                const fetchedPlayers = data as PlayerCache[];
                // console.log(fetchedPlayers);
                setCachedPlayers((currentCache) => {
                    const newCache = new Map(currentCache);
                    fetchedPlayers.forEach((player) => {
                        newCache.set(player.id, player);
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
        setEditedTeamDiv(-1);
        setEditedAgeGroup(undefined);
        setSelectedTeamPlayers(teamMemberRowsTEMP);
        setEditingDisabled(false);
    };

    const handleAddPlayerButtonPress = () => {
        // setIsCreatingNewTeam(true);
        console.log('Add team button pressed');
        setSelectedPlayer('');
        // setEditedTeamName('');
        // setEditedAgeGroup(undefined);
        // setSelectedTeamPlayers(teamMemberRowsTEMP);
        // setEditingDisabled(false);
    };

    const handlePlayerInfoUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        if (!selectedPlayer) return;

        const { name, value: rawValue } = e.target;
        const sanitizedValue =
            name === 'number'
                ? rawValue.replace(/\D/g, '').replace(/^0+(?!$)/, '').substring(0, 6)
                : rawValue;

        setCachedPlayers((currentCache) => {
            const newCache = new Map(currentCache);
            const player = newCache.get(selectedPlayer);

            if (player) {
                switch (name) {
                    case 'number':
                        player.number = parseInt(sanitizedValue, 10) || 0;
                        break;
                    case 'firstName':
                        player.firstName = sanitizedValue;
                        break;
                    case 'lastName':
                        player.lastName = sanitizedValue;
                        break;
                    default:
                        break;
                }
                newCache.set(selectedPlayer, player);
            }

            return newCache;
        });

        // Debounce the update to the database
        debounceUpdatePlayer(name, sanitizedValue);
    };

    const handlePlayerSelectInput = (e: SelectChangeEvent<string>) => {
        if (!selectedPlayer) return;
        const { name, value } = e.target;

        setCachedPlayers((currentCache) => {
            const newCache = new Map(currentCache);
            const player = newCache.get(selectedPlayer);

            if (player) {
                switch (name) {
                    case 'teamId':
                        player.teamId = value;
                        break;
                    case 'ageGroupId':
                        player.ageGroupId = value;
                        break;
                    default:
                        break;
                }
                newCache.set(selectedPlayer, player);
            }
            return newCache;
        });

        // Use debounceUpdatePlayer to update the database
        debounceUpdatePlayer(name, value);
    };

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const debounceUpdatePlayer = (name: string, value: string | number) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            const updatePlayerPush: PrismaCall = {
                model: ModelName.player,
                operation: CrudOperations.update,
                data: {
                    where: { id: selectedPlayer },
                    data: {
                        [name]: name === 'number' ? parseInt(value as string, 10) || 0 : value,
                    },
                },
            };

            try {
                await window.electron.ipcRenderer.invoke(IpcChannels.PrismaClient, updatePlayerPush);
                toast.success('Player information updated successfully');
            } catch (error) {
                console.error('Failed to update player:', error);
                toast.error('Failed to update player information');
            }
        }, 500); // Wait 500ms after the user stops typing
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
                                            {toTitleCase(ageGroup.displayName)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Removing for now; unneeded */}
                        <div className="w-1/2">
                            <FormControl fullWidth>
                                <InputLabel id="div-select-label">
                                    Division
                                </InputLabel>
                                <Select
                                    labelId="div-select-label"
                                    id="div-select"
                                    label="Division"
                                    disabled={editingDisabled}
                                    value={editedTeamDiv}
                                    onChange={(e) => {
                                        console.log(`changing from ${editedTeamDiv} to ${e.target.value}.`);
                                        setEditedTeamDiv(Number(e.target.value));
                                    }}
                                >
                                    <MenuItem value={1}>Div 1</MenuItem>
                                    <MenuItem value={2}>Div 2</MenuItem>
                                    <MenuItem value={-1}>N/A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
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
                            deleteTeam={deleteTeam}
                            rowClick={(value) => rowClick(value)}
                        />
                    </div>
                </div>

                <div className="w-3/5 flex flex-col">
                    {/* Area for editing players. Needs a search bar and fields for editing name etc */}
                    <div className="flex flex-row gap-4">
                        <div className="w-full">
                            <PlayerSearch
                                setSelectedPlayer={setSelectedPlayer}
                                handleAddPlayerButtonPress={handleAddPlayerButtonPress}
                                cachedPlayers={cachedPlayers}
                                selectedPlayer={selectedPlayer}
                            />
                        </div>
                        {/* <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            variant="contained"
                            onClick={() => {
                                console.log('Add player button pressed');
                                setNewPlayerAddPlayerDisabled(true);
                            }}
                        >
                            Add Player
                        </Button>
                        <Button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            variant="contained"
                            color="error"
                            onClick={() => {
                                console.log('delete player button pressed');
                            }}
                        >
                            Delete Player
                        </Button> */}
                    </div>
                    <div className="flex flex-row gap-4 pt-4">
                        <TextField
                            fullWidth
                            id="newPlayerFirstName"
                            label="First Name"
                            variant="filled"
                            name="firstName"
                            onChange={handlePlayerInfoUpdate}
                            value={cachedPlayers.get(selectedPlayer)?.firstName || ''}
                        />
                        <TextField
                            fullWidth
                            id="newPlayerLastName"
                            label="Last Name"
                            variant="filled"
                            name="lastName"
                            onChange={handlePlayerInfoUpdate}
                            value={cachedPlayers.get(selectedPlayer)?.lastName || ''}
                        />
                        <TextField
                            fullWidth
                            id="newPlayerNumber"
                            label="Number"
                            variant="filled"
                            name="number"
                            value={cachedPlayers.get(selectedPlayer)?.number || ''}
                            onChange={handlePlayerInfoUpdate}
                        />
                    </div>
                    <div className="flex flex-row gap-4 pb-4 pt-4">
                        {/* Team Select */}
                        <div className="w-2/3 flex-grow">
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                >
                                    Team
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Team"
                                    value={cachedPlayers.get(selectedPlayer)?.teamId ?? ''}
                                    name="teamId"
                                    onChange={handlePlayerSelectInput}
                                >
                                    {Array.from(cachedTeams.values()).map((team) => (
                                        <MenuItem key={team.id} value={team.id}>
                                            {team.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
    
                        {/* Age Group */}
                        <div className="flex-shrink w-1/3">
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                >
                                    Age Group
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age Group"
                                    name="ageGroupId"
                                    value={cachedPlayers.get(selectedPlayer)?.ageGroupId ?? ''}
                                    onChange={handlePlayerSelectInput}
                                >
                                    {ageGroups.map((ageGroup) => (
                                        <MenuItem
                                            key={ageGroup.id}
                                            value={ageGroup.id}
                                        >
                                            {toTitleCase(ageGroup.displayName)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Teams;
