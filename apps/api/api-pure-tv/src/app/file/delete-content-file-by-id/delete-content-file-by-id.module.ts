import { Module } from '@nestjs/common';
import { DeleteContentFileByIdService } from './delete-content-file-by-id.service';
import { DeleteContentFileByIdController } from './delete-content-file-by-id.controller';
import {
  DeleleteFileByNameRepositoryImpl,
  DeleteContentFileByIdRepositoryImpl,
  FindContentFileByIdRepositoryImpl,
  FindDirectoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { DeleteContentFileById } from '@pure-workspace/domain';

@Module({
  controllers: [DeleteContentFileByIdController],
  providers: [
    DeleteContentFileByIdService,
    DeleteContentFileById,
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
      provide: 'FindContentFileByIdRepository',
      useClass: FindContentFileByIdRepositoryImpl,
    },
    {
      provide: 'DeleteContentFileByIdRepository',
      useClass: DeleteContentFileByIdRepositoryImpl,
    },
    {
      provide: 'DeleteFileByNameRepository',
      useClass: DeleleteFileByNameRepositoryImpl,
    },
  ],
})
export class DeleteContentFileByIdModule {}
