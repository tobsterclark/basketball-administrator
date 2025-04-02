import { Autocomplete, TextField } from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { PlayerCache, PlayerSearchProps } from './Types';

interface AutocompleteOption {
    label: string;
    id: string;
}

export const PlayerSearch = (props: PlayerSearchProps): React.ReactElement => {
    const { handleAddPlayerButtonPress, cachedPlayers, setSelectedPlayer } = props;
    const [selectedOption, setSelectedOption] =
        useState<AutocompleteOption | null>(null);

    const transformPlayers = (players: Map<string, PlayerCache>): AutocompleteOption[] => {
        return Array.from(players.values()).map(player => ({
            id: player.id, // Use ID for uniqueness
            label: `${player.firstName} ${player.lastName}` // Only display first and last name
        }));
    };
    
    const getOptionLabel = (option: AutocompleteOption): string => {
        return option.label; // Display only the label in the dropdown
    };
    
    const isOptionEqualToValue = (option: AutocompleteOption, value: AutocompleteOption): boolean => {
        return option.id === value.id; // Compare by player ID to ensure uniqueness
    };

    useEffect(() => {
        if (props.selectedPlayer) {
            const updatedOption = transformPlayers(cachedPlayers).find(
                (option) => option.id === props.selectedPlayer
            );
            setSelectedOption(updatedOption || null);
        }
    }, [props.selectedPlayer, cachedPlayers]);

    return (
        <div className="flex flex-row pt-12 pb-6 gap-6">
            <div className="md:w-1/2 xl:w-1/3 2xl:w-1/4">
                <Autocomplete
                    disablePortal
                    value={selectedOption}
                    onChange={(_, value) => {
                        setSelectedOption(value);
                        setSelectedPlayer(value?.id || '');
                    }}
                    blurOnSelect
                    getOptionLabel={getOptionLabel}
                    options={transformPlayers(cachedPlayers)}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...params}
                            label="Select player"
                            id="playerSearchInput"
                            autoFocus
                            variant="outlined"
                        />
                    )}
                />
            </div>
            {/* <div>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedOption(null);
                        handleAddPlayerButtonPress();
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    New Player
                    <PlusCircleIcon className="h-6 w-6 inline-block ml-2" />
                </button>
            </div> */}
        </div>
    );
};
