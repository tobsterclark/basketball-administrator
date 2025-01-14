/** eslint-disable no-console */
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import FormCancelSave from '../../../ui_components/FormCancelSave';
import { PlayerDataProps } from './Types';
import { TrashIcon } from '@heroicons/react/24/solid';

const toTitleCase = (str: any) => {
    return str.toLowerCase().split(' ').map((word: any) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export const PlayerData = (props: PlayerDataProps) => {
    const {
        player,
        updatePlayer,
        teams,
        ageGroups,
        isCreatingNewPlayer,
        onValidSave,
        onCancel,
        deletePlayer,
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

    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
            useState(false);

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
                                        {toTitleCase(ageGroup.displayName)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* Delete Player */}
                <div className='pb-8 flex flex-col items-center'>
                    {deleteConfirmationVisible ? (
                        <div className="flex-row w-full shadow-md rounded-md text-center justify-center items-center py-4 px-2 gap-2 bg-red-300 disabled:bg-[#e2e8f0] disabled:cursor-not-allowed">
                            <p>
                                Are you sure you want to delete this player? This
                                action is irreversible.
                            </p>
                            <div className="flex flex-row gap-6 pt-4 px-4">
                                <div className="w-1/2">
                                    <button
                                        type="button"
                                        disabled={player === null}
                                        onClick={() =>
                                            setDeleteConfirmationVisible(false)
                                        }
                                        className="rounded-md shadow-md w-full justify-center items-center py-4 px-2 gap-2 bg-blue-400 text-white hover:cursor-pointer hover:bg-blue-500"
                                    >
                                        <p className="font-bold">Cancel</p>
                                    </button>
                                </div>
                                <div className="w-1/2">
                                    <button
                                        type="button"
                                        disabled={player === null}
                                        onClick={() => {
                                            if (deletePlayer) {
                                                deletePlayer();
                                            }
                                            setDeleteConfirmationVisible(false);
                                        }}
                                        className="rounded-md shadow-md w-full flex justify-center items-center py-4 px-2 gap-2 bg-red-500 text-white hover:cursor-pointer hover:bg-red-600"
                                    >
                                        <p className="font-bold">Delete Player</p>
                                        <TrashIcon className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            disabled={player === null}
                            onClick={() => setDeleteConfirmationVisible(true)}
                            className="flex w-2/3 disabled:text-gray-400 shadow-md rounded-md justify-center items-center py-4 px-2 gap-2 bg-red-200 hover:cursor-pointer hover:bg-red-300 disabled:bg-[#e2e8f0] disabled:cursor-not-allowed"
                        >
                            <p className="font-bold">Delete Player</p>
                            <TrashIcon className="h-6 w-6" />
                        </button>
                    )}
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
                            else {
                                console.warn('new player not valid');
                                toast.warn('Please fill in all fields');
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
