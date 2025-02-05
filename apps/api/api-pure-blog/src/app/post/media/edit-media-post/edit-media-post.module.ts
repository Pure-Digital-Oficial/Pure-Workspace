import { Module } from '@nestjs/common';
import {
  EditMediaPostRepositoryImpl,
  FindMediaPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { EditMediaPost } from '@pure-workspace/domain';
import { EditMediaPostController } from './edit-media-post.controller';
import { EditMediaPostService } from './edit-media-post.service';

@Module({
  controllers: [EditMediaPostController],
  providers: [
    EditMediaPost,
    EditMediaPostService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindMediaPostByIdRepository',
      useClass: FindMediaPostByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'EditMediaPostRepository',
      useClass: EditMediaPostRepositoryImpl,
    },
  ],
})
export class EditMediaPostModule {}
