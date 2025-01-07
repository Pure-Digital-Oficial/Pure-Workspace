import { Body, Controller, Param, Put, Query } from '@nestjs/common';
import { ErrorMessageResult, PostBodyDto } from '@pure-workspace/domain';
import { EditPostService } from './edit-post.service';

@Controller('edit-post')
export class EditPostController {
  constructor(private readonly editPostService: EditPostService) {}

  @Put(':postId')
  //@UsePipes(new ZodValidationPipe(editCompanyDataSchema))
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
