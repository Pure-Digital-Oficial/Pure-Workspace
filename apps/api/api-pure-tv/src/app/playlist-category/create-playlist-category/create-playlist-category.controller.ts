import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreatePlaylistCategoryService } from './create-playlist-category.service';
import {
  ErrorMessageResult,
  PlaylistCategoryBodyDto,
  createPlaylistCategorySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-playlist-category')
export class CreatePlaylistCategoryController {
  constructor(
    private readonly createPlaylistCategoryService: CreatePlaylistCategoryService
  ) {}

  @UsePipes(new ZodValidationPipe(createPlaylistCategorySchema))
  @Post()
  async create(
    @Query('companyId') companyId: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PlaylistCategoryBodyDto
  ) {
    const result = await this.createPlaylistCategoryService.create({
      body: {
        description: body?.description ?? '',
        name: body?.name ?? '',
      },
      loggedUserId,
      companyId,
    });

    if (result.isRight()) return { playlistCategoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
