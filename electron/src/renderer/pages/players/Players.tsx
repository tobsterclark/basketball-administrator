/* eslint-disable no-console */
import {
    DataGrid,
    GridColDef,
    GridRowSelectionModel,
    GridRowsProp,
    GridSortModel,
    GridValidRowModel,
    gridClasses,
} from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { IpcChannels } from '../../../general/IpcChannels';
import {
    CrudOperations,
    ModelName,
    PrismaCall,
} from '../../../general/prismaTypes';
import { PlayerSearch } from './components/PlayerSearch';
import { PlayerCache, PlayerDataResponse } from './components/Types';
import { PlayerData } from './components/PlayerData';
import { PlayerProps } from './PlayersProps';

const Players = (playersProps: PlayerProps) => {
    const { ageGroups, teams } = playersProps;

    const [cachedPlayers, setCachedPlayers] = useState<
        Map<string, PlayerCache>
    >(new Map());

    const [selectedPlayer, setSelectedPlayer] = useState<PlayerCache | null>(
        null,
    );

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

    const [isCreatingNewPlayer, setIsCreatingNewPlayer] =
        useState<boolean>(false);

    const [escrowPlayer, setEscrowPlayer] = useState<GridValidRowModel | null>(
        null,
    );

    const createNewPlayerPrisma = (player: PlayerCache) => {
        // Converts player number as string to number/int as req. by Prisma
        const playerNumberInt = parseInt(String(player.number), 10);
        const newPlayerPush: PrismaCall = {
            model: ModelName.player,
            operation: CrudOperations.create,
            data: {
                include: { team: true, ageGroup: true }, // used for getting team and age group data in returned object
                data: { ...player, number: playerNumberInt, id: undefined },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, newPlayerPush)
            .then((data) => {
                const newPlayer = data as PlayerDataResponse;
                console.log(`New player added to DB! -->`);
                console.log(newPlayer);

                // TODO on successful player creation:
                // - Update blank table row to reflect new player entry
                // - change add player button to a disabled save button
                // - update player cache with new player
                // - update selected player to new player
                // - update selected player edit to new player
                // - update row selection model to new player
                // - remove escrow player
                // - set isCreatingNewPlayer to false

                // Remove blank table row and add new player to start of table
                const newPlayerRowData: GridRowsProp = [
                    {
                        id: newPlayer.id,
                        number: newPlayer.number,
                        firstName: newPlayer.firstName,
                        ageGroup: newPlayer.ageGroup.displayName,
                        teamDivision: newPlayer.team.division,
                        teamName: newPlayer.team.name,
                    },
                ];

                // TODO: Prevent other function from readding cached player
                setTableRowsPlayerData((currentRows) => {
                    const removeFirst = currentRows.slice(1);
                    const newRows = [...newPlayerRowData, ...removeFirst];
                    console.log('new table rows:');
                    console.log(newRows);
                    return newRows;
                });
            });
    };

    const handleNewPlayer = () => {
        if (!isCreatingNewPlayer) {
            setIsCreatingNewPlayer(true);
            const newPlayer: PlayerCache = {
                id: 'TEMP',
                number: null,
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
    };

    // Selects player from cachedPlayers map
    const selectPlayerById = (id: string) => {
        const player = cachedPlayers.get(id);
        if (player) setSelectedPlayer(player);
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
                    <PlayerData
                        player={selectedPlayer}
                        updatePlayer={setSelectedPlayer}
                        teams={teams}
                        ageGroups={ageGroups}
                        isCreatingNewPlayer={isCreatingNewPlayer}
                        onCancel={() => {
                            setSelectedPlayer(null);
                            setRowSelectionModel([]);
                            if (isCreatingNewPlayer) handleCancelNewPlayer();
                        }}
                        // TODO: Handle player updated
                        onValidSave={(player: PlayerCache) => {
                            if (isCreatingNewPlayer)
                                createNewPlayerPrisma(player);
                            else console.warn('player being created');
                        }}
                    />
                </div>
            </div>
        </PageContainer>
    );
};

export default Players;
