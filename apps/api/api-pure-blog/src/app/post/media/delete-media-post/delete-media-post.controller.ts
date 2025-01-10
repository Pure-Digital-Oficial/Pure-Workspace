import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import {
  deleteMediaPostSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { DeleteMediaPostService } from './delete-media-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('delete-media-post')
export class DeleteMediaPostController {
  constructor(
    private readonly deleteMediaPostService: DeleteMediaPostService
  ) {}

  @Delete(':mediaId')
  @UsePipes(new ZodValidationPipe(deleteMediaPostSchema))
  async delete(
    @Param('mediaId') mediaId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deleteMediaPostService.delete({
      mediaId: mediaId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { mediaPostId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
