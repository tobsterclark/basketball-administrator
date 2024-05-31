import { PrismaClient, Prisma } from '@prisma/client';
import { IpcChannels } from '../../general/IpcChannels';
import { PrismaCall } from '../../general/prismaTypes';

const prisma = new PrismaClient();

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleIpcPrismaCalls = async (
    event: Electron.IpcMainEvent,
    ...args: any
) => {
    const prismaCall = args as PrismaCall;

    const data = Prisma.validator(
        prisma,
        prismaCall.model,
        prismaCall.operation,
    )(prismaCall.data || {});

    // @ts-ignore: type errors with Prisma Validator
    await prisma[prismaCall.model][prismaCall.operation]({ data });

    event.reply(IpcChannels.PrismaClient);
};
