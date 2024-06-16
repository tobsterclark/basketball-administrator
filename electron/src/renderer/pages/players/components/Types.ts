import { Prisma } from '@prisma/client';

export type PlayerDataResponse = Prisma.PlayerGetPayload<{
    include: { team: true; ageGroup: true };
}>;

// For storing player data in cache without team and age group data. Used for updating database & to reduce repeated data
export type PlayerCache = Omit<PlayerDataResponse, 'team' | 'ageGroup'>;

export type AgeGroupDataResponse = Prisma.AgeGroupGetPayload<{
    select: { id: true; displayName: true };
}>;

export type TeamDataResponse = Prisma.TeamGetPayload<{
    select: { id: true; name: true; ageGroupId: true; division: true };
}>;

// Sub component prop interfaces

export interface PlayerDataProps {
    selectedPlayer: PlayerCache | null;
    updateSelectedPlayer: (player: PlayerCache) => void;
    teams: TeamDataResponse[];
    ageGroups: AgeGroupDataResponse[];
    isCreatingNewPlayer: boolean;
    onCancelClick: () => void;
    onSaveClick: () => void;
    saveButtonDisabled: boolean;
}

export interface PlayerSearchProps {
    searchBoxInput: string;
    setSearchBoxInput: (val: string) => void;
    addPlayerDisabled: boolean;
    handleAddPlayer: () => void;
}
