import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { deletePostSchema, ErrorMessageResult } from '@pure-workspace/domain';
import { DeletePostService } from './delete-post.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-post')
export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  @Delete(':postId')
  @UsePipes(new ZodValidationPipe(deletePostSchema))
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
