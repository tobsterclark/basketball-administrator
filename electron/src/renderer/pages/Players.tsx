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
    gridClasses,
} from '@mui/x-data-grid';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import { IpcChannels } from '../../general/IpcChannels';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../general/prismaTypes';
import FormCancelSave from '../ui_components/FormCancelSave';

const Players = () => {
    type PlayerDataResponse = Prisma.PlayerGetPayload<{
        include: { team: true; ageGroup: true };
    }>;

    type AgeGroupDataResponse = Prisma.AgeGroupGetPayload<{
        select: { id: true; displayName: true };
    }>;

    type TeamDataResponse = Prisma.TeamGetPayload<{
        select: { id: true; name: true; ageGroupId: true; division: true };
    }>;

    const [cachedPlayers, setCachedPlayers] = useState<
        Map<string, PlayerDataResponse>
    >(new Map());

    const [selectedPlayer, setSelectedPlayer] =
        useState<PlayerDataResponse | null>(null);
    const [selectedPlayerEdit, setSelectedPlayerEdit] =
        useState<PlayerDataResponse | null>(null);

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

    const handlePlayerEditorInputChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        if (selectedPlayerEdit) {
            console.log(`updating '${e.target.name}' to '${e.target.value}'`);
            setSelectedPlayerEdit({
                ...selectedPlayerEdit,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handlePlayerEditorMenuChange = (e: SelectChangeEvent<string>) => {
        if (selectedPlayerEdit) {
            if (e.target.name === 'teamId') {
                const team = allTeamNames.find(
                    (foundTeam) => foundTeam.id === e.target.value,
                );
                if (team) {
                    setSelectedPlayerEdit({
                        ...selectedPlayerEdit,
                        teamId: team.id,
                    });
                } else {
                    console.error(`Team with id ${e.target.value} not found`);
                }
            } else if (e.target.name === 'ageGroupId') {
                const ageGroup = allAgeGroups.find(
                    (foundAgeGroup) => foundAgeGroup.id === e.target.value,
                );
                if (ageGroup) {
                    setSelectedPlayerEdit({
                        ...selectedPlayerEdit,
                        ageGroupId: ageGroup.id,
                    });
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

                // Updating player cache to include newly fetched players
                setCachedPlayers((currentCache) => {
                    const newCache = new Map(currentCache);
                    players.forEach((player) => {
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
                <div className="pb-6 pt-12 md:w-1/2 xl:w-1/3 2xl:w-1/4">
                    <TextField
                        id="playerSearchInput"
                        label="Search players"
                        variant="filled"
                        autoFocus
                        value={searchBoxInput}
                        onChange={(e) => setSearchBoxInput(e.target.value)}
                        fullWidth
                    />
                </div>

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
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[10]}
                            sortModel={sortModel}
                            onSortModelChange={(newSortModel) =>
                                setSortModel(newSortModel)
                            }
                            onRowSelectionModelChange={(
                                newRowSelectionModel,
                            ) => {
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
                                                <MenuItem value={team.id}>
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
                                                <MenuItem value={ageGroup.id}>
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
                                    saveButtonDisabled={
                                        selectedPlayer === null ||
                                        selectedPlayer === selectedPlayerEdit
                                    }
                                    onCancelClick={() => {
                                        setSelectedPlayerEdit(null);
                                        setSelectedPlayer(null);
                                        setRowSelectionModel([]);
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
