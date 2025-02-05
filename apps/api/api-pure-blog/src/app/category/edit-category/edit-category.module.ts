import { Module } from '@nestjs/common';
import { EditCategoryController } from './edit-category.controller';
import { EditCategory } from '@pure-workspace/domain';
import { EditCategoryService } from './edit-category.service';
import {
  EditCategoryRepositoryImpl,
  FindCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [EditCategoryController],
  providers: [
    EditCategory,
    EditCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditCategoryRepository',
      useClass: EditCategoryRepositoryImpl,
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
export class EditCategoryModule {}
