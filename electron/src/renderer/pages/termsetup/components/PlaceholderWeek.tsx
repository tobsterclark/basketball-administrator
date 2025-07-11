import { Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
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
    onChange: (placeholder: boolean, placeholderReason?: string) => void;
    timeslots: { placeholder: boolean; placeholderReason?: string }[];
};

export const PlaceholderWeek = (props: PlaceholderWeekProps) => {
    const { timeslots, onChange } = props;
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState(false);
    const [reason, setReason] = useState(
        timeslots.find((slot) => slot.placeholder)?.placeholderReason,
    );

    // Use debouncer to avoid constantly updating the database everytime the reason text is changed
    const debouncedReason = useDebounce(reason, 500);

    useEffect(() => {
        const placeholder = timeslots.find((slot) => slot.placeholder);
        if (placeholder) {
            console.log('timeslot placeholder found');
            setSelected(true);

            if (!loaded) {
                setReason(placeholder.placeholderReason);
                setLoaded(true);
            }
        }
    }, [timeslots]);

    useEffect(() => {
        if (!loaded) {
            return;
        }
        onChange(selected, debouncedReason);
    }, [debouncedReason]);

    const updatePlaceholderSelected = (checked: boolean) => {
        onChange(checked, reason);
        setSelected(checked);
    };

    return (
        <div className="flex flex-col pt-6 gap-4">
            <div className="flex gap-4 items-center">
                <p>Set week as placeholder</p>
                <Checkbox
                    checked={selected}
                    onChange={(_, checked) =>
                        updatePlaceholderSelected(checked)
                    }
                />
            </div>

            <TextInput
                value={reason || ''}
                onChange={(value) => setReason(value)}
                hidden={!selected}
            />
        </div>
    );
};
