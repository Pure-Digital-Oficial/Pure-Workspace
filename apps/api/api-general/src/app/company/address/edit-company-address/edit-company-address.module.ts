import { Module } from '@nestjs/common';
import { EditCompanyAddressService } from './edit-company-address.service';
import { EditCompanyAddressController } from './edit-company-address.controller';
import { EditCompanyAddress } from '@pure-workspace/domain';
import {
  EditCompanyAddressRepositoryImpl,
  FindCityByIdRepositoryImpl,
  FindCompanyAddressByIdRepositoryImpl,
  FindCountryByIdRepositoryImpl,
  FindStateByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [EditCompanyAddressController],
  providers: [
    EditCompanyAddressService,
    EditCompanyAddress,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'FindCompanyAddressByIdRepository',
      useClass: FindCompanyAddressByIdRepositoryImpl,
    },
    {
      provide: 'EditCompanyAddressRepository',
      useClass: EditCompanyAddressRepositoryImpl,
    },
  ],
})
export class EditCompanyAddressModule {}
