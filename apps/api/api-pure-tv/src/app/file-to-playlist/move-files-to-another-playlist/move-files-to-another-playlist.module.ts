import { Module } from '@nestjs/common';
import { MoveFilesToAnotherPlaylistService } from './move-files-to-another-playlist.service';
import { MoveFilesToAnotherPlaylistController } from './move-files-to-another-playlist.controller';
import { MoveFilesToAnotherPlaylist } from '@pure-workspace/domain';
import {
  FindContentFileByIdRepositoryImpl,
  FindFileInFileToPlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  MoveFileToAnotherPlaylistRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [MoveFilesToAnotherPlaylistController],
  providers: [
    MoveFilesToAnotherPlaylistService,
    MoveFilesToAnotherPlaylist,
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
      provide: 'MoveFileToAnotherPlaylistRepository',
      useClass: MoveFileToAnotherPlaylistRepositoryImpl,
    },
  ],
})
export class MoveFilesToAnotherPlaylistModule {}
