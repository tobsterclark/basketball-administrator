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
    GridRowsProp,
    GridSortModel,
} from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';

type _Team = {
    id: string;
    name: string;
    age_group: string;
    division: number;
};

type _Player = {
    id: string;
    first_name: string;
    last_name: string;
    number: number;
    team_id: string;
    team: _Team;
};

type _Players = _Player[];

const Players = () => {
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

    const getOrderBy = useCallback(() => {
        if (sortModel.length === 0) return {};
        if (sortModel[0].field === 'team_name') {
            return { team: { name: sortModel[0].sort } };
        }
        if (sortModel[0].field === 'age_group') {
            return { team: { age_group: sortModel[0].sort } };
        }
        return { [sortModel[0].field]: sortModel[0].sort };
    }, [sortModel]);

    // Gets initial 10 players on page load
    useEffect(() => {
        if (!totalPlayersLoaded) return;
        async function getPrismaData() {
            window.electron.ipcRenderer.once('prismaPlayerFindMany', (data) => {
                const players = data as _Players;
                const rowData: GridRowsProp = players.map(
                    (player: _Player, index: number) => ({
                        id: index + 1,
                        number: player.number,
                        first_name: player.first_name,
                        age_group: player.team.age_group,
                        team_division: player.team.division,
                        team_name: player.team.name,
                    }),
                );

                setTableRowsPlayerData(rowData);
            });
            window.electron.ipcRenderer.sendMessage('prismaPlayerFindMany', {
                skip: paginationModel.page * paginationModel.pageSize,
                take: paginationModel.pageSize,
                orderBy: getOrderBy(),
                include: { team: true }, // Including the relational team data
            });
        }
        getPrismaData();
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
        async function getTotalPlayers() {
            window.electron.ipcRenderer.once('prismaPlayerGetCount', (data) => {
                const players = data as number;
                setTotalPlayers(players);
                setTotalPlayersLoaded(true);
            });
            window.electron.ipcRenderer.sendMessage('prismaPlayerGetCount');
        }
        getTotalPlayers();
    }, [totalPlayers]);

    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Number', width: 100 },
        { field: 'first_name', headerName: 'Name', width: 200 }, // TODO: fix first/last name when data is in correct format
        { field: 'age_group', headerName: 'Age', width: 100 },
        // { field: 'team_division', headerName: 'Division', width: 100 }, // TODO: fix when team division info is included
        { field: 'team_name', headerName: 'Team', width: 150 },
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
                        />
                    </div>

                    {/* Player data editor */}
                    <div className="bg-gray-50 shadow-md rounded-md">
                        <div className="pl-6 pr-6 pt-4">
                            {/* First Name & Last Name */}
                            <div className="flex flex-row gap-4 pb-8">
                                <TextField
                                    id="playerDataEditor_firstName"
                                    label="First Name"
                                    variant="outlined"
                                />
                                <TextField
                                    id="playerDataEditor_lastName"
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </div>

                            {/* Player Number */}
                            <div className="w-36 pb-8">
                                <TextField
                                    id="playerDataEditor_number"
                                    label="Player Number"
                                    variant="outlined"
                                />
                            </div>

                            <div className="flex flex-row gap-4 pb-8">
                                {/* Team Select */}
                                <div className="w-2/3 flex-grow">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Team
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value=""
                                            label="Team"
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
                                        <InputLabel id="demo-simple-select-label">
                                            Age Group
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value=""
                                            label="Age Group"
                                        >
                                            <MenuItem value="3-4">3-4</MenuItem>
                                            <MenuItem value="5-6">5-6</MenuItem>
                                            <MenuItem value="7-8">7-8</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6 pb-4">
                                {/* Save Button */}
                                <div className="w-1/2 flex flex-col">
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Players;
