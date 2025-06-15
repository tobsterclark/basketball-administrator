import { Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { timeSlotParams } from '../util/types';
import { useDebounce } from '../util/useDebounce';

type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    // eslint-disable-next-line react/require-default-props
    hidden?: boolean;
};

const TextInput = (props: TextInputProps) => {
    const { value, onChange, hidden } = props;

    if (hidden === true) return <div />;

    return (
        <TextField
            label="Placeholder reason"
            multiline
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxRows={4}
            variant="filled"
        />
    );
};

type PlaceholderWeekProps = {
    updateTimeslots: (timeslots: timeSlotParams[]) => void;
    timeslots: timeSlotParams[];
};

export const PlaceholderWeek = (props: PlaceholderWeekProps) => {
    const { timeslots, updateTimeslots } = props;
    const [selected, setSelected] = useState(
        timeslots.find((val) => val.placeholder) !== undefined,
    );
    const [reason, setReason] = useState('');

    // Use debouncer to avoid constantly updating the database everytime the reason text is changed
    const debouncedReason = useDebounce(reason, 500);

    useEffect(() => {
        const newTimeslots = timeslots.map((val) => {
            return {
                ...val,
                placeholder: selected,
                placeholderReason: debouncedReason,
            };
        });

        updateTimeslots(newTimeslots);
    }, [debouncedReason, selected])

    return (
        <div className="flex flex-col pt-6 gap-4">
            <div className="flex gap-4 items-center">
                <p>Set week as placeholder</p>
                <Checkbox
                    checked={selected}
                    onChange={(_, checked) => setSelected(checked)}
                />
            </div>

            <TextInput
                value={reason}
                onChange={(value) => setReason(value)}
                hidden={!selected}
            />
        </div>
    );
};
