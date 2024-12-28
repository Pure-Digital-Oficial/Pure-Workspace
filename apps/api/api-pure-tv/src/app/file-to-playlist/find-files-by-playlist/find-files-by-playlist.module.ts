import { Module } from '@nestjs/common';
import { FindFilesByPlaylistService } from './find-files-by-playlist.service';
import { FindFilesByPlaylistController } from './find-files-by-playlist.controller';
import { FindFilesByPlaylist } from '@pure-workspace/domain';
import {
  FindFilesByPlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindFilesByPlaylistController],
  providers: [
    FindFilesByPlaylistService,
    FindFilesByPlaylist,
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
      provide: 'FindFilesByPlaylistRepository',
      useClass: FindFilesByPlaylistRepositoryImpl,
    },
  ],
})
export class FindFilesByPlaylistModule {}
