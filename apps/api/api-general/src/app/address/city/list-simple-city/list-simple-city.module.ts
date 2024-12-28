import { Module } from '@nestjs/common';
import { ListSimpleCityService } from './list-simple-city.service';
import { ListSimpleCityController } from './list-simple-city.controller';
import { ListSimpleCity } from '@pure-workspace/domain';
import {
  FindStateByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListSimpleCityRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListSimpleCityController],
  providers: [
    ListSimpleCityService,
    ListSimpleCity,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindStateByIdRepository',
      useClass: FindStateByIdRepositoryImpl,
    },
    {
      provide: 'ListSimpleCityRepository',
      useClass: ListSimpleCityRepositoryImpl,
    },
  ],
})
export class ListSimpleCityModule {}
