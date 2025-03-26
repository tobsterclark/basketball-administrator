import moment from 'moment';

export enum Location {
    ST_IVES = 'ST_IVES',
    BELROSE = 'BELROSE',
}

export const toTitleCase = (str: any) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: any) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

export const locationToText = (location: Location) => {
    switch (location) {
        case Location.ST_IVES:
            return 'St Ives';
        case Location.BELROSE:
            return 'Belrose';
    }
};

export const getFileName = (location: Location, date: string) => {
    // Returns file name in the following format: "St Ives - 2021-06-01"
    return `${locationToText(location)} - ${date}`;
};

export const formatTime = (date: Date) => {
    // format time in <HH:mm> AM/PM format
    //return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return moment(date).tz('Australia/Sydney').format('h:mm A');
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

export const courtResources = [
    {
        text: 'Court 1',
        id: 1,
        color: '#DBB1BC',
    },
    {
        text: 'Court 2',
        id: 2,
        color: '#6B0F1A',
    },
    {
        text: 'Court 3',
        id: 3,
        color: '#212D40',
    },
];

export const venueResources = [
    {
        text: 'St Ives',
        id: Location.ST_IVES,
        color: '#64b5f6',
    },
    {
        text: 'Belrose',
        id: Location.BELROSE,
        color: '#22c55e',
    },
];

export const ageGroupResources = [
    {
        text: 'Years 3/4',
        id: 'Years 3/4',
        color: '#F7EBEC',
    },
    {
        text: 'Years 5/6',
        id: 'Years 5/6',
        color: '#DDBDD5',
    },
    {
        text: 'Years 7/8',
        id: 'Years 7/8',
        color: '#AC9FBB',
    },
    {
        text: 'Years 9/12',
        id: 'Years 9/12',
        color: '#59656F',
    },
];

export const appointmentResources = [
    {
        fieldName: 'location',
        title: 'location',
        instances: venueResources,
    },
    {
        fieldName: 'court',
        title: 'court',
        instances: courtResources,
    },
    {
        fieldName: 'ageGroup',
        title: 'ageGroup',
        instances: ageGroupResources,
    },
];
