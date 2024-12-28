import { Module } from '@nestjs/common';
import { ListDeviceService } from './list-device.service';
import { ListDeviceController } from './list-device.controller';
import { ListDevice } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListDeviceRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListDeviceController],
  providers: [
    ListDeviceService,
    ListDevice,
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
      provide: 'ListDeviceRepository',
      useClass: ListDeviceRepositoryImpl,
    },
  ],
})
export class ListDeviceModule {}
