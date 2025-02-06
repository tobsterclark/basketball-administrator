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

export type AppointmentEvent = {
    title: string;
    startDate: Date;
    endDate: Date;
    id: string;
    location: string;
    court: number;
    ageGroup: string;
};

export type Team = {
    id: string;
    name: string;
    ageGroupId: string;
    division: number | null;
};

export type Timeslot = {
    id: string;
    location: Location;
    court: number;
    ageGroupId: string;
    date: string; // ISO date string
};

export type Game = {
    id: string;
    lightTeamId: string;
    darkTeamId: string;
    lightScore: number;
    darkScore: number;
    timeslotId: string;
    lightTeam: Team;
    darkTeam: Team;
    timeslot: Timeslot;
};

// Sub component prop interfaces

export interface PlayerDataProps {
    player?: PlayerCache | null;
    updatePlayer?: Dispatch<SetStateAction<PlayerCache | null>>;
    teams?: TeamDataResponse[];
    ageGroups: AgeGroupDataResponse[];
    getAgeGroups?: () => void;
    isCreatingNewPlayer?: boolean;
    onCancel?: () => void;
    onValidSave?: (player: PlayerCache) => void;
    deletePlayer?: () => void;
}

export interface RosterDataProps {
    allEvents : AppointmentEvent[];
    setAllEvents: Dispatch<SetStateAction<AppointmentEvent[]>>;
    allGames: Game[];
    setAllGames: Dispatch<SetStateAction<Game[]>>;
}

export interface PlayerSearchProps {
    searchBoxInput: string;
    setSearchBoxInput: (val: string) => void;
    addPlayerDisabled: boolean;
    handleAddPlayerButtonPress: () => void;
}
