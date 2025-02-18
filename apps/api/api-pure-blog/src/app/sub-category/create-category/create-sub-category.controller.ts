import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  createSubCategorySchema,
  ErrorMessageResult,
  SubCategoryBodyDto,
} from '@pure-workspace/domain';
import { CreateSubCategoryService } from './create-sub-category.service';

@Controller('create-sub-category')
export class CreateSubCategoryController {
  constructor(
    private readonly createSubCategoryService: CreateSubCategoryService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSubCategorySchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: SubCategoryBodyDto
  ) {
    const result = await this.createSubCategoryService.create({
      loggedUserId: loggedUserId ?? '',
      body: body ?? ({} as SubCategoryBodyDto),
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
