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
    const [selected, setSelected] = useState(false);
    const [reason, setReason] = useState<string | undefined>(undefined);

    // Use debouncer to avoid constantly updating the database everytime the reason text is changed
    const [reasonInput, setReasonInput] = useState<string | undefined>(
        undefined,
    );
    const debouncedReason = useDebounce(reasonInput, 500);

    useEffect(() => {
        const placeholder = timeslots.find((slot) => slot.placeholder);
        if (placeholder) {
            setSelected(true);
            setReason(placeholder.placeholderReason);
        } else {
            setSelected(false);
            setReason(undefined);
        }
    }, [timeslots]);

    useEffect(() => {
        if (debouncedReason !== undefined) {
            onChange(selected, debouncedReason);
        }
    }, [debouncedReason]);

    const updatePlaceholderSelected = (checked: boolean) => {
        onChange(checked, reason);
        setSelected(checked);
    };

    const updatePlaceholderReason = (input: string) => {
        setReason(input);
        setReasonInput(input);
    };

    return (
        <div className="flex flex-col py-6 gap-4">
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
                onChange={(value) => updatePlaceholderReason(value)}
                hidden={!selected}
            />
        </div>
    );
};
