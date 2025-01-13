import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { CourtTableProps } from "../Props";

const CourtTable = (props: CourtTableProps) => {
    const { courtNumber, tableData } = props;

    return (
        <div className="pt-8 pr-2">
            <h2 className="font-bold text-lg pb-2">Court {courtNumber}</h2>
            <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="Game Table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Light Team</TableCell>
                        <TableCell>Dark Team</TableCell>
                        <TableCell>Winner</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow
                            key={index}
                            className={`hover:bg-blue-400 cursor-pointer ${row.winningTeam === '' ? 'bg-red-200' : 'bg-green-200'}`}
                        >
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.ageGroup}</TableCell>
                            <TableCell>{row.lightTeam}</TableCell>
                            <TableCell>{row.darkTeam}</TableCell>
                            <TableCell>{row.winningTeam}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CourtTable;