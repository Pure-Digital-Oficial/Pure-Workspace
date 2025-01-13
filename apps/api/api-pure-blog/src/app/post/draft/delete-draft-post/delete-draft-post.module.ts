import { Module } from '@nestjs/common';
import {
  DeleteDraftPostRepositoryImpl,
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { DeleteDraftPost } from '@pure-workspace/domain';
import { DeleteDraftPostController } from './delete-draft-post.controller';
import { DeleteDraftPostService } from './delete-draft-post.service';

@Module({
  controllers: [DeleteDraftPostController],
  providers: [
    DeleteDraftPost,
    DeleteDraftPostService,
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
      provide: 'DeleteDraftPostRepository',
      useClass: DeleteDraftPostRepositoryImpl,
    },
  ],
})
export class DeleteDraftPostModule {}
