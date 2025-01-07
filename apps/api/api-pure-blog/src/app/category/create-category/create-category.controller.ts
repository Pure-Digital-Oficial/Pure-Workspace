import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateCategoryService } from './create-category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  CategoryBodyDto,
  createCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('create-category')
export class CreateCategoryController {
  constructor(private readonly createCategoryService: CreateCategoryService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCategorySchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: CategoryBodyDto
  ) {
    const result = await this.createCategoryService.create({
      loggedUserId: loggedUserId ?? '',
      body: body ?? ({} as CategoryBodyDto),
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
