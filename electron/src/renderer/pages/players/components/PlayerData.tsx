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
        selectedPlayer,
        updateSelectedPlayer,
        teams,
        ageGroups,
        isCreatingNewPlayer,
        onCancelClick,
        onSaveClick,
        saveButtonDisabled,
    } = props;

    // Takes the text field name and value and updates the selected player with it
    // Expecting the provided name to be a valid key in the PlayerCache object
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!selectedPlayer) return;
        let { value } = e.target;

        if (e.target.name === 'number') {
            // Validation on Player Number
            // Remove non numeric characters and leading 0's
            // Set max length to 6 characters
            value = value.replace(/\D/g, '').replace(/^0+(?!$)/, '');
            value = value.substring(0, 6);
        }

        updateSelectedPlayer({ ...selectedPlayer, [e.target.name]: value });
    };

    // Takes input from a selection and updates selected player
    // Expecting the provided name to be a valid key in the PlayerCachee object
    const handleSelectInput = (e: SelectChangeEvent<string>) => {
        if (!selectedPlayer) return;
        const { name, value } = e.target;

        updateSelectedPlayer({ ...selectedPlayer, [name]: value });
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
                        value={selectedPlayer?.firstName ?? ''}
                        onChange={handleTextInput}
                        disabled={selectedPlayer === null}
                    />
                    <TextField
                        id="playerDataEditor_lastName"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={selectedPlayer?.lastName ?? ''}
                        onChange={handleTextInput}
                        disabled={selectedPlayer === null}
                    />
                </div>

                {/* Player Number */}
                <div className="w-36 pb-8">
                    <TextField
                        id="playerDataEditor_number"
                        label="Player Number"
                        variant="outlined"
                        name="number"
                        value={selectedPlayer?.number ?? ''}
                        onChange={handleTextInput}
                        disabled={selectedPlayer === null}
                    />
                </div>

                <div className="flex flex-row gap-4 pb-12">
                    {/* Team Select */}
                    <div className="w-2/3 flex-grow">
                        <FormControl fullWidth>
                            <InputLabel
                                id="demo-simple-select-label"
                                disabled={selectedPlayer === null}
                            >
                                Team
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedPlayer?.teamId ?? ''}
                                label="Team"
                                name="teamId"
                                disabled={selectedPlayer === null}
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
                                disabled={selectedPlayer === null}
                            >
                                Age Group
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedPlayer?.ageGroupId ?? ''}
                                label="Age Group"
                                disabled={selectedPlayer === null}
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
                        cancelButtonDisabled={selectedPlayer === null}
                        onCancelClick={onCancelClick}
                        // Add functionality to savebutton disabled if new player all fields arent filled
                        saveButtonDisabled={saveButtonDisabled}
                        saveButtonText={
                            isCreatingNewPlayer ? 'Add Player' : 'Save'
                        }
                        onSaveClick={onSaveClick}
                    />
                </div>
            </div>
        </div>
    );
};
