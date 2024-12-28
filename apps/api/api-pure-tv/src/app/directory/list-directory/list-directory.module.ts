import { Module } from '@nestjs/common';
import { ListDirectoryController } from './list-directory.controller';
import { ListDirectoryService } from './list-directory.service';
import { ListDirectory } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListDirectoryRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListDirectoryController],
  providers: [
    ListDirectoryService,
    ListDirectory,
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
      provide: 'ListDirectoryRepository',
      useClass: ListDirectoryRepositoryImpl,
    },
  ],
})
export class ListDirectoryModule {}
