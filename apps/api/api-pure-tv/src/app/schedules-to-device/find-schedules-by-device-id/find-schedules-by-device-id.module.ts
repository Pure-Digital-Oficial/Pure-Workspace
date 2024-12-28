import { Module } from '@nestjs/common';
import { FindSchedulesByDeviceIdService } from './find-schedules-by-device-id.service';
import { FindSchedulesByDeviceIdController } from './find-schedules-by-device-id.controller';
import { FindSchedulesByDeviceId } from '@pure-workspace/domain';
import {
  FindDeviceByIdRepositoryImpl,
  FindSchedulesByDeviceIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindSchedulesByDeviceIdController],
  providers: [
    FindSchedulesByDeviceIdService,
    FindSchedulesByDeviceId,
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
      provide: 'FindSchedulesByDeviceIdRepository',
      useClass: FindSchedulesByDeviceIdRepositoryImpl,
    },
  ],
})
export class FindSchedulesByDeviceIdModule {}
