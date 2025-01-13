import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { PlayerDataProps } from "../players/components/Types";
import Terms2025 from "../data/Terms";
import React from "react";
import { Button, FormControlLabel, FormGroup, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { green, red } from "chalk";
import CourtTable from "./components/CourtTable";

enum Location {
    ST_IVES = 'ST_IVES',
    BELROSE = 'BELROSE',
}

const tableData = [
    {
      time: "10:00 AM",
      ageGroup: "23",
      lightTeam: "Phoenix",
      darkTeam: "Dragons",
      winningTeam: "Phoenix"
    },
    {
      time: "11:30 AM",
      ageGroup: "25",
      lightTeam: "Titans",
      darkTeam: "Warriors",
      winningTeam: "Warriors"
    },
    {
      time: "1:00 PM",
      ageGroup: "28",
      lightTeam: "Eagles",
      darkTeam: "Lions",
      winningTeam: "Eagles"
    },
    {
      time: "2:30 PM",
      ageGroup: "21",
      lightTeam: "Panthers",
      darkTeam: "Bears",
      winningTeam: "Bears"
    },
    {
      time: "4:00 PM",
      ageGroup: "24",
      lightTeam: "Wolves",
      darkTeam: "Tigers",
      winningTeam: "Tigers"
    },
    {
      time: "5:30 PM",
      ageGroup: "26",
      lightTeam: "Hawks",
      darkTeam: "Ravens",
      winningTeam: "Hawks"
    },
    {
      time: "7:00 PM",
      ageGroup: "22",
      lightTeam: "Falcons",
      darkTeam: "Sharks",
      winningTeam: "Sharks"
    }
];

const GameResults = (props: PlayerDataProps) => {
    const { ageGroups, teams } = props;
    const [currentDate, setCurrentDate] = React.useState(new Date(2025, 1, 9));
    const [venue, setVenue] = React.useState<Location>(Location.ST_IVES);

    const getCurrentTermAndWeek = (currentDate: Date): {term: number; week: number;} => {
        for (let i = 0; i < Terms2025.length; i++) {
            const term = Terms2025[i];
            const nextTerm = Terms2025[i + 1];
    
            if (currentDate >= term.date && (!nextTerm || currentDate < nextTerm.date)) {
                const weekNumber = Math.floor(
                    (currentDate.getTime() - term.date.getTime()) / (7 * 24 * 60 * 60 * 1000)
                ) + 1;
                
                if (weekNumber <= term.weeks) {
                    return { term: i + 1, week: weekNumber };
                }
            }
        }
        return {term: -1, week: -1}; // Outside of term dates
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PageContainer>
            <PageTitle text="Game Results" />
            <div className="flex flex-row gap-4 w-full h-5/6">
                <div className="w-2/5 pt-4">
                    <h1 className="font-bold text-xl">{formatDate(currentDate)}</h1>
                    <h2 className="text-lg">4/28 recorded</h2>
                </div>
                <div className='inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 '></div>
                <div className="w-3/4 pt-4 pl-4">
                    <div className="flex gap-8">
                        <div className="text-xl h-[70px] font-bold float-left flex items-center gap-2">
                            <Button onClick={() => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}>
                                <ArrowLeftCircleIcon />
                            </Button>
                            { getCurrentTermAndWeek(currentDate).term === -1 ?
                                <p>Outside of term dates</p> :
                                <p>Term {getCurrentTermAndWeek(currentDate).term}, Week {getCurrentTermAndWeek(currentDate)?.week}</p>
                            }
                            <Button onClick={() => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}>
                                <ArrowRightCircleIcon />
                            </Button>
                        </div>
                        <div className='inline-block mt-2 h-[50px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 '></div>
                        <div className="h-[70px] flex items-center font-bold w-1/3">
                            <p>St Ives</p>
                            <Switch 
                                checked={venue !== Location.ST_IVES} 
                                onChange={() => setVenue(venue === Location.ST_IVES ? Location.BELROSE : Location.ST_IVES)} 
                                defaultChecked 
                                size="medium"
                                sx={{
                                    '& .MuiSwitch-track': {
                                    backgroundColor: '#8cbae8', 
                                    },
                                    '& .MuiSwitch-thumb': {
                                    color: '#1976d2', 
                                    },
                                    '&.Mui-checked .MuiSwitch-track': {
                                    backgroundColor: '#8cbae8',
                                    },
                                    '&.Mui-checked .MuiSwitch-thumb': {
                                    color: '#1976d2', 
                                    },
                                }}
                            />
                            <p>Belrose</p>
                        </div>
                    </div>
                    <div>
                        <CourtTable courtNumber={1} tableData={tableData} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default GameResults;