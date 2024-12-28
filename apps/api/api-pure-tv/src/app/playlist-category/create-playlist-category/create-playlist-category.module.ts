import { Module } from '@nestjs/common';
import { CreatePlaylistCategoryService } from './create-playlist-category.service';
import { CreatePlaylistCategoryController } from './create-playlist-category.controller';
import { CreatePlaylistCategory } from '@pure-workspace/domain';
import {
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  CreatePlaylistCategoryRepositoryImpl,
  FindPlaylistCategoryByNameRepositoryImpl,
  FindCompanyByIdRepositoryImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreatePlaylistCategoryController],
  providers: [
    CreatePlaylistCategoryService,
    CreatePlaylistCategory,
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
      provide: 'CreatePlaylistCategoryRepository',
      useClass: CreatePlaylistCategoryRepositoryImpl,
    },
    {
      provide: 'CreatePlaylistCategoryRepository',
      useClass: CreatePlaylistCategoryRepositoryImpl,
    },
    {
      provide: 'FindPlaylistCategoryByNameRepository',
      useClass: FindPlaylistCategoryByNameRepositoryImpl,
    },
  ],
})
export class CreatePlaylistCategoryModule {}
