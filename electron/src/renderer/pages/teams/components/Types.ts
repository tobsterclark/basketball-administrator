import { GridColDef } from '@mui/x-data-grid';

export interface TeamMemberRow {
    id: number;
    name: string;
    number: number;
}

export interface TeamMembersProps {
    teamMemberRows: TeamMemberRow[];
    teamMemberColumns: GridColDef[];
    saveButtonDisabled: boolean;
    cancelButtonDisabled: boolean;
}
