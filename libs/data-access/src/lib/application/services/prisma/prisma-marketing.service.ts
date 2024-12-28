import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@pure-workspace/prisma/marketing';

@Injectable()
export class PrismaMarketingService implements OnModuleDestroy {
  private static prisma: PrismaClient;

  constructor() {
    if (!PrismaMarketingService.prisma) {
      PrismaMarketingService.prisma = new PrismaClient();
      PrismaMarketingService.prisma.$connect();
    }
  }

  get marketingPrisma(): PrismaClient {
    return PrismaMarketingService.prisma;
  }

  async onModuleDestroy() {
    await PrismaMarketingService.prisma.$disconnect();
  }
}
