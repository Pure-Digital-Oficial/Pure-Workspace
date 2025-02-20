import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateCategoryService } from './create-category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  CategoryBodyDto,
  createCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('create-category')
export class CreateCategoryController {
  constructor(private readonly createCategoryService: CreateCategoryService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  @UseInterceptors(FilesInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Query('loggedUserId') loggedUserId: string,
    @Body('name') name: string,
    @Body('description') description: string
  ) {
    const body: CategoryBodyDto = {
      name,
      description,
    };
    const result = await this.createCategoryService.create({
      loggedUserId: loggedUserId ?? '',
      body: body ?? ({} as CategoryBodyDto),
      image: file,
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
