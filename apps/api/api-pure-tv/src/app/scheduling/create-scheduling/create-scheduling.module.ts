import { Module } from '@nestjs/common';
import { CreateSchedulingService } from './create-scheduling.service';
import { CreateSchedulingController } from './create-scheduling.controller';
import { CreateScheduling } from '@pure-workspace/domain';
import {
  ConvertStringInTimeRepositoryImpl,
  CreateSchedulingRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindSchedulingByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateSchedulingController],
  providers: [
    CreateSchedulingService,
    CreateScheduling,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyByIdRepository',
      useClass: FindCompanyByIdRepositoryImpl,
    },
    {
      provide: 'FindSchedulingByNameRepository',
      useClass: FindSchedulingByNameRepositoryImpl,
    },
    {
      provide: 'ConvertStringInTimeRepository',
      useClass: ConvertStringInTimeRepositoryImpl,
    },
    {
      provide: 'CreateSchedulingRepository',
      useClass: CreateSchedulingRepositoryImpl,
    },
  ],
})
export class CreateSchedulingModule {}
