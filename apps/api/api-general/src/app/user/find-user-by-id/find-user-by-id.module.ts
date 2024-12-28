import { Module } from '@nestjs/common';
import { FindUserByIdService } from './find-user-by-id.service';
import { FindUserByIdController } from './find-user-by-id.controller';
import {
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { FindUserById } from '@pure-workspace/domain';

@Module({
  controllers: [FindUserByIdController],
  providers: [
    FindUserByIdService,
    FindUserById,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class FindUserByIdModule {}
