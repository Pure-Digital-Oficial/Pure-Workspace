import { Module } from '@nestjs/common';
import { DetailsPlaylistService } from './details-playlist.service';
import { DetailsPlaylistController } from './details-playlist.controller';
import { DetailsPlaylist } from '@pure-workspace/domain';
import {
  DetailsPlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DetailsPlaylistController],
  providers: [
    DetailsPlaylistService,
    DetailsPlaylist,
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
      provide: 'DetailsPlaylistRepository',
      useClass: DetailsPlaylistRepositoryImpl,
    },
  ],
})
export class DetailsPlaylistModule {}
