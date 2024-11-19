import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps } from '../players/components/Types';

export const TermSetup = (props: PlayerDataProps) => {
    type CourtSelections = {
        [week: number]: {
            [venue: string]: {
                [court: string]: {
                    [timeSlot: number]: string; // 'ageGroupId' or 'noEvent'
                };
            };
        };
    };

    const { ageGroups } = props;

    const venues: { [key: string]: string[] } = {
        'St Ives': ['Court 1', 'Court 2', 'Court 3'],
        Belrose: ['Court 1', 'Court 2'],
    };

    const hourSlots = [
        { slot: 0, time: '9-10am' },
        { slot: 1, time: '10-11am' },
        { slot: 2, time: '11-12pm' },
        { slot: 3, time: '12-1pm' },
        { slot: 4, time: '1-2pm' },
        { slot: 5, time: '2-3pm' },
        { slot: 6, time: '3-4pm' },
        { slot: 7, time: '4-5pm' },
    ];

    const totalWeeks = 10;

    const [courtSelections, setCourtSelections] = useState<CourtSelections>({});

    const handleSelectInput = (
        e: SelectChangeEvent<string>,
        week: number,
        venue: string,
        court: string,
        slot: number,
    ) => {
        const selectedAgeGroupId = e.target.value;

        setCourtSelections((prevSelections) => ({
            ...prevSelections,
            [week]: {
                ...prevSelections[week],
                [venue]: {
                    ...prevSelections[week]?.[venue],
                    [court]: {
                        ...prevSelections[week]?.[venue]?.[court],
                        [slot]: selectedAgeGroupId,
                    },
                },
            },
        }));
    };

    const renderDropDown = (
        week: number,
        venue: string,
        court: string,
        slot: number,
    ) => (
        <FormControl variant="standard" fullWidth>
            <InputLabel id={`select-label-${week}-${venue}-${court}-${slot}`}>
                Event
            </InputLabel>
            <Select
                labelId={`select-label-${week}-${venue}-${court}-${slot}`}
                id={`select-${week}-${venue}-${court}-${slot}`}
                value={courtSelections[week]?.[venue]?.[court]?.[slot] || ''}
                onChange={(e) => handleSelectInput(e, week, venue, court, slot)}
            >
                {ageGroups.map((ageGroup) => (
                    <MenuItem key={ageGroup.id} value={ageGroup.id}>
                        {ageGroup.displayName}
                    </MenuItem>
                ))}
                <MenuItem value="noEvent">No Event</MenuItem>
            </Select>
        </FormControl>
    );

    const renderTable = (week: number, venue: string) => (
        <TableContainer>
            <Table aria-label={`${venue} table`}>
                <TableHead>
                    <TableRow>
                        <TableCell>Court</TableCell>
                        {hourSlots.map((slot) => (
                            <TableCell key={slot.slot}>{slot.time}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {venues[venue].map((court) => (
                        <TableRow key={court}>
                            <TableCell>{court}</TableCell>
                            {hourSlots.map((slot) => (
                                <TableCell key={`${court}-${slot.slot}`}>
                                    {renderDropDown(
                                        week,
                                        venue,
                                        court,
                                        slot.slot,
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderWeek = (week: number) => (
        <section key={week} className="pt-6">
            <h2 className="text-2xl font-bold">Week {week}</h2>
            {Object.keys(venues).map((venue) => (
                <div key={venue} className="pt-4">
                    <h3 className="text-xl font-bold">{venue}</h3>
                    {renderTable(week, venue)}
                </div>
            ))}
        </section>
    );

    return (
        <PageContainer>
            <PageTitle text="Term Setup" />
            <div className="text-xl font-bold float-right flex gap-2">
                <ArrowLeftCircleIcon className="h-8 w-8" />
                <p>Term 1 2025</p>
                <ArrowRightCircleIcon className="h-8 w-8" />
            </div>
            {[...Array(totalWeeks)].map((_, week) => renderWeek(week + 1))}
        </PageContainer>
    );
};

export default TermSetup;
