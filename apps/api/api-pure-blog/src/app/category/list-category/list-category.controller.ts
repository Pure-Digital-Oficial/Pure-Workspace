import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ListCategoryService } from './list-category.service';
import { ErrorMessageResult, listCategorySchema } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-category')
export class ListCategoryController {
  constructor(private readonly listCategoryService: ListCategoryService) {}

  @UsePipes(new ZodValidationPipe(listCategorySchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.listCategoryService.list({
      loggedUserId,
      filter: filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
