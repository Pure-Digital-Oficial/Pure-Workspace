import { Module } from '@nestjs/common';
import { DeletePlaylistService } from './delete-playlist.service';
import { DeletePlaylistController } from './delete-playlist.controller';
import { DeletePlaylist } from '@pure-workspace/domain';
import {
  DeleteFileByPlaylistRepositoryImpl,
  DeletePlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeletePlaylistController],
  providers: [
    DeletePlaylistService,
    DeletePlaylist,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindPlaylistByIdRepository',
      useClass: FindPlaylistByIdRepositoryImpl,
    },
    {
      provide: 'DeletePlaylistRepoistory',
      useClass: DeletePlaylistRepositoryImpl,
    },
    {
      provide: 'DeleteFileByPlaylistRepository',
      useClass: DeleteFileByPlaylistRepositoryImpl,
    },
  ],
})
export class DeletePlaylistModule {}
