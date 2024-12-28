import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import { DeletePlaylistService } from './delete-playlist.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { deletePlaylistSchema, ErrorMessageResult } from '@pure-workspace/domain';

@Controller('delete-playlist')
export class DeletePlaylistController {
  constructor(private readonly deletePlaylistService: DeletePlaylistService) {}

  @UsePipes(new ZodValidationPipe(deletePlaylistSchema))
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('loggedUserId') loggedUserId: string
  ) {
    const result = await this.deletePlaylistService.delete({
      id,
      loggedUserId,
    });

    if (result.isRight()) return result.value;
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
