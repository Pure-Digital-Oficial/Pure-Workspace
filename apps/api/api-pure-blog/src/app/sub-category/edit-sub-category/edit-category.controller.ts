import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditSubCategoryService } from './edit-category.service';
import {
  editSubCategorySchema,
  ErrorMessageResult,
  SubCategoryBodyDto,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-sub-category')
export class EditSubCategoryController {
  constructor(
    private readonly editSubCategoryService: EditSubCategoryService
  ) {}

  @Put(':subCategoryId')
  @UsePipes(new ZodValidationPipe(editSubCategorySchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() body: SubCategoryBodyDto
  ) {
    const result = await this.editSubCategoryService.edit({
      body: body?.name ? body : ({} as SubCategoryBodyDto),
      id: subCategoryId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { categoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
