import { Module } from '@nestjs/common';
import { DeleteDeviceService } from './delete-device.service';
import { DeleteDeviceController } from './delete-device.controller';
import { DeleteDevice } from '@pure-workspace/domain';
import {
  DeleteDeviceRepositoryImpl,
  FindDeviceByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeleteDeviceController],
  providers: [
    DeleteDeviceService,
    DeleteDevice,
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
      provide: 'DeleteDeviceRepository',
      useClass: DeleteDeviceRepositoryImpl,
    },
  ],
})
export class DeleteDeviceModule {}
