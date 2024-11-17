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
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import { PlayerDataProps } from '../players/components/Types';

export const TermSetup = (props: PlayerDataProps) => {
    const toTitleCase = (str: string) => {
        return str
            .toLowerCase()
            .split(' ')
            .map((word: string) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    };
    const { ageGroups } = props;

    const hourSlots = [
        {
            slot: 0,
            time: '8-9am',
        },
        {
            slot: 1,
            time: '9-10am',
        },
        {
            slot: 2,
            time: '10-11am',
        },
        {
            slot: 3,
            time: '11-12pm',
        },
        {
            slot: 4,
            time: '12-1pm',
        },
        {
            slot: 5,
            time: '1-2pm',
        },
        {
            slot: 6,
            time: '2-3pm',
        },
        {
            slot: 7,
            time: '3-4pm',
        },
        {
            slot: 8,
            time: '4-5pm',
        },
    ];

    const rows = [
        {
            name: 'Court 1',
            hourSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
        {
            name: 'Court 2',
            hourSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
    ];

    const handleSelectInput = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;

        console.log(name, value);
    };

    const dropDown = (
        <div className="w-4/5 py-2 flex-grow">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Years</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=""
                    label="Age Group"
                    name="teamId"
                    onChange={handleSelectInput}
                >
                    {ageGroups.map((ageGroup) => (
                        <MenuItem key={ageGroup.id} value={ageGroup.id}>
                            {toTitleCase(ageGroup.displayName)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

    return (
        <PageContainer>
            <PageTitle text="Term Setup" />
            <div className="text-xl font-bold float-right flex gap-2">
                <ArrowLeftCircleIcon className="h-8 w-8" />
                <p>Term 1 2025</p>
                <ArrowRightCircleIcon className="h-8 w-8" />
            </div>
            <section className="pt-12">
                <div>
                    <h1 className="text-2xl font-bold">Week 1</h1>
                    <h2 className="text-md font-medium">
                        Sunday 16th January, 2025
                    </h2>
                    <h2 className="text-xl font-bold pt-6">St Ives</h2>

                    <TableContainer>
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                            padding="checkbox"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    {hourSlots.map((hourSlot) => (
                                        <TableCell>{hourSlot.time}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        {row.hourSlots.map((hourSlot) => (
                                            <TableCell>{dropDown}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </section>
        </PageContainer>
    );
};

export default TermSetup;
