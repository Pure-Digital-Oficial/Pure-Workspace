import { Module } from '@nestjs/common';
import { CreateCompanyResponsibleService } from './create-company-responsible.service';
import { CreateCompanyResponsibleController } from './create-company-responsible.controller';
import { CreateCompanyResponsible } from '@pure-workspace/domain';
import {
  CreateCompanyResponsibleRespositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindCompanyResponsibleByDocumentRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateCompanyResponsibleController],
  providers: [
    CreateCompanyResponsibleService,
    CreateCompanyResponsible,
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
      provide: 'FindCompanyResponsibleByDocumentRepository',
      useClass: FindCompanyResponsibleByDocumentRepositoryImpl,
    },
    {
      provide: 'CreateCompanyResponsibleRespository',
      useClass: CreateCompanyResponsibleRespositoryImpl,
    },
  ],
})
export class CreateCompanyResponsibleModule {}
