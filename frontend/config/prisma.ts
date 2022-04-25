import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient | undefined = typeof window === 'undefined' ? new PrismaClient() : undefined;

export default prisma;
