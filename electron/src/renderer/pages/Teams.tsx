import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';
import SectionTitle from '../ui_components/SectionTitle';
import FormCancelSave from '../ui_components/FormCancelSave';

const Teams = () => {
    const teamMemberRowsTEMP = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        number: i + 1,
        first_name: `John Doe ${i + 1}`,
    }));

    return (
        <PageContainer>
            <PageTitle text="Team Management" />
            <div className="flex flex-row pt-12 pb-6 gap-6">
                <div className="md:w-1/2 xl:w-1/3 2xl:w-1/4">
                    <TextField
                        id="teamSearchInput"
                        label="Search teams"
                        variant="filled"
                        autoFocus
                        fullWidth
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        New Team
                        <PlusCircleIcon className="h-6 w-6 inline-block ml-2" />
                    </button>
                </div>
            </div>
            <div className="flex flex-row gap-12 justify-between pt-2">
                {/* Team editor */}
                <div className="w-1/4">
                    <button type="button" className="flex flex-row gap-4">
                        <SectionTitle text="teamName" />
                        <PencilSquareIcon className="h-6 w-6 inline-block mt-1" />
                    </button>

                    {/* Age and Division drop-down */}
                    <div className="flex flex-row gap-4 pt-6">
                        <div className="w-1/2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Age Group
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value="Years 5-6"
                                    label="Age Group"
                                >
                                    <MenuItem value="Years 3-4">
                                        Years 3-4
                                    </MenuItem>
                                    <MenuItem value="Years 5-6">
                                        Years 5-6
                                    </MenuItem>
                                    <MenuItem value="Years 7-8">
                                        Years 7-8
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-1/2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Division
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value="N/A"
                                    label="Division"
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="N/A">N/A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Table for members */}
                    <div className="w-full">
                        <h3 className="text-lg font-medium pt-6 pb-2">
                            Members
                        </h3>
                        <TableContainer className="shadow-md">
                            <Table>
                                <TableBody>
                                    {teamMemberRowsTEMP.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="w-16">
                                                {row.number}
                                            </TableCell>
                                            <TableCell>
                                                {row.first_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <TrashIcon className="h-4 w-4 inline-block text-red-600" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="pt-8 pb-4">
                            <FormCancelSave />
                        </div>
                    </div>
                </div>

                <div className="flex-grow">
                    <p>hi</p>
                </div>

                <div className="flex-grow">
                    <p>hi</p>
                </div>
            </div>
        </PageContainer>
    );
};

export default Teams;
