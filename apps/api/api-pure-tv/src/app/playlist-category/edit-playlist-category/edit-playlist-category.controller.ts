import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import { EditPlaylistCategoryService } from './edit-playlist-category.service';
import {
  ErrorMessageResult,
  PlaylistCategoryBodyDto,
  editPlaylistCategorySchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-playlist-category')
export class EditPlaylistCategoryController {
  constructor(
    private readonly editPlaylistCategoryService: EditPlaylistCategoryService
  ) {}

  @UsePipes(new ZodValidationPipe(editPlaylistCategorySchema))
  @Put(':id')
  async edit(
    @Param('id') idToEdit: string,
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: PlaylistCategoryBodyDto
  ) {
    const result = await this.editPlaylistCategoryService.edit({
      id: idToEdit,
      body: {
        description: body?.description ?? '',
        name: body?.name ?? '',
      },
      loggedUserId,
    });

    if (result.isRight()) return { playlistCategoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
