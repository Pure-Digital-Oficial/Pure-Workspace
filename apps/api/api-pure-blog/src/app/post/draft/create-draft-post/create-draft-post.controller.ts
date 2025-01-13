import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  createPostSchema,
  ErrorMessageResult,
  PostBodyDto,
} from '@pure-workspace/domain';
import { CreateDraftPostService } from './create-draft-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-draft-post')
export class CreateDraftPostController {
  constructor(
    private readonly createDraftPostService: CreateDraftPostService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async create(
    @Query('appId') appId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PostBodyDto
  ) {
    const result = await this.createDraftPostService.create({
      appId: appId ?? '',
      loggedUserId: loggedUserId ?? '',
      body: body ?? ({} as PostBodyDto),
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
