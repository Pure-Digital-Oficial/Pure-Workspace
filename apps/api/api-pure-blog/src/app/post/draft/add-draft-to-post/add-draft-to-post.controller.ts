import { Controller, Param, Post, Query, UsePipes } from '@nestjs/common';
import {
  addDraftToPostSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';
import { AddDraftToPostService } from './add-draft-to-post.service';

@Controller('add-draft-to-post')
export class AddDraftToPostController {
  constructor(private readonly addDraftToPostService: AddDraftToPostService) {}

  @Post(':postId')
  @UsePipes(new ZodValidationPipe(addDraftToPostSchema))
  async add(
    @Param('postId') postId: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.addDraftToPostService.add({
      id: postId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
