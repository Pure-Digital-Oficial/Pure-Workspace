import { Module } from '@nestjs/common';
import { SelectCompanyService } from './select-company.service';
import { SelectCompanyController } from './select-company.controller';
import { SelectCompany } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserIdByCompanyIdRepositoryImpl,
  PrismaGeneralService,
  SelectCompanyRepositoryImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [SelectCompanyController],
  providers: [
    SelectCompanyService,
    SelectCompany,
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
      provide: 'FindUserIdByCompanyIdRepository',
      useClass: FindUserIdByCompanyIdRepositoryImpl,
    },
    {
      provide: 'SelectCompanyRepository',
      useClass: SelectCompanyRepositoryImpl,
    },
  ],
})
export class SelectCompanyModule {}
