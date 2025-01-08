import {
  Controller,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  createMediaPostSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { CreateMediaPostService } from './create-media-post.service';
import { ZodValidationPipe } from '../../../pipes/zod-validation-pipe';

@Controller('create-media-post')
export class CreateMediaPostController {
  constructor(
    private readonly createMediaPostService: CreateMediaPostService
  ) {}

  @UsePipes(new ZodValidationPipe(createMediaPostSchema))
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('loggedUserId') loggedUserId: string,
    @Query('postId') postId: string
  ) {
    const updatedFiles =
      files?.length > 0
        ? files.map((file) => ({
            ...file,
            filename: file.originalname.split('.')[0],
          }))
        : [];

    const result = await this.createMediaPostService.create({
      files: updatedFiles,
      loggedUserId,
      postId,
    });

    if (result.isRight()) return { mediaPostId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
