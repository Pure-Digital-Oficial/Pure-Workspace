import { Module } from '@nestjs/common';
import {
  DeletePostRepositoryImpl,
  FindPostByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { DeletePost } from '@pure-workspace/domain';
import { DeletePostController } from './delete-post.controller';
import { DeletePostService } from './delete-post.service';

@Module({
  controllers: [DeletePostController],
  providers: [
    DeletePost,
    DeletePostService,
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
      provide: 'DeletePostRepository',
      useClass: DeletePostRepositoryImpl,
    },
  ],
})
export class DeletePostModule {}
