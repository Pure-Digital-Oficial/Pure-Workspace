import { Module } from '@nestjs/common';
import { CreateCategoryController } from './create-category.controller';
import { CreateCategory } from '@pure-workspace/domain';
import { CreateCategoryService } from './create-category.service';
import {
  CreateCategoryRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';

@Module({
  controllers: [CreateCategoryController],
  providers: [
    CreateCategory,
    CreateCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'CreateCategoryRepository',
      useClass: CreateCategoryRepositoryImpl,
    },
  ],
})
export class CreateCategoryModule {}
