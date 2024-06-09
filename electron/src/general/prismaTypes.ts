/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from '@prisma/client';

// Prisma Client singleton
export const prismaClient = new PrismaClient();

// TODO: How to just set this to strings rather than have to explicitly define this
export enum ModelName {
    team = 'team',
    game = 'game',
    player = 'player',
    timeslot = 'timeslot',
    ageGroup = 'ageGroup',
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

export const PrismaValidator = (call: PrismaCall) => {
    if (!call.data)
        throw Error('Prisma Validator requires data to be provided');

    return Prisma.validator(
        prismaClient,
        call.model,
        call.operation,
    )(call.data);
};
