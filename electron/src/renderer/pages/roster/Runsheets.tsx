import { useNavigate } from "react-router-dom";
import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { AppointmentEvent, PlayerDataProps, RosterDataProps } from "../players/components/Types";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

const Runsheets = (props: PlayerDataProps & RosterDataProps) => {
    const { ageGroups, allEvents, allGames } = props;
    const navigate = useNavigate();

    const getNewTitle = (gameId: string) => {
        const game = allGames.find((game) => game.id === gameId);
        if (!game) return "Unknown";
        return `${game.lightTeam.name} (W) vs ${game.darkTeam.name} (B)`;
    }

    const newAllEvents = allEvents.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.getFullYear() === 2025 && eventDate.getMonth() === 1 && eventDate.getDate() === 9;
    });

    console.log("loaded all events from props!");
    console.log(allEvents);

    const EventsTable: React.FC<Pick<RosterDataProps, 'allEvents'>> = ({ allEvents }) => {
        const tableRef = useRef<HTMLDivElement>(null);
      
        // Group events by age group
        const groupedEvents: Record<string, AppointmentEvent[]> = allEvents.reduce((acc, event) => {
          if (!acc[event.ageGroup]) acc[event.ageGroup] = [];
          acc[event.ageGroup].push(event);
          return acc;
        }, {} as Record<string, AppointmentEvent[]>);
      
        const handleDownloadPDF = () => {
            const element = tableRef.current;
            if (!element) return;
          
            html2pdf()
              .set({
                margin: 10,
                filename: "Runsheet.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
              })
              .from(element)
              .save();
          };
      
        return (
            <div>
                <div className="flex justify-center p-4">
                    <div ref={tableRef} className="w-[210mm] h-[297mm] bg-white px-8 pb-8">
                        {Object.keys(groupedEvents).map((ageGroup) => (
                        <div key={ageGroup} className="pb-4">
                            <Typography variant="h6" className="pb-2 font-bold">
                            {ageGroup}
                            </Typography>
                            <TableContainer component={Paper} className="shadow-md">
                            <Table size="small">
                                <TableHead>
                                <TableRow className="bg-gray-100">
                                    <TableCell>Time</TableCell>
                                    <TableCell>Court</TableCell>
                                    <TableCell>Teams</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {groupedEvents[ageGroup]
                                    .sort((a, b) => {
                                    const timeA = new Date(a.startDate).getTime();
                                    const timeB = new Date(b.startDate).getTime();
                                    if (timeA !== timeB) return timeA - timeB;
                                    return a.court - b.court;
                                    })
                                    .map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                        {event.startDate.toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                        </TableCell>
                                        <TableCell>{`Court ${event.court}`}</TableCell>
                                        <TableCell>{getNewTitle(event.id)}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                        ))}
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={handleDownloadPDF} className="mt-4">
                  Download PDF
                </Button>
            </div>
          );
      };
    return (
        <PageContainer>
            <PageTitle text="Roster" />
            <div className="flex gap-6 h-full">
                <div className='pt-4'>
                    <Button
                        variant="contained"
                        size="medium"
                        className="flex items-center"
                        onClick={() => navigate('/roster')}
                    >
                        <ArrowLongLeftIcon className="h-6 ml-2" />
                        Back to Roster
                    </Button>

                    <div className="pt-4">
                        <EventsTable allEvents={newAllEvents} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export default Runsheets;