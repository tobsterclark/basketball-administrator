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
export type PlayerCache = Omit<PlayerDataResponse, 'ageGroup'>;


export interface TeamMemberRow {
    id: number;
    playerId: string;
    name: string;
    number: number;
    toBeRemoved: boolean;
}

export interface TeamMembersProps {
    teamMemberRows: TeamMemberRow[];
    saveButtonDisabled: boolean;
    cancelButtonDisabled: boolean;
    editingDisabled: boolean;
    editedPlayersToRemove: string[];
    setEditedPlayersToRemove: Dispatch<SetStateAction<string[]>>;
    onCancelClick?: () => void;
    onSaveClick?: () => void;
    deleteTeam?: () => void;
}

export interface TeamSearchProps {
    setSelectedTeam: Dispatch<SetStateAction<string>>; // dispatch needed for hooks
    handleAddTeamButtonPress: () => void;
    cachedTeams: Map<string, TeamCache>;
}

export interface PlayerSearchProps {
    setSelectedPlayer: Dispatch<SetStateAction<string>>; // dispatch needed for hooks
    handleAddPlayerButtonPress: () => void;
    cachedPlayers: Map<string, PlayerCache>;
}