import { Module } from '@nestjs/common';
import {
  CreateMediaPostRepositoryImpl,
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  GenerateThumbnailRepositoryImpl,
  PrismaGeneralService,
  UploadContentFileInGoogleRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateMediasPost } from '@pure-workspace/domain';
import { CreateMediaPostService } from './create-media-post.service';
import { CreateMediaPostController } from './create-media-post.controller';

@Module({
  controllers: [CreateMediaPostController],
  providers: [
    CreateMediasPost,
    CreateMediaPostService,
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
      provide: 'GenerateThumbnailRepository',
      useClass: GenerateThumbnailRepositoryImpl,
    },
    {
      provide: 'UploadContentFileRepository',
      useClass: UploadContentFileInGoogleRepositoryImpl,
    },
    {
      provide: 'CreateMediaPostRepository',
      useClass: CreateMediaPostRepositoryImpl,
    },
  ],
})
export class CreateMediaPostModule {}
