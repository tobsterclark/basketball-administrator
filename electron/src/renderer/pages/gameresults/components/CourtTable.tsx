import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { CourtTableProps } from '../Props';

const CourtTable = (props: CourtTableProps) => {
    const { tableData, selectedGame, setSelectedGame } = props;

    return (
        <div className="pt-8 pr-2">
            <h2 className="font-bold text-lg pb-2">{tableData[0].ageGroup}</h2>
            <TableContainer
                component={Paper}
                sx={{ maxWidth: 800, margin: 'auto' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="Game Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Light Team</TableCell>
                            <TableCell>Pts</TableCell>
                            <TableCell>Dark Team</TableCell>
                            <TableCell>Pts</TableCell>
                            <TableCell>Winner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow
                                key={index}
                                className={`hover:bg-blue-300 cursor-pointer ${
                                    row.winningTeam === ''
                                        ? 'bg-red-200'
                                        : 'bg-green-200'
                                } ${
                                    selectedGame === row.gameId
                                        ? '!bg-blue-400'
                                        : ''
                                }`}
                                onClick={() => setSelectedGame(row.gameId)}
                            >
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.courtNumber}</TableCell>
                                <TableCell>{row.lightTeam}</TableCell>
                                <TableCell>
                                    {row.lightTeamScore === -1
                                        ? 'FFT'
                                        : row.lightTeamScore}
                                </TableCell>
                                <TableCell>{row.darkTeam}</TableCell>
                                <TableCell>
                                    {row.darkTeamScore === -1
                                        ? 'FFT'
                                        : row.darkTeamScore}
                                </TableCell>
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
