import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { PlayerDataProps } from "../players/components/Types";
import { useState } from "react";
import Terms2025 from "../data/Terms";

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

const GameResults = (props: PlayerDataProps) => {
    const { ageGroups, teams } = props;
    const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 9));
    console.log(currentDate);
    console.log(getCurrentTermAndWeek(currentDate)?.term);


    return (
        <PageContainer>
            <PageTitle text="Game Results" />
            <div className="flex flex-row gap-4 w-full h-5/6">
                <div className="w-2/5 pt-4">
                    <h1 className="font-bold text-xl">This week's games</h1>
                    <h2 className="text-lg">4/28 recorded</h2>
                </div>
                <div className='inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 '></div>
                <div className="w-1/2 pt-4">
                    <div className="text-xl font-bold float-left flex gap-2">
                        <p>Term {getCurrentTermAndWeek(currentDate).term}, Week {getCurrentTermAndWeek(currentDate)?.week}</p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default GameResults;