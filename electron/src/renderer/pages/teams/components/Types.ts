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

export type PlayerDataResponse = Prisma.PlayerGetPayload<{
    include: { team: false; ageGroup: false };
}>;

export type TeamCache = Omit<TeamDataResponse, 'ageGroup'>;

export interface TeamMemberRow {
    id: number;
    playerId: string;
    name: string;
    number: number;
}

export interface TeamMembersProps {
    teamMemberRows: TeamMemberRow[];
    saveButtonDisabled: boolean;
    cancelButtonDisabled: boolean;
    editingDisabled: boolean;
}

export interface TeamSearchProps {
    setSelectedTeam: Dispatch<SetStateAction<string>>; // dispatch needed for hooks
    selectedTeam: string;
    addTeamDisabled: boolean;
    handleAddTeamButtonPress: () => void;
    cachedTeams: Map<string, TeamCache>;
}
