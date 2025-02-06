import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    Toolbar,
    Resources,
    WeekView,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { TodayButton, ViewState } from '@devexpress/dx-react-scheduler';
import PageContainer from '../../ui_components/PageContainer';
import PageTitle from '../../ui_components/PageTitle';
import {
    PrismaCall,
    ModelName,
    CrudOperations,
} from '../../../general/prismaTypes';
import { IpcChannels } from '../../../general/IpcChannels';
import Terms2025 from '../data/Terms';
import React from 'react';
import { AppointmentEvent, PlayerDataProps, RosterDataProps } from '../players/components/Types';
import { toast } from 'react-toastify';
import { ArrowDownOnSquareStackIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { formatTime, locationToText, toTitleCase, appointmentResources, Location, Team, Timeslot, Game } from './Resources';
import html2pdf from "html2pdf.js";


const downloadRunsheet = async (gameId: string) => {
    const defaultFileName = `scoresheet-${gameId}.pdf`;

    const toastId = toast.loading('Downloading PDF...');
    try {
        const result = await window.electron.ipcRenderer.invoke('SavePDF', {
            gameId,
            defaultFileName,
        });
        console.log('result:');
        console.log(result);
        if (result.success) {
            toast.update(toastId, {
                render: `PDF saved successfully at ${result.filePath}`,
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            toast.update(toastId, {
                render: `Error: ${result.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error('Error saving PDF:');
        console.error(error);
        toast.update(toastId, {
            render: `An error occurred while saving the ZIP: ${
                (error as Error).message
            }`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
        });
    }
};

const downloadMultipleRunsheets = async (gameIds: string[]) => {
    const defaultFileName = `scoresheets.zip`;

    const toastId = toast.loading('Downloading ZIP...');
    try {
        const result = await window.electron.ipcRenderer.invoke('SaveZIP', {
            gameIds,
            defaultFileName,
        });
        if (result.success) {
            toast.update(toastId, {
                render: `ZIP saved successfully at ${result.filePath}`,
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            toast.update(toastId, {
                render: `Error: ${result.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    } catch (error) {
        console.error('Error saving ZIP:');
        console.error(error);
        toast.update(toastId, {
            render: `An error occurred while saving the ZIP: ${
                (error as Error).message
            }`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
        });
    }
};

const CustomAppointment = ({
    children,
    data,
    ...restProps
}: {
    children: React.ReactNode;
    data: any;
}) => (
    <Appointments.Appointment
        {...restProps}
        className="!bg-transparent !cursor-default"
        data={data}
        draggable={false}
        resources={[]}
    >
        <div
            className={`text-white px-1 py-1 ${
                data.location === Location.ST_IVES
                    ? 'bg-blue-500'
                    : 'bg-green-500'
            }`}
        >
            <div className="font-bold">{data.title}</div>
            <div>
                {formatTime(data.startDate)} - {formatTime(data.endDate)}
            </div>
            <div>
                {locationToText(data.location)} - Court {data.court}
            </div>
            <div>{data.ageGroup}</div>
        </div>
    </Appointments.Appointment>
);

const getCurrentTermAndWeek = (currentDate: Date) => {
    for (let i = 0; i < Terms2025.length; i++) {
        const term = Terms2025[i];
        const nextTerm = Terms2025[i + 1];

        if (
            currentDate >= term.date &&
            (!nextTerm || currentDate < nextTerm.date)
        ) {
            const weekNumber =
                Math.floor(
                    (currentDate.getTime() - term.date.getTime()) /
                        (7 * 24 * 60 * 60 * 1000),
                ) + 1;

            if (weekNumber <= term.weeks) {
                return { term: i + 1, week: weekNumber };
            }
        }
    }
    return null; // Outside of term dates
};

const CustomToolbar = ({
    currentDate,
    ...restProps
}: {
    currentDate: Date;
    children?: React.ReactNode;
}) => {
    const termAndWeek = useMemo(
        () => getCurrentTermAndWeek(currentDate),
        [currentDate],
    );

    return (
        <Toolbar.Root {...restProps}>
            <div className="flex items-center justify-between px-4 py-2">
                {/* Original Toolbar Functionality */}
                {restProps.children}

                {/* Custom Text */}
                {termAndWeek ? (
                    <div className="text-sm font-bold text-gray-700">
                        Term {termAndWeek.term}, Week {termAndWeek.week}
                    </div>
                ) : (
                    <div className="text-sm font-bold text-gray-700">
                        Outside of term dates
                    </div>
                )}
            </div>
        </Toolbar.Root>
    );
};

const CustomTooltipHeader = ({
    appointmentData,
    ...restProps
}: {
    appointmentData?: any;
    [key: string]: any;
}) => (
    <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
        showOpenButton
        showCloseButton
        showDeleteButton
        commandButtonIds={['a']}
        commandButtonComponent={() => null}
    >
        <Button
            variant="contained"
            color="primary"
            onClick={async () => await downloadRunsheet(appointmentData.id)}
        >
            Download Runsheet
        </Button>
    </AppointmentTooltip.Header>
);

const Roster = (props: PlayerDataProps & RosterDataProps) => {
    const { ageGroups, allEvents, setAllEvents, allGames, setAllGames } = props;

    const [currentDate, setCurrentDate] = React.useState(new Date(2025, 1, 9));
    const tableRef = useRef<HTMLDivElement>(null);


    // ####################     PDF DOWNLOADING     ########################################

    const [exportingTable, setExportingTable] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location.ST_IVES | Location.BELROSE>(Location.ST_IVES);

    const getNewTitle = (gameId: string) => {
        const game = allGames.find((game) => game.id === gameId);
        if (!game) return "Unknown";
        return `${game.lightTeam.name} (W) vs ${game.darkTeam.name} (B)`;
    };

    const newAllEvents = allEvents
        .filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.toDateString() === currentDate.toDateString();
        })
        .filter(event => !selectedLocation || event.location === selectedLocation); // Apply location filter


    const groupedEvents: Record<string, AppointmentEvent[]> = newAllEvents.reduce((acc, event) => {
        if (!acc[event.ageGroup]) acc[event.ageGroup] = [];
        acc[event.ageGroup].push(event);
        return acc;
    }, {} as Record<string, AppointmentEvent[]>);

    const handleDownloadPDF = async (location: Location.ST_IVES | Location.BELROSE) => {
        setSelectedLocation(location);
        // setTimeout(async () => {
            setExportingTable(true);
            const element = tableRef.current;
            if (!element) return;
    
            await html2pdf()
                .set({
                    margin: 10,
                    filename: "Runsheet.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                    pagebreak: { mode: ["css", "avoid-all"] } // Ensure proper page breaks
                })
                .from(element)
                .save();
            setExportingTable(false);
        // }, 100);
    };

    // ####################    END OF PDF DOWNLOADING     ##################################
    

    const getGameCountForDate = (date: Date) => {
        return allGames.filter((game) => {
            const gameDate = new Date(game.timeslot.date);
            return gameDate.toDateString() === date.toDateString();
        }).length;
    };

    const getGameIdsForDate = (date: Date): string[] => {
        return allGames
            .filter((game) => {
                const gameDate = new Date(game.timeslot.date);
                return gameDate.toDateString() === date.toDateString();
            })
            .map((game) => game.id);
    };

    const transformGamesToEvents = (games: Game[]) => {
        const events: AppointmentEvent[] = games.map((game: Game) => {
            const startDate = new Date(game.timeslot.date);
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);
            const ageGroupIdStr: string = game.lightTeam.ageGroupId;
            const ageGroupName = ageGroups.find(
                (ageGroup) => ageGroup.id === ageGroupIdStr,
            )?.displayName;
            return {
                title: `${game.lightTeam.name} vs ${game.darkTeam.name}`,
                startDate,
                endDate,
                id: game.id,
                location: game.timeslot.location,
                court: game.timeslot.court,
                ageGroup: toTitleCase(ageGroupName),
            };
        });

        // Sort events by location first (so st ives is first, belrose is second), then sort by court number
        events.sort((a, b) => {
            if (a.location < b.location) return 1;
            if (a.location > b.location) return -1;
            if (a.court < b.court) return -1;
            if (a.court > b.court) return 1;
            return 0;
        });

        setAllEvents(events);
    };

    useEffect(() => {
        const gamesRequest: PrismaCall = {
            model: ModelName.game,
            operation: CrudOperations.findMany,
            data: {
                include: {
                    lightTeam: true,
                    darkTeam: true,
                    timeslot: true,
                },
            },
        };

        window.electron.ipcRenderer
            .invoke(IpcChannels.PrismaClient, gamesRequest)
            .then((data) => {
                setAllGames(data);
                transformGamesToEvents(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <PageContainer>
            <PageTitle text="Roster" />
            <div className="flex gap-6 h-full">
                <div className="w-3/5">
                    <Scheduler data={allEvents}>
                        <ViewState
                            defaultCurrentDate={new Date(2025, 1, 9)}
                            currentDate={currentDate}
                            onCurrentDateChange={setCurrentDate}
                        />
                        <WeekView
                            excludedDays={[1, 2, 3, 4, 5, 6]}
                            startDayHour={8}
                            endDayHour={16}
                        />
                        <Toolbar
                            rootComponent={(props) => (
                                <CustomToolbar
                                    currentDate={currentDate}
                                    {...props}
                                />
                            )}
                        />
                        <DateNavigator />
                        <Appointments
                            appointmentComponent={CustomAppointment}
                        />
                        <AppointmentTooltip
                            showOpenButton
                            headerComponent={CustomTooltipHeader}
                        />
                        <AppointmentForm />
                        <Resources
                            data={appointmentResources}
                            mainResourceName="location"
                        />
                    </Scheduler>
                </div>
                <div className="inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 "></div>
                <div className="flex-col pl-8 justify-center w-2/5">
                    <h2 className="pt-16 text-lg text-slate-800 font-bold underline underline-offset-4 decoration-4 decoration-dustyBlue">
                        {getCurrentTermAndWeek(currentDate)?.term !== undefined
                            ? `Manage Games for Term ${getCurrentTermAndWeek(
                                  currentDate,
                              )?.term}, Week ${getCurrentTermAndWeek(
                                  currentDate,
                              )?.week}`
                            : 'Manage Games'}
                    </h2>
                    <p className="pt-4 pb-8">
                        {getGameCountForDate(currentDate)} games across all
                        venues and courts.
                    </p>
                    <div>
                        <Button
                            variant="contained"
                            size="medium"
                            className="flex items-center"
                            onClick={async () =>
                                await downloadMultipleRunsheets(
                                    getGameIdsForDate(currentDate),
                                )
                            }
                        >
                            Download Scoresheets
                            <ArrowDownOnSquareStackIcon className="h-6 ml-2" />
                        </Button>
                    </div>
                    <hr className='w-3/4 mt-8 mb-8'></hr>
                    <div className=''>
                        <Button
                            variant="contained"
                            size="medium"
                            className="flex items-center"
                            onClick={() => handleDownloadPDF(Location.ST_IVES)}
                        >
                            Download St Ives Runsheet
                        </Button>
                    </div>
                    <div className='pt-2'>
                        <Button
                            variant="contained"
                            size="medium"
                            className="flex items-center"
                            onClick={() => handleDownloadPDF(Location.BELROSE)}
                        >
                            Download Belrose Runsheet
                        </Button>
                    </div>
                </div>
                
            </div>
            <div ref={tableRef} className={` ${exportingTable ? 'w-[210mm] bg-white px-8 pb-8' : 'absolute bottom-0 left-0 invisible'}`}>
                <Typography variant="h5" className="pb-4">
                    NSBL Runsheet &nbsp;-&nbsp; {locationToText(selectedLocation)} &nbsp;-&nbsp; {currentDate.toDateString()}
                </Typography>
                {Object.keys(groupedEvents)
                    .map(ageGroup => ({
                        ageGroup,
                        firstGameTime: Math.min(...groupedEvents[ageGroup].map(event => new Date(event.startDate).getTime()))
                    }))
                    .sort((a, b) => a.firstGameTime - b.firstGameTime) // Sort tables by first game time
                    .map(({ ageGroup }) => (
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
                                            .map(event => (
                                                <TableRow key={event.id}>
                                                    <TableCell>
                                                        {new Date(event.startDate).toLocaleTimeString("en-US", {
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
        </PageContainer>
    );
};

export default Roster;
