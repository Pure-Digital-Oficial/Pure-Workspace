import { Module } from '@nestjs/common';
import {
  DeleteGoogleFileByNameRepositoryImpl,
  DeleteMediaPostRepositoryImpl,
  FindMediaPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { DeleteMediaPost } from '@pure-workspace/domain';
import { DeleteMediaPostController } from './delete-media-post.controller';
import { DeleteMediaPostService } from './delete-media-post.service';

@Module({
  controllers: [DeleteMediaPostController],
  providers: [
    DeleteMediaPostService,
    DeleteMediaPost,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindMediaPostByIdRepository',
      useClass: FindMediaPostByIdRepositoryImpl,
    },
    {
      provide: 'DeleteMediaPostRepository',
      useClass: DeleteMediaPostRepositoryImpl,
    },
    {
      provide: 'DeleteFileByNameRepository',
      useClass: DeleteGoogleFileByNameRepositoryImpl,
    },
  ],
})
export class DeleteMediaPostModule {}
