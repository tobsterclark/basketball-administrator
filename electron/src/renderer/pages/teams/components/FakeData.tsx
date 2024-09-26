import {
    ArrowDownTrayIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { GridColDef } from '@mui/x-data-grid';

export const teamMemberRowsTEMP = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    playerId: '',
    number: i + 1,
    name: `Team Member`,
    toBeRemoved: false,
}));

export const standingsRowsTEMP = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    position: `${i + 1}th`,
    teamName: `Basketball!`,
    points: 10 * (i + 1),
}));

export const recentGamesRowsTEMP = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    date: `21/3`,
    venue: `Belrose`,
    court: `CT1`,
    teamA: `Sharks`,
    teamB: `Bounce`,
}));

export const standingsColumns: GridColDef[] = [
    {
        field: 'position',
        headerName: 'Pos',
        width: 40,
    },
    {
        field: 'teamName',
        headerName: 'Team',
        flex: 1,
    },
    {
        field: 'points',
        headerName: 'Points',
        flex: 0.35,
    },
];

export const recentGamesColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
    },
    {
        field: 'venue',
        headerName: 'Venue',
    },
    {
        field: 'court',
        headerName: 'Court',
    },
    {
        field: 'teamA',
        headerName: 'Team A',
    },
    {
        field: 'teamB',
        headerName: 'Team B',
    },
    {
        field: 'download',
        headerName: ``,
        sortable: false,
        align: 'right',
        filterable: false,
        renderCell: () => (
            <ArrowDownTrayIcon className="h-4 w-4 mr-4 inline-block text-red-600" />
        ),
        flex: 0.1,
    },
];
