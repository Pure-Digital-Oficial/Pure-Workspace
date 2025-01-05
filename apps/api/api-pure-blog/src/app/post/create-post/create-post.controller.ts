import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import {
  createPostSchema,
  ErrorMessageResult,
  PostBodyDto,
} from '@pure-workspace/domain';
import { CreatePostService } from './create-post.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-post')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async create(
    @Query('appId') appId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PostBodyDto
  ) {
    const result = await this.createPostService.create({
      appId: appId ?? '',
      loggedUserId: loggedUserId ?? '',
      body: body ?? ({} as PostBodyDto),
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
