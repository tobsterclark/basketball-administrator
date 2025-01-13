export interface CourtTableProps {
    courtNumber: number;
    tableData: {
        time: string;
        ageGroup: string;
        lightTeam: string;
        darkTeam: string;
        winningTeam: string;
    }[];
}
