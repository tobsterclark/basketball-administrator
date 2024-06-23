import { AgeGroup } from '@prisma/client';
import { TeamDataResponse } from './components/Types';

export interface PlayerProps {
    teams: TeamDataResponse[];
    ageGroups: AgeGroup[];
}
