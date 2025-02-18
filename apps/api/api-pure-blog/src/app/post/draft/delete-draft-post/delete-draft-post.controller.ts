import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { deletePostSchema, ErrorMessageResult } from '@pure-workspace/domain';
import { DeleteDraftPostService } from './delete-draft-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('delete-draft-post')
export class DeleteDraftPostController {
  constructor(
    private readonly deleteDraftPostService: DeleteDraftPostService
  ) {}

  @Delete(':postId')
  @UsePipes(new ZodValidationPipe(deletePostSchema))
  async delete(
    @Param('postId') postId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteDraftPostService.delete({
      id: postId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
