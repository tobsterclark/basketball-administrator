import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { ArrowDownTrayIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import SectionTitle from '../ui_components/SectionTitle';
import FormCancelSave from '../ui_components/FormCancelSave';

const Teams = () => {
    const teamMemberRowsTEMP = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        number: i + 1,
        firstName: `John Doe ${i + 1}`,
    }));

    const standingsRowsTEMP = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        position: `${i + 1}th`,
        teamName: `Basketball!`,
        points: 10 * (i + 1),
    }));

    const recentGamesRowsTEMP = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        date: `21/3`,
        venue: `Belrose`,
        court: `CT1`,
        teamA: `Sharks`,
        teamB: `Bounce`,
    }));

    const teamEditorColumns: GridColDef[] = [
        {
            field: 'number',
            flex: 0.1,
            sortable: false,
            filterable: false,
        },
        {
            field: 'firstName',
            flex: 1,
            sortable: false,
            filterable: false,
        },
        {
            field: 'actions',
            sortable: false,
            align: 'right',
            filterable: false,
            renderCell: () => (
                <TrashIcon className="h-4 w-4 mr-4 inline-block text-red-600" />
            ),
        },
    ];

    const standingsColumns: GridColDef[] = [
        {
            field: 'position',
            headerName: 'Pos',
            width: 40,
        },
        {
            field: 'teamName',
            headerName: 'Team',
            flex: 1,
        },
        {
            field: 'points',
            headerName: 'Points',
            flex: 0.35,
        },
    ];

    const recentGamesColumns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
        },
        {
            field: 'venue',
            headerName: 'Venue',
        },
        {
            field: 'court',
            headerName: 'Court',
        },
        {
            field: 'teamA',
            headerName: 'Team A',
        },
        {
            field: 'teamB',
            headerName: 'Team B',
        },
        {
            field: 'download',
            headerName: ``,
            sortable: false,
            align: 'right',
            filterable: false,
            renderCell: () => (
                <ArrowDownTrayIcon className="h-4 w-4 mr-4 inline-block text-red-600" />
            ),
            flex: 0.1,
        },
    ];

    return (
        <PageContainer>
            <PageTitle text="Team Management" />
            <div className="flex flex-row pt-12 pb-6 gap-6">
                <div className="md:w-1/2 xl:w-1/3 2xl:w-1/4">
                    <TextField
                        id="teamSearchInput"
                        label="Search teams"
                        variant="filled"
                        autoFocus
                        fullWidth
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        New Team
                        <PlusCircleIcon className="h-6 w-6 inline-block ml-2" />
                    </button>
                </div>
            </div>
            <div className="flex flex-row gap-12 justify-between pt-2">
                {/* Team editor */}
                <div className="w-1/4">
                    <button
                        type="button"
                        className="flex flex-row gap-4 hover:bg-gray-100"
                    >
                        <SectionTitle text="teamName" />
                        <PencilSquareIcon className="h-6 w-6 inline-block mt-1" />
                    </button>

                    {/* Age and Division drop-down */}
                    <div className="flex flex-row gap-4 pt-6">
                        <div className="w-1/2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Age Group
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value="Years 5-6"
                                    label="Age Group"
                                >
                                    <MenuItem value="Years 3-4">
                                        Years 3-4
                                    </MenuItem>
                                    <MenuItem value="Years 5-6">
                                        Years 5-6
                                    </MenuItem>
                                    <MenuItem value="Years 7-8">
                                        Years 7-8
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-1/2">
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
                        </div>
                    </div>

                    {/* Table for members */}
                    <div className="w-full">
                        <h3 className="text-lg font-medium pt-6 pb-2">
                            Members
                        </h3>
                        <div className="shadow-md">
                            <DataGrid
                                rows={teamMemberRowsTEMP}
                                columns={teamEditorColumns}
                                slots={{ columnHeaders: () => null }}
                                autoHeight
                                disableColumnMenu
                                disableColumnSorting
                                disableRowSelectionOnClick
                                hideFooter
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
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
                        <div className="pt-8 pb-4">
                            <FormCancelSave
                                saveButtonDisabled
                                cancelButtonDisabled
                            />
                        </div>
                    </div>
                </div>

                <div className="w-1/4">
                    <h3 className="text-lg font-medium pt-6 pb-2">Standings</h3>
                    <div className="w-full">
                        <DataGrid
                            rows={standingsRowsTEMP}
                            columns={standingsColumns}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            disableColumnResize
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
                </div>

                <div className="w-2/5">
                    <h3 className="text-lg font-medium pt-6 pb-2">
                        Recent Games
                        <div className="">
                            <DataGrid
                                rows={recentGamesRowsTEMP}
                                columns={recentGamesColumns}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                                disableColumnResize
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
        </PageContainer>
    );
};

export default Teams;
