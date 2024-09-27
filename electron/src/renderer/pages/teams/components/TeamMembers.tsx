import {
    gridClasses,
    DataGrid,
    GridColDef,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { TeamMembersProps } from './Types';

const TeamMembers = (props: TeamMembersProps) => {
    const {
        teamMemberRows,
        saveButtonDisabled,
        cancelButtonDisabled,
        editingDisabled,
        editedPlayersToRemove,
        setEditedPlayersToRemove,
        onCancelClick,
        onSaveClick,
    } = props;

    const teamEditorColumns: GridColDef[] = [
        {
            field: 'number',
            flex: 0.1,
            sortable: false,
            filterable: false,
        },
        {
            field: 'name',
            flex: 1,
            sortable: false,
            filterable: false,
        },
        // {
        //     field: 'actions',
        //     sortable: false,
        //     align: 'right',
        //     filterable: false,
        //     renderCell: () => (
        //         <ArrowLeftStartOnRectangleIcon
        //             className={`h-4 w-4 mr-4 inline-block ${
        //                 editingDisabled ? 'text-red-300 ' : 'text-red-600 '
        //             }`}
        //         />
        //     ),
        // },
    ];

    const [rowSelectionMode, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);

    const removePlayer = (rowIndex: number) => {
        const { playerId } = teamMemberRows[rowIndex];
        if (!editedPlayersToRemove.includes(playerId)) {
            // editedPlayersToRemove.push(playerId);
            setEditedPlayersToRemove([...editedPlayersToRemove, playerId]);
        }
    };

    const reAddPlayer = (rowIndex: number) => {
        const { playerId } = teamMemberRows[rowIndex];
        const index = editedPlayersToRemove.indexOf(playerId);
        if (index > -1) {
            const updatedPlayers = [...editedPlayersToRemove];
            updatedPlayers.splice(index, 1);
            setEditedPlayersToRemove(updatedPlayers);
        }
    };

    const checkForSelection = (newSelection: GridRowSelectionModel) => {
        if (newSelection.length === 0) {
            return;
        }

        const rowIndex = newSelection[0] as number;
        const { playerId } = teamMemberRows[rowIndex];
        if (editedPlayersToRemove.includes(playerId)) {
            reAddPlayer(rowIndex);
        } else {
            removePlayer(rowIndex);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-medium pt-6 pb-2">Members</h3>
            <div className="shadow-md">
                <DataGrid
                    rows={teamMemberRows}
                    columns={teamEditorColumns}
                    slots={{ columnHeaders: () => null }}
                    // onRowSelectionModelChange={(newSelection) => {
                    //     setRowSelectionModel([]);
                    //     checkForSelection(newSelection);
                    // }}
                    // rowSelectionModel={rowSelectionMode}
                    disableRowSelectionOnClick
                    autoHeight
                    disableColumnMenu
                    disableColumnSorting
                    hideFooter
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    getRowClassName={(params) => {
                        if (editingDisabled) {
                            return 'bg-[#e2e8f0]';
                        }
                        if (
                            editedPlayersToRemove.includes(params.row.playerId)
                        ) {
                            return 'bg-red-400 line-through';
                        }
                        return 'bg-white';
                    }}
                    sx={{
                        // '& .MuiDataGrid-row': {
                        //     '&:hover': {
                        //         bgcolor: 'rgb(254 202 202)',
                        //     },
                        // },
                        // '& .Mui-selected': { bgcolor: 'white' },
                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                            {
                                outline: 'none',
                            },
                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                            {
                                outline: 'none',
                            },
                        [`& .${gridClasses.cell}`]: {
                            background: `${editingDisabled ? '#e2e8f0' : ''}`,
                            color: `${editingDisabled ? '#94a3b8' : ''}`,
                        },
                    }}
                />
            </div>
            <div className="pt-8 pb-4">
                <FormCancelSave
                    saveButtonDisabled={saveButtonDisabled}
                    cancelButtonDisabled={cancelButtonDisabled}
                    onCancelClick={onCancelClick}
                    onSaveClick={onSaveClick}
                />
            </div>
        </div>
    );
};

export default TeamMembers;
