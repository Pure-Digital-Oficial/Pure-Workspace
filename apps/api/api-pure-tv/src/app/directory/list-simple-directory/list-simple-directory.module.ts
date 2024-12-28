import { Module } from '@nestjs/common';
import { ListSimpleDirectoryService } from './list-simple-directory.service';
import { ListSimpleDirectoryController } from './list-simple-directory.controller';
import { ListSimpleDirectory } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListSimpleDirectoryRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListSimpleDirectoryController],
  providers: [
    ListSimpleDirectoryService,
    ListSimpleDirectory,
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
      provide: 'ListSimpleDirectoryRepository',
      useClass: ListSimpleDirectoryRepositoryImpl,
    },
  ],
})
export class ListSimpleDirectoryModule {}
