import { Body, Controller, Param, Put, Query } from '@nestjs/common';
import { ErrorMessageResult } from '@pure-workspace/domain';
import { EditMediaPostService } from './edit-media-post.service';

@Controller('edit-media-post')
export class EditMediaPostController {
  constructor(private readonly editMediaPostService: EditMediaPostService) {}

  @Put(':mediaId')
  //@UsePipes(new ZodValidationPipe(editPostSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('mediaId') mediaId: string,
    @Body() body: { name: string }
  ) {
    const result = await this.editMediaPostService.edit({
      name: body.name ?? '',
      mediaId: mediaId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { mediaPostId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
