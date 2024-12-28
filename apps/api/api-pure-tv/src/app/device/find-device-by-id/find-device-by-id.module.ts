import { Module } from '@nestjs/common';
import { FindDeviceByIdService } from './find-device-by-id.service';
import { FindDeviceByIdController } from './find-device-by-id.controller';
import { FindDeviceById } from '@pure-workspace/domain';
import {
  FindDeviceByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindDeviceByIdController],
  providers: [
    FindDeviceByIdService,
    FindDeviceById,
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
  ],
})
export class FindDeviceByIdModule {}
