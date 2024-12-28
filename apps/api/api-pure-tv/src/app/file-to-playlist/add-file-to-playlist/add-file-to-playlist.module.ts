import { Module } from '@nestjs/common';
import { AddFileToPlaylistService } from './add-file-to-playlist.service';
import { AddFileToPlaylistController } from './add-file-to-playlist.controller';
import { AddFileToPlaylist } from '@pure-workspace/domain';
import {
  AddFileToPlaylistRepositoryImpl,
  FindContentFileByIdRepositoryImpl,
  FindFileInFileToPlaylistRepositoryImpl,
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [AddFileToPlaylistController],
  providers: [
    AddFileToPlaylistService,
    AddFileToPlaylist,
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
      provide: 'AddFileToPlaylistRepository',
      useClass: AddFileToPlaylistRepositoryImpl,
    },
    {
      provide: 'FindFileInFileToPlaylistRepository',
      useClass: FindFileInFileToPlaylistRepositoryImpl,
    },
  ],
})
export class AddFileToPlaylistModule {}
