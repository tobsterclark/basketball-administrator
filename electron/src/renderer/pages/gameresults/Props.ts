import { Game } from "../gamesetup/types";

export interface CourtTableProps {
    tableData: {
        time: string;
        gameId: string;
        courtNumber: number;
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
