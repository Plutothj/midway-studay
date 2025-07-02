import { PrismaClient, type Prisma } from '../generated/prisma';
import { Provide } from '@midwayjs/core';

@Provide()
class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, never> {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
export const prisma = new PrismaService();
