// TODO: How to just set this to strings rather than have to explicitly define this
export enum ModelName {
    team = 'team',
    game = 'game',
    player = 'player',
    timeslot = 'timeslot',
}

export enum CrudOperations {
    findUnique = 'findUnique',
    findFirst = 'findFirst',
    findMany = 'findMany',
    count = 'count',
}

// TODO: how tf should we strongly type this crap
export type PrismaCall = {
    model: ModelName;
    operation: CrudOperations;
    data?: { [key: string]: any };
};
