import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import SectionTitle from '../../ui_components/SectionTitle';
import TeamMembers from './components/TeamMembers';
import {
    teamMemberRowsTEMP,
    teamEditorColumns,
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

const Teams = () => {
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
                console.log(data);
            });
    }, []);

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
                        <TeamMembers
                            teamMemberRows={teamMemberRowsTEMP}
                            teamMemberColumns={teamEditorColumns}
                            saveButtonDisabled
                            cancelButtonDisabled
                        />
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
