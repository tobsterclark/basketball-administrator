import { gridClasses, DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { TeamMembersProps } from './Types';

const TeamMembers = (props: TeamMembersProps) => {
    const {
        teamMemberRows,
        saveButtonDisabled,
        cancelButtonDisabled,
        editingDisabled,
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
        {
            field: 'actions',
            sortable: false,
            align: 'right',
            filterable: false,
            renderCell: () => (
                <ArrowLeftStartOnRectangleIcon
                    className={`h-4 w-4 mr-4 inline-block ${
                        editingDisabled ? 'text-red-300 ' : 'text-red-600 '
                    }`}
                />
            ),
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-medium pt-6 pb-2">Members</h3>
            <div className="shadow-md">
                <DataGrid
                    rows={teamMemberRows}
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
                />
            </div>
        </div>
    );
};

export default TeamMembers;
