/* eslint-disable no-console */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';

type _Player = {
    id: string;
    first_name: string;
    last_name: string;
    number: number;
    team_id: string;
};

type _Players = _Player[];

const Players = () => {
    const [tableRowsPlayerData, setTableRowsPlayerData] =
        useState<GridRowsProp>([]);

    useEffect(() => {
        async function prismaTest() {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            window.electron.ipcRenderer.once('prisma-test', (data) => {
                const players = data as _Players;
                // eslint-disable-next-line no-console
                console.log(players);
                const rowData: GridRowsProp = players.map(
                    (player: _Player, index: number) => ({
                        id: index + 1,
                        playerNumber: player.number,
                        playerName: player.first_name,
                        playerAgeGroup: 'N/A',
                        playerDivision: 'N/A',
                        playersAssignedTeam: player.team_id,
                    }),
                );

                setTableRowsPlayerData(rowData);
            });
            window.electron.ipcRenderer.sendMessage('prisma-test');
        }

        prismaTest();
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rows: GridRowsProp = [
        {
            id: 1,
            playerNumber: '061',
            playerName: 'John Doe',
            playerAgeGroup: '5-6',
            playerDivision: 'N/A',
            playersAssignedTeam: 'Dunkers',
        },
        {
            id: 2,
            playerNumber: '042',
            playerName: 'Jane Smith',
            playerAgeGroup: '7-8',
            playerDivision: 'N/A',
            playersAssignedTeam: 'Slammers',
        },
        {
            id: 3,
            playerNumber: '023',
            playerName: 'Mike Johnson',
            playerAgeGroup: '9-10',
            playerDivision: 'N/A',
            playersAssignedTeam: 'Shooters',
        },
        {
            id: 4,
            playerNumber: '085',
            playerName: 'Sarah Davis',
            playerAgeGroup: '11-12',
            playerDivision: 'N/A',
            playersAssignedTeam: 'Swishers',
        },
    ];

    const columns: GridColDef[] = [
        { field: 'playerNumber', headerName: 'Number', width: 100 },
        { field: 'playerName', headerName: 'Name', width: 200 },
        { field: 'playerAgeGroup', headerName: 'Age', width: 100 },
        { field: 'playerDivision', headerName: 'Division', width: 100 },
        { field: 'playersAssignedTeam', headerName: 'Team', width: 150 },
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
