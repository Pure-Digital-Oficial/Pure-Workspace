import { Module } from '@nestjs/common';
import { CreateSubCategoryController } from './create-sub-category.controller';
import { CreateSubCategory } from '@pure-workspace/domain';
import { CreateSubCategoryService } from './create-sub-category.service';
import {
  CreateSubCategoryRepositoryImpl,
  FindCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateSubCategoryController],
  providers: [
    CreateSubCategory,
    CreateSubCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCategoryByIdRepository',
      useClass: FindCategoryByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'CreateSubCategoryRepository',
      useClass: CreateSubCategoryRepositoryImpl,
    },
  ],
})
export class CreateSubCategoryModule {}
