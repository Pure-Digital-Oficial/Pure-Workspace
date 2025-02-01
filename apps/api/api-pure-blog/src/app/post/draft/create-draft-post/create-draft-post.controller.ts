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
import { CreateDraftPostService } from './create-draft-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('create-draft-post')
export class CreateDraftPostController {
  constructor(
    private readonly createDraftPostService: CreateDraftPostService
  ) {}

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
    const result = await this.createDraftPostService.create({
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
