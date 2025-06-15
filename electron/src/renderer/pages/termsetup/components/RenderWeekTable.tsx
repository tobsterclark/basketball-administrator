import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import moment from 'moment-timezone';
import { AgeGroupDataResponse } from '../../players/components/Types';
import { timeSlotParams } from '../util/types';
import { getWeekDateFromTerm, hourSlots, venueCourts } from '../util/util';
import { renderSelectInput } from './RenderSelectInput';

export const renderWeekTable = (
    term: number,
    week: number,
    venue: keyof typeof venueCourts,
    ageGroups: AgeGroupDataResponse[],
    venueTimeSlots: timeSlotParams[],
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
    modifiedTimeSlots: timeSlotParams[],
    isSundayComp: boolean,
    isLoading: boolean,
) => {
    const currentDate = getWeekDateFromTerm(term, week, isSundayComp);

    const findEntryByDateTime = (courtIndex: number, timeSlot: number) => {
        const time = moment(hourSlots[timeSlot].time, 'hha');
        let finalMoment = moment(currentDate);
        finalMoment = finalMoment.set({
            hour: time.hours(),
            minute: time.minutes(),
            second: 0,
        });

        const dbLocation = venue === 'St Ives' ? 'ST_IVES' : 'BELROSE';

        const entry = venueTimeSlots.find(
            (timeSlotEntry) =>
                timeSlotEntry.date.getTime() ===
                    finalMoment.toDate().getTime() &&
                timeSlotEntry.location === dbLocation &&
                timeSlotEntry.court === courtIndex,
        );

        return entry;
    };

    const table = (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Court</TableCell>
                        {hourSlots.map((hour) => (
                            <TableCell key={hour.slot}>{hour.time}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: venueCourts[venue] }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            {hourSlots.map((hour) => (
                                <TableCell key={hour.slot}>
                                    {renderSelectInput(
                                        findEntryByDateTime(i + 1, hour.slot)
                                            ?.id || '',
                                        ageGroups,
                                        setModifiedTimeSlots,
                                        modifiedTimeSlots,
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const loadingTable = (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Court</TableCell>
                        {hourSlots.map((hour) => (
                            <TableCell key={hour.slot}>{hour.time}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: venueCourts[venue] }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            {hourSlots.map((hour) => (
                                <TableCell key={hour.slot}>
                                    <div
                                        role="status"
                                        className="space-y-2.5 animate-pulse max-w-lg"
                                    >
                                        <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                                        <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return isLoading ? loadingTable : table;
};
