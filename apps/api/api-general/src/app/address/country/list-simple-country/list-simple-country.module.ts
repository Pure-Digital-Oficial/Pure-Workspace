import { Module } from '@nestjs/common';
import { ListSimpleCountryService } from './list-simple-country.service';
import { ListSimpleCountryController } from './list-simple-country.controller';
import { ListSimpleCountry } from '@pure-workspace/domain';
import {
  FindUserByIdRepositoryImpl,
  ListSimpleCountryRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListSimpleCountryController],
  providers: [
    ListSimpleCountryService,
    ListSimpleCountry,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListSimpleCountryRepository',
      useClass: ListSimpleCountryRepositoryImpl,
    },
  ],
})
export class ListSimpleCountryModule {}
