/* eslint-disable no-plusplus */
import Moment from 'react-moment';
import { Terms2026 } from '../../data/Terms';
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
    'St Ives': 4,
    Belrose: 2,
};

export const ADULTS_AGE_GROUP_ID = '48b2bdf3-3acb-4f5a-b7e7-19ffca0f3c64';

export const getWeekDateFromTerm = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2026[term].date;
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

const atLocalMidnight = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const getTermWeek = (inputDate: Date): TermInfo => {
    const date = atLocalMidnight(inputDate);

    console.log(`Trying to find nearest term and week for date ${inputDate}`);

    let nearestTerm = 0;
    let nearestDiff = Infinity;

    for (let i = 0; i < Terms2026.length; i++) {
        const termStart = atLocalMidnight(Terms2026[i].date);

        const termEnd = new Date(termStart);
        termEnd.setDate(termEnd.getDate() + Terms2026[i].weeks * 7 - 1);

        // Inside term
        if (date >= termStart && date <= termEnd) {
            const diffDays =
                (date.getTime() - termStart.getTime()) / (1000 * 60 * 60 * 24);

            return {
                term: i,
                week: Math.floor(diffDays / 7),
            };
        }

        // Track nearest term by start date
        const diff = Math.abs(date.getTime() - termStart.getTime());
        if (diff < nearestDiff) {
            nearestDiff = diff;
            nearestTerm = i;
        }
    }

    return {
        term: nearestTerm,
        week: 0,
    };
};

export const getWeekDate = (
    term: number,
    week: number,
    isSundayComp: boolean = true,
) => {
    const termDate = Terms2026[term].date;
    const newDate = new Date(
        termDate.getFullYear(),
        termDate.getMonth(),
        termDate.getDate() + week * 7 + (!isSundayComp ? -4 : 0), // If wednesday, minus 3 days
    );
    return <Moment format="dddd[,] MMMM Do YYYY">{newDate}</Moment>;
};
