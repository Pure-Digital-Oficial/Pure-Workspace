import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@pure-workspace/prisma/general';

@Injectable()
export class PrismaGeneralService implements OnModuleDestroy {
  private static prisma: PrismaClient;

  constructor() {
    if (!PrismaGeneralService.prisma) {
      PrismaGeneralService.prisma = new PrismaClient();
      PrismaGeneralService.prisma.$connect();
    }
  }

  get generalPrisma(): PrismaClient {
    return PrismaGeneralService.prisma;
  }

  async onModuleDestroy() {
    await PrismaGeneralService.prisma.$disconnect();
  }
}
