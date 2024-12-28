import { Module } from '@nestjs/common';
import { AddSchedulesToDeviceService } from './add-schedules-to-device.service';
import { AddSchedulesToDeviceController } from './add-schedules-to-device.controller';
import { AddSchedulesToDevice } from '@pure-workspace/domain';
import {
  AddSchedulingToDeviceRepositoryImpl,
  FindDeviceByIdRepositoryImpl,
  FindSchedulingByIdRepositoryImpl,
  FindSchedulingToDeviceByIdsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [AddSchedulesToDeviceController],
  providers: [
    AddSchedulesToDeviceService,
    AddSchedulesToDevice,
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
      provide: 'AddSchedulingToDeviceRepository',
      useClass: AddSchedulingToDeviceRepositoryImpl,
    },
  ],
})
export class AddSchedulesToDeviceModule {}
