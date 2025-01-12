import { Prisma } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

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

export type GameDataResponse = Prisma.GameGetPayload<{
    include: { lightTeam: true; darkTeam: true; timeslot: true };
}>;

// Sub component prop interfaces

export interface PlayerDataProps {
    player: PlayerCache | null;
    updatePlayer: Dispatch<SetStateAction<PlayerCache | null>>;
    teams: TeamDataResponse[];
    ageGroups: AgeGroupDataResponse[];
    isCreatingNewPlayer: boolean;
    onCancel: () => void;
    onValidSave: (player: PlayerCache) => void;
    deletePlayer: () => void;
}

export interface PlayerSearchProps {
    searchBoxInput: string;
    setSearchBoxInput: (val: string) => void;
    addPlayerDisabled: boolean;
    handleAddPlayerButtonPress: () => void;
}
