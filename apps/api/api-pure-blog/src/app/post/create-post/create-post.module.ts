import { Module } from '@nestjs/common';
import {
  CreatePostRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  UploadContentFileInGoogleRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreatePost } from '@pure-workspace/domain';
import { CreatePostService } from './create-post.service';
import { CreatePostController } from './create-post.controller';

@Module({
  controllers: [CreatePostController],
  providers: [
    CreatePost,
    CreatePostService,
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
      provide: 'UploadContentFileRepository',
      useClass: UploadContentFileInGoogleRepositoryImpl,
    },
    {
      provide: 'CreatePostRepository',
      useClass: CreatePostRepositoryImpl,
    },
  ],
})
export class CreatePostModule {}
