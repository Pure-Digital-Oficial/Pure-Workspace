import { Module } from '@nestjs/common';
import { ListPlaylistService } from './list-playlist.service';
import { ListPlaylistController } from './list-playlist.controller';
import { ListPlaylist } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListPlaylistRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListPlaylistController],
  providers: [
    ListPlaylistService,
    ListPlaylist,
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
      provide: 'ListPlaylistRepository',
      useClass: ListPlaylistRepositoryImpl,
    },
  ],
})
export class ListPlaylistModule {}
