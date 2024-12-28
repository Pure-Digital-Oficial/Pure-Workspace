import { Module } from '@nestjs/common';
import { DeleteSchedulingService } from './delete-scheduling.service';
import { DeleteSchedulingController } from './delete-scheduling.controller';
import { DeleteScheduling } from '@pure-workspace/domain';
import {
  DeleteSchedulingRepositoryImpl,
  FindSchedulingByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeleteSchedulingController],
  providers: [
    DeleteSchedulingService,
    DeleteScheduling,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindSchedulingByIdRepository',
      useClass: FindSchedulingByIdRepositoryImpl,
    },
    {
      provide: 'DeleteSchedulingRepository',
      useClass: DeleteSchedulingRepositoryImpl,
    },
  ],
})
export class DeleteSchedulingModule {}
