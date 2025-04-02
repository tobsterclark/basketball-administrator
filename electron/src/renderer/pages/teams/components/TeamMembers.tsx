import {
    gridClasses,
    DataGrid,
    GridColDef,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import {
    ArrowLeftStartOnRectangleIcon,
    TrashIcon,
    UserPlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { PlusOneOutlined } from '@mui/icons-material';
import { TextField } from '@mui/material';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { TeamMembersProps } from './Types';
import { PlayerSearch } from '../../players/components/PlayerSearch';

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
        deleteTeam,
        rowClick,
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
    ];

    const [rowSelectionMode, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState(false);


    return (
        <div>
            <h3 className="text-lg font-medium pt-6 pb-2">Members</h3>
            <div className="shadow-md">
                <DataGrid
                    rows={teamMemberRows}
                    columns={teamEditorColumns}
                    slots={{ columnHeaders: () => null }}
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
                    onRowClick={(params) => {
                        console.log('Player ID:', params.row.playerId);
                        rowClick(params.row.playerId);
                    }}
                    sx={{
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
                {deleteConfirmationVisible ? (
                    <div className="flex-row w-full text-center justify-center items-center py-4 px-2 gap-2 bg-red-300 disabled:bg-[#e2e8f0] disabled:cursor-not-allowed">
                        <p>
                            Are you sure you want to delete this team? This
                            action is permanent.
                        </p>
                        <div className="flex flex-row gap-6 pt-4 px-4">
                            <div className="w-1/2">
                                <button
                                    type="button"
                                    disabled={editingDisabled}
                                    onClick={() =>
                                        setDeleteConfirmationVisible(false)
                                    }
                                    className="rounded-md w-full justify-center items-center py-4 px-2 gap-2 bg-blue-400 text-white hover:cursor-pointer hover:bg-blue-500"
                                >
                                    <p className="font-bold">Cancel</p>
                                </button>
                            </div>
                            <div className="w-1/2">
                                <button
                                    type="button"
                                    disabled={editingDisabled}
                                    onClick={() => {
                                        if (deleteTeam) {
                                            deleteTeam();
                                        }
                                        setDeleteConfirmationVisible(false);
                                    }}
                                    className="rounded-md w-full flex justify-center items-center py-4 px-2 gap-2 bg-red-500 text-white hover:cursor-pointer hover:bg-red-600"
                                >
                                    <p className="font-bold">Delete Team</p>
                                    <TrashIcon className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        disabled={editingDisabled}
                        onClick={() => setDeleteConfirmationVisible(true)}
                        className="flex w-full justify-center items-center py-4 px-2 gap-2 bg-red-200 hover:cursor-pointer hover:bg-red-300 disabled:bg-[#e2e8f0] disabled:cursor-not-allowed"
                    >
                        <p className="font-bold">Delete Team</p>
                        <TrashIcon className="h-6 w-6 text-black" />
                    </button>
                )}
                <div>
                </div>
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
