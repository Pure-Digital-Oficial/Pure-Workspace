import { Module } from '@nestjs/common';
import { ListPlaylistCategoryService } from './list-playlist-category.service';
import { ListPlaylistCategoryController } from './list-playlist-category.controller';
import { ListPlaylistCategory } from '@pure-workspace/domain';
import {
  FindCompanyByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ListPlaylistCategoryRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListPlaylistCategoryController],
  providers: [
    ListPlaylistCategoryService,
    ListPlaylistCategory,
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCompanyByIdRepository',
      useClass: FindCompanyByIdRepositoryImpl,
    },
    {
      provide: 'ListPlaylistCategoryRepository',
      useClass: ListPlaylistCategoryRepositoryImpl,
    },
  ],
})
export class ListPlaylistCategoryModule {}
