import { DeleteDirectory } from '@pure-workspace/domain';
import { DeleteDirectoryController } from './delete-directory.controller';
import { DeleteDirectoryService } from './delete-directory.service';
import {
  DeleteDirectoryRepositoryImpl,
  FindContentFilesByDirectoryIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DeleteDirectoryController],
  providers: [
    DeleteDirectoryService,
    DeleteDirectory,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindDirectoryByIdRepository',
      useClass: FindDirectoryByIdRepositoryImpl,
    },
    {
      provide: 'FindContentFilesByDirectoryIdRepository',
      useClass: FindContentFilesByDirectoryIdRepositoryImpl,
    },
    {
      provide: 'DeleteDirectoryRepository',
      useClass: DeleteDirectoryRepositoryImpl,
    },
  ],
})
export class DeleteDirectoryModule {}
