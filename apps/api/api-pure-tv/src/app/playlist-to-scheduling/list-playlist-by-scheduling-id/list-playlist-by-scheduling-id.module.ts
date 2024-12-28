import { Module } from '@nestjs/common';
import { ListPlaylistBySchedulingIdService } from './list-playlist-by-scheduling-id.service';
import { ListPlaylistBySchedulingIdController } from './list-playlist-by-scheduling-id.controller';
import { ListPlaylistBySchedulingId } from '@pure-workspace/domain';
import {
  FindSchedulingByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  ListPlaylistBySchedulingIdRepositoryImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListPlaylistBySchedulingIdController],
  providers: [
    ListPlaylistBySchedulingIdService,
    ListPlaylistBySchedulingId,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindSchedulingByIdRepository',
      useClass: FindSchedulingByIdRepositoryImpl,
    },
    {
      provide: 'ListPlaylistBySchedulingIdRepository',
      useClass: ListPlaylistBySchedulingIdRepositoryImpl,
    },
  ],
})
export class ListPlaylistBySchedulingIdModule {}
