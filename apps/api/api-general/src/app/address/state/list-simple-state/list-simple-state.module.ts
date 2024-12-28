import { Module } from '@nestjs/common';
import { ListSimpleStateService } from './list-simple-state.service';
import { ListSimpleStateController } from './list-simple-state.controller';
import { ListSimpleState } from '@pure-workspace/domain';
import {
  FindCountryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListSimpleStateRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListSimpleStateController],
  providers: [
    ListSimpleStateService,
    ListSimpleState,
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
      provide: 'ListSimpleStateRepository',
      useClass: ListSimpleStateRepositoryImpl,
    },
  ],
})
export class ListSimpleStateModule {}
