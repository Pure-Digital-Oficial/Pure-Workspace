import { Module } from '@nestjs/common';
import { MoveSchedulesToAnotherDeviceService } from './move-schedules-to-another-device.service';
import { MoveSchedulesToAnotherDeviceController } from './move-schedules-to-another-device.controller';
import { MoveSchedulesToAnotherDevice } from '@pure-workspace/domain';
import {
  FindDeviceByIdRepositoryImpl,
  FindSchedulingByIdRepositoryImpl,
  FindSchedulingToDeviceByIdsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  MoveSchedulingToAnotherDeviceRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [MoveSchedulesToAnotherDeviceController],
  providers: [
    MoveSchedulesToAnotherDeviceService,
    MoveSchedulesToAnotherDevice,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindDeviceByIdRepository',
      useClass: FindDeviceByIdRepositoryImpl,
    },
    {
      provide: 'FindSchedulingByIdRepository',
      useClass: FindSchedulingByIdRepositoryImpl,
    },
    {
      provide: 'FindSchedulingToDeviceByIdsRepository',
      useClass: FindSchedulingToDeviceByIdsRepositoryImpl,
    },
    {
      provide: 'MoveSchedulingToAnotherDeviceRepository',
      useClass: MoveSchedulingToAnotherDeviceRepositoryImpl,
    },
  ],
})
export class MoveSchedulesToAnotherDeviceModule {}
