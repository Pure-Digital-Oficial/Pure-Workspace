import { Module } from '@nestjs/common';
import { CreateCompanyDataService } from './create-company-data.service';
import { CreateCompanyDataController } from './create-company-data.controller';
import { CreateCompanyData } from '@pure-workspace/domain';
import {
  CreateCompanyDataRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateCompanyDataController],
  providers: [
    CreateCompanyDataService,
    CreateCompanyData,
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
      provide: 'CreateCompanyDataRepository',
      useClass: CreateCompanyDataRepositoryImpl,
    },
  ],
})
export class CreateCompanyDataModule {}
