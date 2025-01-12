import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { PlayerDataProps } from "../players/components/Types";

const GameResults = (props: PlayerDataProps) => {
    const { ageGroups, teams } = props;
    console.log(teams);
    return (
        <PageContainer>
            <PageTitle text="Game Results" />
            <div className="flex flex-row gap-4 w-full h-5/6">
                <div className="w-2/5 pt-4">
                    <h1 className="font-bold text-xl">This week's games</h1>
                    <h2 className="text-lg">4/28 recorded</h2>
                </div>
                <div className='inline-block h-5/6 mt-24 min-h-[1em] w-0.5 self-stretch bg-neutral-100 '></div>
                <div className="w-1/2 bg-red-200 pt-4">e</div>
            </div>
        </PageContainer>
    );
};

export default GameResults;