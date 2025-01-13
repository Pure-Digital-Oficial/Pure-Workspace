import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeleteCategoryService } from './delete-category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  deleteCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('delete-category')
export class DeleteCategoryController {
  constructor(private readonly deleteCategoryService: DeleteCategoryService) {}

  @Delete(':categoryId')
  @UsePipes(new ZodValidationPipe(deleteCategorySchema))
  async delete(
    @Param('categoryId') categoryId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteCategoryService.delete({
      id: categoryId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
