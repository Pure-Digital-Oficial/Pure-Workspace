import {
  Controller,
  Param,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { EditImageCategoryService } from './edit-image-category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  editImageCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('edit-image-category')
export class EditImageCategoryController {
  constructor(
    private readonly editImageCategoryService: EditImageCategoryService
  ) {}

  @Put(':categoryId')
  @UsePipes(new ZodValidationPipe(editImageCategorySchema))
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Query('loggedUserId') loggedUserId: string,
    @Param('categoryId') categoryId: string
  ) {
    const result = await this.editImageCategoryService.edit({
      loggedUserId: loggedUserId ?? '',
      categoryId: categoryId ?? '',
      image: image,
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
