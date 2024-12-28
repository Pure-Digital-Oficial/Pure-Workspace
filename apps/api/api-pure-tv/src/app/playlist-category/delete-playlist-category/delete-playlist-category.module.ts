import { Module } from '@nestjs/common';
import { DeletePlaylistCategoryService } from './delete-playlist-category.service';
import { DeletePlaylistCategoryController } from './delete-playlist-category.controller';
import { DeletePlaylistCategory } from '@pure-workspace/domain';
import {
  DeletePlaylistCategoryRepositoryImpl,
  FindPlaylistCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeletePlaylistCategoryController],
  providers: [
    DeletePlaylistCategoryService,
    DeletePlaylistCategory,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindPlaylistCategoryByIdRepository',
      useClass: FindPlaylistCategoryByIdRepositoryImpl,
    },
    {
      provide: 'DeletePlaylistCategoryRepository',
      useClass: DeletePlaylistCategoryRepositoryImpl,
    },
  ],
})
export class DeletePlaylistCategoryModule {}
