import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeletePlaylistCategoryService } from './delete-playlist-category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  deletePlaylistCategorySchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';

@Controller('delete-playlist-category')
export class DeletePlaylistCategoryController {
  constructor(
    private readonly deletePlaylistCategoryService: DeletePlaylistCategoryService
  ) {}

  @UsePipes(new ZodValidationPipe(deletePlaylistCategorySchema))
  @Delete(':id')
  async delete(
    @Param('id') idToDelete: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deletePlaylistCategoryService.delete({
      id: idToDelete,
      loggedUserId,
    });

    if (result.isRight()) return { playlistCategoryId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
