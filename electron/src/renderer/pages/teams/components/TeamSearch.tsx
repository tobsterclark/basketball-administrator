import { Autocomplete, TextField } from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { TeamCache, TeamSearchProps } from './Types';

interface AutocompleteOption {
    label: string;
    id: string;
}

export const TeamSearch = (props: TeamSearchProps): React.ReactElement => {
    const { handleAddTeamButtonPress, cachedTeams, setSelectedTeam } = props;
    const [selectedOption, setSelectedOption] =
        useState<AutocompleteOption | null>(null);

    const transformTeams = (
        teams: Map<string, TeamCache>,
    ): AutocompleteOption[] => {
        const options: AutocompleteOption[] = [];
        teams.forEach((team) => {
            options.push({ id: team.id, label: team.name });
        });
        return options;
    };

    useEffect(() => {
        if (selectedOption) {
            const updatedOption = transformTeams(cachedTeams).find(
                (option) => option.id === selectedOption.id,
            );
            setSelectedOption(updatedOption || null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cachedTeams]);

    return (
        <div className="flex flex-row pt-12 pb-6 gap-6">
            <div className="md:w-1/2 xl:w-1/3 2xl:w-1/4">
                <Autocomplete
                    disablePortal
                    value={selectedOption}
                    onChange={(_, value) => {
                        setSelectedOption(value);
                        setSelectedTeam(value?.id || '');
                    }}
                    blurOnSelect
                    options={transformTeams(cachedTeams)}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    renderInput={(params) => (
                        <TextField
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...params}
                            label="Select team"
                            id="teamSearchInput"
                            autoFocus
                            variant="outlined"
                        />
                    )}
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedOption(null);
                        handleAddTeamButtonPress();
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    New Team
                    <PlusCircleIcon className="h-6 w-6 inline-block ml-2" />
                </button>
            </div>
        </div>
    );
};
