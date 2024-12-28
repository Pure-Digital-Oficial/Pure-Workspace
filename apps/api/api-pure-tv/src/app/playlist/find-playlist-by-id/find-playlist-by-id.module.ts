import { Module } from '@nestjs/common';
import { FindPlaylistByIdService } from './find-playlist-by-id.service';
import { FindPlaylistByIdController } from './find-playlist-by-id.controller';
import { FindPlaylistById } from '@pure-workspace/domain';
import {
  FindPlaylistByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [FindPlaylistByIdController],
  providers: [
    FindPlaylistByIdService,
    FindPlaylistById,
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
  ],
})
export class FindPlaylistByIdModule {}
