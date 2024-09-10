import { gridClasses, DataGrid } from '@mui/x-data-grid';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { TeamMembersProps } from './Types';

const TeamMembers = (props: TeamMembersProps) => {
    const {
        teamMemberRows,
        teamMemberColumns,
        saveButtonDisabled,
        cancelButtonDisabled,
    } = props;

    return (
        <div>
            <h3 className="text-lg font-medium pt-6 pb-2">Members</h3>
            <div className="shadow-md">
                <DataGrid
                    rows={teamMemberRows}
                    columns={teamMemberColumns}
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
                    saveButtonDisabled={saveButtonDisabled}
                    cancelButtonDisabled={cancelButtonDisabled}
                />
            </div>
        </div>
    );
};

export default TeamMembers;
