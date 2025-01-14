/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from '@prisma/client';
// import path from 'path';

// Determine the path to the Prisma query engine binary
// const getPrismaEnginePath = (): string => {
//   // Check if the app is running in a packaged environment
//   if (process.env.NODE_ENV === 'production') {
//     return path.join(
//       process.resourcesPath, // Electron's resources path in production
//       '.prisma',
//       'client',
//       'query_engine-windows.dll.node' // Use the appropriate binary for your platform
//     );
//   }

//   // Use the default path for development
//   return path.join(
//     __dirname,
//     '..',
//     'node_modules',
//     '.prisma',
//     'client',
//     'query_engine-windows.dll.node'
//   );
// };

// // Initialize Prisma Client with the correct engine path
// export const prismaClient = new PrismaClient({
//   __internal: {
//     engine: {
//       binaryPath: getPrismaEnginePath(),
//     },
//   },
// });

export const prismaClient = new PrismaClient();

// TODO: How to just set this to strings rather than have to explicitly define this
export enum ModelName {
    team = 'team',
    game = 'game',
    player = 'player',
    timeslot = 'timeslot',
    ageGroup = 'ageGroup',
    location = 'location',
}

export enum CrudOperations {
    findUnique = 'findUnique',
    findFirst = 'findFirst',
    findMany = 'findMany',
    count = 'count',
    create = 'create',
    createManyAndReturn = 'createManyAndReturn',
    upsert = 'upsert',
    update = 'update',
    delete = 'delete',
    deleteMany = 'deleteMany',
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
