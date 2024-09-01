import { GridColDef } from '@mui/x-data-grid';
import { Prisma } from '@prisma/client';

// See types.ts in players/components
export type TeamDataResponse = Prisma.TeamGetPayload<{
    include: { ageGroup: true };
}>;

export type TeamCache = Omit<TeamDataResponse, 'ageGroup'>;

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

export interface TeamSearchProps {
    searchBoxInput: string;
    setSearchBoxInput: (val: string) => void;
    addTeamDisabled: boolean;
    handleAddTeamButtonPress: () => void;
}
