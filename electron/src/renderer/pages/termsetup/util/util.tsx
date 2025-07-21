import Moment from 'react-moment';
import Terms2025 from '../../data/Terms';
import { TermInfo } from './types';

export const hourSlots = [
    { slot: 0, time: '9am' },
    { slot: 1, time: '10am' },
    { slot: 2, time: '11am' },
    { slot: 3, time: '12pm' },
    { slot: 4, time: '1pm' },
    { slot: 5, time: '2pm' },
    { slot: 6, time: '3pm' },
    { slot: 7, time: '4pm' },
    { slot: 8, time: '5pm' },
    { slot: 9, time: '6pm' },
];

export const venueCourts = {
    'St Ives': 3,
    Belrose: 2,
};

export const ADULTS_AGE_GROUP_ID = '48b2bdf3-3acb-4f5a-b7e7-19ffca0f3c64';

export const getWeekDateFromTerm = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7 + (!isSundayComp ? -4 : 0), // If wednesday, minus 3 days
    );
    return newDate;
};

export const toTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const getTermWeek = (date: Date): TermInfo => {
    let currentTerm = 1;

    for (let i = 0; i < Terms2025.length; i++) {
        const termStart = Terms2025[i].date;
        const termEnd = new Date(
            termStart.getDate() + Terms2025[i].weeks * 7 - 1,
        );

        if (date >= termStart && date <= termEnd) {
            const diffDays = Math.floor(
                (date.getTime() - termStart.getTime()) / (1000 * 60 * 60 * 24),
            );
            const week = Math.floor(diffDays / 7) + 1;
            return { term: i, week };
        }

        // When outside of any term range default to the next closest term
        if (date >= termStart && date <= Terms2025[i + 1].date) {
            currentTerm = i + 1;
        }
    }

    return {
        term: currentTerm,
        week: 0,
    }; // date is outside all term ranges
};

export const getWeekDate = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2025[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7 + (!isSundayComp ? -4 : 0), // If wednesday, minus 3 days
    );
    return <Moment format="dddd[,] MMMM Do YYYY">{newDate}</Moment>;
};
