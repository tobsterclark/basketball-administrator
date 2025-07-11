
export type RowData = {
    time: string;
    court: number;
    venue: string;
    id: string;
    placeholder: boolean;
    placeholderReason?: string;
};

export type timeSlotParams = {
    id?: string;
    date: Date;
    location: string;
    court: number;
    ageGroupId?: string;
    placeholder: boolean;
    placeholderReason?: string;
};

export type TermInfo = {
    term: number;
    week: number;
};
