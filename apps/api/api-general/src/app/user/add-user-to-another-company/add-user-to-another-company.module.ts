import { Module } from '@nestjs/common';
import { AddUserToAnotherCompanyService } from './add-user-to-another-company.service';
import { AddUserToAnotherCompanyController } from './add-user-to-another-company.controller';
import { AddUserToAnotherCompany } from '@pure-workspace/domain';
import {
  AddUserToAnotherCompanyRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserIdByCompanyIdRepositoryImpl,
  PrismaGeneralService,
  VerifyUserPermissionsByIdRepositoryImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [AddUserToAnotherCompanyController],
  providers: [
    AddUserToAnotherCompanyService,
    AddUserToAnotherCompany,
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
      provide: 'VerifyUserPermissionsByIdRepository',
      useClass: VerifyUserPermissionsByIdRepositoryImpl,
    },
    {
      provide: 'AddUserToAnotherCompanyRepository',
      useClass: AddUserToAnotherCompanyRepositoryImpl,
    },
  ],
})
export class AddUserToAnotherCompanyModule {}
