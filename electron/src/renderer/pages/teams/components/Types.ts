import { GridColDef } from '@mui/x-data-grid';
import { Prisma } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

// See types.ts in players/components
export type TeamDataResponse = Prisma.TeamGetPayload<{
    include: { ageGroup: true };
}>;

export type AgeGroupDataResponse = Prisma.AgeGroupGetPayload<{
    select: { id: true; displayName: true };
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
    setSelectedTeam: Dispatch<SetStateAction<string>>; // dispatch needed for hooks
    selectedTeam: string;
    addTeamDisabled: boolean;
    handleAddTeamButtonPress: () => void;
    cachedTeams: Map<string, TeamCache>;
}
