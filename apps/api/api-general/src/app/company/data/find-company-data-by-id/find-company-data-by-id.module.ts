import { Module } from '@nestjs/common';
import { FindCompanyDataByIdService } from './find-company-data-by-id.service';
import { FindCompanyDataByIdController } from './find-company-data-by-id.controller';
import { FindCompanyDataById } from '@pure-workspace/domain';
import {
  FindCompanyDataByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindCompanyDataByIdController],
  providers: [
    FindCompanyDataByIdService,
    FindCompanyDataById,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyDataByIdRepository',
      useClass: FindCompanyDataByIdRepositoryImpl,
    },
  ],
})
export class FindCompanyDataByIdModule {}
