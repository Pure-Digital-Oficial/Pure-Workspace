import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ErrorMessageResult, listPostsSchema } from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { ListUserPostsService } from './list-user-posts.service';

@Controller('list-user-posts')
export class ListUserPostsController {
  constructor(private readonly listUserPostsService: ListUserPostsService) {}

  @UsePipes(new ZodValidationPipe(listPostsSchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('appId') appId: string
  ) {
    const result = await this.listUserPostsService.list({
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
