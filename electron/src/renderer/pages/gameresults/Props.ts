import { Game } from "../gamesetup/types";

export interface CourtTableProps {
    courtNumber: number;
    tableData: {
        time: string;
        gameId: string;
        ageGroup: string;
        lightTeam: string;
        lightTeamScore: number;
        darkTeam: string;
        darkTeamScore: number;
        winningTeam: string;
    }[];
    selectedGame: string;
    setSelectedGame: React.Dispatch<React.SetStateAction<string>>;
}
