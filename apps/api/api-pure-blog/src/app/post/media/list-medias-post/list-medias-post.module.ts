import { Module } from '@nestjs/common';
import {
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListMediasPostRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { ListMediasPost } from '@pure-workspace/domain';
import { ListMediasPostService } from './list-medias-post.service';
import { ListMediasPostController } from './list-medias-post.controller';

@Module({
  controllers: [ListMediasPostController],
  providers: [
    ListMediasPost,
    ListMediasPostService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindPostByIdRepository',
      useClass: FindPostByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'ListMediasPostRepository',
      useClass: ListMediasPostRepositoryImpl,
    },
  ],
})
export class ListMediasPostModule {}
