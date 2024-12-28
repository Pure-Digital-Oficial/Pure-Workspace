import { Module } from '@nestjs/common';
import { EditSchedulingService } from './edit-scheduling.service';
import { EditSchedulingController } from './edit-scheduling.controller';
import { EditScheduling } from '@pure-workspace/domain';
import {
  ConvertStringInTimeRepositoryImpl,
  EditSchedulingRepositoryImpl,
  FindSchedulingByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [EditSchedulingController],
  providers: [
    EditSchedulingService,
    EditScheduling,
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
      provide: 'ConvertStringInTimeRepository',
      useClass: ConvertStringInTimeRepositoryImpl,
    },
    {
      provide: 'EditSchedulingRepository',
      useClass: EditSchedulingRepositoryImpl,
    },
  ],
})
export class EditSchedulingModule {}
