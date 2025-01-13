import { Game } from "../gamesetup/types";

export interface CourtTableProps {
    courtNumber: number;
    tableData: {
        time: string;
        gameId: string;
        ageGroup: string;
        lightTeam: string;
        darkTeam: string;
        winningTeam: string;
    }[];
    setSelectedGame: React.Dispatch<React.SetStateAction<string>>;
}
