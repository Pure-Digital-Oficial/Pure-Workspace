import { Module } from '@nestjs/common';
import { CreateDeviceService } from './create-device.service';
import { CreateDeviceController } from './create-device.controller';
import { CreateDevice } from '@pure-workspace/domain';
import {
  CreateDeviceRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindDeviceByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateDeviceController],
  providers: [
    CreateDeviceService,
    CreateDevice,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindDeviceByNameRepository',
      useClass: FindDeviceByNameRepositoryImpl,
    },
    {
      provide: 'FindCompanyByIdRepository',
      useClass: FindCompanyByIdRepositoryImpl,
    },
    {
      provide: 'CreateDeviceRepository',
      useClass: CreateDeviceRepositoryImpl,
    },
  ],
})
export class CreateDeviceModule {}
