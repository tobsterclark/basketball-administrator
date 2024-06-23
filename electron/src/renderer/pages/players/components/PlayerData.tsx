/** eslint-disable no-console */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { ChangeEvent } from 'react';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { PlayerDataProps } from './Types';

export const PlayerData = (props: PlayerDataProps) => {
    const {
        player,
        updatePlayer,
        teams,
        ageGroups,
        isCreatingNewPlayer,
        onValidSave,
        onCancel,
    } = props;

    // Used for checking if all fields are filled in new player creation, to disable save button
    const newPlayerIsValid = (): boolean =>
        player?.firstName !== '' &&
        player?.lastName !== '' &&
        player?.number !== 0 &&
        player?.teamId !== '' &&
        player?.ageGroupId !== '';

    // Takes the text field name and value and updates the selected player with it
    // Expecting the provided name to be a valid key in the PlayerCache object
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!player) return;
        let { value } = e.target;

        if (e.target.name === 'number') {
            // Validation on Player Number
            // Remove non numeric characters and leading 0's
            // Set max length to 6 characters
            value = value.replace(/\D/g, '').replace(/^0+(?!$)/, '');
            value = value.substring(0, 6);
        }

        updatePlayer({ ...player, [e.target.name]: value });
    };

    // Takes input from a selection and updates selected player
    // Expecting the provided name to be a valid key in the PlayerCachee object
    const handleSelectInput = (e: SelectChangeEvent<string>) => {
        if (!player) return;
        const { name, value } = e.target;

        updatePlayer({ ...player, [name]: value });
    };

    return (
        <div className="bg-gray-50 shadow-md rounded-md h-min">
            <div className="pl-6 pr-6 pt-4">
                {/* First Name & Last Name */}
                <div className="flex flex-row gap-4 pb-8">
                    <TextField
                        id="playerDataEditor_firstName"
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={player?.firstName ?? ''}
                        onChange={handleTextInput}
                        disabled={player === null}
                    />
                    <TextField
                        id="playerDataEditor_lastName"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={player?.lastName ?? ''}
                        onChange={handleTextInput}
                        disabled={player === null}
                    />
                </div>

                {/* Player Number */}
                <div className="w-36 pb-8">
                    <TextField
                        id="playerDataEditor_number"
                        label="Player Number"
                        variant="outlined"
                        name="number"
                        value={player?.number ?? ''}
                        onChange={handleTextInput}
                        disabled={player === null}
                    />
                </div>

                <div className="flex flex-row gap-4 pb-12">
                    {/* Team Select */}
                    <div className="w-2/3 flex-grow">
                        <FormControl fullWidth>
                            <InputLabel
                                id="demo-simple-select-label"
                                disabled={player === null}
                            >
                                Team
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={player?.teamId ?? ''}
                                label="Team"
                                name="teamId"
                                disabled={player === null}
                                onChange={handleSelectInput}
                            >
                                {teams.map((team) => (
                                    <MenuItem key={team.id} value={team.id}>
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* Age Group */}
                    <div className="flex-shrink w-1/3">
                        <FormControl fullWidth>
                            <InputLabel
                                id="demo-simple-select-label"
                                disabled={player === null}
                            >
                                Age Group
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={player?.ageGroupId ?? ''}
                                label="Age Group"
                                disabled={player === null}
                                name="ageGroupId"
                                onChange={handleSelectInput}
                            >
                                {ageGroups.map((ageGroup) => (
                                    <MenuItem
                                        key={ageGroup.id}
                                        value={ageGroup.id}
                                    >
                                        {ageGroup.displayName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="pb-8">
                    <FormCancelSave
                        cancelButtonDisabled={player === null}
                        saveButtonDisabled={
                            isCreatingNewPlayer
                                ? !newPlayerIsValid()
                                : player === null
                        }
                        saveButtonText={
                            isCreatingNewPlayer ? 'Add Player' : 'Save'
                        }
                        onCancelClick={onCancel}
                        onSaveClick={() => {
                            // TODO: Error handling
                            if (newPlayerIsValid() && player !== null)
                                onValidSave(player);
                            else console.warn('new player not valid');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
