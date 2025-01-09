import { Module } from '@nestjs/common';
import {
  FindAppByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListUserPostsRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { ListUserPosts } from '@pure-workspace/domain';
import { ListUserPostsController } from './list-user-posts.controller';
import { ListUserPostsService } from './list-user-posts.service';

@Module({
  controllers: [ListUserPostsController],
  providers: [
    ListUserPosts,
    ListUserPostsService,
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
      provide: 'ListUserPostsRepository',
      useClass: ListUserPostsRepositoryImpl,
    },
  ],
})
export class ListUserPostsModule {}
