import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import {
  editMediaPostSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { EditMediaPostService } from './edit-media-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('edit-media-post')
export class EditMediaPostController {
  constructor(private readonly editMediaPostService: EditMediaPostService) {}

  @Put(':mediaId')
  @UsePipes(new ZodValidationPipe(editMediaPostSchema))
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
