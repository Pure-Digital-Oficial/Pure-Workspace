import { Controller, Delete, Param, Query } from '@nestjs/common';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { DeletePostService } from './delete-post.service';

@Controller('delete-post')
export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  @Delete(':postId')
  //@UsePipes(new ZodValidationPipe(createPostSchema))
  async create(
    @Param('postId') postId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deletePostService.delete({
      id: postId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
