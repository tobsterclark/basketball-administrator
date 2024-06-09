/* eslint-disable no-console */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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
import { Player, Prisma } from '@prisma/client';
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
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedPlayerEdit, setSelectedPlayerEdit] = useState<Player | null>(
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

    const [totalPlayers, setTotalPlayers] = useState<number>(-1);
    const [totalPlayersLoaded, setTotalPlayersLoaded] =
        useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (selectedPlayerEdit) {
            setSelectedPlayerEdit({
                ...selectedPlayerEdit,
                [e.target.name]: e.target.value,
            });
        }
    };

    const selectPlayerById = (id: string) => {
        const player = tableRowsPlayerData.find(
            (row) => row.id === id,
        ) as Player;
        setSelectedPlayer(player);
        setSelectedPlayerEdit(player);
    };

    const getOrderBy = useCallback(() => {
        if (sortModel.length === 0) return {};

        switch (sortModel[0].field) {
            case 'teamName':
                return { team: { name: sortModel[0].sort } };
            case 'ageGroup':
                return { team: { ageGroup: sortModel[0].sort } };
            default:
                return { [sortModel[0].field]: sortModel[0].sort };
        }
    }, [sortModel]);

    // Gets initial 10 players on page load
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
            },
        };

        type PlayerDataResponse = Prisma.PlayerGetPayload<{
            include: { team: true; ageGroup: true };
        }>;

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, playerDataRequest)
            .then((data) => {
                const players = data as PlayerDataResponse[];
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

        console.log('Bazinga, the data is here! Using sort model', sortModel); // left here intentionally to monitor API calls
    }, [
        getOrderBy,
        paginationModel,
        sortModel,
        totalPlayers,
        totalPlayersLoaded,
    ]);

    // Get total players on page load, needed for pagination
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
                <div className="pb-6 pt-12 md:w-1/2 xl:w-1/3 2xl:w-1/4">
                    <TextField
                        id="playerSearchInput"
                        label="Search players"
                        variant="filled"
                        autoFocus
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
                                    value={selectedPlayerEdit?.firstName ?? ''}
                                    onChange={handleInputChange}
                                    disabled={selectedPlayer === null}
                                />
                                <TextField
                                    id="playerDataEditor_lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    disabled={selectedPlayer === null}
                                />
                            </div>

                            {/* Player Number */}
                            <div className="w-36 pb-8">
                                <TextField
                                    id="playerDataEditor_number"
                                    label="Player Number"
                                    variant="outlined"
                                    value={selectedPlayerEdit?.number ?? ''}
                                    onChange={handleInputChange}
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
                                            value=""
                                            label="Team"
                                            disabled={selectedPlayer === null}
                                        >
                                            <MenuItem value="Team 1">
                                                Team 1
                                            </MenuItem>
                                            <MenuItem value="Team 2">
                                                Team 2
                                            </MenuItem>
                                            <MenuItem value="Team 3">
                                                Team 4
                                            </MenuItem>
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
                                            value=""
                                            label="Age Group"
                                            disabled={selectedPlayer === null}
                                        >
                                            <MenuItem value="3-4">3-4</MenuItem>
                                            <MenuItem value="5-6">5-6</MenuItem>
                                            <MenuItem value="7-8">7-8</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="pb-8">
                                <FormCancelSave
                                    cancelButtonDisabled={
                                        selectedPlayer === null
                                    }
                                    saveButtonDisabled={selectedPlayer === null}
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
