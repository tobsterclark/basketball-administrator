import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';

const Players = () => {
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
                <div className="pb-12 pt-12">
                    <TextField
                        id="playerSearchInput"
                        label="Search players"
                        variant="filled"
                    />
                </div>

                <div className="flex flex-row gap-8 pt-12 pb-12">
                    {/* Table */}
                    <div className="w-3/5 shadow-md">
                        <DataGrid rows={rows} columns={columns} />
                    </div>

                    {/* Player data editor */}
                    <div className="bg-gray-50 shadow-md rounded-md">
                        <div className="pl-6 pr-6 pt-4">
                            <div className="pb-8 w-36">
                                <TextField
                                    id="playerDataEditor_number"
                                    label="Player Number"
                                    variant="outlined"
                                />
                            </div>
                            <div className="flex flex-row gap-4 pb-12">
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
                            <div className="pb-12 w-36">
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
                            <div className="flex flex-row gap-6">
                                <div className="w-1/2 pb-12">
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
                                                Team 3
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
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
