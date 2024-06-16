import { TextField } from '@mui/material';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

interface PlayerSearchProps {
    searchBoxInput: string;
    setSearchBoxInput: (val: string) => void;
    addPlayerDisabled: boolean;
    handleAddPlayer: () => void;
}

export const PlayerSearch = (props: PlayerSearchProps): React.ReactElement => {
    const {
        searchBoxInput,
        setSearchBoxInput,
        addPlayerDisabled,
        handleAddPlayer,
    } = props;

    return (
        <div className="flex flex-row pt-12 pb-6 gap-6">
            <div className="md:w-1/2 xl:w-1/3 2xl:w-1/4">
                <TextField
                    id="playerSearchInput"
                    label="Search players"
                    variant="filled"
                    autoFocus
                    value={searchBoxInput}
                    onChange={(e) => setSearchBoxInput(e.target.value)}
                    fullWidth
                />
            </div>
            <div>
                <button
                    type="button"
                    disabled={addPlayerDisabled}
                    onClick={handleAddPlayer}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    New Player
                    <PlusCircleIcon className="h-6 w-6 inline-block ml-2" />
                </button>
            </div>
        </div>
    );
};
