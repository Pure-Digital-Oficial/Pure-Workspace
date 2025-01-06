import { Module } from '@nestjs/common';
import {
  FindAppByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListPostsRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { ListPosts } from '@pure-workspace/domain';
import { ListPostsController } from './list-posts.controller';
import { ListPostsService } from './list-posts.service';

@Module({
  controllers: [ListPostsController],
  providers: [
    ListPosts,
    ListPostsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'ListPostsRepository',
      useClass: ListPostsRepositoryImpl,
    },
  ],
})
export class ListPostsModule {}
