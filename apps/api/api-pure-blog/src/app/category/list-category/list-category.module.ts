import { Module } from '@nestjs/common';
import { ListCategoryController } from './list-category.controller';
import { ListCategory } from '@pure-workspace/domain';
import { ListCategoryService } from './list-category.service';
import {
  FindUserByIdRepositoryImpl,
  ListCategoryRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [ListCategoryController],
  providers: [
    ListCategory,
    ListCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'ListCategoryRepository',
      useClass: ListCategoryRepositoryImpl,
    },
  ],
})
export class ListCategoryModule {}
