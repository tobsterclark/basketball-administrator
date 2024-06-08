/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcMainInvokeEvent } from 'electron';
import {
    PrismaCall,
    PrismaValidator,
    prismaClient,
} from '../../general/prismaTypes';

export const handleIpcPrismaCalls = async (
    event: IpcMainInvokeEvent,
    ...args: any[]
) => {
    if (args[0] == null || args.length > 1)
        throw Error('Prisma IPC calls must be provided one arg');
    const prismaCall = args[0] as PrismaCall;

    let res: any;

    if (prismaCall.data) {
        // @ts-ignore: type errors with Prisma Validator
        res = await prismaClient[prismaCall.model][prismaCall.operation](
            PrismaValidator(prismaCall),
        );
    } else {
        // @ts-ignore: type errors with Prisma Validator
        res = await prismaClient[prismaCall.model][prismaCall.operation]();
    }

    return res;
};
