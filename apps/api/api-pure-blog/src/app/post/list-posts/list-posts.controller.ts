import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ErrorMessageResult, listPostsSchema } from '@pure-workspace/domain';
import { ListPostsService } from './list-posts.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('list-posts')
export class ListPostsController {
  constructor(private readonly listPostsService: ListPostsService) {}

  @UsePipes(new ZodValidationPipe(listPostsSchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('appId') appId: string
  ) {
    const result = await this.listPostsService.list({
      loggedUserId,
      appId,
      filter: filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
