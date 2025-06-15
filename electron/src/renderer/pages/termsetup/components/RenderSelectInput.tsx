import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { AgeGroupDataResponse } from '../../players/components/Types';
import { timeSlotParams } from '../util/types';
import { toTitleCase } from '../util/util';

const handleSelectInput = (
    e: SelectChangeEvent<string>,
    timeSlotId: string,
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
) => {
    const selectedValue = e.target.value;

    setModifiedTimeSlots((prev) =>
        prev.map((timeSlot) =>
            timeSlot.id === timeSlotId
                ? { ...timeSlot, ageGroupId: selectedValue }
                : timeSlot,
        ),
    );
};

export const renderSelectInput = (
    timeSlotId: string,
    ageGroups: AgeGroupDataResponse[],
    setModifiedTimeSlots: React.Dispatch<
        React.SetStateAction<timeSlotParams[]>
    >,
    modifiedTimeSlots: timeSlotParams[],
) => {
    return (
        <FormControl
            variant="standard"
            fullWidth
            sx={{
                width: {
                    xs: '50%',
                    sm: '60%',
                    md: '80%',
                    lg: '100%',
                    xl: '100%',
                },
            }}
        >
            <InputLabel id={`select-label-${timeSlotId}`}>Event</InputLabel>
            <Select
                labelId={`select-label-${timeSlotId}`}
                id={`select-${timeSlotId}`}
                value={
                    modifiedTimeSlots.find(
                        (timeSlot) => timeSlot.id === timeSlotId,
                    )?.ageGroupId || ''
                }
                onChange={(e) =>
                    handleSelectInput(e, timeSlotId, setModifiedTimeSlots)
                }
                sx={{ fontSize: '1em' }}
            >
                {ageGroups.map((ageGroup) => (
                    <MenuItem key={ageGroup.id} value={ageGroup.id}>
                        {toTitleCase(ageGroup.displayName)}
                    </MenuItem>
                ))}
                <MenuItem value="noEvent">No Event</MenuItem>
            </Select>
        </FormControl>
    );
};
