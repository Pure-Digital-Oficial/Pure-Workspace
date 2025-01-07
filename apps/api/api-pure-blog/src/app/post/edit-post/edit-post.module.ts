import { Module } from '@nestjs/common';
import {
  EditPostRepositoryImpl,
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { EditPost } from '@pure-workspace/domain';
import { EditPostController } from './edit-post.controller';
import { EditPostService } from './edit-post.service';

@Module({
  controllers: [EditPostController],
  providers: [
    EditPost,
    EditPostService,
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
      provide: 'EditPostRepository',
      useClass: EditPostRepositoryImpl,
    },
  ],
})
export class EditPostModule {}
