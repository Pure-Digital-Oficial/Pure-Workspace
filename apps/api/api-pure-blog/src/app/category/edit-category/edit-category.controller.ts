import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditCategoryService } from './edit-category.service';
import {
  CategoryBodyDto,
  editCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-category')
export class EditCategoryController {
  constructor(private readonly editCategoryService: EditCategoryService) {}

  @Put(':categoryId')
  @UsePipes(new ZodValidationPipe(editCategorySchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('categoryId') categoryId: string,
    @Body() body: CategoryBodyDto
  ) {
    const result = await this.editCategoryService.edit({
      body: body?.name ? body : ({} as CategoryBodyDto),
      id: categoryId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
