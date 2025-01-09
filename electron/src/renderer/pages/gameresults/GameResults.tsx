import PageContainer from "../../ui_components/PageContainer";
import PageTitle from "../../ui_components/PageTitle";
import { PlayerDataProps } from "../players/components/Types";

const GameResults = (props: PlayerDataProps) => {
    const { ageGroups } = props;
    return (
        <PageContainer>
            <PageTitle text="Game Results" />
        </PageContainer>
    );
};

export default GameResults;