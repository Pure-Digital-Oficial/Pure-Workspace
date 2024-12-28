import { Module } from '@nestjs/common';
import { DeletePlaylistFilesService } from './delete-playlist-files.service';
import { DeletePlaylistFilesController } from './delete-playlist-files.controller';
import { DeletePlaylistFiles } from '@pure-workspace/domain';
import {
  DeletePlaylistFileRepositoryImpl,
  FindContentFileByIdRepositoryImpl,
  FindFileInFileToPlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeletePlaylistFilesController],
  providers: [
    DeletePlaylistFilesService,
    DeletePlaylistFiles,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindContentFileByIdRepository',
      useClass: FindContentFileByIdRepositoryImpl,
    },
    {
      provide: 'FindPlaylistByIdRepository',
      useClass: FindPlaylistByIdRepositoryImpl,
    },
    {
      provide: 'FindFileInFileToPlaylistRepository',
      useClass: FindFileInFileToPlaylistRepositoryImpl,
    },
    {
      provide: 'DeletePlaylistFileRepository',
      useClass: DeletePlaylistFileRepositoryImpl,
    },
  ],
})
export class DeletePlaylistFilesModule {}
