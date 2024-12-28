import { Module } from '@nestjs/common';
import { FindCompanyResponsibleByIdService } from './find-company-responsible-by-id.service';
import { FindCompanyResponsibleByIdController } from './find-company-responsible-by-id.controller';
import { FindCompanyResponsibleById } from '@pure-workspace/domain';
import {
  FindCompanyResponsibleByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindCompanyResponsibleByIdController],
  providers: [
    FindCompanyResponsibleByIdService,
    FindCompanyResponsibleById,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyResponsibleByIdRepository',
      useClass: FindCompanyResponsibleByIdRepositoryImpl,
    },
  ],
})
export class FindCompanyResponsibleByIdModule {}
