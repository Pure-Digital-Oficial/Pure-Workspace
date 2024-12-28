import { Module } from '@nestjs/common';
import { DeleteSchedulesToDeviceService } from './delete-schedules-to-device.service';
import { DeleteSchedulesToDeviceController } from './delete-schedules-to-device.controller';
import { DeleteSchedulesToDevice } from '@pure-workspace/domain';
import {
  DeleteSchedulingToDeviceRepositoryImpl,
  FindDeviceByIdRepositoryImpl,
  FindSchedulingByIdRepositoryImpl,
  FindSchedulingToDeviceByIdsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeleteSchedulesToDeviceController],
  providers: [
    DeleteSchedulesToDeviceService,
    DeleteSchedulesToDevice,
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
      provide: 'DeleteSchedulingToDeviceRepository',
      useClass: DeleteSchedulingToDeviceRepositoryImpl,
    },
  ],
})
export class DeleteSchedulesToDeviceModule {}
