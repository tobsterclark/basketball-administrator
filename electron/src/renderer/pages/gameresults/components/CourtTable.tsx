import React from 'react';
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
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { TableEntry } from '../GameResults';

const CourtTable = ({
    tableData,
    selectedGame,
    setSelectedGame,
    rowRefs,
}: {
    tableData: TableEntry[];
    selectedGame: string;
    setSelectedGame: (gameId: string) => void;
    rowRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}) => {
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
                            <TableCell>Court</TableCell>
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
                                ref={(el) => (rowRefs.current[row.gameId] = el)}
                            >
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.courtNumber}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {row.lightTeam}
                                        <HandThumbUpIcon
                                            className={`h-5 w-5 ${
                                                row.lightTeam !== row.winningTeam
                                                    ? 'hidden'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {row.lightTeamScore === -1
                                        ? 'FFT'
                                        : row.lightTeamScore}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {row.darkTeam}
                                        <HandThumbUpIcon
                                            className={`h-5 w-5 ${
                                                row.darkTeam !== row.winningTeam
                                                    ? 'hidden'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </TableCell>
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
