import { Module } from '@nestjs/common';
import { CreateCompanyAddressService } from './create-company-address.service';
import { CreateCompanyAddressController } from './create-company-address.controller';
import { CreateCompanyAddress } from '@pure-workspace/domain';
import {
  CreateCompanyAddressRepositoryImpl,
  FindCityByIdRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindCountryByIdRepositoryImpl,
  FindStateByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateCompanyAddressController],
  providers: [
    CreateCompanyAddressService,
    CreateCompanyAddress,
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
      provide: 'FindCountryByIdRepository',
      useClass: FindCountryByIdRepositoryImpl,
    },
    {
      provide: 'FindStateByIdRepository',
      useClass: FindStateByIdRepositoryImpl,
    },
    {
      provide: 'FindCityByIdRepository',
      useClass: FindCityByIdRepositoryImpl,
    },
    {
      provide: 'CreateCompanyAddressRepository',
      useClass: CreateCompanyAddressRepositoryImpl,
    },
  ],
})
export class CreateCompanyAddressModule {}
