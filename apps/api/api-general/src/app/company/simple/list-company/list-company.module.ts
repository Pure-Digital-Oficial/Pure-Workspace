import { Module } from '@nestjs/common';
import { ListCompanyService } from './list-company.service';
import { ListCompanyController } from './list-company.controller';
import { ListCompany } from '@pure-workspace/domain';
import {
  FindUserByIdRepositoryImpl,
  ListCompanyRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListCompanyController],
  providers: [
    ListCompanyService,
    ListCompany,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListCompanyRepository',
      useClass: ListCompanyRepositoryImpl,
    },
  ],
})
export class ListCompanyModule {}
