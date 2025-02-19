import { Module } from '@nestjs/common';
import { EditSubCategoryController } from './edit-category.controller';
import { EditSubCategory } from '@pure-workspace/domain';
import { EditSubCategoryService } from './edit-category.service';
import {
  EditSubCategoryRepositoryImpl,
  FindCategoryByIdRepositoryImpl,
  FindSubCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [EditSubCategoryController],
  providers: [
    EditSubCategory,
    EditSubCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditSubCategoryRepository',
      useClass: EditSubCategoryRepositoryImpl,
    },
    {
      provide: 'FindSubCategoryByIdRepository',
      useClass: FindSubCategoryByIdRepositoryImpl,
    },
    {
      provide: 'FindCategoryByIdRepository',
      useClass: FindCategoryByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class EditSubCategoryModule {}
