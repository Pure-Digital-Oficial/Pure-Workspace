import { Module } from '@nestjs/common';
import {
  AddDraftToPostRepositoryImpl,
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { AddDraftToPost } from '@pure-workspace/domain';
import { AddDraftToPostController } from './add-draft-to-post.controller';
import { AddDraftToPostService } from './add-draft-to-post.service';

@Module({
  controllers: [AddDraftToPostController],
  providers: [
    AddDraftToPost,
    AddDraftToPostService,
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
      provide: 'AddDraftToPostRepository',
      useClass: AddDraftToPostRepositoryImpl,
    },
  ],
})
export class AddDraftToPostModule {}
