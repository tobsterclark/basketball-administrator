import { PrismaClient } from "../../orm/client";

// TODO: So bad we only want one client created.. just giving env variables a chance to be set on the off chance it works
export const prisma = () => new PrismaClient();
