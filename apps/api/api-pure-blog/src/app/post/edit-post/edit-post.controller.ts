import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import {
  editPostSchema,
  ErrorMessageResult,
  PostBodyDto,
} from '@pure-workspace/domain';
import { EditPostService } from './edit-post.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-post')
export class EditPostController {
  constructor(private readonly editPostService: EditPostService) {}

  @Put(':postId')
  @UsePipes(new ZodValidationPipe(editPostSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('postId') postId: string,
    @Body() body: PostBodyDto
  ) {
    const result = await this.editPostService.edit({
      body: body?.title ? body : ({} as PostBodyDto),
      id: postId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
