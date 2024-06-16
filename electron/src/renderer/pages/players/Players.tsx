/* eslint-disable no-console */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowSelectionModel,
    GridRowsProp,
    GridSortModel,
    GridValidRowModel,
    gridClasses,
} from '@mui/x-data-grid';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { IpcChannels } from '../../../general/IpcChannels';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import FormCancelSave from '../../ui_components/FormCancelSave';
import { PlayerSearch } from './components/PlayerSearch';

const Players = () => {
    type PlayerDataResponse = Prisma.PlayerGetPayload<{
        include: { team: true; ageGroup: true };
    }>;

    // For storing player data in cache without team and age group data. Used for updating database & to reduce repeated data
    type PlayerCache = Omit<PlayerDataResponse, 'team' | 'ageGroup'>;

    type AgeGroupDataResponse = Prisma.AgeGroupGetPayload<{
        select: { id: true; displayName: true };
    }>;

    type TeamDataResponse = Prisma.TeamGetPayload<{
        select: { id: true; name: true; ageGroupId: true; division: true };
    }>;

    const [cachedPlayers, setCachedPlayers] = useState<
        Map<string, PlayerCache>
    >(new Map());

    const [selectedPlayer, setSelectedPlayer] = useState<PlayerCache | null>(
        null,
    );
    const [selectedPlayerEdit, setSelectedPlayerEdit] =
        useState<PlayerCache | null>(null);

    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);

    const [tableRowsPlayerData, setTableRowsPlayerData] =
        useState<GridRowsProp>([]);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: 'number',
            sort: 'asc',
        },
    ]);

    const [searchBoxInput, setSearchBoxInput] = useState<string>('');

    const [totalPlayers, setTotalPlayers] = useState<number>(-1);
    const [totalPlayersLoaded, setTotalPlayersLoaded] =
        useState<boolean>(false);

    const [allAgeGroups, setAllAgeGroups] = useState<AgeGroupDataResponse[]>(
        [],
    );
    const [allTeamNames, setAllTeamNames] = useState<TeamDataResponse[]>([]);

    const [isCreatingNewPlayer, setIsCreatingNewPlayer] =
        useState<boolean>(false);

    const [escrowPlayer, setEscrowPlayer] = useState<GridValidRowModel | null>(
        null,
    );

    // Used for checking if all fields are filled in new player creation, to disable save button
    const newPlayerIsValid = (): boolean => {
        if (
            selectedPlayerEdit?.firstName !== '' &&
            selectedPlayerEdit?.lastName !== '' &&
            selectedPlayerEdit?.number !== 0 &&
            selectedPlayerEdit?.teamId !== '' &&
            selectedPlayerEdit?.ageGroupId !== ''
        ) {
            return true;
        }
        return false;
    };

    const createNewPlayerPrisma = () => {
        if (isCreatingNewPlayer && newPlayerIsValid() && selectedPlayerEdit) {
            const newPlayerPush: PrismaCall = {
                model: ModelName.player,
                operation: CrudOperations.create,
                data: {
                    data: {
                        firstName: selectedPlayerEdit.firstName,
                        lastName: selectedPlayerEdit.lastName,
                        number: selectedPlayerEdit.number, // TODO: this is being sent with a string type for some reason
                        teamId: selectedPlayerEdit.teamId,
                        ageGroupId: selectedPlayerEdit.ageGroupId,
                        team: { connect: { id: selectedPlayerEdit.teamId } },
                        ageGroup: {
                            connect: { id: selectedPlayerEdit.ageGroupId },
                        },
                    },
                },
            };

            window.electron.ipcRenderer
                .invoke(IpcChannels.PrismaClient, newPlayerPush)
                .then((data) => {
                    const newPlayer = data as PlayerDataResponse;
                    console.log(`New player added to DB! -->`);
                    console.log(newPlayer);

                    // Removing team and age group objects from players to store in cache
                    // const playersCached = players.map(
                    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    //     ({ team, ageGroup, ...rest }) => rest,
                    // );

                    // // Updating player cache to include newly fetched players
                    // setCachedPlayers((currentCache) => {
                    //     const newCache = new Map(currentCache);
                    //     playersCached.forEach((player) => {
                    //         newCache.set(player.id, player);
                    //     });
                    //     return newCache;
                    // });

                    // // Map results to table rows
                    // const rowData: GridRowsProp = players.map((player) => ({
                    //     id: player.id,
                    //     number: player.number,
                    //     firstName: player.firstName,
                    //     ageGroup: player.ageGroup.displayName,
                    //     teamDivision: player.team.division,
                    //     teamName: player.team.name,
                    // }));

                    // setTableRowsPlayerData(rowData);
                });
        }
    };

    const handleNewPlayer = () => {
        if (!isCreatingNewPlayer) {
            setIsCreatingNewPlayer(true);
            const newPlayer: PlayerCache = {
                id: 'TEMP',
                number: 0,
                firstName: '',
                lastName: '',
                teamId: '',
                ageGroupId: '',
            };
            // Store last player in table into escrow
            setEscrowPlayer(
                tableRowsPlayerData[tableRowsPlayerData.length - 1],
            );

            // Remove last index in tableRowsPlayerData
            setTableRowsPlayerData((currentRows) => {
                const removeLast = currentRows.slice(0, -1);
                const newRows = [{ ...newPlayer }, ...removeLast];
                return newRows;
            });
            setRowSelectionModel([newPlayer.id]);
            setSelectedPlayer(newPlayer);
            setSelectedPlayerEdit(newPlayer);
        }
    };

    // Handles resetting states if new player creation is cancelled. Also resets selected player on call.
    const handleCancelNewPlayer = () => {
        setIsCreatingNewPlayer(false);
        if (escrowPlayer) {
            setTableRowsPlayerData((currentRows) => {
                const removeFirst = currentRows.slice(1);
                const newRows = [...removeFirst, escrowPlayer];
                return newRows;
            });

            setEscrowPlayer(null);
        }
        setRowSelectionModel([]);
        setSelectedPlayer(null);
        setSelectedPlayerEdit(null);
    };

    const handlePlayerEditorInputChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        if (selectedPlayerEdit) {
            console.log(`updating '${e.target.name}' to '${e.target.value}'`);
            const updatedPlayer = {
                ...selectedPlayerEdit,
                [e.target.name]: e.target.value,
            };
            setSelectedPlayerEdit(updatedPlayer);
            console.log('selectedPlayerEdit:');
            console.log(updatedPlayer);
        }
    };

    const handlePlayerEditorMenuChange = (e: SelectChangeEvent<string>) => {
        if (selectedPlayerEdit) {
            if (e.target.name === 'teamId') {
                const team = allTeamNames.find(
                    (foundTeam) => foundTeam.id === e.target.value,
                );
                if (team) {
                    const updatedPlayer = {
                        ...selectedPlayerEdit,
                        teamId: team.id,
                    };
                    setSelectedPlayerEdit(updatedPlayer);
                    console.log('selectedPlayerEdit:');
                    console.log(updatedPlayer);
                } else {
                    console.error(`Team with id ${e.target.value} not found`);
                }
            } else if (e.target.name === 'ageGroupId') {
                const ageGroup = allAgeGroups.find(
                    (foundAgeGroup) => foundAgeGroup.id === e.target.value,
                );
                if (ageGroup) {
                    const updatedPlayer = {
                        ...selectedPlayerEdit,
                        ageGroupId: ageGroup.id,
                    };
                    setSelectedPlayerEdit(updatedPlayer);
                    console.log('selectedPlayerEdit:');
                    console.log(updatedPlayer);
                } else {
                    console.error(
                        `Age group with id ${e.target.value} not found`,
                    );
                }
            }
        }
    };

    // Selects player from cachedPlayers map
    const selectPlayerById = (id: string) => {
        const player = cachedPlayers.get(id);
        if (player) {
            setSelectedPlayer(player);
            setSelectedPlayerEdit(player);
            console.log(`updated selected player to be:`);
            console.log(player);
        }
    };

    const getOrderBy = useCallback(() => {
        if (sortModel.length === 0) return {};

        switch (sortModel[0].field) {
            case 'teamName':
                return { team: { name: sortModel[0].sort } };
            case 'ageGroup':
                return { ageGroup: { displayName: sortModel[0].sort } };
            default:
                return { [sortModel[0].field]: sortModel[0].sort };
        }
    }, [sortModel]);

    // Gets 10 players at a time, used for pagination
    useEffect(() => {
        if (!totalPlayersLoaded) return;

        const playerDataRequest: PrismaCall = {
            model: ModelName.player,
            operation: CrudOperations.findMany,
            data: {
                skip: paginationModel.page * paginationModel.pageSize,
                take: paginationModel.pageSize,
                orderBy: getOrderBy(),
                include: { team: true, ageGroup: true },
                /* eslint-disable indent */
                /* eslint-disable prettier/prettier */
                ...(searchBoxInput
                    ? // If search box has data, only return results that start with search input
                    {
                        where: {
                            firstName: {
                                startsWith: searchBoxInput,
                                mode: 'insensitive',
                            },
                        },
                    }
                    : {}),
                /* eslint-enable indent */
                /* eslint-enable prettier/prettier */
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, playerDataRequest)
            .then((data) => {
                const players = data as PlayerDataResponse[];

                // Removing team and age group objects from players to store in cache
                const playersCached = players.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ({ team, ageGroup, ...rest }) => rest,
                );

                // Updating player cache to include newly fetched players
                setCachedPlayers((currentCache) => {
                    const newCache = new Map(currentCache);
                    playersCached.forEach((player) => {
                        newCache.set(player.id, player);
                    });
                    return newCache;
                });

                // Map results to table rows
                const rowData: GridRowsProp = players.map((player) => ({
                    id: player.id,
                    number: player.number,
                    firstName: player.firstName,
                    ageGroup: player.ageGroup.displayName,
                    teamDivision: player.team.division,
                    teamName: player.team.name,
                }));

                setTableRowsPlayerData(rowData);
            });

        console.log('Bazinga, data fetched! Using sort model', sortModel); // left here intentionally to monitor API calls
    }, [
        getOrderBy,
        paginationModel,
        sortModel,
        totalPlayers,
        totalPlayersLoaded,
        searchBoxInput,
    ]);

    // Get total number of players on page load, needed for pagination
    useEffect(() => {
        const totalPlayersRequest: PrismaCall = {
            model: ModelName.player,
            operation: CrudOperations.count,
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, totalPlayersRequest)
            .then((data) => {
                setTotalPlayers(data as number);
                setTotalPlayersLoaded(true);
            });
    }, [totalPlayers]);

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
                const ageGroups = data as AgeGroupDataResponse[];
                setAllAgeGroups(ageGroups);
            });

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, teamNamesRequest)
            .then((data) => {
                const dataAllTeamNames = data as TeamDataResponse[];
                setAllTeamNames(dataAllTeamNames);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Number', width: 100 },
        { field: 'firstName', headerName: 'Name', width: 200 }, // TODO: fix first/last name when data is in correct format
        { field: 'ageGroup', headerName: 'Age', width: 100 },
        // { field: 'team_division', headerName: 'Division', width: 100 }, // TODO: fix when team division info is included
        { field: 'teamName', headerName: 'Team', width: 150 },
    ];

    return (
        <PageContainer>
            <PageTitle text="Player Management" />
            <div>
                <PlayerSearch
                    searchBoxInput={searchBoxInput}
                    setSearchBoxInput={setSearchBoxInput}
                    addPlayerDisabled={isCreatingNewPlayer}
                    handleAddPlayer={handleNewPlayer}
                />
                <div className="flex flex-row 2xl:gap-24 gap-8 pb-12">
                    {/* Table */}
                    <div className="w-3/5 shadow-md ">
                        <DataGrid
                            rows={tableRowsPlayerData}
                            columns={columns}
                            pagination
                            paginationMode="server"
                            loading={!totalPlayersLoaded}
                            rowCount={totalPlayers}
                            paginationModel={paginationModel}
                            onPaginationModelChange={(newPaginationModel) => {
                                handleCancelNewPlayer();
                                setPaginationModel(newPaginationModel);
                            }}
                            pageSizeOptions={[10]}
                            sortModel={sortModel}
                            onSortModelChange={(newSortModel) => {
                                handleCancelNewPlayer();
                                setSortModel(newSortModel);
                            }}
                            onRowSelectionModelChange={(
                                newRowSelectionModel,
                            ) => {
                                if (isCreatingNewPlayer) {
                                    handleCancelNewPlayer();
                                }
                                setRowSelectionModel(newRowSelectionModel);
                                selectPlayerById(
                                    newRowSelectionModel[0] as string,
                                );
                            }}
                            rowSelectionModel={rowSelectionModel}
                            sx={{
                                [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                {
                                    outline: 'none',
                                },
                                [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                {
                                    outline: 'none',
                                },
                            }}
                        />
                    </div>

                    {/* Player data editor */}
                    <div className="bg-gray-50 shadow-md rounded-md h-min">
                        <div className="pl-6 pr-6 pt-4">
                            {/* First Name & Last Name */}
                            <div className="flex flex-row gap-4 pb-8">
                                <TextField
                                    id="playerDataEditor_firstName"
                                    label="First Name"
                                    variant="outlined"
                                    name="firstName"
                                    value={selectedPlayerEdit?.firstName ?? ''}
                                    onChange={handlePlayerEditorInputChange}
                                    disabled={selectedPlayer === null}
                                />
                                <TextField
                                    id="playerDataEditor_lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    name="lastName"
                                    value={selectedPlayerEdit?.lastName ?? ''}
                                    onChange={handlePlayerEditorInputChange}
                                    disabled={selectedPlayer === null}
                                />
                            </div>

                            {/* Player Number */}
                            <div className="w-36 pb-8">
                                <TextField
                                    id="playerDataEditor_number"
                                    label="Player Number"
                                    variant="outlined"
                                    name="number"
                                    value={selectedPlayerEdit?.number ?? ''}
                                    onChange={handlePlayerEditorInputChange}
                                    disabled={selectedPlayer === null}
                                />
                            </div>

                            <div className="flex flex-row gap-4 pb-12">
                                {/* Team Select */}
                                <div className="w-2/3 flex-grow">
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            disabled={selectedPlayer === null}
                                        >
                                            Team
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                selectedPlayerEdit?.teamId ?? ''
                                            }
                                            label="Team"
                                            name="teamId"
                                            disabled={selectedPlayer === null}
                                            onChange={
                                                handlePlayerEditorMenuChange
                                            }
                                        >
                                            {allTeamNames.map((team) => (
                                                <MenuItem
                                                    key={team.id}
                                                    value={team.id}
                                                >
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
                                            disabled={selectedPlayer === null}
                                        >
                                            Age Group
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                selectedPlayerEdit?.ageGroupId ??
                                                ''
                                            }
                                            label="Age Group"
                                            disabled={selectedPlayer === null}
                                            name="ageGroupId"
                                            onChange={
                                                handlePlayerEditorMenuChange
                                            }
                                        >
                                            {allAgeGroups.map((ageGroup) => (
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
                            </div>
                            <div className="pb-8">
                                <FormCancelSave
                                    cancelButtonDisabled={
                                        selectedPlayer === null
                                    }
                                    onCancelClick={() => {
                                        setSelectedPlayerEdit(null);
                                        setSelectedPlayer(null);
                                        setRowSelectionModel([]);
                                        if (isCreatingNewPlayer) {
                                            handleCancelNewPlayer();
                                        }
                                    }}
                                    // Add functionality to savebutton disabled if new player all fields arent filled
                                    saveButtonDisabled={
                                        !isCreatingNewPlayer
                                            ? selectedPlayer === null ||
                                            selectedPlayer ===
                                            selectedPlayerEdit
                                            : !newPlayerIsValid()
                                    }
                                    saveButtonText={
                                        isCreatingNewPlayer
                                            ? 'Add Player'
                                            : 'Save'
                                    }
                                    onSaveClick={() => {
                                        if (
                                            isCreatingNewPlayer &&
                                            newPlayerIsValid()
                                        ) {
                                            createNewPlayerPrisma();
                                        } else {
                                            console.log(
                                                `Add logic for UPDATING Player info! isCreating new player: ${isCreatingNewPlayer}, newPlayerIsValid(): ${newPlayerIsValid()}`,
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Players;
