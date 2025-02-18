import { Module } from '@nestjs/common';
import {
  CreateDraftPostRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  UploadContentFileInGoogleRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateDraftPost } from '@pure-workspace/domain';
import { CreateDraftPostController } from './create-draft-post.controller';
import { CreateDraftPostService } from './create-draft-post.service';

@Module({
  controllers: [CreateDraftPostController],
  providers: [
    CreateDraftPost,
    CreateDraftPostService,
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
      provide: 'CreateDraftPostRepository',
      useClass: CreateDraftPostRepositoryImpl,
    },
  ],
})
export class CreateDraftPostModule {}
