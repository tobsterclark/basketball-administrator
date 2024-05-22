import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
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
                <div className="w-3/5">
                    <DataGrid rows={rows} columns={columns} />
                </div>
            </div>
        </PageContainer>
    );
};

export default Players;
