import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  createPostSchema,
  ErrorMessageResult,
  PostBodyDto,
  UploadedFile as CustomUploadedFile,
} from '@pure-workspace/domain';
import { CreatePostService } from './create-post.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('create-post')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Query('appId') appId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PostBodyDto
  ) {
    const updatedFile: CustomUploadedFile = {
      ...file,
      filename: file.originalname.split('.')[0],
    };
    const result = await this.createPostService.create({
      appId: appId ?? '',
      loggedUserId: loggedUserId ?? '',
      body: body
        ? {
            ...body,
            coverImage: updatedFile,
          }
        : ({} as PostBodyDto),
    });

    if (result.isRight()) return { postId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
