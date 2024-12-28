import { Module } from '@nestjs/common';
import { FindCompanyAddressByIdService } from './find-company-address-by-id.service';
import { FindCompanyAddressByIdController } from './find-company-address-by-id.controller';
import { FindCompanyAddressById } from '@pure-workspace/domain';
import {
  FindCompanyAddressByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindCompanyAddressByIdController],
  providers: [
    FindCompanyAddressByIdService,
    FindCompanyAddressById,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyAddressByIdRepository',
      useClass: FindCompanyAddressByIdRepositoryImpl,
    },
  ],
})
export class FindCompanyAddressByIdModule {}
