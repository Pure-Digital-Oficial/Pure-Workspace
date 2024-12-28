import { Module } from '@nestjs/common';
import { UnauthorizeUserToCompanyService } from './unauthorize-user-to-company.service';
import { UnauthorizeUserToCompanyController } from './unauthorize-user-to-company.controller';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserIdByCompanyIdRepositoryImpl,
  PrismaGeneralService,
  UnauthorizeUserToCompanyRepositoryImpl,
  VerifyUserPermissionsByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { UnauthorizeUserToCompany } from '@pure-workspace/domain';

@Module({
  controllers: [UnauthorizeUserToCompanyController],
  providers: [
    UnauthorizeUserToCompanyService,
    UnauthorizeUserToCompany,
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
      provide: 'UnauthorizeUserToCompanyRepository',
      useClass: UnauthorizeUserToCompanyRepositoryImpl,
    },
  ],
})
export class UnauthorizeUserToCompanyModule {}
