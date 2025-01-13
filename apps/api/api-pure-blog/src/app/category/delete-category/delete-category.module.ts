import { Module } from '@nestjs/common';
import { DeleteCategoryController } from './delete-category.controller';
import { DeleteCategory } from '@pure-workspace/domain';
import { DeleteCategoryService } from './delete-category.service';
import {
  DeleteCategoryRepositoryImpl,
  FindCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [DeleteCategoryController],
  providers: [
    DeleteCategory,
    DeleteCategoryService,
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
      provide: 'DeleteCategoryRepository',
      useClass: DeleteCategoryRepositoryImpl,
    },
  ],
})
export class DeleteCategoryModule {}
