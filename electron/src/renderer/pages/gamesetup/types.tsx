export type rrGame = [string, string];
export type rrSchedule = Record<string, rrGame[]>;
export type timeSlotParams = {
    id?: string;
    date: Date;
    location: string;
    court: number;
    ageGroupId?: string;
};
export type Game = {
    lightTeamId: string | null;
    darkTeamId: string | null;
    timeSlotId: string;
};
