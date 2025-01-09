import { Controller, Get, Query } from '@nestjs/common';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { ListMediasPostService } from './list-medias-post.service';

@Controller('list-medias-post')
export class ListMediasPostController {
  constructor(private readonly listMediasPostService: ListMediasPostService) {}

  //@UsePipes(new ZodValidationPipe(listPostsSchema))
  @Get()
  async list(
    @Query('filter') filter: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('loggedUserId') loggedUserId: string,
    @Query('postId') postId: string
  ) {
    const result = await this.listMediasPostService.list({
      loggedUserId,
      postId,
      filter: filter,
      skip,
      take,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
