import { Module } from '@nestjs/common';
import { EditImageCategoryController } from './edit-image-category.controller';
import { EditImageCategory } from '@pure-workspace/domain';
import { EditImageCategoryService } from './edit-image-category.service';
import {
  DeleteGoogleFileByNameRepositoryImpl,
  EditImageCategoryRepositoryImpl,
  FindCategoryByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  UploadContentFileInGoogleRepositoryImpl,
} from '@pure-workspace/data-access';

@Module({
  controllers: [EditImageCategoryController],
  providers: [
    EditImageCategory,
    EditImageCategoryService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindCategoryByIdRepository',
      useClass: FindCategoryByIdRepositoryImpl,
    },
    {
      provide: 'UploadContentFileRepository',
      useClass: UploadContentFileInGoogleRepositoryImpl,
    },
    {
      provide: 'DeleteFileByNameRepository',
      useClass: DeleteGoogleFileByNameRepositoryImpl,
    },
    {
      provide: 'EditImageCategoryRepository',
      useClass: EditImageCategoryRepositoryImpl,
    },
  ],
})
export class EditImageCategoryModule {}
