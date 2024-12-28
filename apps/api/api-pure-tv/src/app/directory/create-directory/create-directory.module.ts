import { Module } from '@nestjs/common';
import { CreateDirectoryController } from './create-directory.controller';
import { CreateDirectoryService } from './create-directory.service';
import { CreateDirectory } from '@pure-workspace/domain';
import {
  CreateDirectoryRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
  FindDirectoryByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateDirectoryController],
  providers: [
    CreateDirectoryService,
    CreateDirectory,
    {
      provide: 'CreateDirectoryRepository',
      useClass: CreateDirectoryRepositoryImpl,
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
      provide: 'FindDirectoryByNameRepository',
      useClass: FindDirectoryByNameRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateDirectoryModule {}
